import React from 'react';
import BlueScored from '../../../Images/InGame/UI/BlueScored.gif';
import RedScored from '../../../Images/InGame/UI/RedScored.gif';
import BlueWins from '../../../Images/InGame/UI/BlueWins.gif';
import RedWins from '../../../Images/InGame/UI/RedWins.gif';
import YouAreBlue from '../../../Images/InGame/UI/YouAreBlue.gif';
import YouAreRed from '../../../Images/InGame/UI/YouAreRed.gif';
import './OSD.css';

class OSDManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            salt: String(Date.now()),
            currentAnimation: undefined
        }
    }

    getColor(gameState) {
        console.log(gameState.playerColor);
        if (gameState && gameState.playerColor) {
            return `YouAre${gameState.playerColor}`;
        }
    }

    playAnimation(name) {
        if (this.props.gameState) {
            var animation;
            if (!name) return;
            switch (name) {
                case 'blueScored': animation = BlueScored; break;
                case 'redScored': animation = RedScored; break;
                case 'blueWins': animation = BlueWins; break;
                case 'redWins': animation = RedWins; break;
                case 'YouArered': animation = YouAreRed; break;
                case 'YouAreblue': animation = YouAreBlue; break;
            }
            var result = <img src={`${animation}?x=${this.state.salt}`} id="osdAnimation" ref="osdAnimation"/>;
            return result;
        }
    }

    render() {
        return (
            <div className="OSDContainer">
                <div className="OSDDiv">
                    {this.playAnimation(this.state.currentAnimation)}
                </div>
            </div>
        );
    }
};

export default OSDManager;