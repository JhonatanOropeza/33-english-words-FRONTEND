import React, { Component } from 'react'
import axios from 'axios'

import RecursoNoExiste from '../../1_General/RecursoNoExiste';
import Main from '../../1_General/Main';
import ColumWords from './ColumWord';

const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

export default class Play extends Component {
    state = {
        datos: [], totales: [],
        colores: [
            {color1: false, color2: false},
            {color1: false, color2: false},
            {color1: false, color2: false},
            {color1: false, color2: false}
        ],    
        noHayDatoAMostrar: false,
        cargandoDatos: false
    }

    async get_word() {
        try {
            this.setState({ cargandoDatos: true });
            const { data } = await axios.get(baseURL + '/words');
            this.setState({ datos: data.result });
            this.setState({totales: data.totales });
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
    async getOneWord(opc) {
        try {
            this.setState({ cargandoDatos: true });
            if (opc === 1) {
                const { data } = await axios.get(baseURL + `/words/getOneRandomNoun/${this.state.datos[0]._id}`);
                let datosAux = [...this.state.datos];
                let dato = {...datosAux[0]};
                dato = data;
                datosAux[0] = dato;
                this.setState({datos: datosAux});
            } else if (opc === 2) {
                await axios.get(baseURL + `/verb/${this.state.datos[1]._id}`);
            } else if (opc === 3) {
                await axios.get(baseURL + `/adjective/${this.state.datos[2]._id}`);
            } else if (opc === 4) {
                await axios.get(baseURL + `/other_word/${this.state.datos[3]._id}`);
            }
            
            this.setState({ cargandoDatos: false });
        } catch (error) {
            this.setState({ cargandoDatos: false });
        }
    }
    //Para invertir un colores
    change_color1 = (index) => {
        let coloresAux = [...this.state.colores];
        let color = {...coloresAux[index]};
        color.color1 = !color.color1;
        coloresAux[index] = color;
        this.setState({colores: coloresAux});
    }
    change_color2 = (index) =>{
        let coloresAux = [...this.state.colores];
        let color = {...coloresAux[index]};
        color.color2 = !color.color2;
        coloresAux[index] = color;
        this.setState({colores: coloresAux});
    }

    componentDidMount() {
        this.get_word();
    }   

    render() {
        const opcion = this.state.noHayDatoAMostrar;

        if (opcion) {
            return (
                <>
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
            <Main>
                <div className="container">
                    <div className="row justify-content-center">
                        <h3>Time to play</h3>
                    </div>
                    <div className="row">
                        <div className="card-group col">
                            {/** Printing col by col) */}
                            {
                                this.state.datos.map((dato, index) => (
                                    <div className="card" key={index}>
                                        <div className="card-header text-center">
                                            <strong>
                                                {index === 0 && 'Noun'}{index === 1 && 'Verb'}{index === 2 && 'Adjective'}{index === 3 && 'Other'}
                                            </strong>
                                        </div>
                                        

                                        <ColumWords 
                                            dato={dato}
                                            index={index}
                                            colores={this.state.colores[index]}
                                            change_color1 = {this.change_color1}
                                            change_color2 = {this.change_color2}
                                        />


                                        <div className="card-footer text-center">
                                            <p className="p-0 m-0">
                                                Total {index === 0 && 'nouns'}{index === 1 && 'verbs'}{index === 2 && 'adjectives'}{index === 3 && 'others'}
                                                : {this.state.totales[index]} 
                                            </p>
                                        </div>
                                        <div className="card-footer text-center">
                                            {(Object.keys(dato).length > 0) && (this.state.totales[index] > 0)
                                                ?
                                                <button
                                                    className="btn btn-warning"
                                                    onClick={() => this.getOneWord(index + 1)}>
                                                    New Word
                                                </button>
                                                :
                                                <div style={{height:'38px'}}></div>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Main >
        );
    }
}
