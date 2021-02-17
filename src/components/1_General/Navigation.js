import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Remember Words in English</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNavDropdown">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                to="/">Know all the words</Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="/get_nouns">Nouns</Link>
                                <Link className="dropdown-item" to="/get_verbs">Verbs</Link>
                                <Link className="dropdown-item" to="/get_adjectives">Adjectives</Link>
                                <Link className="dropdown-item" to="/get_others">Other Words</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/new_word">Insert new word</Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={this.props.signoff} className="nav-link NavbarButtonWithoutStyle">
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
