import React from 'react';
import MainMenu from './MainMenu/MenuManager.jsx';
import LocalGame from './Local_Game/LocalGameManager.jsx';
import NetworkGame from './Network_Game/NetworkGame.jsx';
import ServerManager from './ServerManager.jsx';
import './Master.css';

class Master extends React.Component {
    constructor(props) {
        super(props);
        this.MAIN_MENU = 'MAIN_MENU';
        this.LOCAL_GAME = 'LOCAL_GAME';
        this.NETWORK_GAME = 'NETWORK_GAME';
        this.state = {
            currentScreen: 'MAIN_MENU'
        }
    }

    componentDidMount() {
        this.handleDisconnect();
    }

    changeScreen(screenTag) {
        return new Promise((resolve) => {
            this.setState({currentScreen: screenTag}, () => {
                resolve();
            });
        });
    }

    displayScreen() {
        switch (this.state.currentScreen) {
            case this.MAIN_MENU:    return <MainMenu changeScreen={this.changeScreen.bind(this)}
                                                     ref="menu"/>; break;
            case this.LOCAL_GAME:   return <LocalGame changeScreen={this.changeScreen.bind(this)}
                                                     ref="local"/>; break;
            case this.NETWORK_GAME: return <NetworkGame changeScreen={this.changeScreen.bind(this)}
                                                     ref="network"/>; break;
        }
    }

    handleDisconnect() {
        // IF CLIENT IS DISCONNECTED
        ServerManager.on('disconnect', 'masterHandleDisconnect', () => {
            this.changeScreen('MAIN_MENU').then(() => {
                this.refs.menu.setState({currentMenu: 'START_MENU'});
            });
        });
    }

    render() {
        return (
            <div className="mainScreen">
                {this.displayScreen()}
            </div>
        );
    }
};

export default Master;