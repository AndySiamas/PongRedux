import async from 'async';

class Time {
    constructor() {
        this.eventNames = {};
        this.events = [];
        setInterval(this.runEvents.bind(this), 100);
    }

    runEvents() {
        async.forEach(this.events, ([name, callback]) => {
            callback();
        })
    }

    onEveryFrame(name, callBack) {
        if (!this.eventNames[name]) {
            this.eventNames[name] = true;
            this.events.push([name, callBack]);
        }
    }
}

const _Time = new Time();
export default _Time;