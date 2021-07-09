import React, { Component } from 'react'

import axios from 'axios'
import MensajeError from '../1_General/mensajeError'
import MensajeSuccess from '../1_General/mensajeSuccess'
import ButtonLogin from '../2_Access/buttonLogin'

const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

export default class logup extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        mensaje_error: null,
        mensaje_success: null
    }
    
    onSubmit = async (e) => {
        e.preventDefault();
        //To desappear success, mensaje_success= null
        this.delete_success_message();
        this.delete_error_message();
        //Preapring dates because they will be processed
        //Here this.props = {signin: f};
        const new_user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        //Using function sigup from App,js
        try {
            const { data } = await axios.post(baseURL + '/signup', new_user);
            if (data) {
                this.show_success(data.message);
            }
        } catch (error) {
            console.log(error);
            this.show_error(error.response.data.error);
        }
    }
    //Evento cuando hay cambios en cualquiera de los input
    //La referencia para el guardado de datos es "name"
    selecting_user_dates = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        //console.log(this.state);
    }
    //Mostrando error
    show_error = (mensaje) => {
        this.setState({ mensaje_error: mensaje });
    }
    show_success = (mensaje) => {
        this.setState({ mensaje_success: mensaje });
    }
    //Eliminado mensahae de error
    delete_error_message = () => {
        this.setState({ mensaje_error: null });
    }
    delete_success_message = () => {
        this.setState({ mensaje_success: null });
    }
    render() {
        const StyleButtom = {
            marginLeft: '5px',
            marginRight: '5px'
        }
        return (
            <div className="center-block">
                <h2>Remember Words in English</h2>
                <h2>- LOGUP -</h2>
                <p>To get your register,<br></br> enter the following data</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Username"
                            name="username"
                            onChange={this.selecting_user_dates}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            onChange={this.selecting_user_dates}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input type="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            onChange={this.selecting_user_dates}

                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">
                            Logup
                                    </button>
                        <ButtonLogin mensaje_success={this.state.mensaje_success} />
                    </div>
                </form>
                {/* The next 2 messages will be shown depending of the response of the backend*/}
                <div className="form-group" style={StyleButtom}>
                    <MensajeError mensaje_error={this.state.mensaje_error} delete_error_message={this.delete_error_message} />
                </div>
                <div className="form-group">
                    <MensajeSuccess mensaje_success={this.state.mensaje_success} delete_success_message={this.delete_success_message} />
                </div>
            </div>
        )
    }
}
