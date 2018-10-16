class Move {
    constructor(tick, position, direction) {
        this.tick = tick;
        this.position = position;
        this.direction = direction;
    }
}

class MoveTracker {
    constructor(size) {
        this.size = size;
        this.lowestIndex = 0;
        this.currentIndex = 0;
        this.storage = {};
    }

    storeMove(tick, pos, dir) {
        this.storage[tick] = new Move(tick, pos, dir);
        if (Object.keys(this.storage).length > this.size) {
            delete this.storage[this.lowestIndex++];
        }
    }

    getMove(tick) {
        return this.storage[tick];
    }
}

export default MoveTracker;