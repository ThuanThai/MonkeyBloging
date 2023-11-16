import React, { useEffect, useState } from "react";
import AuthenticationPage from "./AuthenticationPage";
import { Field } from "components/field";
import { Label } from "components/label";
import { Input } from "components/input";
import { useForm } from "react-hook-form";
import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import EyeCloseIcon from "components/icon/EyeCloseIcon";
import EyeIcon from "components/icon/EyeIcon";
const schema = yup.object({
    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
    password: yup
        .string()
        .min(8, "Your password must be at least 8 characters or greater")
        .required("Please enter your password"),
});

const SignInPage = () => {
    const navigate = useNavigate();
    const { userInfo } = useAuth();
    const [inputType, setInputType] = useState("password");
    useEffect(() => {
        document.title = "Login Page";
        if (userInfo?.email) navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const arrError = Object.values(errors);
        if (arrError.length > 0) {
            toast.error(arrError[0].message);
        }
    }, [errors]);

    const handleSignIn = async (values) => {
        if (!isValid) return;
        try {
            await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    const handleInputType = () => {
        inputType === "password"
            ? setInputType("text")
            : setInputType("password");
    };

    return (
        <AuthenticationPage>
            <form action="submit" onSubmit={handleSubmit(handleSignIn)}>
                <Field>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        placeholder="Enter your email address"
                        control={control}
                        name="email"
                        type="email"></Input>
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
                <div className="question">
                    Don't have an account yet?{" "}
                    <NavLink to={"/sign-up"}>Sign Up</NavLink>
                </div>
                <Button
                    style={{ width: "100%" }}
                    isLoading={isSubmitting}
                    disable={isSubmitting}
                    type="submit">
                    Submit
                </Button>
            </form>
        </AuthenticationPage>
    );
};

export default SignInPage;