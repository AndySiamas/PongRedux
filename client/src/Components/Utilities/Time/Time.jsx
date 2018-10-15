import async from 'async';

class Time {
    constructor() {
        // FPS
        this.fps = 15;

        // TIMESTAMPS
        this.ticks = 0;

        // EVERY FRAME EVENTS
        this.eventNames = {};
        this.events = [];

        // TIMER EVENTS
        this.timerOn = false;
        this.timerEvents = {};
        setInterval(this.runEvents.bind(this), this.fps);
    }

    runEvents() {
        // CHECK FOR TIMER EVENTS
        if (this.timerOn) {
            for (let name in this.timerEvents) {
                var timerEvent = this.timerEvents[name];
                // IF IT IS TIME FOR EVENT TO RUN
                if (timerEvent.msLeft <= 0) { 
                    // TRIGGER THE EVENT AND DELETE IT
                    timerEvent.callback();
                    delete this.timerEvents[name];
                    // IF NO MORE TIMER EVENTS, TURN OFF TIMER
                    if (!Object.keys(this.timerEvents).length) this.timerOn = false;
                } else {
                    // OTHERWISE SUBTRACT MS BY THE FPS
                    timerEvent.msLeft -= this.fps;
                }
            }
        }

        // TRIGGER EVENTS
        this.events.forEach(([name, callback]) => {
            callback();
        });
    }

    onEveryFrame(name, callBack) {
        if (!this.eventNames[name]) {
            this.eventNames[name] = true;
            this.events.push([name, callBack]);
        }
    }

    in(ms, eventName, callback) {
        var timerEvent = function(msLeft, eventName, callback) {
            this.msLeft = msLeft;
            this.eventName = eventName;
            this.callback = callback;
        }
        this.timerOn = true;
        this.timerEvents[eventName] = new timerEvent(ms, eventName, callback);
    }
}

const _Time = new Time();
export default _Time;