import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import ListItemText from '@mui/material/ListItemText/ListItemText';

import { Placeholder, useSelectStyles, useMenuItemStyles } from './MultiSelect.styles';

interface MultiSelectProps {
    selectedValues: string[];
    options: string[];
    placeholder: string;
    setSelectedValues: (values: string[]) => void;
}

const MultiSelect: React.FunctionComponent<MultiSelectProps> = ({ selectedValues, options, placeholder, setSelectedValues }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
        const {
            target: { value },
        } = event;

        setSelectedValues(typeof value === 'string' ? value.split(',') : value,);
        setIsOpen(false);
    };

    const { root: selectRoot } = useSelectStyles();
    const { root: menuItemRoot } = useMenuItemStyles();

    return (
        <Select
            classes={{ root: selectRoot }}
            multiple
            displayEmpty
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
            value={selectedValues}
            onChange={handleChange}
            renderValue={(selected) => {
                if (selected.length === 0) {
                    return <Placeholder>{placeholder}</Placeholder>;
                }

                return (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value}/>
                        ))}
                    </Box>
                );
            }}
        >
            {options.map((option) => (
                <MenuItem key={option} value={option} classes={{ root: menuItemRoot }}>
                    <Checkbox checked={selectedValues.indexOf(option) > -1} />
                    <ListItemText primary={option} />
                </MenuItem>
            ))}
        </Select>
    )
};

export default MultiSelect;
