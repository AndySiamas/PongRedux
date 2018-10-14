class Paddle {
    constructor(name, sprite, map) {
        this.name = name;
        this.sprite = sprite;
        this.map = map;
        this.width = 25;
        this.height = 90;
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
};

export default Paddle;