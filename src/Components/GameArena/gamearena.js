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

        this.getEmptyBoard = this.getEmptyBoard.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);

        this.state = {
            board: this.getEmptyBoard(0),
            highlight: this.getEmptyBoard(false),
            focus: this.getEmptyBoard(false),
            fixed: this.getEmptyBoard(false)
        }
    }

    getEmptyBoard(fillValue) {
        let board = new Array(BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            board[i] = new Array(BOARD_SIZE).fill(fillValue);
        }

        return board;
    }

    onDrop(event, x, y) {
        event.stopPropagation();

        let valueToPut = event.dataTransfer.getData('text/html');

        let newBoard = new Array(BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            newBoard[i] = this.state.board[i];
        }
        newBoard[x][y] = valueToPut;
        
        this.setState({board: newBoard, highlight: this.getEmptyBoard(false)});
    }

    onDragEnter(event, x, y) {
        let toHighlight = this.getEmptyBoard(false);

        for(let index = 0 ; index < 9 ; index++) {
            toHighlight[x][index] = true;
            toHighlight[index][y] = true;
        }

        let squareBlockStartX = x - (x%3);
        let squareBlockStartY = y - (y%3);
        for(let i=squareBlockStartX ; i<squareBlockStartX+3 ; i++) {
            for(let j=squareBlockStartY ; j<squareBlockStartY+3 ; j++) {
                toHighlight[i][j] = true;
            }
        }

        this.setState({highlight: toHighlight});
    }

    onDragLeave(event, x, y) {
        this.setState({highlight: this.getEmptyBoard(false)});
    }

    render() {
        let {board, highlight, focus, fixed} = this.state;

        return (
            <div className = "gameArena">
                <HowToPlay/>
                <div className = "dragAndDropContainer">
                    <CellPickupBar/>
                    <Board boardSize = {BOARD_SIZE} board = {board} highlight = {highlight} focus = {focus} fixed = {fixed} onDrop = {this.onDrop} onDragEnter = {this.onDragEnter} onDragLeave = {this.onDragLeave}/>
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