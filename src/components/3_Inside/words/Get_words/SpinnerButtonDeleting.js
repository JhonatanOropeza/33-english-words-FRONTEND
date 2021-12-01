import React, { Component } from 'react'

export default class SpinnerButtonDeleting extends Component {

    render() {
        const cargando = this.props.deletingWord;
        const idActual = this.props.idActual;
        const idDeletingWord = this.props.idDeletingWord;

        if ((cargando) && (idActual === idDeletingWord)) {
            return (
                <>
                    <span className="spinner-border spinner-border-sm"></span>&nbsp;&nbsp;
                </>
            )
        } else {
            return <></>
        }
    }
}