import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import TaskList from '../../components/TaskList/TaskList';
import { DataContext } from '../../context';

import { Wrapper, ButtonName } from './TasksPage.styles';

const TasksPage: React.FunctionComponent = () => {
    const { token } = useContext(DataContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks()
            .then(({ data: { tasks } }) => {
                setTasks(tasks);
            })
            .catch((error) => console.log(error));
    }, []);

    const getTasks = () => {
        return axios({
            method: 'get',
            url: 'http://localhost:3000/api/tasks',
            headers: {
                'Authorization': `Basic ${token}`,
            },
        });
    };

    return (
        <Wrapper>
            <Link to="/create_task">
                <Button variant="outlined">
                    <ButtonName>Create task</ButtonName><AddIcon fontSize="small" />
                </Button>
            </Link>
            <TaskList tasks={tasks}/>
        </Wrapper>
    )
};

export default TasksPage;
