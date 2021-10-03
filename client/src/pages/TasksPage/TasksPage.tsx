import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import TaskList from '../../components/TaskList/TaskList';
import { DataContext } from '../../context';
import { getTasksRequest, deleteTaskRequest } from '../../requests';

import { Wrapper, ButtonName } from './TasksPage.styles';

const TasksPage: React.FunctionComponent = () => {
    const { token } = useContext(DataContext);
    const [tasks, setTasks] = useState([]);

    const getTasks = () => {
        getTasksRequest(token)
            .then(({ data: { tasks } }) => {
                setTasks(tasks);
            })
            .catch((error) => console.log(error));
    };

    const deleteTask = (taskId: string) => {
        deleteTaskRequest(taskId, token).then(() => getTasks())
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <Wrapper>
            <Link to="/create_task">
                <Button variant="outlined">
                    <ButtonName>Create task</ButtonName><AddIcon fontSize="small" />
                </Button>
            </Link>
            <TaskList tasks={tasks} deleteTask={(taskId) => deleteTask(taskId)}/>
        </Wrapper>
    )
};

export default TasksPage;
