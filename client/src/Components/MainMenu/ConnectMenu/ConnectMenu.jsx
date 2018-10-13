import React from 'react';
import ConnectingText from '../../../Images/ConnectMenu/ConnectingText.png';
import LoadingCircle from '../../../Images/ConnectMenu/LoadingCircle.gif';
import connect from 'socket.io-client';
import '../MenuStyles/ConnectMenu.css';

class ConnectMenu extends React.Component {
    constructor(props) {
        super(props);
        this.standings = ['Connecting', 'StartingGame']
        this.connected = false;
        this.state = {
            status: 'Connecting'
        }
    }

    componentDidMount() {
        setTimeout(this.findMatch.bind(this), 200);
    }

    findMatch() {
        if (!this.connected) {
            this.io = connect('http://localhost:1600');
            this.io.on('match', (otherPlayer) => {
                this.connected = true;
                this.props.changeScreen('NETWORK_GAME');
            });
        }
    }

    render() {
        return (
            <div className="ConnectMenu">
                <div className="statusDiv">
                    <img src={ConnectingText} className="statusText" />
                </div>
                <div className="circleDiv">
                    <img src={LoadingCircle} className="loadingCircle"/>
                </div>
            </div>
        );
    }
};

export default ConnectMenu;