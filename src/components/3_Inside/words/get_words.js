import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Pagination from "react-js-pagination";

import RecursoNoExiste from '../../1_General/RecursoNoExiste';

const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

export default class get_words extends Component {
    //--------------------------------------------------
    //--------------- 1.- MOUNTING ---------------------
    //--------------------------------------------------
    constructor(props) {
        super(props);
        this.state = {
            info: [],//Here we´ll load the backend´s answer
            the_path: undefined, //Here we'll set the backend´s URL to make the request depending of the king of word
            actual_page: 1,
            itemsPerPage: 0,
            total: 0,
            urlToEdit: undefined,
            mensajeSinElementos: false,
        };
    }

    //--------------------------------------------------
    UNSAFE_componentWillMount() {
        //Here, we define the nouns, verbs, adjectives or other words,
        //depending of the path.
        this.setState(
            () => {
                let the_path, urlToEdit;
                if (this.props.match.path === '/get_nouns') {
                    the_path = '/words/nouns'; urlToEdit = 'noun';
                }
                if (this.props.match.path === '/get_verbs') {
                    the_path = '/words/verbs'; urlToEdit = 'verb';
                }
                if (this.props.match.path === '/get_adjectives') {
                    the_path = '/words/adjectives'; urlToEdit = 'adjective';
                }
                if (this.props.match.path === '/get_others') {
                    the_path = '/words/other_words'; urlToEdit = 'other_word'
                }
                return { the_path, urlToEdit };
            }
        );
    }

    //--------------------------------------------------
    getInfo = async () => {
        let kindOfWordSelected = this.state.the_path;
        let page = this.state.actual_page;
        //console.log(baseURL + kindOfWordSelected + '/' + page)
        try {
            const getting = await axios.get(baseURL + kindOfWordSelected + '/' + page);
            //Asignin the values por pagination that came fron the backend
            //console.log(getting.data);
            //For a reason the backend returns a string with actual_page, but it´s converted with next line
            let actual_page1 = parseInt(getting.data.actual_page, 10);
            console.log('Hola', getting.data.result);
            if (getting.data.result.length > 0) {
                this.setState({
                    info: getting.data.result,
                    actual_page: actual_page1,
                    itemsPerPage: getting.data.itemsPerPage,
                    total: getting.data.total
                }, function () {
                    //console.log(this.state.actual_page);
                    //console.log(this.state.itemsPerPage)
                    //console.log(this.state.total);
                });
            } else {
                this.setState({ mensajeSinElementos: true });
            }
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        //console.log(this.state)
        this.getInfo();
    }
    //--------------------------------------------------
    //--------------- 2.- UPGRATE ---------------------
    //--------------------------------------------------
    UNSAFE_componentWillReceiveProps(nextProps) {
        //KNOWING THE PAST PATH/ROUTE AND THE NEW PATH/ROUTE
        //console.log(nextProps.match.path);
        //console.log(this.state.the_path);
        //Comparing the old path with the new path
        //console.log(nextProps);
        if (nextProps.match.path !== this.state.the_path) {
            this.setState(
                () => {
                    let the_path, urlToEdit;
                    if (nextProps.match.path === '/get_nouns') {
                        the_path = '/words/nouns'; urlToEdit = 'noun';
                    }
                    if (nextProps.match.path === '/get_verbs') {
                        the_path = '/words/verbs'; urlToEdit = 'verb';
                    }
                    if (nextProps.match.path === '/get_adjectives') {
                        the_path = '/words/adjectives'; urlToEdit = 'adjective';
                    }
                    if (nextProps.match.path === '/get_others') {
                        the_path = '/words/other_words'; urlToEdit = 'other_word';
                    }
                    return { the_path, urlToEdit, actual_page: 1 };
                },
                async () => {
                    //console.log(this.state.urlToEdit)
                    await this.getInfo();
                }
            );
        }
    }
    //Deleting word
    deleteWord = async (id) => {
        await axios.delete(baseURL + '/words/noun/' + id);
        this.getInfo();
    }
    onClickPDF = () => {
        let frontEndPath = this.props.match.path;
        let backEndPath = undefined;
        if (frontEndPath === '/get_nouns') backEndPath = '/words/noun';
        if (frontEndPath === '/get_verbs') backEndPath = '/words/verb';
        if (frontEndPath === '/get_others') backEndPath = '/words/other_word';
        if (frontEndPath === '/get_adjectives') backEndPath = '/words/adjective';
        try {
            this.props.wordSelectedForPDF(backEndPath);
        } catch (error) {
            console.log(error)
        }
    }
    handlePageChange(pageNumber) {
        //console.log(`active page is ${pageNumber}`);
        this.setState({ actual_page: pageNumber }, function () {
            this.getInfo();
        });

    }
    //--------------------------------------------------
    //--------------- 2.- UPGRATE ---------------------
    //--------------------------------------------------

    render() {
        //This varaible will be used to know if the pagintaion will be shown
        const mostrarMensaje = this.state.mensajeSinElementos
        return (
            <>
                { mostrarMensaje
                    ? (
                        <div className="container pt-3">
                            <RecursoNoExiste
                                mensajeOne={`You haven't added words in this section yet`}
                                mensajeTwo={'Add one'}
                                link={'/new_word'}
                            />
                        </div>
                    ) : (
                        <div className="container">
                            <table className="table table-striped text-center mt-3">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Word</th>
                                        <th scope="col">Track</th>
                                        <th scope="col">Meaning</th>
                                        <th scope="col">Operations</th>
                                    </tr >
                                </thead >

                                <tbody>
                                    {this.state.info.map((inf, index) => (
                                        <tr key={inf._id}>
                                            <th scope="row">{index + 1}
                                            </th>
                                            <td>{inf.word}</td>
                                            <td>{inf.track}</td>
                                            <td>{inf.meaning}</td>
                                            <td>
                                                <div className="btn-group">
                                                    <Link className="btn btn-info" to={'/edit_' + this.state.urlToEdit + '/' + inf._id}>Edit</Link>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => this.deleteWord(inf._id)}>
                                                        Delete
                                        </button>
                                                </div>
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table >
                            <div className="container mt-3">
                                <div className="d-flex justify-content-center">
                                    <Link className="btn btn-success" to="/PDF" onClick={this.onClickPDF}>
                                        Get PDF
                            </Link>
                                </div>
                            </div>
                            {/**Insetin Pagination */}
                            {
                                this.state.total > 3 &&
                                <div className="container mt-3">
                                    <div className="d-flex justify-content-center">

                                        <Pagination
                                            activePage={this.state.actual_page}
                                            itemsCountPerPage={this.state.itemsPerPage}
                                            totalItemsCount={this.state.total}
                                            pageRangeDisplayed={5}
                                            onChange={this.handlePageChange.bind(this)}
                                            itemClass="page-item"
                                            linkClass="page-link"
                                        />
                                    </div>
                                </div>
                            }
                        </div >
                    )
                }
            </>
        )
    }
}

