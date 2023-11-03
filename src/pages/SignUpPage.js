import { Field } from "components/field";
import { Label } from "components/label";
import React from "react";
import styled from "styled-components";

const SignUpStyles = styled.div`
    min-height: 100vh;
    padding: 40px;
    .form {
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
    .input {
        border: 1px solid transparent;
        border-radius: 4px;
        width: 100%;
        padding: 16px 20px;
        background-color: #e7ecf3;
        transition: all 0.25 linear;
    }

    .input:focus {
        border-color: ${(props) => props.theme.primary};
        background-color: transparent;
    }

    .input::-webkit-input-placeholder {
        color: #84878b;
    }
    .input::-moz-input-placeholder {
        color: #84878b;
    }
`;

const SignUpPage = () => {
    return (
        <SignUpStyles>
            <div className="container">
                <form className="form">
                    <img className="logo" srcSet="monkey.png 2x" alt="" />
                    <h1 className="headline">Monkey Blogging</h1>
                    <Field>
                        <Label>Fullname</Label>
                        <input
                            placeholder="Enter Your Name"
                            type="text"
                            className="input"
                        />
                    </Field>
                </form>
            </div>
        </SignUpStyles>
    );
};

export default SignUpPage;
