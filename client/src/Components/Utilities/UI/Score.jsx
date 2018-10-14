import React from 'react';
import RedIcon from '../../../Images/InGame/RedIcon.png';
import BlueIcon from '../../../Images/InGame/BlueIcon.png';
import CountDown from '../../../Images/InGame/321Go.gif';
import './Score.css';

class Score extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redPoints: 0,
            bluePoints: 0,
            countDown: false
        }
    }

    componentDidMount() {
        setTimeout(this.restartCountdown.bind(this), 6000);
    }

    restartCountdown() {
        let newValue = !this.state.countDown;
        this.setState({countDown: newValue});
    }

    getCountdown() {
        return <img src={`${CountDown}?x=${Date.now()}`} id="countDown" ref="countDown"/>;
    }

    render() {
        return (
            <div className="scoreBox">
                <div className="scoreContainer">
                    <div className="redScoreBox">
                        <div className="redDiv">
                            <img src={RedIcon} id="redIcon"/>
                            {this.state.redPoints}
                        </div>
                    </div>
                    <div className="TimeBox">
                        {this.getCountdown()}
                    </div>
                    <div className="blueScoreBox">
                        <div className="blueDiv">
                            {this.state.bluePoints}
                            <img src={BlueIcon} id="blueIcon"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Score;