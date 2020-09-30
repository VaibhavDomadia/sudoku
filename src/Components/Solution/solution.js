import React from 'react';
import './solution.css';
import VisibleIcon from '../../Icons/visible.svg';
import HideIcon from '../../Icons/hide.svg';

class Solution extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {showSolution, showSolutionBoard} = this.props;

        return (
            <button onClick = {showSolution} className = "showSolution">
                <img src = {showSolutionBoard ? HideIcon : VisibleIcon} alt = "Solution"></img>
                <div>{showSolutionBoard ? 'Hide Solution' : 'Show Solution'}</div>
            </button>
        );
    }
}

export default Solution;