
import React from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import FlexDiv from '../common/FlexDiv';
import { PTag } from '../common/PTag';
import ProfilePic from "../common/ProfilePic";

const HeaderCont = styled(FlexDiv)`
position: fixed;
right: 0;
top: 0;
left:50px;
height: 50px;
border-bottom: solid 1px grey;
padding: 0px 24px;
background: #fff;
`;

const title = {
    dashboard: 'Dashboard',
    edit: 'Edit Profile',
    delete: 'Delete Profile',
}

const Header = (props) => {

    const user = useSelector(state => state.auth.user);
    const { fName, lName } = user;

    return (
        <HeaderCont jc="space-between" ai="center">
            <PTag mr="0" clr="#9E9E9E" fs="16px" fw="600" >{title[props.type]}</PTag>
            {fName && <ProfilePic fName={fName} lName={lName} />}
        </HeaderCont>
    );
}

export default Header;
