
import React from "react";
import styled from 'styled-components'
import Header from "./Header";
import Sidebar from "./Sidebar";
import { socket } from '../../actions/authActions'

const PageContent = styled.div`
padding: 50px 0px 0px 50px;
height: calc(100vh - 50px);
background: #f6f9fa;
`;

const PageLayout = (props) => {
    console.log("---- socket --------", socket);
    const { children, type } = props;
    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <Header type={type} />
            <Sidebar type={type} />
            <PageContent className="content">
                {React.Children.toArray(children)}
            </PageContent>
        </div>
    )
}

export default PageLayout;
