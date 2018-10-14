import React from 'react';
import Score from '../UI/Score.jsx';
import Time from '../Time/Time.jsx';
import './Map.css';
import '../../../InGameFonts/Orbitron/orbitron.css';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.widthToHeight = 3/4;
        this.state = {
            width: window.innerWidth,
            height: window.innerWidth * this.widthToHeight,
            loadedEntities: false
        }
    }

    componentDidMount() {
        //this.createEventListeners();
    }

    loadEntities() {
        this.setState({loadedEntities: true});
    }

    update({entities}) {
        if (entities && this.refs.canvas) {
            var stage = this.refs.canvas.getContext('2d');
            for (var name in entities) {
                let {sprite, x, y, width, height} = entities[name];
                stage.drawImage(sprite, x, y, width, height);
            }
        }
    }

    render() {
        return (
            <div className="mapContainer">
                <Score />
                <canvas id="mapCanvas" 
                        width={1000}
                        height={600}
                        ref="canvas" />
                {this.update(this.props)}
            </div>
        );
    }
};

export default Map;