import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class first extends Component {

    render() {
        /* This style is to put a space between the buttoms Signin y SignUp */
        const StyleButtom = {
            marginLeft: '5px',
            marginRight: '5px'
        }
        return (
            <div>
                <h2>Remember Words in English</h2>
                <p>This is a simple application where you will be able to store words in english that you´re trying to learn or memorize. Here, the words are sorted in four categories (nouns, verbs, adjetives and "other words")</p>
                <h4>Enjoy it!</h4 >
                <br></br>
                <div className="container">
                    <Link className="btn btn-danger" to="/signin" style={StyleButtom}>Signin</Link>
                    <Link className="btn btn-danger " to="/signup" style={StyleButtom}>Signup</Link>
                </div>
            </div>
        )
    }
}
