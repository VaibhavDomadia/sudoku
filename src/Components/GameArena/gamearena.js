import React from 'react';
import './gamearena.css';
import Board from '../Board/board';
import CellPickupBar from '../CellPickupBar/cellpickupbar';
import ResetBoard from '../ResetBoard/resetboard';
import GenerateBoard from '../GenerateBoard/generateboard';
import Solution from '../Solution/solution';
import HowToPlay from '../HowToPlay/howtoplay';

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
                <HowToPlay/>
                <div className = "dragAndDropContainer">
                    <CellPickupBar/>
                    <Board boardSize = {BOARD_SIZE} board = {board}/>
                </div>
                <div className = "controls">
                    <ResetBoard/>
                    <GenerateBoard/>
                    <Solution/>
                </div>
            </div>
        );
    }
}

export default GameArena;