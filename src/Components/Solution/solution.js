import React from 'react';
import './solution.css';

class Solution extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {showSolution, showSolutionBoard} = this.props;

        return (
            <button onClick = {showSolution}>
                {showSolutionBoard ? 'Hide Solution' : 'Show Solution'}
            </button>
        );
    }
}

export default Solution;