import React from 'react';
import GithubIcon from '../../Icons/githubicon.svg';
import './header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "header">
                <h2 className = "title">SUDOKU</h2>
                <img src = {GithubIcon} className = "githubIcon"></img>
            </div>
        );
    }
}

export default Header;