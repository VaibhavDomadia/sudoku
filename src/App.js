import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/header';
import Cell from './Components/Cell/cell';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header/>
                <Cell/>
            </div>
        )
    }
}

export default App;
