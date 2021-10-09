import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

import { FieldName, useTextFieldStyles } from './TextFieldComponentProps.styles';

interface TextFieldComponentProps {
    fieldName: string;
    type?: string;
    placeholder: string;
    value: string;
    error: boolean;
    setValue: (value: string) => void;
    setErrors: (error: boolean) => void;
}

const TextFieldComponent: React.FunctionComponent<TextFieldComponentProps> = ({ fieldName, type, placeholder, value, error, setValue, setErrors }) => {
    const { root } = useTextFieldStyles();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = event;

        setValue(value);
        setErrors(value === '');
    };

    return (
        <>
            <FieldName>{fieldName}</FieldName>
            <TextField
                classes={{ root }}
                required
                error={error}
                type={type}
                variant="outlined"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        </>
    )
};

export default TextFieldComponent;
