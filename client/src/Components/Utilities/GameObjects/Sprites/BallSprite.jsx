import BallImage from '../../../../Images/InGame/Ball.png';

const BallSprite = (name) => {
    return new Promise((resolve) => {
        var sprite = new Image();
        var entity = {name: name, sprite: sprite};
        sprite.onload = () => {
            resolve(entity);
        };
        sprite.src = BallImage;
    });
};

export default BallSprite;