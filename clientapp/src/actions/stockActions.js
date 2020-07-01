import { SET_STOCKS, UPDATE_STOCK } from './types';
import axios from 'axios';

/**
 * action to set stock
 */
export const setStocks = (stocks) => ({
    type: SET_STOCKS,
    stocks
})


/**
 * action to update change in a stock
 */
export const updateStock = (stock) => ({
    type: UPDATE_STOCK,
    stock
})


/**
 * action creator to get companies stock
 */
export const getStocks = () => async (dispatch) => {
    try {
        const res = await axios.get(`/api/stock/`);
        const { data: { success, stocks } } = res;
        if (success) {
            console.log("------ action ------", stocks)
            dispatch(setStocks(stocks));
        }
    } catch (err) {
        console.error(err);
    }
}

