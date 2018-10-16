// DEPENDENCIES
const server = require('../mainServer.js');
const gameServer = require('../game/gameServer.js');
const socket = require('socket.io');
const io = socket(server);
const client = require('./client.js');

// POOL OF CLIENTS
const clientPool = [];

// GAME COUNTER
var gameCount = 0;

// EVENTS
// WHEN A CLIENT CONNECTS
io.on('connection', (socket) => {
    var newClient = new client(socket);
    console.log('CLIENT: ', socket.id, ' HAS ENTERED');

    // IF THERE ARE NO CLIENTS AVAILABLE
    if (clientPool.length === 0) {
        clientPool.push(newClient);
        console.log('NO CLIENTS AVAILABLE, PUTTING IN POOL...');
        console.log('Current Pool: ', clientPool);
        return;
    }

    // IF THERE ARE CLIENTS IN THE POOL
    else if (clientPool.length > 0) {
        console.log('CLIENTS ARE AVAILABLE, MATCHING NOW...');
        matchClient(newClient);
        return;
    }
});

// HANDLERS
// FIND A MATCH FOR A GIVEN CLIENT
const matchClient = (newClient) => {
    let pooledClient = clientPool[0];
    createGame(newClient, pooledClient);
    clientPool.splice(0, 1);
    console.log('DELETED ' + pooledClient.id);
    console.log('Current Pool: ', clientPool);
    return;
}

// CREATE A NEW GAME BETWEEN CLIENTS
const createGame = (clientOne, clientTwo) => {
    let room = `Room ${gameCount++}`;
    clientOne.stream.join(room);
    clientTwo.stream.join(room);
    gameServer.createGame(clientOne, clientTwo, io, room);
    console.log('CREATED ROOM ', room);
}

module.exports = io;