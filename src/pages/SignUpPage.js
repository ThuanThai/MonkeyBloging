import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { auth, db } from "../firebase/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import InputPassword from "components/input/InputPassword";

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
    const handleSubmitForm = async (values) => {
        if (!isValid) return;
        await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );
        await updateProfile(auth.currentUser, { displayName: values.fullname });
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
        });
        toast.success("Register successfully");
        navigate("/");
    };
    return (
        <AuthenticationPage>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
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
                    <InputPassword control={control}></InputPassword>
                </Field>
                <div className="question">
                    You already have an account{" "}
                    <NavLink to={"/sign-in"}>Sign In</NavLink>
                </div>
                <Button
                    primary
                    center
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

export default SignUpPage;
