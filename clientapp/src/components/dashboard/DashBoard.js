import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexDiv from '../common/FlexDiv';
import PageLayout from "../layout/PageLayout";
import StockItem from "../stock/StockItem";
import { getStocks } from "../../actions/stockActions";

const DashBoard = (props) => {
    const dispatch = useDispatch();
    const stocks = useSelector(state => state.stock.stocks)
    const auth = useSelector(state => state.auth)
    const { history: { push } } = props;
    useEffect(() => {
        if (auth.isAuthenticated) {
            dispatch(getStocks());
        } else {
            push('/login');
        }
    }, []);

    return (
        <PageLayout type="dashboard">
            <FlexDiv fw="wrap">
                {stocks.length > 0 ? stocks.map((stock) => (
                    <StockItem key={stock._id} stock={stock} />
                )) : null}
            </FlexDiv>
        </PageLayout>
    );
}

export default DashBoard;
