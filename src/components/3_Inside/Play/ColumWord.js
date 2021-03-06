import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class ColumWord extends Component {

    render() {
        return (
            <div className="card-body d-flex align-items-center">
                {
                    Object.keys(this.props.dato).length === 0 &&
                    <div className="text-center ">
                        <p>You haven´t added any word in this group</p>
                        <Link to={'/new_word'} className="btn btn-outline-warning btn-sm">
                            Add one
                </Link>
                    </div>
                }
                {
                    Object.keys(this.props.dato).length > 0 &&
                    <div style={{ width: '100%' }} className="text-center">
                        <p> <strong>Word: </strong></p>
                        <p>{this.props.dato.word}</p>
                        {/** 2.- Printing the track */}
                        <p><strong>Track: </strong></p>
                        <p
                            className="rounded"
                            style={this.props.colores.color1 === false ? { background: 'black' } : { background: 'white' }}
                            onClick={() => this.props.change_color1(this.props.index)}
                        > {this.props.dato.track}</p>
                        {/** 3.- Printing the meaning */}
                        <p><strong>Meaning: </strong></p>
                        <p
                            className="rounded"
                            style={this.props.colores.color2 === false ? { background: 'black' } : { background: 'white' }}
                            onClick={() => this.props.change_color2(this.props.index)}
                        > {this.props.dato.meaning}</p>
                    </div>
                }
            </div>
        );
    }
}