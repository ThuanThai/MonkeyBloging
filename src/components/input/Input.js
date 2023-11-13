import { useController } from "react-hook-form";
import styled from "styled-components";

const InputStyles = styled.div`
    position: relative;
    width: 100%;

    input {
        border: 1px solid transparent;
        border-radius: 4px;
        width: 100%;
        background-color: #e7ecf3;
        transition: all 0.25 linear;
        padding: ${(props) =>
            props.hasIcon ? "16px 60px 16px 20px" : "16px 20px"};
    }

    input:focus {
        border-color: ${(props) => props.theme.primary};
        background-color: transparent;
    }

    input::-webkit-input-placeholder {
        color: #84878b;
    }
    input::-moz-input-placeholder {
        color: #84878b;
    }
    .input-icon {
        cursor: pointer;
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
    }
`;

const Input = ({ control, name = "", children, ...props }) => {
    const { field } = useController({
        name,
        control,
        defaultValue: "",
    });
    return (
        <InputStyles hasIcon={!!children}>
            <input id={name} {...props} {...field} />
            {children && <div className="input-icon">{children}</div>}
        </InputStyles>
    );
};

export default Input;
