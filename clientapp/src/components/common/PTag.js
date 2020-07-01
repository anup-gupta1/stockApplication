import styled from "styled-components";


export const PTag = styled.p`
${(props) => props.mr && `margin: ${props.mr};`}
${(props) => props.wid && `width: ${props.wid};`}
${(props) => props.clr && `color: ${props.clr};`}
${(props) => props.fw && `font-weight: ${props.fw};`}
${(props) => props.fs && `font-size: ${props.fs};`}
${(props) => props.ta && `text-align: ${props.ta};`}
`;
