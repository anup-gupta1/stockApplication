import React from 'react';
import styled from 'styled-components';

const I = styled.i`
    ${(props) => props.clr && `color: ${props.clr};` }
    ${(props) => props.fs && `font-size: ${props.fs};`}
    ${(props) => props.mr && `margin-right: ${props.mr};` }
    ${(props) => props.ml && `margin-left: ${props.ml};` }
`

const Icon = props => {
    const { icon } = props
	return <I {...props} className="material-icons">{icon}</I>
}

export default Icon;