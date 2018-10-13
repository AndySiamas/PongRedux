import React from 'react';
import Title from '../../../Images/StartMenu/PONG_REDUX_TITLE.png';
import MenuButton from '../Utilities/MenuButton.jsx';
import PlayButtonSelected from '../../../Images/StartMenu/PLAY_SELECTED.png';
import '../MenuStyles/StartMenu.css';

class OptionsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.standings = ['Connecting', 'StartingGame']
        this.state = {
            status: 'Connecting'
        }
    }

    render() {
        return (
            <div className="OptionsMenu">
            OPTIONS MENU
            </div>
        );
    }
};

export default OptionsMenu;