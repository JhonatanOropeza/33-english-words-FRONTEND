import axios from 'axios'

const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

//1.- Function to delete a word from the list.
export async function deleteWordAuxiliar(urlToDelete, id) {
    //console.log(arreglo)
    try {
        if (urlToDelete === 'noun') {
            await axios.delete(baseURL + '/words/noun/' + id);
        }
        if (urlToDelete === 'verb') {
            await axios.delete(baseURL + '/words/verb/' + id);
        }
        if (urlToDelete === 'adjective') {
            await axios.delete(baseURL + '/words/adjective/' + id);
        }
        if (urlToDelete === 'other_word') {
            await axios.delete(baseURL + '/words/other_word/' + id);
        }
        return true;
    } catch (error) {
        return false;
    }
}