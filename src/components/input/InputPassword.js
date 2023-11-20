import React, { useState } from "react";
import Input from "./Input";
import EyeCloseIcon from "components/icon/EyeCloseIcon";
import EyeIcon from "components/icon/EyeIcon";

const InputPassword = ({ control }) => {
    const [inputType, setInputType] = useState("password");
    const handleInputType = () => {
        inputType === "password"
            ? setInputType("text")
            : setInputType("password");
    };
    if (!control) return;
    return (
        <>
            <Input
                type={inputType}
                control={control}
                name="password"
                placeholder="Enter your password">
                {inputType === "password" ? (
                    <EyeCloseIcon onClick={handleInputType}></EyeCloseIcon>
                ) : (
                    <EyeIcon onClick={handleInputType}></EyeIcon>
                )}
            </Input>
        </>
    );
};

export default InputPassword;
