import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import TaskDetails, { Task } from '../../components/TaskDetails/TaskDetails';
import { getTaskRequest } from '../../requests';
import { DataContext } from '../../context';

const TaskDetailsPage: React.FunctionComponent = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [task, setTask] = useState<Task>({
        _id: '',
        summary: '',
        description: null,
        author: { userId: '', name: '' },
        assignee: null,
        type: '',
        priority: '',
        subsystem: null,
        status: '',
        created: new Date(""),
        updated: null,
        updatedBy: { userId: '', name: '' },
        verifiedBy: null,
    });

    const { token, setNotification } = useContext(DataContext);
    const { taskId } = useParams<{ taskId: string }>();

    useEffect(() => {
        getTaskRequest(taskId, token)
            .then(({ data: { task } }) => {
                setTask(task);
                setIsLoaded(true);
            })
            .catch((error) => {
                setNotification({ isOpen: true, status: error.response.status, message: error.response.data.message })
            })
    }, []);

    return <TaskDetails task={task} isLoaded={isLoaded} />;
};

export default TaskDetailsPage;
