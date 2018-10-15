class Paddle {
    constructor(name, sprite) {
        this.name = name;
        this.sprite = sprite;
        this.width = 25;
        this.height = 90;
        this.x = 0;
        this.y = 0;
        this.dir = 0;
        this.topMax = 48;
        this.bottomMax = 460;
        this.resetPosition();
    }

    resetPosition() {
        if (this.name === 'redPaddle') {
            this.x = 100;
            this.y = 250;
        } else {
            this.x = 870;
            this.y = 250;
        }
    }

    move(yDir) {
        this.y += yDir;
        if (this.y <= this.topMax) this.y = this.topMax;
        if (this.y >= this.bottomMax) this.y = this.bottomMax;
    }
};

export default Paddle;