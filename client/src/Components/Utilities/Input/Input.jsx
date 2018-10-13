import Keyboard from 'mousetrap';

class Input {
    constructor() {
        // Events
        this.upKeyPressed = false;
        this.downKeyPressed = false;
        this.createKeyBindings();
    }

    createKeyBindings() {
        // UP KEY BINDINGS
        Keyboard.bind('w', () => {
            this.upKeyPressed = true;
        }, 'keydown');
        Keyboard.bind('up', () => {
            this.upKeyPressed = true;
        }, 'keydown');
        Keyboard.bind('w', () => {
            this.upKeyPressed = false;
        }, 'keyup');
        Keyboard.bind('up', () => {
            this.upKeyPressed = false;
        }, 'keyup');
        
        // DOWN KEY BINDINGS
        Keyboard.bind('s', () => {
            this.downKeyPressed = true;
        }, 'keydown');
        Keyboard.bind('down', () => {
            this.downKeyPressed = true;
        }, 'keydown');
        Keyboard.bind('s', () => {
            this.downKeyPressed = false;
        }, 'keyup');
        Keyboard.bind('down', () => {
            this.downKeyPressed = false;
        }, 'keyup');
    }
}

const _Input = new Input();
export default _Input;