import React from 'react';
import './howtoplay.css';

class HowToPlay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "howToPlay">
                <h2>How To Play</h2>
                <div>Drag and Drop Cells to Board</div>
            </div>
        );
    }
}

export default HowToPlay;