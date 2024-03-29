import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Pagination from "react-js-pagination";

import RecursoNoExiste from '../../../1_General/RecursoNoExiste';
import Main from '../../../1_General/Main';
import Navigation from '../../../1_General/Navigation';
import SpinnerButtonDeleting from './SpinnerButtonDeleting';
import ModalDelete from './ModalDelete';
import LoadingClock from '../../../1_General/LoadingClock';

//Importar funiones auxiliares
import { deleteWordAuxiliar } from '../../../../helpers/3_Inside/words';

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
            deletingWord: false,
            idDeletingWord: undefined,
            itemToDelete: [],
            cargandoDatos: false
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
            this.setState({ cargandoDatos: true });
            const getting = await axios.get(baseURL + kindOfWordSelected + '/' + page);
            console.log(baseURL + kindOfWordSelected + '/' + page);
            //Asignin the values por pagination that came fron the backend
            //console.log(getting.data);
            //For a reason the backend returns a string with actual_page, but it´s converted with next line
            let actual_page1 = parseInt(getting.data.actual_page, 5);
            console.log("Actual page:", actual_page1);
            if (getting.data.result.length > 0) {
                this.setState({
                    info: getting.data.result,
                    actual_page: actual_page1,
                    itemsPerPage: getting.data.itemsPerPage,
                    total: getting.data.total,
                    mensajeSinElementos: false
                }, function () {
                    //console.log(this.state.actual_page);
                    //console.log(this.state.itemsPerPage)
                });
            } else {
                this.setState({ mensajeSinElementos: true });
            }
            this.setState({ cargandoDatos: false });
        } catch (error) {
            console.log(error);
            this.setState({ cargandoDatos: false });
        }
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

    componentDidMount() {
        this.getInfo();
        this.onClickPDF();
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
    functionToDeleteWord = async (urlToDelete, id) => {
        //For the spinner in the button
        this.setState({
            deletingWord: true,
            idDeletingWord: id
        });

        if (this.state.deletingWord) {
            return;
        }
        //1.- Deleting the word fron the db in backend
        //This function is in helpers folder
        const eliminationResult = await deleteWordAuxiliar(urlToDelete, id, this.state.info);
        if (eliminationResult === false) {
            window.alert("The word could not be removed");
        } else {
        }
        //2.- Updating the state
        this.setState({
            deletingWord: false
        });
        this.getInfo();
    }

    handlePageChange(pageNumber) {
        //console.log(`active page is ${pageNumber}`);
        this.setState({ actual_page: pageNumber }, function () {
            this.getInfo();
        });
    }

    handleOpenModal(idToDelete) {
        this.state.info.forEach((element, index, array) => {
            if (element._id === idToDelete) {
                this.setState({ itemToDelete: array[index] }, function () {
                })
            }
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
                <Navigation signoff={this.props.signoff} />
                {mostrarMensaje
                    ? (
                        <>
                            <Main verticalCenter>
                                <RecursoNoExiste
                                    mensajeOne={`You haven't added words in this section yet`}
                                    mensajeTwo={'Add one'}
                                    link={'/new_word'}
                                />
                            </Main>
                        </>
                    ) : (
                        <div className="container">
                            {/** ------------------------------*/}
                            {/**Getting words */}
                            {/** ------------------------------*/}
                            {this.state.cargandoDatos
                                ?
                                (<>
                                    <LoadingClock color={'#fff'}/>
                                </>)
                                :
                                (<>
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
                                                            <Link
                                                                className="btn btn-info" to={'/edit_' + this.state.urlToEdit + '/' + inf._id}
                                                            >Edit
                                                            </Link>

                                                            <button
                                                                onClick={() => this.handleOpenModal(inf._id)}
                                                                type="button"
                                                                className="btn btn-info"
                                                                data-toggle="modal"
                                                                data-target="#exampleModal"
                                                            >
                                                                <SpinnerButtonDeleting
                                                                    deletingWord={this.state.deletingWord}//True or false
                                                                    idDeletingWord={this.state.idDeletingWord}//The other id.
                                                                    idActual={inf._id}//Id a eliminar
                                                                />
                                                                Delete
                                                            </button>
                                                        </div>
                                                        {/* <div>{JSON.stringify(inf._id)}</div> */}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table >


                                    <ModalDelete
                                        functionToDeleteWord={this.functionToDeleteWord}
                                        urlToEdit={this.state.urlToEdit}
                                        itemToDelete={this.state.itemToDelete}
                                    />

                                    {/** ------------------------------*/}
                                    {/**Getting buttom to get PDF */}
                                    {/** ------------------------------*/}
                                    <div className="container mt-3">
                                        <div className="d-flex justify-content-center">
                                            <Link className="btn btn-success" to="/PDF">
                                                Get PDF
                                            </Link>
                                        </div>
                                    </div>
                                    {/** ------------------------------*/}
                                    {/**Inseting Pagination */}
                                    {/** ------------------------------*/}
                                    {
                                        this.state.total > 5 &&
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
                                </>)}
                        </div >
                    )
                }
            </>
        )
    }
}

