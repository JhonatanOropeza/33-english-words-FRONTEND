import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

export default class mensajeSuccess extends Component {

  render() {
    if (!this.props.mensaje_success) {
      return null;
    }
    return (
      <div className="container" >
        <div className="alert alert-dark bg-success text-white p-1" role="alert">
          <span className="block">{this.props.mensaje_success}</span>
          <button className=" btn bg-transparent p-1" onClick={this.props.delete_success_message}>
            <FontAwesomeIcon icon={faTimesCircle} color="white"/>
          </button>
        </div>
      </div>
    );
  }
}
