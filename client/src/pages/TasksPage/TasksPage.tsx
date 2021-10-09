import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

import TaskList from '../../components/TaskList/TaskList';
import { DataContext } from '../../context';
import { getTasksRequest, deleteTaskRequest } from '../../requests';

import { Wrapper, ButtonName } from './TasksPage.styles';
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
            {!isLoaded ? <Loading><CircularProgress size={100} /></Loading> : <TaskList tasks={tasks} deleteTask={(taskId) => deleteTask(taskId)}/>}
        </Wrapper>
    )
};

export default TasksPage;
