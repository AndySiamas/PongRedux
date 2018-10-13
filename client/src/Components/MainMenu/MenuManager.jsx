import React from 'react';
import Input from '../Utilities/Input/Input.jsx';
import Time from '../Utilities/Time/Time.jsx';
import StartMenu from './StartMenu/StartMenu.jsx';
import ConnectMenu from './ConnectMenu/ConnectMenu.jsx';
import OptionsMenu from './OptionsMenu/OptionsMenu.jsx';
import './MenuStyles/MainMenu.css';

class MenuManager extends React.Component {
    constructor(props) {
        super(props);
        this.START_MENU = 'START_MENU';
        this.OPTIONS_MENU = 'OPTIONS_MENU';
        this.CONNECT_MENU = 'CONNECT_MENU';
        this.state = {
            currentMenu: this.START_MENU
        }
    }

    changeMenu(menu) {
        this.setState({currentMenu: menu});
    }

    displayMenu() {
        switch (this.state.currentMenu) {
            case this.START_MENU: return <StartMenu changeMenu={this.changeMenu.bind(this)}/>;
            case this.OPTIONS_MENU: return <OptionsMenu changeMenu={this.changeMenu.bind(this)}/>;
            case this.CONNECT_MENU: return <ConnectMenu changeMenu={this.changeMenu.bind(this)}
                                                        changeScreen={this.props.changeScreen}/>;
        }
    }

    render() {
        return (
            <div className="MainMenu">
                {this.displayMenu()}
            </div>
        );
    }
};

export default MenuManager;