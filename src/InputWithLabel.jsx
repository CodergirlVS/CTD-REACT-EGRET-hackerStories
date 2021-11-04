import React, { Component } from 'react'

class InputWithLabel extends React.Component {
constructor(props) {
        super(props);

        this.inputRef = React.createRef(); 
}

componentDidMount() {
if (this.props.isFocused) {
this.inputRef.current.focus();
}
}
render() {
        const {
                id,
                value,
                type = 'text',
                onInputChange,
                isFocused,
                children,
        } = this.props;

        return (
                <>
                        <label htmlFor={id}>{children}</label>
                        &nbsp;
                        <input
                                id={id}
                                type={type}
                                ref={this.inputRef}
                                value={value}
                                onChange={onInputChange}
                                autoFocus={isFocused}
                        />
                </>
        );
}
}

// const InputWithLabel = ({ id, value, type = "text", onInputChange, isFocused, children }) => {
//         const inputRef = React.useRef(); 
//         React.useEffect(() => {
//         if (isFocused && inputRef.current) {
//         inputRef.current.focus();
//         }
//         });

export default InputWithLabel;