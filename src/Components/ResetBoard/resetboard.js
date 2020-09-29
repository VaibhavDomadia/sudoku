import React from 'react';
import './resetboard.css';

class ResetBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {onResetBoard} = this.props;

        return (
            <button onClick = {onResetBoard}>
                Reset Board
            </button>
        );
    }
}

export default ResetBoard;
