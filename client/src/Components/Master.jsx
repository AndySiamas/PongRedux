import React from 'react';
import MainMenu from './MainMenu/MenuManager.jsx';
import LocalGame from './Local_Game/LocalGameManager.jsx';
import NetworkGame from './Network_Game/NetworkGameManager.jsx';
import './Master.css';

class Master extends React.Component {
    constructor(props) {
        super(props);
        this.MAIN_MENU = 'MAIN_MENU';
        this.LOCAL_GAME = 'LOCAL_GAME';
        this.NETWORK_GAME = 'NETWORK_GAME';
        this.state = {
            currentScreen: 'NETWORK_GAME'
        }
    }

    changeScreen(screenTag) {
        this.setState({currentScreen: screenTag});
    }

    displayScreen() {
        switch (this.state.currentScreen) {
            case this.MAIN_MENU: return <MainMenu changeScreen={this.changeScreen.bind(this)}/>; break;
            case this.LOCAL_GAME: return <LocalGame changeScreen={this.changeScreen.bind(this)}/>; break;
            case this.NETWORK_GAME: return <NetworkGame changeScreen={this.changeScreen.bind(this)}/>; break;
        }
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