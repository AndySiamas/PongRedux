import React from 'react';

class MenuButton extends React.Component {
    constructor(props) {
        super(props);
    }

    displaySelected() {
        if (this.props.selectedButton === this.props.tag) {
            return this.props.imageSelected;
        } else {
            return this.props.imageUnselected;
        }
    }

    render() {
        return (
            <React.Fragment>
                <img className={this.props.tag}
                     src={this.displaySelected()}
                     onMouseEnter={() => {this.props.selectButton(this.props.tag)}}
                     onClick={() => {this.props.next()}} />
            </React.Fragment>
        );
    }
};

export default MenuButton;