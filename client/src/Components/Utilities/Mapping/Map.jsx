import React from 'react';
import './Map.css';

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
        this.resizeMap();
        window.addEventListener("resize", this.resizeMap.bind(this));
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

    resizeMap() {
        this.setState({width: window.innerWidth});
        this.setState({height: window.innerWidth * this.widthToHeight});
    }

    render() {
        return (
            <div className="mapContainer">
                <div className="map">
                    <canvas id="mapCanvas" 
                            width={this.state.width}
                            height={this.state.height}
                            ref="canvas"/>
                </div>
                {this.update(this.props)}
            </div>
        );
    }
};

export default Map;