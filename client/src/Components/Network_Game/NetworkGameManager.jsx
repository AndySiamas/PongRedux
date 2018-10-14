// DEPENDENCIES
import React from 'react';
import Map from '../Utilities/Mapping/Map.jsx';

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
        this.state = {
            gameStarted: false,
            gamePaused: true,
            entities: {}
        }
    }

    componentDidMount() {
        this.loadSprites();
        this.createEventListeners();
    }

    createEventListeners() {
    }

    loadSprites() {
        return new Promise((resolve) => {
            // GET ALL SPRITES
            var redPaddle = PaddleSprite('redPaddle', 'RED');
            var bluePaddle = PaddleSprite('bluePaddle', 'BLUE');
            var ball = BallSprite('ball');
            var redGoal = GoalSprite('redGoal', 'RED');
            var blueGoal = GoalSprite('blueGoal','BLUE');
            var topWall = WallSprite('topWall','TOP');
            var bottomWall = WallSprite('bottomWall', 'BOTTOM');
            var sprites = [redPaddle, bluePaddle, ball, redGoal, 
                        blueGoal, topWall, bottomWall];
            
            // ONCE ALL SPRITES ARE LOADED, CREATE THEIR ENTITIES
            Promise.all(sprites).then((images) => {
                this.createEntities(images);
                resolve(true);
            });
        });
    }
    
    createEntities(sprites) {
        let entities = {};
        sprites.forEach((sprite) => {
            var newEntity;
            let map = this.refs.map;
            switch (sprite.name) {
                case 'redPaddle': newEntity = new Paddle('redPaddle', sprite.sprite, map); break;
                case 'bluePaddle': newEntity = new Paddle('bluePaddle', sprite.sprite, map); break;
                case 'ball': newEntity = new Ball('ball', sprite.sprite, map); break;
                case 'redGoal': newEntity = new Goal('redGoal', sprite.sprite); break;
                case 'blueGoal': newEntity = new Goal('blueGoal', sprite.sprite); break;
                case 'topWall': newEntity = new Wall('topWall', sprite.sprite); break;
                case 'bottomWall': newEntity = new Wall('bottomWall', sprite.sprite); break;
            }
            entities[sprite.name] = newEntity;
        });
        this.setState({entities: entities});
    }

    render() {
        return (
            <div className="NetworkGame">
                <Map ref="map" 
                     entities={this.state.entities} />
            </div>
        );
    }
};

export default NetworkGameManager;