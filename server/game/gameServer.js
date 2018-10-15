const GameServer = {};
const Players = {};
const Player = require('./player.js');

GameServer.createGame = (clientOne, clientTwo, io, room) => {
    // Create player objects
    Players[clientOne.id] = new Player(clientOne.stream, clientTwo.id, room);
    Players[clientTwo.id] = new Player(clientTwo.stream, clientOne.id, room);

    // Notify players they have been matched
    clientOne.stream.emit('matched', clientOne.id);
    clientTwo.stream.emit('matched', clientTwo.id);

    // Listen for player events
    GameServer.createGameListeners([clientOne, clientTwo], room, io);
}

GameServer.createGameListeners = (clients, room, io) => {
    clients.forEach((client) => {
        client.stream.on('playerReady', (id) => { GameServer.handlePlayerReady(id, room, io); });
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

// --------------------------------------------------------
// EVENT EMITTERS -----------------------------------------
// --------------------------------------------------------
// TELL PLAYERS TO START THE GAME
GameServer.emitBothPlayersReady = (player, opponent, room, io) => {
    io.to(room).emit('bothPlayersReady');
    GameServer.emitStartInformation(player, opponent);
}

// TELL PLAYERS WHAT COLOR THEY ARE
GameServer.emitStartInformation = (player, opponent) => {
    player.socket.emit('startInformation', 'red');
    opponent.socket.emit('startInformation', 'blue');
}

module.exports = GameServer;