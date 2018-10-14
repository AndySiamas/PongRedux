class Goal {
    constructor(name, sprite) {
        this.name = name;
        this.sprite = sprite;
        this.width = 100;
        this.height = 600;
        this.resetPosition();
    }

    resetPosition() {
        if (this.name === 'redGoal') {
            this.x = -10;
            this.y = 0;
        } else {
            this.x = 910;
            this.y = 0;
        }
    }
};

export default Goal;