import React from 'react';
import ServerManager from '../../ServerManager.jsx';
import AssetLoader from '../../Network_Game/AssetLoader.jsx';
import ConnectingText from '../../../Images/ConnectMenu/ConnectingText.png';
import LoadingCircle from '../../../Images/ConnectMenu/LoadingCircle.gif';
import '../MenuStyles/ConnectMenu.css';
import { Server } from 'https';

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

    async findMatch() {
        // IF CLIENT IS DISCONNECTED
        ServerManager.on('disconnect', 'changeMenuOnDisconnect', () => {
            this.props.changeMenu('START_MENU');
        });

        // CONNECT TO SERVER AND LOAD ASSETS
        let connectedToServer = await ServerManager.connectToServer();
        let loadedSprites = await AssetLoader.loadSprites();
        let createdEntities = await AssetLoader.createEntities(loadedSprites);
        ServerManager.loadEntities(createdEntities);

        // PLAYER IS NOW READY
        ServerManager.notifyPlayerIsReady();

        // WHEN ALL PLAYERS ARE READY, START THE GAME
        ServerManager.on('bothPlayersReady', 'startClientGame', () => {
            this.props.changeScreen('NETWORK_GAME');
        });
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