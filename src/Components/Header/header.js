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
                <a href = "https://github.com/VaibhavDomadia/sudoku" className = "githubIcon">
                    <img src = {GithubIcon} alt = "Github Icon"></img>
                </a>
            </div>
        );
    }
}

export default Header;