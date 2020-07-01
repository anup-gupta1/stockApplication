
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import stockReducer from './stockReducer';

export default combineReducers({
    auth: authReducer,
    stock: stockReducer
});