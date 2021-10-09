import React from 'react';
import TextField from '@mui/material/TextField/TextField';

import { FieldName } from '../../Login/TextFieldComponent/TextFieldComponentProps.styles';
import { useTextFieldStyles } from './TextFieldComponent.styles';

interface TextFieldComponentProps {
    fieldName: string;
    value: string;
    placeholder: string;
    error?: boolean;
    maxRows?: number;
    isRequired?: boolean;
    isMultiline?: boolean;
    setValue: (value: string) => void;
    setError?: (error: boolean) => void;
}

const TextFieldComponent: React.FunctionComponent<TextFieldComponentProps> = ({ fieldName, value, placeholder, error, maxRows, isRequired, isMultiline, setValue, setError }) => {
    const { root } = useTextFieldStyles();

    return (
        <>
            <FieldName>{fieldName}</FieldName>
            <TextField
                classes={{ root }}
                required={isRequired}
                multiline={isMultiline}
                error={error}
                variant="outlined"
                placeholder={placeholder}
                maxRows={maxRows}
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                    setError && setError(event.target.value === '');
                }}
            />
        </>
    )
};

export default TextFieldComponent;
