import React from "react";
import styled from "styled-components";
const LabelStyles = styled.label`
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    color: ${(props) => props.theme.greydark};
`;

const Label = ({ htmlFor = "", children, ...props }) => {
    return (
        <LabelStyles htmlFor={htmlFor} {...props}>
            {children}
        </LabelStyles>
    );
};

export default Label;
