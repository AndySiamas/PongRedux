class Wall {
    constructor(name, sprite) {
        this.name = name;
        this.sprite = sprite;
        this.width = 1000;
        this.height = 50;
        this.getPosition();
    }

    getPosition() {
        if (this.name === 'topWall') {
            this.x = 0;
            this.y = 0;
        } else {
            this.x = 0;
            this.y = 550;
        }
    }
};

export default Wall;