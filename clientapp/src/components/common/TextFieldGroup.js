
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import FlexDiv from './FlexDiv';
import Icon from './Icon';
import { PTag } from './PTag';
import './common.css';

const TextFieldGroup = ({
    name,
    value,
    type,
    placeholder,
    label,
    error,
    onChange,
    disabled
}) => {
    return (
        <FlexDiv fd="column" mb="16" className="form-group">
            
            <FlexDiv jc="space-between">
                <FlexDiv>
                    {label && <label className={classnames("form_label")} htmlFor={name}>{label}</label>}
                    {error && <PTag clr="red" fs="12px" mr="0px">( {error} )</PTag>}
                </FlexDiv>
                <Icon icon={error ? "mood" : "mood_bad"} clr={error ? "red" :"#43d343" } />
            </FlexDiv>
            <input
                type={type}
                value={value}
                className={classnames("form-control input-field", { 'is-valid': error })}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
            />
        </FlexDiv>
    )
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;