// DEPENDENCIES
import React from 'react';
import ServerManager from '../ServerManager.jsx';
import Map from '../Utilities/Mapping/Map.jsx';
import AssetLoader from './AssetLoader.jsx';
import Controller from './Controller.jsx';

// GAME OBJECTS
import Paddle from '../Utilities/GameObjects/Paddle.jsx';
import Ball from '../Utilities/GameObjects/Ball.jsx';
import Wall from '../Utilities/GameObjects/Wall.jsx';
import Goal from '../Utilities/GameObjects/Goal.jsx';
import Score from '../Utilities/UI/Score.jsx';

// SPRITES
import PaddleSprite from '../Utilities/GameObjects/Sprites/PaddleSprite.jsx';
import BallSprite from '../Utilities/GameObjects/Sprites/BallSprite.jsx';
import GoalSprite from '../Utilities/GameObjects/Sprites/GoalSprite.jsx';
import WallSprite from '../Utilities/GameObjects/Sprites/WallSprite.jsx';

// UTILITIES
import Time from '../Utilities/Time/Time.jsx';
import Input from '../Utilities/Input/Input.jsx';

// CSS
import './NetworkGame.css';

class NetworkGameManager extends React.Component {
    constructor(props) {
        super(props);
        this.controller = null;
        this.playerColor = 'blue';
        this.timeSpeed = 1;
        this.state = {
            readyToPlay: true,  // COMMENT TO FALSE WHEN TESTING ON SERVER!
            gameInAction: false,
            bluePoints: 0,
            redPoints: 0,
            entities: {}
        }
    }

    componentDidMount() {
        //this.loadAssets();        // COMMENT IN IF TESTING ON SERVER!
        this.clientLoadAssets();    // COMMENT OUT IF TESTING ON SERVER!
        this.createEventListeners();
        this.startRound();
    }

    loadAssets() {
        this.setState({entities: ServerManager.entities}, () => {
            this.setState({readyToPlay: true});
            let paddle = this.state.entities[`${this.playerColor}Paddle`];
            this.controller = new Controller(paddle, this);
        });
    }

    async clientLoadAssets() {
        // CONNECT TO SERVER AND LOAD ASSETS
        let loadedSprites = await AssetLoader.loadSprites();
        let createdEntities = await AssetLoader.createEntities(loadedSprites);
        this.setState({entities: createdEntities});

        // Assign paddle to player controller
        let paddle = this.state.entities[`${this.playerColor}Paddle`];
        this.controller = new Controller(paddle, this);

        // Give the ball a reference to the game state
        let bluePaddle = this.state.entities[`bluePaddle`];
        let redPaddle = this.state.entities[`redPaddle`];
        let ball = this.state.entities['ball'];
        ball.getGameState(bluePaddle, redPaddle,this);
        ball.onGoal((color) => {
            ball.resetPosition();
            this.addScore(color);
        });
    }

    startRound() {
        Time.in(3000, 'startRound', () => {
            this.setState({gameInAction: true});
        });
    }

    addScore(color) {
        if (color === 'red') {
            if (this.state.redPoints >= 4) {
                this.triggerWin('red');
            } else {
                this.triggerScore('red');
            }
        }
        
        else if (color === 'blue') {
            if (this.state.bluePoints >= 4) {
                this.triggerWin('blue');
            } else {
                this.triggerScore('blue');
            }
        }
    }

    triggerScore(color) {
        let score = this.refs.map.refs.score;
        if (color === 'red') {
            score.setState({bluePoints: this.state.bluePoints+1});
            score.setState({salt: String(Date.now())});
            this.setState({bluePoints: this.state.bluePoints+1});
            this.triggerOSD('blueScored');
        } else {
            score.setState({redPoints: this.state.redPoints+1});
            score.setState({salt: String(Date.now())});
            this.setState({redPoints: this.state.redPoints+1});
            this.triggerOSD('redScored');
        }
        this.setState({gameInAction: false});
        this.startRound();
    }

    triggerWin(color) {
        let score = this.refs.map.refs.score;
        if (color === 'red') {
            score.setState({bluePoints: this.state.bluePoints+1});
            this.setState({bluePoints: this.state.bluePoints+1});
            this.triggerOSD('blueWins');
        } else {
            score.setState({bluePoints: this.state.bluePoints+1});
            this.setState({bluePoints: this.state.bluePoints+1});
            this.triggerOSD('redWins');
        }
        this.setState({gameInAction: false});
    }

    endGame() {

    }

    triggerOSD(newAnimation) {
        let osd = this.refs.map.refs.osd;
        osd.setState({salt: String(Date.now())});
        osd.setState({currentAnimation: newAnimation});
    }

    // ---------------------------------------------------
    // EVENT LISTENERS -----------------------------------
    // ---------------------------------------------------
    createEventListeners() {
        // When client receives which paddle they are
        ServerManager.on('startInformation', 'changeClientColor', ([color]) => {
            this.playerColor = color;
        });
    }

    render() {
        return (
            <div className="NetworkGame">
                <Map ref="map" 
                     entities={this.state.entities} 
                     game={this} 
                     score={{blue: this.state.blueScore, red: this.state.redScore}}/>
            </div>
        );
    }
};

export default NetworkGameManager;