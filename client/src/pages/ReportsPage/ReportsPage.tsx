import React, { useContext, useEffect, useState } from 'react';

import Reports from '../../components/Reports/Reports';
import { TaskItem } from '../../components/Task/Task';

import { getTasksRequest } from '../../requests';
import { DataContext } from '../../context';

const ReportsPage: React.FunctionComponent = () => {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const { user: { accessToken }, setNotification } = useContext(DataContext);

    const getTasks = () => {
        getTasksRequest(accessToken)
            .then(({ data: { tasks } }) => {
                setTasks(tasks);
                setIsLoaded(true);
            })
            .catch((error) => {
                setIsLoaded(true);
                setNotification({ isOpen: true, status: error.response.status, message: error.response.data.message });
            });
    };

    useEffect(() => {
        getTasks();
    }, []);

    return <Reports isLoaded={isLoaded} tasks={tasks} />;
};

export default ReportsPage;
