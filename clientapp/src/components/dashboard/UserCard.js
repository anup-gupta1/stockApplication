import React from "react";
import styled from "styled-components";
import FlexDiv from '../common/FlexDiv';
import { PTag } from '../common/PTag';
import ProfilePic from "../common/ProfilePic";
import InfoTag from "./InfoTag";

const UserCont = styled(FlexDiv)`
border-radius: 4px;
color: rgba(0, 0, 0, 0.87);
transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);
background-color: #fff;
margin: 12px;
min-width: 160px;
`;

const UserCard = (props) => {
    const { user: { fName, lName, email } } = props;

    return (
        <UserCont fd="column" jc="center" ai="center" pd="12px">
            <ProfilePic lName={lName} fName={fName} />
            <PTag fw="600">{`${fName} ${lName}`}</PTag>
            <InfoTag icon="email" value={email} />
            <InfoTag icon="phone" value="+91264012345" />
        </UserCont>
    );
}

export default UserCard;
