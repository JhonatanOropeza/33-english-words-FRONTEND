import React, { Component } from 'react'

export default class ModalDelete extends Component {
    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            Are you sure to delete the word {this.props.itemToDelete.word}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => this.props.functionToDeleteWord(this.props.urlToEdit, this.props.itemToDelete._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}