import Input from '../Utilities/Input/Input.jsx';
import Time from '../Utilities/Time/Time.jsx';

class Controller {
    constructor(paddle, game) {
        this.input = new Input();
        this.paddle = paddle;
        this.speed = 7;
        this.dir = 0;
        this.game = game || null;
        this.createEventListeners();
    }

    createEventListeners() {
        Time.onEveryFrame('movePaddle', this.movePaddle.bind(this));
        Time.onEveryFrame('checkForInput', this.checkForInput.bind(this));
    }

    checkForInput() {
        //if (!this.game || !this.game.state.gameInAction) return;

        if (this.input.upKeyPressed) {
            this.paddle.dir = -1;
        }
        else if (this.input.downKeyPressed) {
            this.paddle.dir = 1;
        }
        else {
            this.paddle.dir = 0;
        }
    }

    movePaddle() {
        let velocity = this.paddle.dir * this.speed * this.game.timeSpeed;
        this.paddle.move(velocity);
    }
}

export default Controller;