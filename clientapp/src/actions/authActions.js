import { SET_CURRENT_USER, SET_AUTH_ERROR, SET_USER, SET_STOCKS } from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import io from 'socket.io-client';
import { updateStock } from './stockActions';
export const socket = io('/stock');

export const setCurrentUser = decoded => ({
    type: SET_CURRENT_USER,
    payload: decoded,
});


export const setError = error => ({
    type: SET_AUTH_ERROR,
    error
});

export const setUser = user => ({
    type: SET_USER,
    user,
})

/**
 * action creator to register user
 * @param {name, email, password, confirmPassword} userData 
 */
export const registerUser = (userData, push) => async (dispatch) => {
    try {
        const res = await axios.post('/api/auth/register', userData);
        if (res.data.success) {
            dispatch(setError({}))
            push('/login');
        }
    } catch (err) {
        const { response: { data: { error } } } = err;
        dispatch(setError(error))
        console.error(err);
    }
}

/**
 * action creator to login user
 * @param {email, password} data 
 */
export const loginUser = (data, push) => async (dispatch) => {
    try {
        const res = await axios.post('/api/auth/login', data);
        const { data: { success, token } } = res;
        if (success) {

            //set token to local storage
            localStorage.setItem('jwtToken', token);

            //set token to axios Auth Header
            setAuthToken(token);

            // call api to get current user info
            dispatch(getCurrentUser());

            //Decode token to get user data
            const decoded = jwt_decode(token);

            //Initiate a login session for user
            dispatch(setCurrentUser(decoded));

            push('/dashboard');
        }
    } catch (err) {
        const { response: { data: { error } } } = err;
        dispatch(setError(error))
        console.error(err);
    }
};


/**
 * action creator to get current user Info
 */
export const getCurrentUser = () => async (dispatch) => {
    try {
        const res = await axios.get(`/api/auth/`);
        const { data: { success, user } } = res;
        if (success) {
            dispatch(setUser(user));
            socket.emit('initClientInfo', { userId: user._id });
            socket.on('update-stock', (data) => {
                const { change, updatedStock } = data;
                console.log("------ updated stock --------", updatedStock)
                dispatch(updateStock(updatedStock))
            })
        }
    } catch (err) {
        console.error(err);
    }
}

/**
 * logout user from app
 */
export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    dispatch(setCurrentUser({}))
}

/**
 * reset the error fields
 */
export const resetError = () => dispatch => {
    dispatch(setError({}));
}

