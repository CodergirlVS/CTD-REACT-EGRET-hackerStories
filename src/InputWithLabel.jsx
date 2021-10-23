import React from "react";

const InputWithLabel = ({ id, value, type = "text", onInputChange, isFocused, children }) => {
        const inputRef = React.useRef(); 
        React.useEffect(() => {
        if (isFocused && inputRef.current) {
        inputRef.current.focus();
        }
        });

        return (
        <>
                <label htmlFor={id}>{children}</label>
                &nbsp;
                <input
                        id={id}
                        type={type}
                        ref={inputRef}
                        value={value}
                        onChange={onInputChange}
                        autoFocus={isFocused}
                />
        </>
        )
};

export default InputWithLabel;