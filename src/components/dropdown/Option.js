import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
    const { toggle } = useDropdown();
    return (
        <div
            className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-100"
            onClick={() => {
                props.onClick();
                toggle();
            }}>
            {props.children}
        </div>
    );
};

export default Option;
