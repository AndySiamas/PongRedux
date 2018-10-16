class ServerBall {
    constructor() {
        this.width = 25;
        this.height = 25;
        this.x = 0;
        this.y = 0;
        this.direction = {x: 1, y: 0};
        this.speed = 5;
        this.redGoalX = 40;
        this.blueGoalX = 940;
        this.redPaddleX = 117;
        this.bluePaddleX = 855;
        this.paddleBuffer = 8;
        this.topMax = 48;
        this.bottomMax = 524;
        this.bluePaddle = null;
        this.redPaddle = null;
        this.goalCallback;
        this.idle = true;
        this.acceleration = 0;
        this.getVelocity();
        this.resetPosition();
        this.serverMove;
        this.lastScored;
    }

    init(redPaddle, bluePaddle, cb) {
        this.redPaddle = redPaddle;
        this.bluePaddle = bluePaddle;
        this.getVelocity();
        this.serverMove = this.move.bind(this);
        this.goalCallback = cb;
    }

    resetPosition() {
        this.x = 500;
        this.y = 300;
        this.direction.y = 0;
        this.acceleration = 1;
        this.getVelocity();
    }

    getVelocity() {
        let velocity = {};
        let dir = (this.lastScored === 'blue') ? 1 : -1;
        velocity.x = this.speed * this.direction.x * dir;
        velocity.y = this.speed * this.direction.y;
        this.velocity = velocity;
    }

    getAcceleration() {
        if (this.velocity.x > 0) {
            return Math.abs(this.acceleration);
        } else {
            return Math.abs(this.acceleration) * -1;
        }
    }

    move() {
        // increase balls speed over time
        if (this.acceleration < 10) this.acceleration += 0.005;
        this.x += this.velocity.x + this.getAcceleration();
        this.y += this.velocity.y;
        this.checkWallCollisions();
        if (!this.isInSafeZone()) {
            this.checkGoalCollisions();
            this.checkPaddleCollisions();
        }
    }

    // OPTOMIZATION TO PREVENT UNECESSARY COLLISION CHECKS
    isInSafeZone(buffer = 25) {
        let safeFromRed = this.x > (this.redPaddleX + buffer);
        let safeFromBlue = this.x < (this.bluePaddleX - buffer);
        return safeFromRed && safeFromBlue;
    }

    checkWallCollisions() {
        // IF HIT THE TOP WALL
        if (this.y <= this.topMax) {
            this.velocity.y *= -1;
        }

        // IF HIT THE BOTTOM WALL
        if (this.y >= this.bottomMax) {
            this.velocity.y *= -1;
        }
    }

    checkPaddleCollisions() {
        // IF ON THE SAME X AXIS AS THE RED PADDLE
        if (this.x <= this.redPaddleX + this.paddleBuffer && this.x >= this.redPaddleX - this.paddleBuffer) {
            if (this.y >= this.redPaddle.position-20 && this.y <= this.redPaddle.position + this.redPaddle.height) {
                let randomSpin = Math.random();
                this.velocity.x *= -1;
                this.velocity.y += this.redPaddle.direction + randomSpin;
            }
        }

        // IF ON THE SAME X AXIS AS THE BLUE PADDLE
        if (this.x <= this.bluePaddleX + this.paddleBuffer && this.x >= this.bluePaddleX - this.paddleBuffer) {
            if (this.y >= this.bluePaddle.position-20 && this.y <= this.bluePaddle.position + this.bluePaddle.height) {
                let randomSpin = Math.random();
                this.velocity.x *= -1;
                this.velocity.y += this.bluePaddle.direction + randomSpin;
            }
        }
    }

    checkGoalCollisions() {
        // IF HIT THE RED GOAL
        if (this.x <= this.redGoalX) {
            this.velocity.x *= -1;
            this.lastScored = 'blue';
            this.goalCallback(this.bluePaddle);
        }

        // IF HIT THE BLUE GOAL
        if (this.x >= this.blueGoalX) {
            this.velocity.x *= -1;
            this.lastScored = 'red';
            this.goalCallback(this.redPaddle);
        }
    }
};

module.exports = ServerBall;