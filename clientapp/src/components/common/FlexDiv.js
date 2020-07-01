import styled from 'styled-components';

const FlexDiv = styled.div`
	display: flex;
    ${props => props.jc && `justify-content:${props.jc};`}
    ${props => props.fd && `flex-direction:${props.fd};`}
    ${props => props.ai && `align-items:${props.ai};`}
    ${props => props.as && `align-self: ${props.as};`}
	${props => props.wid && `width:${props.wid};`}
	${props => props.height && `height: ${props.height};`}
	${props => props.mt && `margin-top: ${props.mt}px;`}
    ${props => props.mb && `margin-bottom:${props.mb}px;`}
    ${props => props.pd && `padding: ${props.pd};`}
    ${props => props.fw && `flex-wrap: ${props.fw};`}
`

export const SideInfo = styled(FlexDiv)`
${props => props.imgUrl && `background-image: url('${props.imgUrl}');`}
width: 50%;
background-repeat: no-repeat;
background-size: cover;
`;


export default FlexDiv;
