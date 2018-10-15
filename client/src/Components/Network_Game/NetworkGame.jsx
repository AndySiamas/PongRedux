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
            readyToPlay: false,  // COMMENT TO FALSE WHEN TESTING ON SERVER!
            gameInAction: false,
            bluePoints: 0,
            redPoints: 0,
            entities: {}
        }
    }

    componentDidMount() {
        this.loadAssets();        // COMMENT IN IF TESTING ON SERVER!
        //this.clientLoadAssets();    // COMMENT OUT IF TESTING ON SERVER!
        this.createEventListeners();
        this.startRound();
    }

    loadAssets() {
        this.setState({entities: ServerManager.entities}, () => {
            this.setState({readyToPlay: true});
            
            // Assign paddle to player controller
            let paddle = this.state.entities[`${this.playerColor}Paddle`];
            this.controller = new Controller(paddle, this);

            // Give the ball a reference to the game state
            let bluePaddle = this.state.entities[`bluePaddle`];
            let redPaddle = this.state.entities[`redPaddle`];
            let ball = this.state.entities['ball'];
            ball.getGameState(bluePaddle, redPaddle, this, (color) => {
                ball.resetPosition();
                this.playerScores(color);
            });
        });
    }

    // async clientLoadAssets() {
    //     // CONNECT TO SERVER AND LOAD ASSETS
    //     let loadedSprites = await AssetLoader.loadSprites();
    //     let createdEntities = await AssetLoader.createEntities(loadedSprites);
    //     this.setState({entities: createdEntities});

    //     // Assign paddle to player controller
    //     let paddle = this.state.entities[`${this.playerColor}Paddle`];
    //     this.controller = new Controller(paddle, this);

    //     // Give the ball a reference to the paddles and game
    //     let bluePaddle = this.state.entities[`bluePaddle`];
    //     let redPaddle = this.state.entities[`redPaddle`];
    //     let ball = this.state.entities['ball'];
    //     ball.getGameState(bluePaddle, redPaddle, this, (color) => {
    //         ball.resetPosition();
    //         this.playerScores();
    //     });
    // }

    startRound() {
        Time.in(3000, 'startRound', () => {
            this.setState({gameInAction: true});
        });
    }

    playerScores(color) {
        // WERE GETTING COLOR BOYS
        console.log(color);
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