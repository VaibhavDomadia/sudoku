import React from 'react';
import './pickupcell.css';

class PickupCell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {cellValue} = this.props;

        return (
            <div className = "pickupCell">{cellValue}</div>
        );
    }
}

export default PickupCell;