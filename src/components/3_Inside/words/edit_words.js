import React, { Component } from 'react'
import axios from 'axios'

const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

export default class edit_words extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            track: '',
            meaning: '',
            type: '',
            _id: '',
            path: '', //To complete the url to make the get petition to the backend
        };
    }

    UNSAFE_componentWillMount() {
        let path = this.props.match.path;
        this.setState(
            () => {
                if (path === '/edit_noun/:id') path = 'noun';
                if (path === '/edit_verb/:id') path = 'verb';
                if (path === '/edit_adjective/:id') path = 'adjective';
                if (path === '/edit_other_word/:id') path = 'other_word';
                return { path }
            }
        )
    }
//1.- getting the id of the word to edti
//2.- By the id the word will be find in the collections
//3.- Asign the dates of the search to the state
get_elements = async () => {
    //console.log(this.props);
    const id = this.props.match.params.id;
    const path = this.state.path;
                //http://localhost:3003/api/auth/words/verb/:id
    const answer = await axios.get(baseURL + '/words/'+ path + '/' + id);
    //console.log(answer.data);
    this.setState({
        word: answer.data.word,
        track: answer.data.track,
        meaning: answer.data.meaning,
        type: answer.data.type,
        _id: this.props.match.params.id
    });
}

componentDidMount() {
    this.get_elements();
}

onSubmit = async (e) => {
    e.preventDefault();
    //Preparando datos para almacenar
    const wordChanged = {
        word: this.state.word,
        track: this.state.track,
        meaning: this.state.meaning,
        type: this.state.type
    }
    //Saving the new word into the correct collection 
    if (this.state.type === 'noun') {
        await axios.put(baseURL + '/words/noun/' + this.state._id, wordChanged);
        window.alert("The noun was modified");
    } else if (this.state.type === 'verb') {
        await axios.put(baseURL + '/words/verb/' + this.state._id, wordChanged);
        window.alert("The verb was modified");
    } else if (this.state.type === 'adjective') {
        await axios.put(baseURL + '/words/adjective/' + this.state._id, wordChanged);
        window.alert("The adjective was modified");
    } else if (this.state.type === 'other') {
        await axios.put(baseURL + '/words/other_word/' + this.state._id, wordChanged);
        window.alert("The other word was modified");
    } else {
        window.alert("Word cannot be stored");
    }
    //Refrescando la página
    const kindOfWOrd = this.state.type;
    window.location.href = '/get_' + kindOfWOrd;

}

selecting_user_dates = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
}

render() {
    return (
        <>
            <div className="container">
                <div className="container mt-3">
                    <div className="col-md-6 offset-md-3">
                        <div className="card card-body">
                            <h4>Edit the word</h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    {/* 1.- Edting the word */}
                                    <div className="form-group">
                                        <h6>Word</h6>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Insert the new word"
                                            name="word"
                                            onChange={this.selecting_user_dates}
                                            value={this.state.word}
                                            required />
                                    </div>
                                    {/* 2.- Editing the track */}
                                    <div className="form-group">
                                        <h6>Track</h6>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Insert the track"
                                            name="track"
                                            onChange={this.selecting_user_dates}
                                            value={this.state.track}
                                            required />
                                    </div>
                                    {/* 3.- Editing the meaning*/}
                                    <div className="form-group">
                                        <h6>Meaning</h6>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Insert the meaning"
                                            name="meaning"
                                            onChange={this.selecting_user_dates}
                                            value={this.state.meaning}
                                            required />
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

