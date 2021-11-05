import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';

import Search from '../../components/Search/Search';
import TaskList from '../../components/TaskList/TaskList';
import { DataContext } from '../../context';
import { getTasksRequest, deleteTaskRequest, searchTasksRequest } from '../../requests';

import { Wrapper, ButtonName, NoTasks } from './TasksPage.styles';
import { Loading } from '../../components/TaskDetails/TaskDetails.styles';

const TasksPage: React.FunctionComponent = () => {
    const { user: { accessToken, role }, setNotification } = useContext(DataContext);
    const [tasks, setTasks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);

    const getTasks = () => {
        setIsLoaded(false);

        getTasksRequest(accessToken)
            .then(({ data: { tasks } }) => {
                setIsLoaded(true);
                setTasks(tasks);
            })
            .catch((error) => {
                setIsLoaded(true);
                console.log(error);
            });
    };

    const deleteTask = (taskId: string) => {
        deleteTaskRequest(taskId, accessToken)
            .then(() => getTasks())
            .catch((error) => setNotification({ isOpen: true, status: error.response.status, message: error.response.data }))
    };

    const searchTasks = (searchStr: string, types: string[], priorities: string[], statuses: string[]) => {
        const queryParams = {};

        searchStr !== '' && Object.assign(queryParams, { search: searchStr });
        types.length !== 0 && Object.assign(queryParams, { type: types.join() });
        priorities.length !== 0 && Object.assign(queryParams, { priority: priorities.join() });
        statuses.length !== 0 && Object.assign(queryParams, { status: statuses.join() });

        setIsLoaded(false);

        searchTasksRequest(accessToken, queryParams)
            .then(({ data: { tasks }}) => {
                setIsLoaded(true);
                setTasks(tasks);
            })
            .catch((error) => {
                setIsLoaded(true);
                setNotification({ isOpen: true, status: error.response.status, message: error.response.data });
            })
    };

    useEffect(() => {
        role.readTask && getTasks();
    }, []);

    return (
        <Wrapper>
            {role.createTask && (
                <Link to="/create_task">
                    <Button variant="outlined">
                        <ButtonName>Create task</ButtonName><AddIcon fontSize="small" />
                    </Button>
                </Link>
            )}
            <Search searchTasks={searchTasks} />
            {!isLoaded ? <Loading><CircularProgress size={100} /></Loading> : tasks.length === 0 ? <NoTasks>No tasks found</NoTasks> : <TaskList tasks={tasks} deleteTask={(taskId) => deleteTask(taskId)}/>}
        </Wrapper>
    )
};

export default TasksPage;
