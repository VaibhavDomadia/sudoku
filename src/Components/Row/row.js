import React from 'react';
import './row.css';
import Cell from '../Cell/cell';

class Row extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {boardSize, cellValues} = this.props;

        let cells = [];
        for(let i=0 ; i<boardSize ; i++) {
            cells.push(<Cell key = {i} cellValue = {cellValues[i]}/>);
        }

        return (
            <div className = "row">
                {cells}
            </div>
        );
    }
}

export default Row;