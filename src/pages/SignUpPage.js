import { Button } from "components/button";
import { Field } from "components/field";
import EyeCloseIcon from "components/icon/EyeCloseIcon";
import EyeIcon from "components/icon/EyeIcon";
import { Input } from "components/input";
import { Label } from "components/label";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { auth, db } from "../firebase/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
    fullname: yup.string().required("Please enter your fullname"),
    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
    password: yup
        .string()
        .min(8, "Your password must be at least 8 characters or greater")
        .required("Please enter your password"),
});

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
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm({ resolver: yupResolver(schema) });
    useEffect(() => {
        const arrError = Object.values(errors);
        if (arrError.length > 0) {
            toast.error(arrError[0].message);
        }
    }, [errors]);
    const [inputType, setInputType] = useState("password");
    const handleInputType = () => {
        inputType === "password"
            ? setInputType("text")
            : setInputType("password");
    };

    const handleSubmitForm = async (values) => {
        if (!isValid) return;
        console.log("aaa");
        await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );
        await updateProfile(auth.currentUser, { displayName: values.fullname });
        const colRef = collection(db, "users");
        await addDoc(colRef, {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
        });
        toast.success("Register successfully");
        navigate("/");
    };
    return (
        <SignUpStyles>
            <div className="container">
                <form
                    onSubmit={handleSubmit(handleSubmitForm)}
                    className="form">
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
                    <Button
                        isLoading={isSubmitting}
                        disable={isSubmitting}
                        type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </SignUpStyles>
    );
};

export default SignUpPage;
