import React from 'react';
import './cellpickupbar.css';
import PickupCell from '../PickupCell/pickupcell';

class CellPickupBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cells = [];
        for(let i=0 ; i<10 ; i++) {
            cells.push(<PickupCell cellValue = {i}/>);
        }
        return (
            <div className = "cellPickupBar">
                {cells}
            </div>
        );
    }
}

export default CellPickupBar;