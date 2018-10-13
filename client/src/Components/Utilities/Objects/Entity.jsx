class Paddle {
    constructor(name, sprite, x, y, w, h, isStatic) {
        this.name = name;
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isStatic = isStatic;
    }
};

export default Paddle;