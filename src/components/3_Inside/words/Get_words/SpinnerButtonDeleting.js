import React, { Component } from 'react'

export default class SpinnerButtonDeleting extends Component {

    render() {
        const cargando = this.props.deletingWord;
        const idActual = this.props.idActual;
        const idDeletingWord = this.props.idDeletingWord;

        if ((cargando) && (idActual === idDeletingWord)) {
            console.log('Entro')
            console.log('1', idActual);
            console.log('2', idDeletingWord);
            return (
                <>
                    <span className="spinner-border spinner-border-sm"></span>&nbsp;&nbsp;
                </>
            )
        } else {
            console.log('No entro')
            console.log('3', idActual);
            console.log('4', idDeletingWord);
            return <></>
        }
    }
}