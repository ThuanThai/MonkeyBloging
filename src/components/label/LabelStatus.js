import React from "react";
import styled, { css } from "styled-components";

const LabelStatusStyle = styled.div`
    display: inline-block;
    padding: 10px 15px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    width: 120px;
    text-align: center;
    ${(props) =>
        props.children === "Approved"
            ? css`
                  background-color: #ecffdc;
                  color: #0bda51;
              `
            : css`
                  background-color: #f3baca;
                  color: #f34e7d;
              `};
`;

const LabelStatus = ({ children, type = "fail" }) => {
    return <LabelStatusStyle>{children}</LabelStatusStyle>;
};

export default LabelStatus;
