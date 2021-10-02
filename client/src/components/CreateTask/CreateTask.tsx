import React, { ChangeEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { TASK_TYPES, TASK_PRIORITIES, TASK_STATUSES } from './__mock__/data';

import { Wrapper, useTextFieldStyles, useSelectStyles } from './CreateTask.styles';
import { ButtonWrapper, FieldName, ButtonName, Error } from '../Register/Register.styles';

interface CreateTaskProps {
    createTask: (
        summary: string,
        description: string | null,
        assignee: string | null,
        type: string,
        priority: string,
        subsystem: string | null,
        status: string
    ) => void;
}

const CreateTask: React.FunctionComponent<CreateTaskProps> = ({ createTask }) => {
    const [summary, setSummary] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [assignee, setAssignee] = useState<string>('');
    const [type, setType] = useState<string>(TASK_TYPES[0]);
    const [priority, setPriority] = useState<string>(TASK_PRIORITIES[0]);
    const [subsystem, setSubsystem] = useState<string>('');
    const [status, setStatus] = useState<string>(TASK_STATUSES[0]);

    const [errors, setErrors] = useState<{ summary: boolean }>({ summary: false });

    const handleChangeSummary = (event: ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = event;

        setSummary(value);
        setErrors({ summary: value === '' });
    };

    const handleClick = () => {
        if (summary !== '') {
            createTask(summary, description, assignee, type, priority, subsystem, status);
        }

        setErrors({ summary: summary === '' });
    };

    const { outlined } = useSelectStyles();
    const { root } = useTextFieldStyles();

    return (
        <Wrapper>
            <FieldName>Summary</FieldName>
            <TextField
                classes={{ root }}
                required
                error={errors.summary}
                variant="outlined"
                placeholder="Enter summary"
                value={summary}
                onChange={handleChangeSummary}
            />
            <FieldName>Description</FieldName>
            <TextField
                classes={{ root }}
                variant="outlined"
                placeholder="Enter description"
                multiline
                maxRows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
            <FieldName>Assignee</FieldName>
            <TextField
                classes={{ root }}
                variant="outlined"
                placeholder="Enter email address"
                value={assignee}
                onChange={(event) => setAssignee(event.target.value)}
            />
            <FieldName>Type</FieldName>
            <Select
                classes={{ outlined }}
                variant="outlined"
                value={type}
                onChange={(event) => setType(event.target.value as string)}
            >
                {TASK_TYPES.map((taskType) => (
                    <MenuItem key={taskType} value={taskType}>{taskType}</MenuItem>
                ))}
            </Select>
            <FieldName>Priority</FieldName>
            <Select
                classes={{ outlined }}
                variant="outlined"
                value={priority}
                onChange={(event) => setPriority(event.target.value as string)}
            >
                {TASK_PRIORITIES.map((taskPriority) => (
                    <MenuItem key={taskPriority} value={taskPriority}>{taskPriority}</MenuItem>
                ))}
            </Select>
            <FieldName>Subsystem</FieldName>
            <TextField
                classes={{ root }}
                variant="outlined"
                placeholder="Enter subsystem"
                value={subsystem}
                onChange={(event) => setSubsystem(event.target.value)}
            />
            <FieldName>Status</FieldName>
            <Select
                classes={{ outlined }}
                variant="outlined"
                value={status}
                onChange={(event) => setStatus(event.target.value as string)}
            >
                {TASK_STATUSES.map((taskStatus) => (
                    <MenuItem key={taskStatus} value={taskStatus}>{taskStatus}</MenuItem>
                ))}
            </Select>
            {Object.values(errors).includes(true) && <Error>*Fields are required</Error>}
            <ButtonWrapper>
                <Button variant="outlined" onClick={handleClick}>
                    <ButtonName>Create task</ButtonName><ArrowForwardIcon fontSize="small"/>
                </Button>
            </ButtonWrapper>
        </Wrapper>
    );
};

export default CreateTask;
