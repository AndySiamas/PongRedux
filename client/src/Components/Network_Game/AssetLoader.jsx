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

class _AssetLoader {
    constructor() {
        this.loaded = false;
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
                resolve(images);
            });
        });
    }
    
    createEntities(sprites) {
        return new Promise((resolve) => {
            let entities = {};
            sprites.forEach((sprite) => {
                var newEntity;
                switch (sprite.name) {
                    case 'redPaddle': newEntity = new Paddle('redPaddle', sprite.sprite); break;
                    case 'bluePaddle': newEntity = new Paddle('bluePaddle', sprite.sprite); break;
                    case 'ball': newEntity = new Ball('ball', sprite.sprite); break;
                    case 'redGoal': newEntity = new Goal('redGoal', sprite.sprite); break;
                    case 'blueGoal': newEntity = new Goal('blueGoal', sprite.sprite); break;
                    case 'topWall': newEntity = new Wall('topWall', sprite.sprite); break;
                    case 'bottomWall': newEntity = new Wall('bottomWall', sprite.sprite); break;
                }
                entities[sprite.name] = newEntity;
            });
            resolve(entities);
        });
    }
}

const AssetLoader = new _AssetLoader();
export default AssetLoader;