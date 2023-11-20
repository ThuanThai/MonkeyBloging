import { LoadingSpinner } from "components/loading";
import React from "react";
import styled, { css } from "styled-components";
import { PropTypes } from "prop-types";

const ButtonStyles = styled.button`
    height: ${(props) => props.height || "55px"};
    color: ${(props) =>
        props.primary
            ? "white"
            : css`
                  ${(props) => props.theme.primary};
              `};
    ${(props) =>
        props.primary
            ? css`
                  background-image: linear-gradient(
                      to right bottom,
                      ${(props) => props.theme.primary},
                      ${(props) => props.theme.secondary}
                  );
              `
            : css`
                  background-color: white;
              `};
    max-width: 300px;
    padding: 12px;
    font-size: 18px;
    border-radius: 8px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: ${(props) => (props.center ? "0px auto" : "0px")};
    opacity: ${(props) => (props.disabled ? "0.5" : "1")};
    cursor: pointer;
`;

/**
 * @requires
 * @param {string} type Type of button "button" || submit
 * @returns
 */

const Button = ({
    children,
    className,
    onClick = () => {},
    type = "button",
    isLoading,
    disable,
    ...props
}) => {
    return (
        <ButtonStyles
            {...props}
            disabled={disable}
            type={type}
            className={className}
            onClick={onClick}>
            {isLoading ? <LoadingSpinner></LoadingSpinner> : children}
        </ButtonStyles>
    );
};

Button.propTypes = {
    type: PropTypes.oneOf(["button", "submit"]),
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
};

export default Button;
