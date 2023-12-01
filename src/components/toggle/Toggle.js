import React from "react";
import { useForm } from "react-hook-form";

const Toggle = ({ on, onClick, ...props }) => {
    const { field } = useForm();
    return (
        <label>
            <input checked={on} type="checkbox" className="hidden-input" />
            <div
                {...props}
                onClick={onClick}
                className={`relative w-24 h-12  rounded-full cursor-pointer transition-all p-1 ${
                    on ? "bg-primary" : "bg-gray-400"
                }`}>
                <div
                    className={`absolute w-10 h-10 -translate-y-1/2 bg-white rounded-full top-1/2 transition-all ${
                        on ? "translate-x-12" : ""
                    }`}></div>
            </div>
        </label>
    );
};

export default Toggle;
