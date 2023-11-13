import React, { useEffect } from "react";
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

    const handleSignIn = (values) => {
        if (!isValid) return;
        signInWithEmailAndPassword(auth, values.email, values.password);
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
                        placeholder="Enter your password"
                        control={control}
                        name="password"
                        type="password"></Input>
                </Field>
                <div className="question">
                    Don't have an account yet?{" "}
                    <NavLink to={"/sign-up"}>Sign Up</NavLink>
                </div>
                <Button
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
