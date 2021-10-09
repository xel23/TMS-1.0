import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

import MultiSelect from './MultiSelect/MultiSelect';

import { TASK_TYPES, TASK_PRIORITIES, TASK_STATUSES } from '../CreateTask/__mock__/data';

import { Wrapper, useTextFieldStyles } from './Search.styles';

const Search: React.FunctionComponent = () => {
    const [searchStr, setSearchStr] = useState('');
    const [types, setTypes] = useState<string[]>([]);
    const [priorities, setPriorities] = useState<string[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);

    const { root: textFieldRoot } = useTextFieldStyles();

    return (
        <Wrapper>
            <TextField
                classes={{ root: textFieldRoot }}
                variant="outlined"
                placeholder="Enter text"
                value={searchStr}
                onChange={(event) => setSearchStr(event.target.value)}
            />
            <MultiSelect
                selectedValues={types}
                options={TASK_TYPES}
                placeholder="Choose type"
                setSelectedValues={(values) => setTypes(values)}
            />
            <MultiSelect
                selectedValues={priorities}
                options={TASK_PRIORITIES}
                placeholder="Choose priority"
                setSelectedValues={(values) => setPriorities(values)}
            />
            <MultiSelect
                selectedValues={statuses}
                options={TASK_STATUSES}
                placeholder="Choose status"
                setSelectedValues={(values) => setStatuses(values)}
            />
        </Wrapper>
    )
};

export default Search;
