// DEPENDENCIES
import React from 'react';
import ServerManager from '../ServerManager.jsx';
import UpdateManager from './UpdateManager.jsx';
import MoveTracker from './MoveTracker.jsx';
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
        this.opponentPaddle = null;
        this.ball = null;
        this.timeSpeed = 1;
        this.moveTracker = new MoveTracker(20);
        this.state = {
            readyToPlay: false,  // COMMENT TO FALSE WHEN TESTING ON SERVER!
            gameInAction: false,
            bluePoints: 0,
            redPoints: 0,
            playerColor: null,
            entities: {}
        }
    }

    componentDidMount() {
        this.loadAssets();        // COMMENT IN IF TESTING ON SERVER!
        //this.clientLoadAssets();    // COMMENT OUT IF TESTING ON SERVER!
        this.createEventListeners();
        this.startRound();
        this.startClientTick();
    }

    loadAssets() {
        this.setState({entities: ServerManager.entities}, () => {
            this.setState({readyToPlay: true});

            // Give the ball a reference to the game state
            let bluePaddle = this.state.entities[`bluePaddle`];
            let redPaddle = this.state.entities[`redPaddle`];
            this.ball = this.state.entities['ball'];

            // When the ball collides with a goal
            this.ball.getGameState(bluePaddle, redPaddle, this, (color) => {
                this.ball.resetPosition();
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
            ServerManager.notifyPlayerStartedRound();
            this.setState({gameInAction: true});
        });
    }

    playerScores(color) {
        let gameState = Object.assign({}, this.state);
        let team = `${color}Points`;
        gameState[team]++;
        gameState.gameInAction = false;
        this.setState(gameState);
        // If a team has 5 points
        if (gameState[team] >= 5) {
            this.triggerWin(color);
        // If a team has LESS THAN 5 points
        } else {
            this.triggerScore(color);
        }
    }

    triggerScore(color) {
        let {score} = this.refs.map.refs;           // Ref to score component
        score.setState({salt: String(Date.now())}); // Restart scoreboard anim
        this.triggerOSD(`${color}Scored`);
        this.startRound();
    }

    triggerWin(color) {
        this.triggerOSD(`${color}Wins`);
        this.setState({gameInAction: false});
        Time.in(2000, 'endGame', () => {
            this.endGame();
        });
    }

    triggerOSD(newAnimation) {
        let osd = this.refs.map.refs.osd;
        osd.setState({salt: String(Date.now())});
        osd.setState({currentAnimation: newAnimation});
    }

    endGame() {
        Time.reset();
        ServerManager.notifyGameOver();
        ServerManager.removeTask('startInformation', 'changeClientColor');
        ServerManager.removeTask('serverUpdate', 'updateClientState');
        ServerManager.removeTask('playerScore', 'updatePlayerScore');
        ServerManager.removeTask('playerWin', 'playerWon');
    }

    startClientTick() {
        Time.onEveryFrame('sendGameState', (tick) => {
            if (this.controller) {
                let position = this.controller.paddle.y;
                let direction = this.controller.paddle.dir;
                this.moveTracker.storeMove(tick, position, direction);
                ServerManager.sendPlayerState(position, direction, tick);
            }
        });
    }

    serverUpdate([playerOne, playerTwo, serverBall]) {
        let client;
        let opponent;
        let clientBall;

        // Determine which player is client and which is opponent
        if (playerOne.color === this.state.playerColor) {
            client = playerOne;
            opponent = playerTwo;
        } else {
            client = playerTwo;
            opponent = playerOne;
        }

        //this.updateClient(client);
        this.updateOpponent(opponent);
        this.updateBall(serverBall);
    }

    updateClient({position, direction, tick}) {
        let prevMove = this.moveTracker.getMove(tick);
        if (prevMove.position !== position) {
            let diff = prevMove.position - position;
        }
    }

    updateOpponent({position}) {
        this.opponentPaddle.y = position;
    }

    updateBall({x, y}) {
        this.ball.x = x;
        this.ball.y = y;
    }

    // ---------------------------------------------------
    // EVENT LISTENERS -----------------------------------
    // ---------------------------------------------------
    createEventListeners() {
        // When client receives which paddle they are
        ServerManager.on('startInformation', 'changeClientColor', ([color]) => {
            // Assign paddle to player controller
            let redPaddle = this.state.entities[`redPaddle`];
            let bluePaddle = this.state.entities[`bluePaddle`];

            if (color === 'red') {
                this.controller = new Controller(redPaddle, this);
                this.opponentPaddle = bluePaddle;
            } else {
                this.controller = new Controller(bluePaddle, this);
                this.opponentPaddle = redPaddle;
            }

            this.setState({playerColor: color});
            
            // TELL PLAYER WHAT COLOR THEY ARE
            let {osd} = this.refs.map.refs;
            let animation = `YouAre${color}`;
            osd.setState({currentAnimation: animation});
        });

        // When server sends us updated game state
        ServerManager.on('serverUpdate', 'updateClientState', this.serverUpdate.bind(this));

        // When server tells us a player scored
        ServerManager.on('playerScore', 'updatePlayerScore', this.playerScores.bind(this));
    }

    render() {
        return (
            <div className="NetworkGame">
                <Map ref="map" 
                     entities={this.state.entities} 
                     game={this} 
                     score={{bluePoints: this.state.bluePoints, redPoints: this.state.redPoints}}/>
            </div>
        );
    }
};

export default NetworkGameManager;