import React from 'react';
import TopWall from '../../../../Images/InGame/TopWall.png';
import BottomWall from '../../../../Images/InGame/BottomWall.png';

const Wall = (name, position) => {
    return new Promise((resolve) => {
        var sprite = new Image();
        var entity = {name: name, sprite: sprite};
        sprite.onload = () => {
            resolve(entity);
        };
        if (position === 'TOP') {
            sprite.src = TopWall;
        } else {
            sprite.src = BottomWall;
        }
    });
};

export default Wall;