import React from 'react';
import './cell.css';

class Cell extends React.Component {
    constructor(props) {
        super(props);

        this.onDragOver = this.onDragOver.bind(this);
    }

    onDragOver(event) {
        if(event.preventDefault) {
            event.preventDefault();
        }

        return false;
    }

    render() {
        let {cellValue, rowNumber, columnNumber, highlight, focus, fixed, onDrop, onDragEnter, onDragLeave} = this.props;

        let style = {}
        if(highlight) {
            style.backgroundColor = 'green';
        }

        return (
            <div className = "cell" style = {style} onDrop = {event => onDrop(event, rowNumber, columnNumber)} onDragOver = {this.onDragOver} onDragEnter = {event => onDragEnter(event, rowNumber, columnNumber)} onDragLeave = {event => onDragLeave(event, rowNumber, columnNumber)}>
                {cellValue}
            </div>
        );
    }
}

export default Cell;