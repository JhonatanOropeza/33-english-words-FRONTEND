import React, { Component } from 'react'
import axios from 'axios'

import RecursoNoExiste from '../../1_General/RecursoNoExiste';
import Main from '../../1_General/Main';
import ColumWords from './ColumWord';
import Navigation from '../../1_General/Navigation';
import LoadingClock from '../../1_General/LoadingClock';
import ButtonPlayNewWord from './ButtonPlayNewWord'

const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

export default class Play extends Component {
    state = {
        datos: [], totales: [],
        colores: [
            { color1: false, color2: false },
            { color1: false, color2: false },
            { color1: false, color2: false },
            { color1: false, color2: false }
        ],
        noHayDatoAMostrar: false,
        cargandoDatos: false,
        cargandoNuevaPalabra: [0, 0, 0, 0],
    }

    async get_word() {
        try {
            this.setState({ cargandoDatos: true });
            const { data } = await axios.get(baseURL + '/words');
            this.setState({ datos: data.result });
            this.setState({ totales: data.totales });
            this.setState({ cargandoDatos: false });
        } catch (error) {
            if (error.response &&
                (error.response.status === 404 || error.response.status === 400)) {
                this.setState({ noHayDatoAMostrar: true });
            }
            console.log(error);
            this.setState({ cargandoDatos: false });
        }
        //console.log('The noun´s state is: ', this.state.noun);
    }
    async getOneNewWord(opc) {
        const regresarValoreEstado_CargandoNuevaPalabra = [0,0,0,0]
        try {
            if (opc === 0) { //NOUNS
                //Modificando estado CARGANDO NUEVA PALABRA
                var nuevosValores0 = this.state.cargandoNuevaPalabra;
                nuevosValores0[0] = 1;
                this.setState({ cargandoNuevaPalabra: nuevosValores0 });
                //Fin modificar estado CARGANDO NUEVA PALABRA
                const { data } = await axios.get(baseURL + `/words/getOneRandomNoun/${this.state.datos[0]._id}`);
                let datosAux = [...this.state.datos];
                datosAux[0] = data;
                this.setState({ datos: datosAux });
            } else if (opc === 1) { //VERBS
                //Modificando estado CARGANDO NUEVA PALABRA
                var nuevosValores1 = this.state.cargandoNuevaPalabra;
                nuevosValores1[1] = 1;
                this.setState({ cargandoNuevaPalabra: nuevosValores1 });
                //Fin modificar estado CARGANDO NUEVA PALABRA
                const { data } = await axios.get(baseURL + `/words/getOneRandomVerb/${this.state.datos[1]._id}`);
                let datosAux = [...this.state.datos];
                datosAux[1] = data;
                this.setState({ datos: datosAux });
            } else if (opc === 2) { //ADJECTIVES
                //Modificando estado CARGANDO NUEVA PALABRA
                var nuevosValores2 = this.state.cargandoNuevaPalabra;
                nuevosValores2[2] = 1;
                this.setState({ cargandoNuevaPalabra: nuevosValores2 });
                //Fin modificar estado CARGANDO NUEVA PALABRA
                const { data } = await axios.get(baseURL + `/words/getOneRandomAdjective/${this.state.datos[2]._id}`);
                let datosAux = [...this.state.datos];
                datosAux[2] = data;
                this.setState({ datos: datosAux });
            } else if (opc === 3) { //OTHERS
                //Modificando estado CARGANDO NUEVA PALABRA
                var nuevosValores3 = this.state.cargandoNuevaPalabra;
                nuevosValores3[3] = 1;
                this.setState({ cargandoNuevaPalabra: nuevosValores3 });
                //Fin modificar estado CARGANDO NUEVA PALABRA
                const { data } = await axios.get(baseURL + `/words/getOneRandomOther/${this.state.datos[3]._id}`);
                let datosAux = [...this.state.datos];
                datosAux[3] = data;
                this.setState({ datos: datosAux });
            }
            this.setState({ cargandoNuevaPalabra: regresarValoreEstado_CargandoNuevaPalabra });
        } catch (error) {
            this.setState({ cargandoNuevaPalabra: regresarValoreEstado_CargandoNuevaPalabra });
        }
    }
    //Para invertir un colores
    change_color1 = (index) => {
        let coloresAux = [...this.state.colores];
        let color = { ...coloresAux[index] };
        color.color1 = !color.color1;
        coloresAux[index] = color;
        this.setState({ colores: coloresAux });
    }
    change_color2 = (index) => {
        let coloresAux = [...this.state.colores];
        let color = { ...coloresAux[index] };
        color.color2 = !color.color2;
        coloresAux[index] = color;
        this.setState({ colores: coloresAux });
    }

    componentDidMount() {
        this.get_word();
    }

    render() {
        const opcion = this.state.noHayDatoAMostrar;

        if (opcion) {
            return (
                <>
                    <Navigation signoff={this.props.signoff} />

                    <Main verticalCenter>
                        <RecursoNoExiste
                            mensajeOne={'You haven´t stored words yet'}
                            mensajeTwo={'Add words'}
                            link={'new_word'}
                        />
                    </Main>
                </>
            );
        }
        return (
            <>
                <Navigation signoff={this.props.signoff} />
                <Main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <h3>Time to play</h3>
                        </div>
                        {this.state.cargandoDatos
                            ? (<>
                                <LoadingClock color={'#f3f3f3'} />
                            </>)
                            : (<>
                                <div className="row">

                                    <div className="card-group col">
                                        {/** Printing col by col) */}
                                        {
                                            this.state.datos.map((dato, index) => (
                                                <div className="card" key={index}>
                                                    {/** 1st row (titles) */}
                                                    <div className="card-header text-center">
                                                        <strong>
                                                            {index === 0 && 'Noun'}{index === 1 && 'Verb'}{index === 2 && 'Adjective'}{index === 3 && 'Other'}
                                                        </strong>
                                                    </div>

                                                    {/** 2nd row (word, trak and meaning) */}
                                                    <ColumWords
                                                        dato={dato}
                                                        index={index}
                                                        colores={this.state.colores[index]}
                                                        change_color1={this.change_color1}
                                                        change_color2={this.change_color2}
                                                    />

                                                    {/** 3rd row (total nouns) */}
                                                    <div className="card-footer text-center">
                                                        <p className="p-0 m-0">
                                                            Total {index === 0 && 'nouns'}{index === 1 && 'verbs'}{index === 2 && 'adjectives'}{index === 3 && 'others'}
                                                            : {this.state.totales[index]}
                                                        </p>
                                                    </div>

                                                    {/** 4th row (boton "Add word") */}
                                                    <div className="card-footer text-center">
                                                        {(Object.keys(dato).length > 0) && (this.state.totales[index] > 0)
                                                            ?
                                                            /** Specifying whic button we'll be shown */
                                                            <ButtonPlayNewWord
                                                                getOneNewWord={this.getOneNewWord.bind(this)}
                                                                index={index}
                                                                cargandoNuevaPalabra={this.state.cargandoNuevaPalabra}
                                                                dato={dato}
                                                            />
                                                            /* <button
                                                                className="btn btn-warning"
                                                                onClick={() => this.getOneWord(index + 1)}>
                                                                New Word
                                                            </button> */
                                                            :
                                                            <div style={{ height: '38px' }}></div>
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </>)
                        }
                    </div>
                </Main >
            </>
        );
    }
}
