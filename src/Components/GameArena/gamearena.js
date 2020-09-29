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
        this.findError = this.findError.bind(this);

        this.state = {
            board: this.getEmptyBoard(0),
            highlight: this.getEmptyBoard(false),
            focus: this.getEmptyBoard(false),
            fixed: this.getEmptyBoard(false),
            error: this.getEmptyBoard(false)
        }
    }

    getEmptyBoard(fillValue) {
        let board = new Array(BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            board[i] = new Array(BOARD_SIZE).fill(fillValue);
        }

        return board;
    }

    findError(board, x, y) {
        let newErrorBoard = this.getEmptyBoard(false);

        for(let i=0 ; i<BOARD_SIZE ; i++) {
            let rowMap = new Map();
            for(let j=0 ; j<BOARD_SIZE ; j++) {
                if(board[i][j] != 0) {
                    if(rowMap.has(board[i][j])) {
                        let index = rowMap.get(board[i][j]);
                        newErrorBoard[i][index] = true;
                        newErrorBoard[i][j] = true;
                    }
                    else {
                        rowMap.set(board[i][j], j);
                    }
                }
            }
        }

        for(let j=0 ; j<BOARD_SIZE ; j++) {
            let columnMap = new Map();
            for(let i=0 ; i<BOARD_SIZE ; i++) {
                if(board[i][j] != 0) {
                    if(columnMap.has(board[i][j])) {
                        let index = columnMap.get(board[i][j]);
                        newErrorBoard[index][j] = true;
                        newErrorBoard[i][j] = true;
                    }
                    else {
                        columnMap.set(board[i][j], i);
                    }
                }
            }
        }

        let blockMaps = new Array(BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            blockMaps[i] = new Map();
        }

        for(let i=0 ; i<BOARD_SIZE ; i++) {
            for(let j=0 ; j<BOARD_SIZE ; j++) {
                if(board[i][j] != 0) {
                    let mapIndex = (Math.floor(i/3))*3 + (Math.floor(j/3));
                    if(blockMaps[mapIndex].has(board[i][j])) {
                        let index = blockMaps[mapIndex].get(board[i][j]);
                        newErrorBoard[Math.floor(index / BOARD_SIZE)][index % BOARD_SIZE] = true;
                        newErrorBoard[i][j] = true;
                    }
                    else {
                        blockMaps[mapIndex].set(board[i][j], i*BOARD_SIZE + j);
                    }
                }
            }
        }

        return newErrorBoard;
    }

    onDrop(event, x, y) {
        event.stopPropagation();
        event.target.style.border = null;

        let valueToPut = event.dataTransfer.getData('text/html');

        let newBoard = new Array(BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            newBoard[i] = this.state.board[i].slice();
        }
        newBoard[x][y] = valueToPut;

        let newErrorBoard = this.findError(newBoard, x, y);
        
        this.setState({board: newBoard, highlight: this.getEmptyBoard(false), error: newErrorBoard});
    }

    onDragEnter(event, x, y) {
        let toHighlight = this.getEmptyBoard(false);
        event.target.style.border = "2px dashed black";

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
        event.target.style.border = null;
        this.setState({highlight: this.getEmptyBoard(false)});
    }

    render() {
        let {board, highlight, focus, fixed, error} = this.state;

        return (
            <div className = "gameArena">
                <HowToPlay/>
                <div className = "dragAndDropContainer">
                    <CellPickupBar/>
                    <Board boardSize = {BOARD_SIZE} board = {board} highlight = {highlight} focus = {focus} fixed = {fixed} error = {error} onDrop = {this.onDrop} onDragEnter = {this.onDragEnter} onDragLeave = {this.onDragLeave}/>
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