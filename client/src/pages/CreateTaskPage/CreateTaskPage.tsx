import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import CreateTask from '../../components/CreateTask/CreateTask';
import { createTaskRequest } from '../../requests';
import { DataContext } from '../../context';

const CreateTaskPage: React.FunctionComponent = () => {
    const { token } = useContext(DataContext);

    const history = useHistory();

    const createTask = (
        summary: string,
        description: string | null,
        assignee: string | null,
        type: string,
        priority: string,
        subsystem: string | null,
        status: string
    ) => {
        createTaskRequest({
            summary: summary,
            description: description,
            assignee: assignee,
            type: type,
            priority: priority,
            subsystem: subsystem,
            status: status
        }, token).then(() => {
            history.push('/tasks');
        })
    };

    return <CreateTask
        createTask={(summary, description, assignee, type, priority, subsystem, status) => createTask(summary, description, assignee, type, priority, subsystem, status)}
    />;
};

export default CreateTaskPage;
