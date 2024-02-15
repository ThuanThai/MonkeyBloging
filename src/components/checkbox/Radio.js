import React from "react";
import { useController } from "react-hook-form";
import { CheckIcon } from "@heroicons/react/24/solid";

const Radio = ({ checked, children, control, name, ...rest }) => {
    const { field } = useController({
        control,
        name,
        defaultValue: "",
    });
    return (
        <label>
            <input
                onChange={() => {}}
                checked={checked}
                type="radio"
                className="hidden-input"
                {...field}
                {...rest}
            />
            <div className="flex items-center font-medium cursor-pointer gap-x-3">
                <div
                    className={`w-7 h-7 flex items-center justify-center rounded-full ${
                        checked ? "bg-green-400" : "bg-gray-200"
                    }`}>
                    {checked && (
                        <CheckIcon className="w-4 h-4 text-white"></CheckIcon>
                    )}
                </div>
                <span>{children}</span>
            </div>
        </label>
    );
};

export default Radio;
