import React from 'react';
import './row.css';
import Cell from '../Cell/cell';

class Row extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {boardSize, rowNumber, cellValues, highlight, fixed, error, onDrop, onDragEnter, onDragLeave} = this.props;

        let cells = [];
        for(let i=0 ; i<boardSize ; i++) {
            cells.push(<Cell key = {i} rowNumber = {rowNumber} columnNumber = {i} cellValue = {cellValues[i]} highlight = {highlight[i]} fixed = {fixed[i]} error = {error[i]} onDrop = {onDrop} onDragEnter = {onDragEnter} onDragLeave = {onDragLeave}/>);
        }

        return (
            <div className = "row">
                {cells}
            </div>
        );
    }
}

export default Row;