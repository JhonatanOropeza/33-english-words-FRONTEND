import axios from 'axios';

const TOKEN_KEY = 'CLONTAGRAM_TOKEN';

//1.- Colocando TOKEN en el localStorage
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

//2.- Obteniendo TOKEN del localStorage
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

//3.- Eliminado el TOKEN del localStorage
export function deleteToken() {
  localStorage.removeItem(TOKEN_KEY);
}

//4.- Colocando el TOKEN en la cabecera
//para poder realizar peticiones al backend
export function gettingTokenFromLocalStorage() {
  //se usa request pues queremos se agregue el token cuando hay petición request
  axios.interceptors.request.use(function(config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  });
 
  axios.interceptors.response.use(
    //si la llamada al servidor es exitosa, pasa y un hadler se encargara
    //de la respuesta, ej await axios.get-post
    function(response) {
      return response;
    },
    //Para la manipulación de errores
    function(error) {
      if (error.response.status === 401) {
        deleteToken();
        window.location = '/';
      } else {
        return Promise.reject(error);
      }
    }
  );
}
  