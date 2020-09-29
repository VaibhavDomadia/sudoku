import React from 'react';
import './board.css';
import Row from '../Row/row';

class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {boardSize, board, highlight, focus, fixed, error, isSudokuSolved, onDrop, onDragEnter, onDragLeave} = this.props;

        let rows = [];
        for(let i=0 ; i<boardSize ; i++) {
            rows.push(<Row key = {i} rowNumber = {i} boardSize = {boardSize} cellValues = {board[i]} highlight = {highlight[i]} focus = {focus[i]} fixed = {fixed[i]} error = {error[i]} onDrop = {onDrop} onDragEnter = {onDragEnter} onDragLeave = {onDragLeave}/>);
        }

        return (
            <div className = "boardContainer">
                {isSudokuSolved && <h2 className = "solvedBanner">Sudoku Solved!</h2>}
                <div className = "board">
                    {rows}
                </div>
            </div>
        );
    }
}

export default Board;