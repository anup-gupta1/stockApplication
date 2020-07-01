import { SET_STOCKS, UPDATE_STOCK } from '../actions/types';

const initialState = {
    stocks: [],
};

export default function (state = initialState, action) {
    console.log("----- stocks reducer ----------",action)
    switch (action.type) {
        case SET_STOCKS:
            return {
                ...state,
                stocks: action.stocks
            };
        case UPDATE_STOCK:
            const updatedStocks = state.stocks.map(stock => stock._id !== action.stock._id ? stock : action.stock);
            return {
                ...state,
                stocks: updatedStocks,
            }
        default:
            return state
    }
}
