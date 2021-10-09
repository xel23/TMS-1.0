import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import TextFieldComponent from './TextFieldComponent/TextFieldComponent';
import SelectComponent from './SelectComponent/SelectComponent';

import { TASK_TYPES, TASK_PRIORITIES, TASK_STATUSES } from './__mock__/data';

import { Wrapper } from './CreateTask.styles';
import { ButtonWrapper, ButtonName, Error } from '../Register/Register.styles';

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

    const handleClick = () => {
        if (summary !== '') {
            createTask(
                summary,
                description !== '' ? description : null,
                assignee !== '' ? assignee : null,
                type,
                priority,
                subsystem !== '' ? subsystem : null,
                status
            );
        }

        setErrors({ summary: summary === '' });
    };

    return (
        <Wrapper>
            <TextFieldComponent
                fieldName="Summary"
                value={summary}
                placeholder="Enter summary"
                error={errors.summary}
                isRequired={true}
                setValue={(value) => setSummary(value)}
                setError={(error) => setErrors({ summary: error })}
            />
            <TextFieldComponent
                fieldName="Description"
                value={description}
                placeholder="Enter description"
                maxRows={4}
                isMultiline={true}
                setValue={(value) => setDescription(value)}
            />
            <TextFieldComponent
                fieldName="Assignee"
                value={assignee}
                placeholder="Enter email address"
                setValue={(value) => setAssignee(value)}
            />
            <SelectComponent
                fieldName="Type"
                value={type}
                options={TASK_TYPES}
                setValue={(value) => setType(value)}
            />
            <SelectComponent
                fieldName="Priority"
                value={priority}
                options={TASK_PRIORITIES}
                setValue={(value) => setPriority(value)}
            />
            <TextFieldComponent
                fieldName="Subsystem"
                value={subsystem}
                placeholder="Enter subsystem"
                setValue={(value) => setSubsystem(value)}
            />
            <SelectComponent
                fieldName="Status"
                value={status}
                options={TASK_STATUSES}
                setValue={(value) => setStatus(value)}
            />
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
