import React from 'react';
import Score from '../UI/Score.jsx';
import OSD from '../UI/OSDManager.jsx';
import Time from '../Time/Time.jsx';
import './Map.css';
import '../../../InGameFonts/Orbitron/orbitron.css';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.widthToHeight = 3/4;
        this.state = {
            width: window.innerWidth,
            height: window.innerWidth * this.widthToHeight
        }
    }

    componentDidMount() {
        //setTimeout(this.update.bind(this), 100);
        Time.onEveryFrame('updateCanvas', this.update.bind(this));
    }

    update() {
        let entities = this.props.entities;
        let canvas = this.refs.canvas;
        if (entities && canvas) {
            var stage = canvas.getContext('2d');
            stage.clearRect(0, 0, canvas.width, canvas.height);
            for (var name in entities) {
                let {sprite, x, y, width, height} = entities[name];
                stage.drawImage(sprite, x, y, width, height);
            }
        }
    }

    render() {
        return (
            <div className="mapContainer">
                <Score score={this.props.score}
                       ref="score"/>
                <OSD color={this.props.game.playerColor} 
                     ref="osd"/>
                <canvas id="mapCanvas" 
                        width={1000}
                        height={600}
                        ref="canvas" />
            </div>
        );
    }
};

export default Map;