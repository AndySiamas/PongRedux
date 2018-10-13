import React from 'react';
import Canvas from '../Canvas/Canvas.jsx';
import Square from './Square.jsx';
import $ from 'jquery';
import './Map.css';

class Map extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.placeObject({ 
                        name: 'jeff', 
                        x: 0,
                        y: 0,
                        width: 15,
                        height: 15
        });

    }

    placeObject({name, x, y, width, height}) {
        let placedObject = Canvas.placeObject(name, x, y, width, height);
        this.fillSquares(placedObject.points);
    }

    getSquare(x, y) {
        return this.refs[`square${x}${y}`];
    }

    fillSquares(point) {
        point.forEach((point) => {
            let square = this.getSquare(point.x, point.y);
            square.fill();
        });
    }

    displayMap() {
        return Canvas.grid.map((row) =>
            <div className="Row">
                {row.map(({x, y, filled}) =>
                    <Square x={x}
                            y={y}
                            filled={filled}
                            ref={`square${x}${y}`} />)}
            </div>);
    }

    render() {
        return (
            <div className="Map">
                { this.displayMap() }
            </div>
        );
    }
};

export default Map;