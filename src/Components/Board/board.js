import React from 'react';
import './board.css';
import Row from '../Row/row';

class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {boardSize, board, highlight, focus, fixed, onDrop, onDragEnter, onDragLeave} = this.props;

        let rows = [];
        for(let i=0 ; i<boardSize ; i++) {
            rows.push(<Row key = {i} rowNumber = {i} boardSize = {boardSize} cellValues = {board[i]} highlight = {highlight[i]} focus = {focus[i]} fixed = {fixed[i]} onDrop = {onDrop} onDragEnter = {onDragEnter} onDragLeave = {onDragLeave}/>);
        }

        return (
            <div className = "board">
                {rows}
            </div>
        );
    }
}

export default Board;