import React, { Component } from 'react'
import axios from 'axios'

const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

export default class Insert_word extends Component {
    state = {
        word: '',
        track: '',
        meaning: '',
        type:'',
        checkboxes: {
            c1: true,
            c2: false,
            c3: false,
            c4: false,
            selected: null,
          }
    }
    
    //Evento caundo se le de click al botón del formulario
    onSubmit = async (e) => {
        e.preventDefault();
        //Cambiando el estado de type
        if(this.state.checkboxes.c1 === true){
            this.state.type = 'noun';
        }else if(this.state.checkboxes.c2 === true){
            this.state.type = 'verb';
        }else if(this.state.checkboxes.c3 === true){
            this.state.type = 'adjective';
        }else if(this.state.checkboxes.c4 === true){
            this.state.type = 'other';
        }
        //Preparando datos para almacenar
        const newWord = {
            word: this.state.word,
            track: this.state.track,
            meaning: this.state.meaning,
            type: this.state.type
        }
        //Saving the new word into the correct collection 
        if(this.state.type === 'noun'){
            await axios.post(baseURL +'/words/noun/', newWord);
            window.alert("The noun was added");
        }else if(this.state.type === 'verb'){
            await axios.post(baseURL +'/words/verb/', newWord);
            window.alert("The verb was added");
        }else if(this.state.type === 'adjective'){
            await axios.post(baseURL +'words/adjective/', newWord);
            window.alert("The adjective was added");
        }else if(this.state.type === 'other'){
            await axios.post(baseURL +'words/other/', newWord);
            window.alert("The other word was added");
        }else{
            window.alert("Word cannot be stored");
        }
        //Refrescando la página
        //window.location.href = '/new_word/';

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
        const checkboxes = Object.assign({},this.state.checkboxes, {});
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
                <div className="container">
                <div className="container mt-3">
                    <div className="col-md-6 offset-md-3">
                        <div className="card card-body">
                            <h4>Insert a word</h4>

                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    {/* 1.- Inserting the word */}
                                    <div className="form-group">
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Insert the new word"
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
                                    {/* 1.- Inserting the meaning*/}
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
                                            onChange={(e) => this.onCheck('c1', e.target.value) }/>
                                        <label className="form-check-label">
                                            Noun
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                                            value="c2"
                                            checked={this.state.checkboxes.c2} 
                                            onChange={(e) => this.onCheck('c2', e.target.value) }/>
                                        <label className="form-check-label">
                                            Verb
                                    </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3"
                                            value="c3"
                                            checked={this.state.checkboxes.c3} 
                                            onChange={(e) => this.onCheck('c3', e.target.value) }/>
                                        <label className="form-check-label">
                                            Adjective
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4"
                                            value="c4"
                                            checked={this.state.checkboxes.c4} 
                                            onChange={(e) => this.onCheck('c4', e.target.value) }/>
                                        <label className="form-check-label">
                                            Other word
                                        </label>
                                    </div>
                                </div>
                                {/* Bottom*/}
                                <div className="form-group">
                                    <button className="btn btn-primary">
                                        Save
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
