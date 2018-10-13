class Point {
    constructor(x, y, filled = false) {
        this.x = x;
        this.y = y;
        this.filled = filled;
    }

    fill() {
        this.filled = true;
    }
    
    remove() {
        this.filled = false;
    }
}

export default Point;