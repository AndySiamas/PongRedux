// DEPENDENCIES
const server = require('../mainServer.js');
const socket = require('socket.io');
const io = socket(server);
const client = require('./client.js');

// POOL OF CLIENTS
const clientPool = [];

// EVENTS
// WHEN A CLIENT CONNECTS
io.on('connection', (socket) => {
    var newClient = new client(socket);

    // IF THERE ARE NO CLIENTS AVAILABLE
    if (clientPool.length === 0) {
        clientPool.push(newClient);
        console.log('NO CLIENTS AVAILABLE, PUTTING IN POOL...');
        return;
    }

    // IF THERE ARE CLIENTS IN THE POOL
    else if (clientPool.length > 0) {
        matchClient(newClient);
        console.log('CLIENTS ARE AVAILABLE, MATCHING NOW...');
        return;
    }
});

// HANDLERS
// FIND A MATCH FOR A GIVEN CLIENT
const matchClient = (newClient) => {
    let pooledClient = clientPool[0];
    createGame(newClient, pooledClient);
    clientPool.splice(0, 1);
    console.log(clientPool);
    return;
}

// CREATE A NEW GAME BETWEEN CLIENTS
const createGame = (clientOne, clientTwo) => {
    clientOne.stream.emit('match', clientTwo.id);
    clientTwo.stream.emit('match', clientOne.id);
}