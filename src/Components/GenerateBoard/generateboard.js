import React from 'react';
import './generateboard.css';

class GenerateBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {onNewGame} = this.props;

        return (
            <button onClick = {onNewGame}>
                New Game
            </button>
        );
    }
}

export default GenerateBoard;