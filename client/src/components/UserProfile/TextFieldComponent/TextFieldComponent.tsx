import React from 'react';
import TextField from '@mui/material/TextField/TextField';

import { useTextFieldStyles } from '../UserProfile.styles';

interface TextFieldComponentProps {
    fieldName: string,
    value: string,
    isDisabled?: boolean,
    setValue?: (value: string) => void;
}

const TextFieldComponent: React.FunctionComponent<TextFieldComponentProps> = ({ fieldName, value, isDisabled, setValue = () => {} }) => {
    const { root } = useTextFieldStyles();

    return (
        <div>
            <div>{fieldName}</div>
            <div>
                <TextField
                    classes={{ root }}
                    variant = 'standard'
                    value={value}
                    disabled={isDisabled}
                    onChange={event => setValue(event.target.value)}
                />
            </div>
        </div>
    )
};

export default TextFieldComponent;
