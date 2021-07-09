import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

export default class mensajeError extends Component {

  render() {
    if (!this.props.mensaje_error) {
      return null;
    }
    return (
      <div className="container" >
        <div className="alert alert-dark bg-danger text-white p-0" role="alert">
          <span className="block">{this.props.mensaje_error}</span>
          <button className=" btn bg-transparent" onClick={this.props.delete_error_message}>
            <FontAwesomeIcon icon={faTimesCircle} color="white" />
          </button>
        </div>
      </div>
    );
  }
}
