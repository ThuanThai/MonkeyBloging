import { Field } from "components/field";
import EyeCloseIcon from "components/icon/EyeCloseIcon";
import EyeIcon from "components/icon/EyeIcon";
import { Input } from "components/input";
import { Label } from "components/label";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
`;

const SignUpPage = () => {
    const { control } = useForm();
    const [inputType, setInputType] = useState("password");
    const handleInputType = () => {
        inputType === "password"
            ? setInputType("text")
            : setInputType("password");
    };
    return (
        <SignUpStyles>
            <div className="container">
                <form className="form">
                    <img className="logo" srcSet="monkey.png 2x" alt="" />
                    <h1 className="headline">Monkey Blogging</h1>
                    <Field>
                        <Label htmlFor="fullname">Fullname</Label>
                        <Input
                            control={control}
                            name="fullname"
                            placeholder="Enter your fullname"></Input>
                    </Field>
                    <Field>
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            control={control}
                            name="email"
                            placeholder="Enter your email address"></Input>
                    </Field>
                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type={inputType}
                            control={control}
                            name="password"
                            placeholder="Enter your password">
                            {inputType === "password" ? (
                                <EyeCloseIcon
                                    onClick={handleInputType}></EyeCloseIcon>
                            ) : (
                                <EyeIcon onClick={handleInputType}></EyeIcon>
                            )}
                        </Input>
                    </Field>
                </form>
            </div>
        </SignUpStyles>
    );
};

export default SignUpPage;
