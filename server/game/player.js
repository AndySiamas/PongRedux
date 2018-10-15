class Player {
    constructor(socket, opponentId, room) {
        this.id = socket.id;
        this.socket = socket;
        this.opponentId = opponentId;
        this.room = room;
        this.readyToPlay = false;
    }
}

module.exports = Player;