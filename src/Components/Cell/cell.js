import React from 'react';
import './cell.css';

class Cell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {cellValue} = this.props;

        return (
            <div className = "cell">
                {cellValue}
            </div>
        );
    }
}

export default Cell;