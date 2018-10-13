import RedPaddle from '../../../../Images/InGame/RedPaddle.png';
import BluePaddle from '../../../../Images/InGame/BluePaddle.png';

const Paddle = (name, color) => {
    return new Promise((resolve) => {
        var sprite = new Image();
        var entity = {name: name, sprite: sprite};
        sprite.onload = () => {
            resolve(entity);
        };
        if (color === 'RED') {
            sprite.src = RedPaddle;
        } else {
            sprite.src = BluePaddle;
        }
    });
};

export default Paddle;