import React, { Component } from 'react';

import MensajeError from '../1_General/mensajeError'

export default class login extends Component {
    state = {
        email: '',
        password: '',
        mensaje_error: ''
    }
    onSubmit = async (e) => {
        e.preventDefault();
        //Preapring dates because they will be processed
        //Here this.props = {signin: f};
        const user_to_check = {
            email: this.state.email,
            password: this.state.password
        }
        //Using the function that arrived through props form app.js
        //const { data } = await axios.post('http://localhost:3003/api/auth/signin', user_to_check);
        try {
            await this.props.signin(user_to_check);
        } catch (error) {
            console.log(error);
            this.show_error(error.response.data.error);
        }
        //window.alert("Wating answer");
        //Refrescando la página
    }
    //Evento cuando hay cambios en cualquiera de los input
    //La referencia para el guardado de datos es "name"
    selecting_user_dates = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    //Mostrando error
    show_error = (mensaje) => {
        this.setState({ mensaje_error: mensaje });
    }
    //Eliminado mensahae de error
    delete_error_message = () => {
        this.setState({ mensaje_error: null });
    }
    render() {
        return (
            <div className="center-block">
            <h2>Remember Words in English</h2>
            <h2>- LOGIN -</h2>
            <p>Enter the following data</p>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input type="text"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        onChange={this.selecting_user_dates}
                        required />
                </div>
                <div className="form-group">
                    <input type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={this.selecting_user_dates}
                        required />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        Access
        </button>
                </div>
            </form>
            <div className="form-group">
                <MensajeError mensaje_error={this.state.mensaje_error} delete_error_message={this.delete_error_message} />
            </div>
        </div>
        )
    }
}
