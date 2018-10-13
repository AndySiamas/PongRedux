class Client {
    constructor(socket) {
        this.id = socket.id;
        this.stream = socket;
    }
}

module.exports = Client;