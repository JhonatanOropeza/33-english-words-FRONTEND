import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class buttonLogin extends Component {
    render() {
        const StyleButtom = {
            marginLeft: '5px',
            marginRight: '5px'
        }
        if (!this.props.mensaje_success) {
            return null;
        }
        return (
            <Link className="btn btn-primary" to="/signin" style={StyleButtom}>Signin</Link>
        )
    }
}
