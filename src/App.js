import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/header';
import Row from './Components/Row/row';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header/>
                <Row/>
            </div>
        )
    }
}

export default App;
