import { SET_CURRENT_USER, SET_USERS, UPDATE_USER, SET_AUTH_ERROR, SET_USER } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {},
    users: [],
    error: {},
};


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: action.payload.id ? true : false,
            };
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        case SET_AUTH_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state
    }
}
