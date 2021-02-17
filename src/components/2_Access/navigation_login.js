import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class navigation_login extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">Remember Words in English (LOGIN)</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNavDropdown">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                                <Link className="dropdown-item" to="/">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="dropdown-item" to="/">Logup</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
