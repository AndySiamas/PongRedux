const GameServer = {};
const Players = {};
const Player = require('./player.js');
const ServerBall = require('./VirtualObjects/ServerBall.js');

GameServer.createGame = (clientOne, clientTwo, io, room) => {
    // Create virtual ball
    var serverBall = new ServerBall();

    // Create player objects
    Players[clientOne.id] = new Player(clientOne.stream, clientTwo.id, room, serverBall);
    Players[clientTwo.id] = new Player(clientTwo.stream, clientOne.id, room, serverBall);

    // Notify players they have been matched
    clientOne.stream.emit('matched', clientOne.id);
    clientTwo.stream.emit('matched', clientTwo.id);

    // Listen for player events
    GameServer.createGameListeners([clientOne, clientTwo], room, io);
}

GameServer.createGameListeners = (clients, room, io) => {
    clients.forEach((client) => {
        client.stream.on('playerReady', (id) => { GameServer.handlePlayerReady(id, room, io); });
        client.stream.on('gameOver', (id) => { GameServer.handleGameOver(id); });
        client.stream.on('playerState', (id, position, direction, tick) => { 
            GameServer.handlePlayerState(id, position, direction, tick, io); 
        });
        client.stream.on('playerStartedRound', (id) => { 
            GameServer.handlePlayerStartedRound(id);
        });
    });
}

// --------------------------------------------------------
// EVENT HANDLERS -----------------------------------------
// --------------------------------------------------------

// PLAYER NOTIFYS US THAT HE IS READY TO PLAY
GameServer.handlePlayerReady = (id, room, io) => {
    var player = Players[id];
    var opponent = Players[player.opponentId];
    player.readyToPlay = true;
    if (opponent.readyToPlay) {
        GameServer.emitBothPlayersReady(player, opponent, room, io);
    }
}

// PLAYER SENDS US HIS GAME STATE
GameServer.handlePlayerState = (id, position, direction, tick, io) => {
    var player = Players[id];
    var opponent = Players[player.opponentId]; 
    var room = player.room;
    var ball = player.ball;
    player.sentUpdate = true;
    player.position = position + direction;
    player.direction = direction;
    player.tick = tick;

    // increase balls speed over time
    ball.acceleration += 0.05;

    if (opponent && opponent.sentUpdate) {
        player.sentUpdate = false;
        opponent.sentUpdate = false;
        GameServer.emitServerUpdate(room, player, opponent, io);
    }
}

// PLAYER IS READY FOR NEXT ROUND
GameServer.handlePlayerStartedRound = (id) => {
    var player = Players[id];
    var opponent = Players[player.opponentId];
    var {ball} = Players[id];
    player.isInAction = true;
    if (opponent.isInAction) {
        ball.idle = false;
        player.isInAction = false;
        opponent.isInAction = false;
    }
}

// --------------------------------------------------------
// EVENT EMITTERS -----------------------------------------
// --------------------------------------------------------
// TELL PLAYERS TO START THE GAME
GameServer.emitBothPlayersReady = (player, opponent, room, io) => {
    io.to(room).emit('bothPlayersReady');
    GameServer.emitStartInformation(player, opponent, io);
}

// TELL PLAYERS WHAT COLOR THEY ARE
GameServer.emitStartInformation = (player, opponent, io) => {
    // Get player colors
    player.color = 'red';
    opponent.color = 'blue';
    player.socket.emit('startInformation', 'red');
    opponent.socket.emit('startInformation', 'blue');

    // Initialize ball
    player.ball.init(player, opponent, (player) => {
        player.ball.idle = true;
        player.ball.resetPosition();
        GameServer.emitPlayerScore(player, io);
    });
}

GameServer.emitPlayerScore = ({room, color}, io) => {
    io.to(room).emit('playerScore', color);
}

// GIVE PLAYERS UPDATED STATE
GameServer.emitServerUpdate = (room, player, opponent, io) => {
    // First client info
    let clientOne = {};
    clientOne.position = player.position;
    clientOne.direction = player.direction;
    clientOne.color = player.color;
    clientOne.tick = player.tick;

    // Second client info
    let clientTwo = {};
    clientTwo.position = opponent.position;
    clientTwo.direction = opponent.direction;
    clientTwo.color = opponent.color;
    clientTwo.tick = opponent.tick;

    // update server ball state
    let ball = player.ball;
    let newBall = {};
    if (!ball.idle) ball.serverMove();
    newBall.x = ball.x;
    newBall.y = ball.y;

    io.to(room).emit('serverUpdate', clientOne, clientTwo, newBall);
}


// WHEN THE GAME IS OVER
GameServer.handleGameOver = (id) => {
    Players[id].socket.disconnect();
    delete Players[id];
}

module.exports = GameServer;