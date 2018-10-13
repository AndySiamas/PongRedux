import RedGoal from '../../../../Images/InGame/RedWall.png';
import BlueGoal from '../../../../Images/InGame/BlueWall.png';

const Goal = (name, color) => {
    return new Promise((resolve) => {
        var sprite = new Image();
        var entity = {name: name, sprite: sprite};
        sprite.onload = () => {
            resolve(entity);
        };
        if (color === 'RED') {
            sprite.src = RedGoal;
        } else {
            sprite.src = BlueGoal;
        }
    });
};

export default Goal;