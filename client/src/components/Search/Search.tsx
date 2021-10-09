import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { TASK_TYPES, TASK_PRIORITIES, TASK_STATUSES } from '../CreateTask/__mock__/data';

import { Wrapper, Placeholder, useTextFieldStyles, useSelectStyles, useMenuItemStyles } from './Search.styles';

const Search: React.FunctionComponent = () => {
    const [searchStr, setSearchStr] = useState('');
    const [types, setTypes] = useState<string[]>([]);
    const [priorities, setPriorities] = useState<string[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);
    const [typesOpen, setTypesOpen] = useState(false);
    const [prioritiesOpen, setPrioritiesOpen] = useState(false);
    const [statusesOpen, setStatusesOpen] = useState(false);

    const handleChangeTypes = (event: SelectChangeEvent<typeof types>) => {
        const {
            target: { value },
        } = event;

        setTypes(typeof value === 'string' ? value.split(',') : value,);
        setTypesOpen(false);
    };

    const handleChangePriorities = (event: SelectChangeEvent<typeof priorities>) => {
        const {
            target: { value },
        } = event;

        setPriorities(typeof value === 'string' ? value.split(',') : value,);
        setPrioritiesOpen(false);
    };

    const handleChangeStatuses = (event: SelectChangeEvent<typeof statuses>) => {
        const {
            target: { value },
        } = event;

        setStatuses(typeof value === 'string' ? value.split(',') : value,);
        setStatusesOpen(false);
    };

    const { root: textFieldRoot } = useTextFieldStyles();
    const { root: selectRoot } = useSelectStyles();
    const { root: menuItemRoot } = useMenuItemStyles();

    return (
        <Wrapper>
            <TextField
                classes={{ root: textFieldRoot }}
                variant="outlined"
                placeholder="Enter text"
                value={searchStr}
                onChange={(event) => setSearchStr(event.target.value)}
            />
            <Select
                classes={{ root: selectRoot }}
                multiple
                displayEmpty
                open={typesOpen}
                onClose={() => setTypesOpen(false)}
                onOpen={() => setTypesOpen(true)}
                value={types}
                onChange={handleChangeTypes}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <Placeholder>Choose type</Placeholder>;
                    }

                    return (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value}/>
                            ))}
                        </Box>
                    );
                }}
            >
                {TASK_TYPES.map((type) => (
                    <MenuItem key={type} value={type} classes={{ root: menuItemRoot }}>
                        <Checkbox checked={types.indexOf(type) > -1} />
                        <ListItemText primary={type} />
                    </MenuItem>
                ))}
            </Select>
            <Select
                classes={{ root: selectRoot }}
                multiple
                displayEmpty
                open={prioritiesOpen}
                onClose={() => setPrioritiesOpen(false)}
                onOpen={() => setPrioritiesOpen(true)}
                value={priorities}
                onChange={handleChangePriorities}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <Placeholder>Choose priority</Placeholder>;
                    }

                    return (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value}/>
                            ))}
                        </Box>
                    );
                }}
            >
                {TASK_PRIORITIES.map((priority) => (
                    <MenuItem key={priority} value={priority} classes={{ root: menuItemRoot }}>
                        <Checkbox checked={priorities.indexOf(priority) > -1} />
                        <ListItemText primary={priority} />
                    </MenuItem>
                ))}
            </Select>
            <Select
                classes={{ root: selectRoot }}
                multiple
                displayEmpty
                open={statusesOpen}
                onClose={() => setStatusesOpen(false)}
                onOpen={() => setStatusesOpen(true)}
                value={statuses}
                onChange={handleChangeStatuses}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <Placeholder>Choose status</Placeholder>;
                    }

                    return (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value}/>
                            ))}
                        </Box>
                    );
                }}
            >
                {TASK_STATUSES.map((status) => (
                    <MenuItem key={status} value={status} classes={{ root: menuItemRoot }}>
                        <Checkbox checked={statuses.indexOf(status) > -1} />
                        <ListItemText primary={status} />
                    </MenuItem>
                ))}
            </Select>
        </Wrapper>
    )
};

export default Search;
