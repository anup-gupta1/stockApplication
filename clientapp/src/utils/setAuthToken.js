import axios from 'axios';

/**
 * Export default singleton.
 * @param jwt token
 */
const setAuthToken = (token) => {
    if (token) {
        //Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        //Delete Auth Heder
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthToken;