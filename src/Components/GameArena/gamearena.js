import React from 'react';
import './gamearena.css';
import Board from '../Board/board';

class GameArena extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Board/>
            </div>
        );
    }
}

export default GameArena;