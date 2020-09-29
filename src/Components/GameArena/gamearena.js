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
        this.isSudokuSolved = this.isSudokuSolved.bind(this);
        this.generateBoard = this.generateBoard.bind(this);
        this.solveSudoku = this.solveSudoku.bind(this);
        this.isMultipleSolutionsPossible = this.isMultipleSolutionsPossible.bind(this);
        this.shuffleArray = this.shuffleArray.bind(this);
        this.isValidBoard = this.isValidBoard.bind(this);
        this.createNewGame = this.createNewGame.bind(this);

        let board = this.generateBoard();
        let fixed = this.getEmptyBoard(false);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            for(let j=0 ; j<BOARD_SIZE ; j++) {
                if(board[i][j] != 0) {
                    fixed[i][j] = true;
                }
            }
        }

        this.state = {
            board: board,
            highlight: this.getEmptyBoard(false),
            focus: this.getEmptyBoard(false),
            fixed: fixed,
            error: this.getEmptyBoard(false),
            isSudokuSolved: false
        }
    }

    getEmptyBoard(fillValue) {
        let board = new Array(BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            board[i] = new Array(BOARD_SIZE).fill(fillValue);
        }

        return board;
    }

    createNewGame() {
        console.log("On new Game");
        let board = this.generateBoard();
        let fixed = this.getEmptyBoard(false);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            for(let j=0 ; j<BOARD_SIZE ; j++) {
                if(board[i][j] != 0) {
                    fixed[i][j] = true;
                }
            }
        }

        this.setState({board: board, fixed: fixed, highlight: this.getEmptyBoard(false), error: this.getEmptyBoard(false), isSudokuSolved: false});
    }

    generateBoard() {
        let board = this.getEmptyBoard(0);
        this.solveSudoku(board);

        let indices = new Array(BOARD_SIZE * BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE * BOARD_SIZE ; i++) {
            indices[i] = i;
        }

        this.shuffleArray(indices);

        console.log(indices);

        let lastRecordedUniqueBoard = new Array(BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            lastRecordedUniqueBoard[i] = board[i].slice();
        }

        for(let i=BOARD_SIZE * BOARD_SIZE - 1 ; i>20 ; i--) {
            let index = indices[i];
            board[Math.floor(index / BOARD_SIZE)][index % BOARD_SIZE] = 0;
            let solutionsPossible = this.isMultipleSolutionsPossible(board);
            if(solutionsPossible == 1) {
                for(let j=0 ; j<BOARD_SIZE ; j++) {
                    for(let k=0 ; k<BOARD_SIZE ; k++) {
                        lastRecordedUniqueBoard[j][k] = board[j][k];
                    }
                }
            }
        }

        return lastRecordedUniqueBoard;
    }

    isMultipleSolutionsPossible(board) {
        let alreadyFilled = true;
        let x = 0;
        let y = 0;
        outer: for(let i=0 ; i<BOARD_SIZE ; i++) {
            for(let j=0 ; j<BOARD_SIZE ; j++) {
                if(board[i][j] == 0) {
                    x = i;
                    y = j;
                    alreadyFilled = false;
                    break outer;
                }
            }
        }

        if(alreadyFilled) {
            return 1;
        }

        let values = new Array(BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            values[i] = i+1;
        }
        this.shuffleArray(values);

        let solutionPossibleCount = 0;
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            if(this.isValidBoard(board, x, y, values[i])) {
                board[x][y] = values[i];
                solutionPossibleCount += this.isMultipleSolutionsPossible(board);
                if(solutionPossibleCount > 1) {
                    return solutionPossibleCount;
                }
                board[x][y] = 0;
            }
        }

        return solutionPossibleCount;
    }

    solveSudoku(board) {
        let alreadyFilled = true;
        let x = 0;
        let y = 0;
        outer: for(let i=0 ; i<BOARD_SIZE ; i++) {
            for(let j=0 ; j<BOARD_SIZE ; j++) {
                if(board[i][j] == 0) {
                    x = i;
                    y = j;
                    alreadyFilled = false;
                    break outer;
                }
            }
        }

        if(alreadyFilled) {
            return true;
        }

        let values = new Array(BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            values[i] = i+1;
        }
        this.shuffleArray(values);

        for(let i=0 ; i<BOARD_SIZE ; i++) {
            if(this.isValidBoard(board, x, y, values[i])) {
                board[x][y] = values[i];
                if(this.solveSudoku(board)) {
                    return true;
                }
                else {
                    board[x][y] = 0;
                }
            }
        }

        return false;
    }

    isValidBoard(board, x, y, value) {
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            if(board[x][i] == value) {
                return false;
            }
            if(board[i][y] == value) {
                return false;
            }
        }

        let squareBlockStartX = x - (x%3);
        let squareBlockStartY = y - (y%3);
        for(let i=squareBlockStartX ; i<squareBlockStartX+3 ; i++) {
            for(let j=squareBlockStartY ; j<squareBlockStartY+3 ; j++) {
                if(board[i][j] == value) {
                    return false;
                }
            }
        }

        return true;
    }

    shuffleArray(array) {
        for(let i=array.length-1 ; i>=0 ; i--) {
            let index = Math.floor(Math.random() * i+1);

            let temp = array[index];
            array[index] = array[i];
            array[i] = temp;
        }
    }

    findError(board) {
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
                    let mapIndex = (Math.floor(i/3)*3) + (Math.floor(j/3));
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

    isSudokuSolved(board) {
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            let rowSet = new Set();
            for(let j=0 ; j<BOARD_SIZE ; j++) {
                if(board[i][j] != 0) {
                    rowSet.add(board[i][j]);
                }
            }

            if(rowSet.size != BOARD_SIZE) {
                return false;
            }
        }

        for(let j=0 ; j<BOARD_SIZE ; j++) {
            let columnSet = new Set();
            for(let i=0 ; i<BOARD_SIZE ; i++) {
                if(board[i][j] != 0) {
                    columnSet.add(board[i][j]);
                }
            }

            if(columnSet.size != BOARD_SIZE) {
                return false;
            }
        }

        let blockSets = new Array(BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            blockSets[i] = new Set();
        }

        for(let i=0 ; i<BOARD_SIZE ; i++) {
            for(let j=0 ; j<BOARD_SIZE ; j++) {
                if(board[i][j] != 0) {
                    let setIndex = (Math.floor(i/3)*3) + Math.floor(j/3);
                    blockSets[setIndex].add(board[i][j]);
                }
            }
        }

        for(let i=0 ; i<BOARD_SIZE ; i++) {
            if(blockSets[i].size != BOARD_SIZE) {
                return false;
            }
        }

        return true;
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

        let newErrorBoard = this.findError(newBoard);

        let isSudokuSolved = this.isSudokuSolved(newBoard);
        
        this.setState({board: newBoard, highlight: this.getEmptyBoard(false), error: newErrorBoard, isSudokuSolved: isSudokuSolved});
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
        let {board, highlight, focus, fixed, error, isSudokuSolved} = this.state;

        return (
            <div className = "gameArena">
                <HowToPlay/>
                <div className = "dragAndDropContainer">
                    <CellPickupBar/>
                    <Board boardSize = {BOARD_SIZE} board = {board} highlight = {highlight} focus = {focus} fixed = {fixed} error = {error} isSudokuSolved = {isSudokuSolved} onDrop = {this.onDrop} onDragEnter = {this.onDragEnter} onDragLeave = {this.onDragLeave}/>
                </div>
                <div className = "controls">
                    <ResetBoard/>
                    <GenerateBoard onNewGame = {this.createNewGame}/>
                    <Solution/>
                </div>
            </div>
        );
    }
}

export default GameArena;