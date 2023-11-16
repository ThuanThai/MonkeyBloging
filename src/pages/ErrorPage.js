import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ErrorPageStyles = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    .logo {
        width: 200px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    > h2 {
        font-size: 30px;
    }
`;

const ErrorPage = () => {
    return (
        <ErrorPageStyles>
            <NavLink to={"/"} className={"logo"}>
                <img srcSet="monkey.png 2x" alt="monkey-bloging" />
            </NavLink>
            <h2>Opps! Page not found</h2>
        </ErrorPageStyles>
    );
};

export default ErrorPage;
