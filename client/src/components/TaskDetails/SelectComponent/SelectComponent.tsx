import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { Item } from '../TaskDetails.styles';
import { useSelectStyles } from './SelectComponent.styles';

interface SelectComponentProps {
    fieldName: string;
    value: string;
    isDisabled: boolean;
    options: string[];
    setValue: (value: string) => void;
}

const SelectComponent: React.FunctionComponent<SelectComponentProps> = ({ fieldName, value, isDisabled, options, setValue }) => {
    const { outlined, disabled } = useSelectStyles();

    return (
        <Item>
            <div>{fieldName}</div>
            <Select
                classes={{ outlined, disabled }}
                variant="standard"
                disabled={isDisabled}
                value={value}
                onChange={(event) => setValue(event.target.value as string)}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </Item>
    )
};

export default SelectComponent;
