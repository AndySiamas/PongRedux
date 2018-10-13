import $ from 'jquery';

class Input {
    constructor() {
        // Key Codes
        // Arrow key codes
        this.upKey = 38;
        this.downKey = 40;
        // WASD key codes
        this.wKey = 87;
        this.sKey = 83;

        // Events
        this.events = {
            'upKeyPressed': [],
            'upKeyReleased': [],
            'downKeyPressed': [],
            'downKeyReleased': []
        };

        this.createKeyBindings();
    }

    on(eventName, task) {
        let event = this.events[eventName];
        if (event) {
            event.push(task);
        }
    }

    triggerEvents(eventName) {
        if (this.events[eventName]) {
            this.events[eventName].forEach((task) => {
                task();
            });
        }
    }

    createKeyBindings() {
        const input = this;
        
        $('html').keydown((event) => {
            let keyPressed = event.keyCode;
        
            if (keyPressed === input.upKey || keyPressed === input.wKey) {
                this.triggerEvents('upKeyPressed');
            }
            else if (keyPressed === input.downKey || keyPressed === input.sKey) {
                this.triggerEvents('downKeyPressed');
            }
        });
    
        $('html').keyup((event) => {
            let keyReleased = event.keyCode;
        
            if (keyReleased === input.upKey || keyReleased === input.wKey) {
                this.triggerEvents('upKeyReleased');
            }
            else if (keyReleased === input.downKey || keyReleased === input.sKey) {
                this.triggerEvents('downKeyReleased');
            }
      });
    }
}

const _Input = new Input();
export default _Input;