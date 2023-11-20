import React from "react";
import styled, { css } from "styled-components";

const PostCategoryStyles = styled.div`
    display: inline-block;
    padding: 8px 12px;
    border-radius: 10px;
    color: ${(props) => props.theme.gray6b};
    font-size: 14px;
    font-weight: 600;
    ${(props) =>
        props.type === "primary" &&
        css`
            background-color: ${(props) => props.theme.grayF3};
        `};
    ${(props) =>
        props.type === "secondary" &&
        css`
            background-color: white;
        `};
`;

const PostCategory = ({ children, ...props }) => {
    return <PostCategoryStyles {...props}>{children}</PostCategoryStyles>;
};

export default PostCategory;
