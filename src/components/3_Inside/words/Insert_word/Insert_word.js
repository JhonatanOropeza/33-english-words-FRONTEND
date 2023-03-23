import React, { Component } from 'react';
import axios from 'axios';

import Navigation from '../../../1_General/Navigation';
import SpinnerButton from './SpinnerButton';

const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

export default class Insert_word extends Component {
    state = {
        word: '',
        track: '',
        meaning: '',
        type: '',
        checkboxes: {
            c1: true,
            c2: false,
            c3: false,
            c4: false,
            selected: null,
        },
        storingWord: false
    }

    //Evento caundo se le de click al botón del formulario
    onSubmit = async (e) => {
        /* e.preventDefault();
        console.log('You clicked submit1.');
        return false; */
        e.preventDefault();
        //For the spinner in the button
        this.setState({ storingWord: true });
        if (this.state.storingWord) {
            return;
        }
        //Cambiando el estado de type
        //Since 22/03/2023 I Stopped using this part of the code by optimization before conecting with BK
        /* if (this.state.checkboxes.c1 === true) {
            this.setState({ type: 'noun' });
        } else if (this.state.checkboxes.c2 === true) {
            this.setState({ type: 'verb' });
        } else if (this.state.checkboxes.c3 === true) {
            this.setState({ type: 'adjective' });
        } else if (this.state.checkboxes.c4 === true) {
            this.setState({ type: 'other' });
        } */
        //Preparando datos para almacenar

        const newWord = {
            word: this.state.word,
            track: this.state.track,
            meaning: this.state.meaning,
            type: this.state.type
        }
        try {
            //Saving the new word into the correct collection 
            if (this.state.checkboxes.c1 === true) {
                await axios.post(baseURL + '/words/noun', newWord);
                window.alert("The noun was added");
            }
            if (this.state.checkboxes.c2 === true) {
                await axios.post(baseURL + '/words/verb', newWord);
                window.alert("The verb was added");
            }
            if (this.state.checkboxes.c3 === true) {
                await axios.post(baseURL + '/words/adjective', newWord);
                window.alert("The adjective was added");
            }
            if (this.state.checkboxes.c4 === true) {
                await axios.post(baseURL + '/words/other_word', newWord);
                window.alert("The other word was added");
            }
            this.setState({ storingWord: false });
        } catch (error) {
            this.setState({ storingWord: false });
            window.alert("Word cannot be stored");
        }
        //Refrescando la página
        document.getElementsByClassName("form-control")[0].value = '';
        document.getElementsByClassName("form-control")[1].value = '';
        document.getElementsByClassName("form-control")[2].value = '';
    }

    //Evento cuando hay cambios en cualquiera de los input
    //La referencia para el guardado de datos es "name"
    selecting_user_dates = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        //console.log(this.state.checkboxes);
        //console.log(this.state);
    }

    //Evento para selección del checkbox
    onCheck(name, val) {
        const checkboxes = Object.assign({}, this.state.checkboxes, {});
        for (let key in checkboxes) {
            checkboxes[key] = false;
        }
        checkboxes[name] = true;
        checkboxes.selected = val;
        this.setState({ checkboxes });
    }

    render() {
        return (
            <>
                <Navigation signoff={this.props.signoff} />
                <div className="container">
                    <div className="container mt-3">
                        <div className="col-md-6 offset-md-3">
                            <div className="card card-body">
                                <h4>Insert a word</h4>

                                <form onSubmit={this.onSubmit} >
                                    <div className="form-group" >
                                        {/* 1.- Inserting the word */}
                                        <div className="form-group">
                                            <input type="text"
                                                className="form-control"
                                                placeholder="Insert the 'name' of the new word"
                                                name="word"
                                                onChange={this.selecting_user_dates}
                                                required />
                                        </div>
                                        {/* 2.- Inserting the track */}
                                        <div className="form-group">
                                            <input type="text"
                                                className="form-control"
                                                placeholder="Insert the track"
                                                name="track"
                                                onChange={this.selecting_user_dates}
                                                required />
                                        </div>
                                        {/* 3.- Inserting the meaning*/}
                                        <div className="form-group">
                                            <input type="text"
                                                className="form-control"
                                                placeholder="Insert the meaning"
                                                name="meaning"
                                                onChange={this.selecting_user_dates}
                                                required />
                                        </div>
                                    </div>
                                    {/* Radiobutton*/}
                                    <div className="form-group">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                                                value="c1"
                                                checked={this.state.checkboxes.c1}
                                                onChange={(e) => this.onCheck('c1', e.target.value)} />
                                            <label className="form-check-label">
                                                Noun
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                                                value="c2"
                                                checked={this.state.checkboxes.c2}
                                                onChange={(e) => this.onCheck('c2', e.target.value)} />
                                            <label className="form-check-label">
                                                Verb
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3"
                                                value="c3"
                                                checked={this.state.checkboxes.c3}
                                                onChange={(e) => this.onCheck('c3', e.target.value)} />
                                            <label className="form-check-label">
                                                Adjective
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4"
                                                value="c4"
                                                checked={this.state.checkboxes.c4}
                                                onChange={(e) => this.onCheck('c4', e.target.value)} />
                                            <label className="form-check-label">
                                                Other word
                                            </label>
                                        </div>
                                    </div>
                                    {/* Bottom*/}
                                    <button type="submit" className="btn btn-primary" >
                                        <SpinnerButton storingWord={this.state.storingWord} mensajeBoton={'Saving'} />
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

