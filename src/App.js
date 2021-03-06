//1.- IMPORTING LIBRERIAS
import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"

//2.- IMPORTING CSS STYLES
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './components/1_General/loading.css'
import './components/2_Access/welcome.css'

//3.- IMPORTING COMPONENTS
import {
  setToken,
  deleteToken,
  gettingTokenFromLocalStorage,
  getToken
} from './helpers/auth-helpers';
import PrincipalNoLogin from './components/2_Access/PrincipalNoLogin';
import Loading from './components/1_General/Loading'
//import Mensaje_error from './components/mensaje_error'

// IMPORTING COMPONENRS FOR HOME COMPONENT
import Navigation from './components/1_General/Navigation';
import InsertWord from './components/3_Inside/words/Insert_word'
import Play from './components/3_Inside/Play/Play'
import GetWords from './components/3_Inside/words/get_words'
import EditWords from './components/3_Inside/words/edit_words'
import WordsInPDF from './components/3_Inside/PDF/wordsInPDF'

gettingTokenFromLocalStorage();//and loading the token in the header as bearer
const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

export default class App extends Component {
  //1.- Estado del componente
  state = {
    usuario: null,
    cargando_usuario: true,
    pathWordsInPDF: undefined
  };
  //2.- ComponentDidMount()
  componentDidMount() {
    //Cargando usuario
    let self = this;
    async function cargarUsuario() {
      //Si no hay usuario es porque no hay token
      if (!getToken()) {
        self.setState({ cargando_usuario: false });
        self.setState({ usuario: null });
        return;
      }
      //else. Si hay token, solcitamos datos del usuario conforme a 
      //credenciales del usuario en el token
      //let { data } = await axios.get('http://localhost:3003/api/auth/whoiam');
      let { data } = await axios.get(baseURL + '/whoiam');
      //console.log(data);
      self.setState({ usuario: data });
      self.setState({ cargando_usuario: false });
    }
    cargarUsuario();
  }
  //3.- Funciones de peticiones singin, signup y signoff
  // 3.1.- Signin 
  signin = async (user_to_check) => {
    const { data } = await axios.post(baseURL + '/signin', user_to_check);
    this.setState({ usuario: data.user })
    setToken(data.token);
    //console.log(this.state.usuario)//Showing credentials

  }
  //3.2.- signoff
  signoff = () => {
    this.setState({ usuario: null });
    deleteToken();
  }

  //3.- Funcione para mostrar PDF de acuerdo a la palabra solicitar
  wordSelectedForPDF = (kind) => {
    //console.log('App')
    const pathWordsInPDF = kind;
    this.setState({ pathWordsInPDF }, () => {
      //console.log(this.state.pathWordsInPDF)
    });
  }

  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  //--------------------  4.- Rendering the principal component
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  render() {
    //**Si cargando_usuario === true, se mostrará the spinner */
    if (this.state.cargando_usuario) {
      return (
        <Loading />
      );
    } else {
      return (
        <>
          <Router>
            {/** A)Si hay usuario, mostramos perfil */}
            {/** B)Si NO hay usuario, mostramos login */}
            {this.state.usuario ? (
              <Principal signoff={this.signoff} usuario={this.usuario} wordSelectedForPDF={this.wordSelectedForPDF} pathWordsInPDF={this.state.pathWordsInPDF} userForPDF={this.state.usuario} />
            ) : (
                <ToAccess
                  signin={this.signin}
                />
              )}
            {/**<div>{JSON.stringify(this.state.usuario)}</div>*/}
          </Router>
        </>
      )
    }
  }
}
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//--------  5.- Components used to send props in LOGIN/LOGUP ----------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

//To Access contains the video and the transparency of the Login
class ToAccess extends Component {
  render() {
    return (
      <Switch>
        <Route path="/signin" render={() => <PrincipalNoLogin option={1} signin={this.props.signin} />} />
        <Route path="/signup" render={() => <PrincipalNoLogin option={2}/>} />
        <Route render={() => <PrincipalNoLogin option={0}/>} default />
      </Switch>
    )
  }
}

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//-----------  6.- ROUTER FOR THE APP (When the user signup) ----------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
class Principal extends Component {
  render() {
    //To principal will arrive the next 2 props:
    // 1.- this.props.wordSelectedForPDF (used to FUNCTION that will select what kind of word we are using)
    // 2.- this.prps.pathWordInPDF (used to send the state with the kind of word selected for show in the PDF)
    return (
      <Router>
        <PDFLink
          pathWordsInPDF={this.props.pathWordsInPDF}
          userForPDF={this.props.userForPDF}
        />
        <Navigation signoff={this.props.signoff} />
        <Switch>
          <Route path="/new_word" render={() => <InsertWord />} />
          {/* Showing all the words by its type */}
          <Route path="/get_nouns" render={(props) => <GetWords {...props} wordSelectedForPDF={this.props.wordSelectedForPDF} />} />
          <Route path="/get_verbs" render={(props) => <GetWords {...props} wordSelectedForPDF={this.props.wordSelectedForPDF} />} />
          <Route path="/get_adjectives" render={(props) => <GetWords {...props} wordSelectedForPDF={this.props.wordSelectedForPDF} />} />
          <Route path="/get_others" render={(props) => <GetWords {...props} wordSelectedForPDF={this.props.wordSelectedForPDF} />} />
          {/* Editing the word depending of its id*/}
          <Route path="/edit_noun/:id" render={(props) => <EditWords {...props} />} />
          <Route path="/edit_verb/:id" render={(props) => <EditWords {...props} />} />
          <Route path="/edit_adjective/:id" render={(props) => <EditWords {...props} />} />
          <Route path="/edit_other_word/:id" render={(props) => <EditWords {...props} />} />
          {/* Principal and default route*/}
          <Route path="/" render={() => <Play />} default />
        </Switch>
      </Router>
    );
  }
}

class PDFLink extends Component {
  render() {
    return (
      <Switch>
        {/* Showing the pdf, in this case it´s used only one route because through the props, we decided th kind of words to use*/}
        <Route path="/PDF" render={(props) =>
          <WordsInPDF
            {...props}
            pathWordsInPDF={this.props.pathWordsInPDF}
            userForPDF={this.props.userForPDF} />}
        />
      </Switch>
    );
  }
}