import React from 'react';
import Title from '../../../Images/StartMenu/PONG_REDUX_TITLE.png';
import MenuButton from '../Utilities/MenuButton.jsx';
import PlayButtonSelected from '../../../Images/StartMenu/PLAY_SELECTED.png';
import PlayButtonUnselected from '../../../Images/StartMenu/PLAY_UNSELECTED.png';
import OptionsButtonSelected from '../../../Images/StartMenu/OPTIONS_SELECTED.png';
import OptionsButtonUnselected from '../../../Images/StartMenu/OPTIONS_UNSELECTED.png';
import '../MenuStyles/StartMenu.css';

class StartMenu extends React.Component {
    constructor(props) {
        super(props);
        this.buttons = ["PlayButton", "OptionsButton"]
        this.state = {
            selectedButton: "PlayButton"
        }
    }

    selectButton(buttonTag) {
        this.setState({selectedButton: buttonTag});
    }

    render() {
        return (
            <div className="StartMenu">
                <div className="TitleDiv">
                    <div className="TitleBox">
                        <img className="Title" src={Title}></img>
                    </div>
                </div>
                <div className="PlayAndOptionsDiv">
                    <div className="PlayButtonDiv">
                        <MenuButton selectedButton={this.state.selectedButton}
                                    imageSelected={PlayButtonSelected} 
                                    imageUnselected={PlayButtonUnselected}
                                    tag={this.buttons[0]}
                                    ref={this.buttons[0]}
                                    selectButton={this.selectButton.bind(this)}
                                    next={()=> {this.props.changeMenu('CONNECT_MENU')}}/>

                    </div>
                    <div className="OptionsButtonDiv">
                        <MenuButton selectedButton={this.state.selectedButton} 
                                    imageSelected={OptionsButtonSelected} 
                                    imageUnselected={OptionsButtonUnselected}
                                    tag={this.buttons[1]}
                                    ref={this.buttons[1]}
                                    selectButton={this.selectButton.bind(this)}
                                    next={()=> {this.props.changeMenu('OPTIONS_MENU')}}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default StartMenu;