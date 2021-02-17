import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class RecursoNoExiste extends Component {
    render() {
        let mensaje1 = this.props.mensajeOne;
        let mensaje2 = this.props.mensajeTwo;
        let link = this.props.link;
        if (!mensaje1 && !mensaje2) {
            return null;
        }
        return (
            <div style={{ MaxWidth: '500px' }} className="container text-center MensajeErrorBorder">
                <h4 className="pt-2">{this.props.mensajeOne}</h4>
                <p className="">
                    <Link to={`${link}`}>{this.props.mensajeTwo}</Link>
                </p>
            </div>
        );
    };
}