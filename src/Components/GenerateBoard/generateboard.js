import React from 'react';
import './generateboard.css';
import NewGameIcon from '../../Icons/new.svg'

class GenerateBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {onNewGame} = this.props;

        return (
            <button onClick = {onNewGame} className = "newGame">
                <img src = {NewGameIcon} alt = "New Game"></img>
                <div>New Game</div>
            </button>
        );
    }
}

export default GenerateBoard;