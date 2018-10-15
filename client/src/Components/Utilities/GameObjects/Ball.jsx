import Time from '../Time/Time.jsx';

class Ball {
    constructor(name, sprite) {
        this.name = name;
        this.sprite = sprite;
        this.width = 25;
        this.height = 25;
        this.x = 0;
        this.y = 0;
        this.direction = {x: 1, y: 0};
        this.speed = 7;
        this.redGoalX = 40;
        this.blueGoalX = 940;
        this.redPaddleX = 117;
        this.bluePaddleX = 855;
        this.paddleBuffer = 2;
        this.topMax = 48;
        this.bottomMax = 524;
        this.gameState = null;
        this.bluePaddle = null;
        this.redPaddle = null;
        this.goalCallback;
        this.getVelocity();
        this.resetPosition();
        this.createEventListeners();
    }

    resetPosition() {
        this.x = 500;
        this.y = 300;
    }

    getVelocity() {
        let velocity = {};
        let time = this.gameState ? this.gameState.timeSpeed : 1;
        velocity.x = this.speed * this.direction.x * time;
        velocity.y = this.speed * this.direction.y * time;
        this.velocity = velocity;
    }

    getGameState(bluePaddle, redPaddle, state, cb) {
        this.gameState = state;
        this.bluePaddle = bluePaddle;
        this.redPaddle = redPaddle;
        this.getVelocity();
        this.goalCallback = cb.bind(state);
    }

    createEventListeners() {
        Time.onEveryFrame('moveBall', () => {
            this.move();
        });
    }

    move() {
        if (!this.gameState || !this.gameState.state.gameInAction) return;
        this.x += this.velocity.x;
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
        console.log(safeFromRed, safeFromBlue);
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
            if (this.y >= this.redPaddle.y-20 && this.y <= this.redPaddle.y + this.redPaddle.height) {
                this.velocity.x *= -1;
                this.velocity.y += this.redPaddle.dir;
            }
        }

        // IF ON THE SAME X AXIS AS THE BLUE PADDLE
        if (this.x <= this.bluePaddleX + this.paddleBuffer && this.x >= this.bluePaddleX - this.paddleBuffer) {
            if (this.y >= this.bluePaddle.y-20 && this.y <= this.bluePaddle.y + this.bluePaddle.height) {
                this.velocity.x *= -1;
                this.velocity.y += this.bluePaddle.dir;
            }
        }
    }

    checkGoalCollisions() {
        // IF HIT THE RED GOAL
        if (this.x <= this.redGoalX) {
            this.velocity.x *= -1;
            this.goalCallback('red');
        }

        // IF HIT THE BLUE GOAL
        if (this.x >= this.blueGoalX) {
            this.velocity.x *= -1;
            this.goalCallback('blue');
        }
    }
};

export default Ball;