import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/header';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header/>
            </div>
        )
    }
}

export default App;
