
import React from "react";
import FlexDiv from '../common/FlexDiv';
import { PTag } from '../common/PTag';
import Icon from "../common/Icon";

const InfoTag = (props) => {
    const { icon, value } = props;
    return (
        <FlexDiv jc="space-between" ai="center" wid="100%" mt="10">
            <Icon icon={icon} clr="#9E9E9E" fs="12px" />
            <PTag mr="0" clr="#9E9E9E" fs="12px" >{value}</PTag>
        </FlexDiv>
    );
}

export default InfoTag;
