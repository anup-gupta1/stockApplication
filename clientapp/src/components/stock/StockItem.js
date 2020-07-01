import React, {useState, useEffect} from "react";
import moment from 'moment';
import styled from 'styled-components';
import FlexDiv from '../common/FlexDiv';
import { PTag } from "../common/PTag";
import Icon from "../common/Icon";

const StockItemCont = styled(FlexDiv)`
border : solid 1px grey;
margin: 8px;
min-width: 360px;
background: ${(props) => props.bg};
`;


const StockItem = (props) => {
    const [fw, setFw] = useState('');
    const { stock: { open, current, symbol, name, currency } } = props;
    const change = (current - open)
    const changePerCent = (change * 100) / open;
    const icon = changePerCent < 0 ? 'south' : 'north';
    const clr = changePerCent < 0 ? 'red' : 'green';
    useEffect(() => {
        setFw('bold');
        setTimeout(() => {
            setFw('')
        },10000)
    }, [current])
    return (
        <StockItemCont fd="column" pd="12px" mr="8px" bg={fw ? '#cc89f5' : '#fff'}>
            <PTag fw="bold" mr="4px 0px">{name}</PTag>
            <PTag clr="#a6a2a8" mr="0">{moment().format('MMMM Do YYYY')}</PTag>
            <FlexDiv>
                <PTag mr="0px 16px 0px 0px">Symbol</PTag>
                <PTag mr="0">{symbol}</PTag>
            </FlexDiv>
            <FlexDiv>
                <PTag mr="0px 16px 0px 0px">Currency</PTag>
                <PTag mr="0">{currency}</PTag>
            </FlexDiv>
            <FlexDiv>
                <PTag mr="0px 16px 0px 0px">Open</PTag>
                <PTag mr="0">{open}</PTag>
            </FlexDiv>
            <FlexDiv>
                <PTag mr="0px 16px 0px 0px">Current</PTag>
                <PTag mr="0">{current}</PTag>
            </FlexDiv>
            <FlexDiv>
                <PTag mr="0px 16px 0px 0px">Change</PTag>
                <FlexDiv>
                <PTag mr="0" clr={clr} fw={fw}>{`${change.toFixed(4)}(${changePerCent.toFixed(2)}%)`}</PTag>
                <Icon clr={clr} fw={fw} icon={icon} />
                </FlexDiv>
            </FlexDiv>
        </StockItemCont>
    );
}

export default StockItem;
