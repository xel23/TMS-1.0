import React, { ChangeEvent, useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';

import MultiSelect from './MultiSelect/MultiSelect';

import { TASK_TYPES, TASK_PRIORITIES, TASK_STATUSES } from '../CreateTask/__mock__/data';

import { Wrapper, useTextFieldStyles } from './Search.styles';

interface SearchProps {
    searchTasks: (searchStr: string, types: string[], priorities: string[], statuses: string[]) => void;
}

const Search: React.FunctionComponent<SearchProps> = ({ searchTasks }) => {
    const [searchStr, setSearchStr] = useState('');
    const [types, setTypes] = useState<string[]>([]);
    const [priorities, setPriorities] = useState<string[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const handleSearchStrChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSearchStr(value);
        timer && clearTimeout(timer);

        const newTimer = setTimeout(() => {
            searchTasks(value, types, priorities, statuses);
        }, 800);

        setTimer(newTimer);

        return () => {
            timer && clearTimeout(timer);
        }
    }, [timer]);

    const handleTypesChange = (values: string[]) => {
        setTypes(values);
        searchTasks(searchStr, values, priorities, statuses);
    };

    const handlePrioritiesChange = (values: string[]) => {
        setPriorities(values);
        searchTasks(searchStr, types, values, statuses);
    };

    const handleStatusesChange = (values: string[]) => {
        setStatuses(values);
        searchTasks(searchStr, types, priorities, values);
    };

    const { root: textFieldRoot } = useTextFieldStyles();

    return (
        <Wrapper>
            <TextField
                classes={{ root: textFieldRoot }}
                variant="outlined"
                placeholder="Enter text"
                value={searchStr}
                onChange={handleSearchStrChange}
            />
            <MultiSelect
                selectedValues={types}
                options={TASK_TYPES}
                placeholder="Choose type"
                setSelectedValues={handleTypesChange}
            />
            <MultiSelect
                selectedValues={priorities}
                options={TASK_PRIORITIES}
                placeholder="Choose priority"
                setSelectedValues={handlePrioritiesChange}
            />
            <MultiSelect
                selectedValues={statuses}
                options={TASK_STATUSES}
                placeholder="Choose status"
                setSelectedValues={handleStatusesChange}
            />
        </Wrapper>
    )
};

export default Search;
