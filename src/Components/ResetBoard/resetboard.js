import React from 'react';
import './resetboard.css';
import ResetIcon from '../../Icons/reset.svg';

class ResetBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {onResetBoard} = this.props;

        return (
            <button onClick = {onResetBoard} className = "resetBoard">
                <img src = {ResetIcon} alt = "Reset Board"></img>
                <div>Reset Board</div>
            </button>
        );
    }
}

export default ResetBoard;
