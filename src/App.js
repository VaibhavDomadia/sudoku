import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/header';
import Board from './Components/Board/board';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header/>
                <Board/>
            </div>
        )
    }
}

export default App;
