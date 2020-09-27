import React from 'react';
import './gamearena.css';
import Board from '../Board/board';

const BOARD_SIZE = 9;

class GameArena extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let board = new Array(BOARD_SIZE);
        for(let i=0 ; i<9 ; i++) {
            board[i] = new Array(BOARD_SIZE).fill(0);
        }
        return (
            <div className = "gameArena">
                <Board boardSize = {BOARD_SIZE} board = {board}/>
            </div>
        );
    }
}

export default GameArena;