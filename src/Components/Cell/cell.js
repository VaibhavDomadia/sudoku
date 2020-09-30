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
        let {cellValue, rowNumber, columnNumber, highlight, fixed, error, onDrop, onDragEnter, onDragLeave} = this.props;

        let className = ['cell'];

        let blockNumber = Math.floor(rowNumber/3)*3 + Math.floor(columnNumber/3) + 1;

        if(blockNumber%2 === 0) {
            className.push('cellLight');
        }
        else {
            className.push('cellDark')
        }
        
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
            <div>
                {
                    fixed ? <div className = {className.join(' ')}>
                        {cellValue === 0 ? "" : cellValue}
                    </div> :
                    <div className = {className.join(' ')} onDrop = {event => onDrop(event, rowNumber, columnNumber)} onDragOver = {this.onDragOver} onDragEnter = {event => onDragEnter(event, rowNumber, columnNumber)} onDragLeave = {event => onDragLeave(event, rowNumber, columnNumber)}>
                        {cellValue === 0 ? "" : cellValue}
                    </div>
                }
            </div>
        );
    }
}

export default Cell;