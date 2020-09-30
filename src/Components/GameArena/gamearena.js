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
        this.onResetBoard = this.onResetBoard.bind(this);
        this.showSolution = this.showSolution.bind(this);

        let board = this.generateBoard();
        let fixed = this.getEmptyBoard(false);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            for(let j=0 ; j<BOARD_SIZE ; j++) {
                if(board[i][j] !== 0) {
                    fixed[i][j] = true;
                }
            }
        }

        let solutionBoard = new Array(BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            solutionBoard[i] = board[i].slice();
        }

        this.solveSudoku(solutionBoard, 0, 0);

        this.state = {
            board: board,
            highlight: this.getEmptyBoard(false),
            fixed: fixed,
            error: this.getEmptyBoard(false),
            isSudokuSolved: false,
            solutionBoard: solutionBoard,
            showSolutionBoard: false
        }

        this.storeBoard = this.getEmptyBoard(0);
        this.storeError = this.getEmptyBoard(false);
        this.solutionsFound = 0;
    }

    /**
     * It generates a 9 * 9 board of values filled with fillValue, which is passed as parameter.
     * 
     * @param fillValue value to fill the board with.
     * 
     * @returns board filled with fillValue.
     */
    getEmptyBoard(fillValue) {
        let board = new Array(BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            board[i] = new Array(BOARD_SIZE).fill(fillValue);
        }

        return board;
    }

    /**
     * It creates new game by generating a new sudoku puzzle having a unique solution.
     * It sets the error board to false and also set the solution board to the solution of the puzzle.
     */
    createNewGame() {
        let board = this.generateBoard();
        let fixed = this.getEmptyBoard(false);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            for(let j=0 ; j<BOARD_SIZE ; j++) {
                if(board[i][j] !== 0) {
                    fixed[i][j] = true;
                }
            }
        }

        let solutionBoard = new Array(BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            solutionBoard[i] = board[i].slice();
        }
        this.solveSudoku(solutionBoard, 0, 0);

        this.setState({board: board, fixed: fixed, highlight: this.getEmptyBoard(false), error: this.getEmptyBoard(false), isSudokuSolved: false, solutionBoard: solutionBoard, showSolutionBoard: false});
    }

    /**
     * It sets the game to the state where it was in the beggining of the puzzle.
     * Only fixed values remains, rest all the values entered by player is cleared.
     */
    onResetBoard() {
        let {board, fixed} = this.state;
        let newBoard = this.getEmptyBoard(0);

        for(let i=0 ; i<BOARD_SIZE ; i++) {
            for(let j=0 ; j<BOARD_SIZE ; j++) {
                if(fixed[i][j]) {
                    newBoard[i][j] = board[i][j];
                }
            }
        }

        this.setState({board: newBoard, fixed: fixed, highlight: this.getEmptyBoard(false), error: this.getEmptyBoard(false), isSudokuSolved: false});
    }

    /**
     * It toggles between showing the solution and hiding it.
     * If the state showSolutionBoard is true then it hides the solution on next function call.
     * Else it display the solution board on next function call.
     */
    showSolution() {
        if(this.state.showSolutionBoard) {
            let board = this.getEmptyBoard(0);
            let error = this.getEmptyBoard(false);
            for(let i=0 ; i<BOARD_SIZE ; i++) {
                for(let j=0 ; j<BOARD_SIZE ; j++) {
                    board[i][j] = this.storeBoard[i][j];
                    error[i][j] = this.storeError[i][j];
                }
            }

            this.setState({board: board, error: error, showSolutionBoard: false});
        }
        else {
            for(let i=0 ; i<BOARD_SIZE ; i++) {
                for(let j=0 ; j<BOARD_SIZE ; j++) {
                    this.storeBoard[i][j] = this.state.board[i][j];
                    this.storeError[i][j] = this.state.error[i][j];
                }
            }

            this.setState({board: this.state.solutionBoard, error: this.getEmptyBoard(false), showSolutionBoard: true});
        }
    }

    /**
     * It generated the initial state of the sudoku game.
     * 
     * First using empty sudoku board it is solved by using backtracking algorithm.
     * Then removing the cell one by one from the board and to ensure that sudoku has unique solution
     * it backtracks again to check if multiple solutions to the current state of board exists or not.
     */
    generateBoard() {
        let board = this.getEmptyBoard(0);
        this.solveSudoku(board, 0, 0);

        let indices = new Array(BOARD_SIZE * BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE * BOARD_SIZE ; i++) {
            indices[i] = i;
        }

        this.shuffleArray(indices);

        let cellsRemaining = BOARD_SIZE * BOARD_SIZE;
        for(let i=BOARD_SIZE * BOARD_SIZE - 1 ; i>=20 && cellsRemaining > 20 ; i--) {
            let index = indices[i];
            let store = board[Math.floor(index / BOARD_SIZE)][index % BOARD_SIZE];
            board[Math.floor(index / BOARD_SIZE)][index % BOARD_SIZE] = 0;
            
            let passBoard = new Array(BOARD_SIZE);
            for(let j=0 ; j<BOARD_SIZE ; j++) {
                passBoard[j] = board[j].slice();
            }
            
            this.solutionsFound = 0;
            this.isMultipleSolutionsPossible(passBoard, 0, 0);
            if(this.solutionsFound === 1) {
                cellsRemaining--;
            }
            else {
                board[Math.floor(index / BOARD_SIZE)][index % BOARD_SIZE] = store;
            }
        }

        return board;
    }

    /**
     * It is a recursive function to check whether the given sudoku board consist of multiple solution or not.
     * 
     * @param board the board to check for possibility of multiple solutions.
     * @param x the row number of the cell in the board.
     * @param y the column number of the cell in the board.
     * 
     * @returns 1 if the sudoku has unique solution, 2 if the sudoku has multiple solutions.
     */
    isMultipleSolutionsPossible(board, x, y) {

        if(y === BOARD_SIZE) {
            x++;
            y = 0;
        }

        if(x === BOARD_SIZE) {
            this.solutionsFound++;
            return;
        }

        if(board[x][y] !== 0) {
            this.isMultipleSolutionsPossible(board, x, y+1);
            return;
        }

        for(let i=0 ; i<BOARD_SIZE ; i++) {
            if(this.isValidBoard(board, x, y, i+1)) {
                board[x][y] = i+1;
                this.isMultipleSolutionsPossible(board, x, y+1);
                if(this.solutionsFound > 1) {
                    return;
                }
                board[x][y] = 0;
            }
        }
    }

    /**
     * It is a recursive function to generate the solution of the sudoku.
     * 
     * @param board the sudoku board whose solution has to be found out.
     * @param x the row number of the cell in the board.
     * @param y the column number of the cell in the board.
     */
    solveSudoku(board, x, y) {

        if(y === BOARD_SIZE) {
            x++;
            y = 0;
        }

        if(x === BOARD_SIZE) {
            return true;
        }

        if(board[x][y] !== 0) {
            return this.solveSudoku(board, x, y+1);
        }

        let values = new Array(BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            values[i] = i+1;
        }
        this.shuffleArray(values);

        for(let i=0 ; i<BOARD_SIZE ; i++) {
            if(this.isValidBoard(board, x, y, values[i])) {
                board[x][y] = values[i];
                if(this.solveSudoku(board, x, y+1)) {
                    return true;
                }
                else {
                    board[x][y] = 0;
                }
            }
        }

        return false;
    }

    /**
     * It checks whether after putting the value to the x'th row, y'th column cell of board it is still
     * a valid sudoku board or not.
     * 
     * @param board the sudoku board to check the validity
     * @param x the row number of the cell in the board.
     * @param y the column number of the cell in the board.
     * @param value value that is going to be put on xth row, yth column.
     * 
     * @returns true if it is still a valid board, false otherwise.
     */
    isValidBoard(board, x, y, value) {
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            if(board[x][i] === value) {
                return false;
            }
            if(board[i][y] === value) {
                return false;
            }
        }

        let squareBlockStartX = x - (x%3);
        let squareBlockStartY = y - (y%3);
        for(let i=squareBlockStartX ; i<squareBlockStartX+3 ; i++) {
            for(let j=squareBlockStartY ; j<squareBlockStartY+3 ; j++) {
                if(board[i][j] === value) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * It shuffles the array passed as an input.
     * 
     * @param array the array to be shuffled.
     */
    shuffleArray(array) {
        for(let i=array.length-1 ; i>=0 ; i--) {
            let index = Math.floor(Math.random() * (i+1));

            let temp = array[index];
            array[index] = array[i];
            array[i] = temp;
        }
    }

    /**
     * It checks for the collisions of cell values in a row, column or block and set the state
     * error to highlight those collision on board.
     * 
     * @param board the board to look for errors.
     */
    findError(board) {
        let newErrorBoard = this.getEmptyBoard(false);

        for(let i=0 ; i<BOARD_SIZE ; i++) {
            let rowMap = new Map();
            for(let j=0 ; j<BOARD_SIZE ; j++) {
                if(board[i][j] !== 0) {
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
                if(board[i][j] !== 0) {
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
                if(board[i][j] !== 0) {
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

    /**
     * It checks whether the input board is completely solved or not.
     * 
     * @param board the sudoku board to look for complete state of the board.
     * 
     * @returns true if the board is solved completely, false otherwise.
     */
    isSudokuSolved(board) {
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            let rowSet = new Set();
            for(let j=0 ; j<BOARD_SIZE ; j++) {
                if(board[i][j] !== 0) {
                    rowSet.add(board[i][j]);
                }
            }

            if(rowSet.size !== BOARD_SIZE) {
                return false;
            }
        }

        for(let j=0 ; j<BOARD_SIZE ; j++) {
            let columnSet = new Set();
            for(let i=0 ; i<BOARD_SIZE ; i++) {
                if(board[i][j] !== 0) {
                    columnSet.add(board[i][j]);
                }
            }

            if(columnSet.size !== BOARD_SIZE) {
                return false;
            }
        }

        let blockSets = new Array(BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            blockSets[i] = new Set();
        }

        for(let i=0 ; i<BOARD_SIZE ; i++) {
            for(let j=0 ; j<BOARD_SIZE ; j++) {
                if(board[i][j] !== 0) {
                    let setIndex = (Math.floor(i/3)*3) + Math.floor(j/3);
                    blockSets[setIndex].add(board[i][j]);
                }
            }
        }

        for(let i=0 ; i<BOARD_SIZE ; i++) {
            if(blockSets[i].size !== BOARD_SIZE) {
                return false;
            }
        }

        return true;
    }

    /**
     * It gets called when the dragged cell is droped on a target.
     * 
     * @param event drop event.
     * @param x row number on which the dragged cell is dropped.
     * @param y column number on which the dragged cell is dropped.
     */
    onDrop(event, x, y) {
        event.stopPropagation();
        event.target.style.opacity = "1";

        let value = event.dataTransfer.getData('text/html');

        let valueToPut;
        if(value === "") {
            valueToPut = 0;
        }
        else {
            valueToPut = parseInt(value);
        }

        let newBoard = new Array(BOARD_SIZE);
        for(let i=0 ; i<BOARD_SIZE ; i++) {
            newBoard[i] = this.state.board[i].slice();
        }
        newBoard[x][y] = valueToPut;

        let newErrorBoard = this.findError(newBoard);

        let isSudokuSolved = this.isSudokuSolved(newBoard);
        
        this.setState({board: newBoard, highlight: this.getEmptyBoard(false), error: newErrorBoard, isSudokuSolved: isSudokuSolved});
    }

    /**
     * It highlights the cell that are either in the same row, column or block of the cell on which
     * the dragged item is currenly hovering.
     * 
     * @param event drag enter event.
     * @param x row number on which the dragged cell is dropped.
     * @param y column number on which the dragged cell is dropped.
     */
    onDragEnter(event, x, y) {
        let toHighlight = this.getEmptyBoard(false);
        event.target.style.opacity = "0.4";

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

    /**
     * It stops highlighting the cell that are set to highlight in on drag enter event.
     * 
     * @param event drag leave event.
     * @param x row number on which the dragged cell is dropped.
     * @param y column number on which the dragged cell is dropped.
     */
    onDragLeave(event, x, y) {
        event.target.style.opacity = "1";
        this.setState({highlight: this.getEmptyBoard(false)});
    }

    render() {
        let {board, highlight, fixed, error, isSudokuSolved, showSolutionBoard} = this.state;

        return (
            <div className = "gameArena">
                <HowToPlay/>
                <div className = "dragAndDropContainer">
                    <CellPickupBar/>
                    <Board boardSize = {BOARD_SIZE} board = {board} highlight = {highlight} fixed = {fixed} error = {error} isSudokuSolved = {isSudokuSolved} showSolutionBoard = {showSolutionBoard} onDrop = {this.onDrop} onDragEnter = {this.onDragEnter} onDragLeave = {this.onDragLeave}/>
                </div>
                <div className = "controls">
                    <ResetBoard onResetBoard = {this.onResetBoard}/>
                    <GenerateBoard onNewGame = {this.createNewGame}/>
                    <Solution showSolution = {this.showSolution} showSolutionBoard = {showSolutionBoard}/>
                </div>
            </div>
        );
    }
}

export default GameArena;