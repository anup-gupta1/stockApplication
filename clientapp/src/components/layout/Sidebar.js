
import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import FlexDiv from '../common/FlexDiv';
import Icon from "../common/Icon";
import { links } from "../../utils/sidebarLinks";


const SidebarCont = styled(FlexDiv)`
position: fixed;
top: 0;
bottom: 0;
width: 50px;
border-right: solid 1px grey;
height: 100vh;
background: #fff;
`;

const Sidebar = (props) => {
    return (
        <SidebarCont fd="column" wid="100%" pd="24px 0px" ai="center">
            {links.map((item) => (
                <FlexDiv mt="32">
                    <Link to={item.url}><Icon icon={item.name} clr={props.type === item.name ? "#33547d" : "#aaaea8"} /></Link>
                </FlexDiv>
            ))}
        </SidebarCont>
    );
}

export default Sidebar;
