import React from 'react';
import './pickupcell.css';

class PickupCell extends React.Component {
    constructor(props) {
        super(props);

        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragStart(event) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', this.props.cellValue);
        event.target.style.opacity = '0.4';
    }

    onDragEnd(event) {
        event.target.style.opacity = '1';
    }

    render() {
        let {cellValue} = this.props;

        return (
            <div className = "pickupCell" draggable onDragStart = {this.onDragStart} onDragEnd = {this.onDragEnd}>
                {cellValue == 0 ? "" : cellValue}
            </div>
        );
    }
}

export default PickupCell;