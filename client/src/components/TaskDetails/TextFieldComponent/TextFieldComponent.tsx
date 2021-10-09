import React from 'react';
import TextField from '@mui/material/TextField/TextField';
import { InputProps as StandardInputProps } from '@mui/material';

import { useTextFieldStyles } from './TextFieldComponent.styles';

interface TextFieldComponentProps {
    fieldName?: string;
    variant?: string;
    className?: string;
    isMultiline?: boolean;
    isDisabled?: boolean;
    placeholder: string;
    maxRows?: number;
    value: string;
    error?: boolean;
    InputProps?: Partial<StandardInputProps>;
    setValue: (value: string) => void;
    setError?: (error: boolean) => void;
}

const TextFieldComponent: React.FunctionComponent<TextFieldComponentProps> = ({ fieldName, variant = 'standard', className, isMultiline, isDisabled, placeholder, maxRows, value, error, InputProps, setValue, setError }) => {
    const { root: textFieldRoot } = useTextFieldStyles();

    return (
        <>
            {fieldName && <div>{fieldName}</div>}
            <TextField
                classes={{ root: textFieldRoot }}
                className={className}
                InputProps={InputProps}
                variant={variant as any}
                multiline={isMultiline}
                disabled={isDisabled}
                placeholder={placeholder}
                maxRows={maxRows}
                value={value}
                error={error}
                onChange={(event) => {
                    setValue(event.target.value);
                    setError && setError(event.target.value === '');
                }}
            />
        </>
    )
};

export default TextFieldComponent;
