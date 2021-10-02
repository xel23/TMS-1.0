import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import TaskList from '../../components/TaskList/TaskList';

import { Wrapper, ButtonName } from './TasksPage.styles';

import { tasks } from './__mock__/data';

const TasksPage: React.FunctionComponent = () => {
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
