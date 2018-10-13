import React from 'react';
import $ from 'jquery';
import './Square.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filled: false
        }
        setTimeout(()=>{this.getPosition()}, 0);
    }

    componentDidUpdate() {
        this.getColor(this.state);
    }

    getPosition() {
        let position = $(this.refs.square).position();
        this.x = position.left;
        this.y = position.top;
    }

    getColor({filled}) {
        if (filled) {
            $(this.refs.square).css('background-color', 'blue');
        } else {
            $(this.refs.square).css('background-color', 'red');
        }
    }

    fill(bool = true) {
        this.setState({filled: bool});
    }

    render() {
        return (
            <div className="Square" ref="square"/>
        );
    }
};

export default Square;