import React, { Component } from 'react'

export default class ButtonPlayNewWord extends Component {
    generateNewWordSinceButton = () => {
        this.props.getOneNewWord(this.props.index)
    }
    render() {
        return <>
            <button
                className="btn btn-warning"
                onClick={() => this.generateNewWordSinceButton()}
            >
                <SpinnerButtonPlayNewWord
                    cargandoNuevaPalabra={this.props.cargandoNuevaPalabra}
                    dato={this.props.dato}
                    index={this.props.index}
                />
                New Word
            </button>
        </>
    }
}

class SpinnerButtonPlayNewWord extends Component {
    render() {
        if ((this.props.cargandoNuevaPalabra[0] === 1) && (this.props.index === 0) && (this.props.dato.type === 'noun')) {
            return <>
                <span className="spinner-border spinner-border-sm"></span>
                &nbsp;&nbsp;
            </>
        }
        if ((this.props.cargandoNuevaPalabra[1] === 1) && (this.props.index === 1) && (this.props.dato.type === 'verb')) {
            return <>
                <span className="spinner-border spinner-border-sm"></span>
                &nbsp;&nbsp;
            </>
        }
        if ((this.props.cargandoNuevaPalabra[2] === 1) && (this.props.index === 2) && (this.props.dato.type === 'adjective')) {
            return <>
                <span className="spinner-border spinner-border-sm"></span>
                &nbsp;&nbsp;
            </>
        }
        if ((this.props.cargandoNuevaPalabra[3] === 1) && (this.props.index === 3) && (this.props.dato.type === 'other')) {
            return <>
                <span className="spinner-border spinner-border-sm"></span>
                &nbsp;&nbsp;
            </>
        } else {
            return <></>
        }

    }
}