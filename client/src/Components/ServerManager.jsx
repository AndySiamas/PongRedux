import connect from 'socket.io-client';

class _ServerManager {
    constructor() {
        // SETUP
        this.server = 'http://127.0.0.1:1600';
        this.startedGame = false;
        this.connectedToServer = false;
        this.io;
        this.clientId = 0;
        this.room = '';
        this.entities = {};

        // EVENTS
        this.events = {};
    }

    connectToServer() {
        return new Promise((resolve) => {
            if (!this.connectedToServer) {
                // Attempt to connect to server
                this.io = connect(this.server);

                // When matched
                this.io.on('matched', (clientId) => {
                    this.connectedToServer = true;
                    this.clientId = clientId;
                    this.createServerListeners();
                    resolve();
                });
            }
        });
    }

    loadEntities(entities) {
        this.entities = entities;
    }

    // ---------------------------------------------------
    // EVENT LISTENERS -----------------------------------
    // ---------------------------------------------------
    on(eventName, taskName, task) {
        this.events[eventName] = this.events[eventName] || {};

        if (!this.events[eventName][taskName]) {
            this.events[eventName][taskName] = task;
        }
    }

    trigger(eventName, ...args) {
        let event = this.events[eventName];
        if (event) {
            for (var taskName in event) {
                let task = event[taskName];
                task(args);
            }
        }
    }

    removeTask(eventName, taskName) {
        delete this.events[eventName][taskName];
    }

    // ---------------------------------------------------
    // SERVER EVENTS -------------------------------------
    // ---------------------------------------------------
    createServerListeners() {
        // If disconnected from server
        this.io.on('disconnect', () => { this.handleDisconnect() });
        // When both players are ready to play
        this.io.on('bothPlayersReady', () => { this.handlePlayersReady() });
        // When server tells us basic information (color, etc...)
        this.io.on('startInformation', (color) => { this.handleStartInformation(color) });
        // When server tells us to update our state
        this.io.on('serverUpdate', (playerOne, playerTwo, ball) => { 
            this.handleServerUpdate(playerOne, playerTwo, ball);
        });
        // When server tells us a player scored
        this.io.on('playerScore', (color) => { 
            this.handlePlayerScore(color);
        });
        // When server tells us a player won
        this.io.on('playerWin', (color) => { 
            this.handlePlayerWin(color);
        });
    }
    
    // ---------------------------------------------------
    // EVENT HANDLERS ------------------------------------
    // ---------------------------------------------------

    // Handle disconnecting from server
    handleDisconnect() {
        this.connectedToServer = false;
        this.clientId = null;
        this.io.disconnect();
        this.trigger('disconnect');
    }

    // Handle both players are ready
    handlePlayersReady() {
        console.log('BOTH PLAYERS ARE READY. START GAME');
        this.trigger('bothPlayersReady');
    }

    // Handle starting information from server
    handleStartInformation(color) {
        this.trigger('startInformation', color);
    }

    // Handle information coming from server
    handleServerUpdate(playerOne, playerTwo, ball) {
        this.trigger('serverUpdate', playerOne, playerTwo, ball);
    }

    // Handle players scoring
    handlePlayerScore(color) {
        this.trigger('playerScore', color);
    }

    // Handle players winning
    handlePlayerWin(color) {
        this.trigger('playerWin', color);
    }

    // ---------------------------------------------------
    // EMITTERS ------------------------------------------
    // ---------------------------------------------------
    notifyPlayerIsReady() {
        this.io.emit('playerReady', this.clientId);
    }

    notifyGameOver() {
        this.io.emit('gameOver', this.clientId);
    }

    notifyPlayerStartedRound() {
        this.io.emit('playerStartedRound', this.clientId);
    }

    sendPlayerState(position, direction, tick) {
        this.io.emit('playerState', this.clientId, position, direction, tick);
    }
};

const ServerManager = new _ServerManager();
export default ServerManager;