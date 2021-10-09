import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { FieldName } from '../../Login/TextFieldComponent/TextFieldComponentProps.styles';
import { useSelectStyles } from './SelectComponent.styles';

interface SelectComponentProps {
    fieldName: string;
    value: string;
    options: string[];
    setValue: (value: string) => void;
}

const SelectComponent: React.FunctionComponent<SelectComponentProps> = ({ fieldName, value, options, setValue }) => {
    const { select } = useSelectStyles();

    return (
        <>
            <FieldName>{fieldName}</FieldName>
            <Select
                classes={{ select }}
                variant="outlined"
                value={value}
                onChange={(event) => setValue(event.target.value as string)}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </>
    )
};

export default SelectComponent;
