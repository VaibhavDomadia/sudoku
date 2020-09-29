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
        let {cellValue, rowNumber, columnNumber, highlight, focus, fixed, error, onDrop, onDragEnter, onDragLeave} = this.props;

        let className = ['cell'];
        
        if(highlight) {
            className.push('highlight');
        }
        
        if(fixed) {
            className.push('fixed');
        }

        if(error) {
            className.push('error');
        }

        return (
            <div className = {className.join(' ')} onDrop = {event => onDrop(event, rowNumber, columnNumber)} onDragOver = {this.onDragOver} onDragEnter = {event => onDragEnter(event, rowNumber, columnNumber)} onDragLeave = {event => onDragLeave(event, rowNumber, columnNumber)}>
                {cellValue}
            </div>
        );
    }
}

export default Cell;