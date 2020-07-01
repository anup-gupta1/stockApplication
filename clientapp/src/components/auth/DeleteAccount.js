import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import FlexDiv from '../common/FlexDiv';
import { PTag } from '../common/PTag';
import '../common/common.css';
import { deleteUser } from '../../actions/authActions';
import PageLayout from "../layout/PageLayout";

const DeleteCont = styled(FlexDiv)`
background: #f6f6f6;
border-radius: 4px;
transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12;
`;

const DeleteAccount = (props) => {
    const dispatch = useDispatch();

    const { history: { push } } = props;

    const removeAccount = () => {
        dispatch(deleteUser(push));
    }

    return (
        <PageLayout type="delete">
            <FlexDiv ai="center" jc="center">
                <DeleteCont fd="column" pd="24px" ai="center">
                    <PTag>Delete your Account</PTag>
                    <button className="danger_btn" onClick={removeAccount}>Delete</button>
                </DeleteCont>
            </FlexDiv>
        </PageLayout>
    )
}

export default DeleteAccount;