class Player {
    constructor(socket, opponentId, room, serverBall) {
        this.id = socket.id;
        this.socket = socket;
        this.opponentId = opponentId;
        this.room = room;
        this.readyToPlay = false;
        this.position = 0;
        this.direction = 0;
        this.sentUpdate = false;
        this.color = null;
        this.tick = 0;
        this.ball = serverBall;
        this.height = 90;
        this.inAction = false;
    }
}

module.exports = Player;