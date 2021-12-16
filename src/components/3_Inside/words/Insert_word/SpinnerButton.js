import React, { Component } from 'react'

export default class SpinnerButton extends Component {

/*     constructor(props) {
        super(props);
        this.state = {
            cargando1: props.storingWord
        };
    } */

    render() {
        const cargando = this.props.storingWord;
        const mensaje = this.props.mensajeBoton;
        if (cargando) {
            return (
                <div className="btn btn-primary">
                    <span className="spinner-border spinner-border-sm"></span>
                    &nbsp;&nbsp;{mensaje}
                </div>
            )
        } else {
            return (
                <div className="btn btn-primary">
                    Save
                </div>
            )
        }

    }
}