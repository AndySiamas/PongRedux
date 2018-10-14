class Ball {
    constructor(name, sprite, map) {
        this.name = name;
        this.sprite = sprite;
        this.map = map;
        this.width = 25;
        this.height = 25;
        this.resetPosition();
    }

    resetPosition() {
        this.x = 500;
        this.y = 300;
    }
};

export default Ball;