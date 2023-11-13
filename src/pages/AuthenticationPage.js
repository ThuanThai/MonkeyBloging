import React from "react";
import styled from "styled-components";

const AuthenticationPageStyles = styled.div`
    min-height: 100vh;
    padding: 40px;
    form {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
    }
    .logo {
        margin: 0 auto 20px;
    }
    .headline {
        text-align: center;
        color: ${(props) => props.theme.primary};
    }
    .question {
        margin-bottom: 20px;
        font-size: 14px;
        text-align: center;
        a {
            font-weight: 500;
            display: inline-block;
            color: ${(props) => props.theme.primary};
        }
    }
`;

const AuthenticationPage = ({ children }) => {
    return (
        <AuthenticationPageStyles>
            <div className="container">
                <img className="logo" srcSet="monkey.png 2x" alt="" />
                <h1 className="headline">Monkey Blogging</h1>
                {children}
            </div>
        </AuthenticationPageStyles>
    );
};

export default AuthenticationPage;
