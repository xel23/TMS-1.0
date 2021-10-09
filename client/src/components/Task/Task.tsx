import React, { useContext } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

import { DataContext } from '../../context';

import { Wrapper, Summary, Container, ContainerRight, ContainerLeft, ContainerIcons, Status, Priority, Author } from './Task.styles';

export interface TaskItem {
    _id: string;
    summary: string;
    description: string | null;
    author: {
        userId: string,
        name: string
    };
    assignee: string | null;
    type: string;
    priority: string;
    subsystem: string | null;
    status: string;
    created: Date;
    updated: Date | null;
    verifiedBy: string | null;
}

interface TaskProps {
    task: TaskItem;
    deleteTask: (taskId: string) => void;
}

const Task: React.FunctionComponent<TaskProps> = ({ task, deleteTask }) => {
    const { user: { role } } = useContext(DataContext);

    return (
        <Wrapper>
            <Link to={`tasks/${task._id}`}>
                <Summary>{task.summary}</Summary>
            </Link>
            <Container isThereIcon={role.deleteTask}>
                <ContainerRight>
                    <Status className={task.status.toLowerCase().replace(' ', '-')}>
                        <span>{task.status}</span>
                    </Status>
                    <div>
                        <span>{task.assignee ? task.assignee : 'Unassigned'}</span>
                    </div>
                    <Priority className={task.priority.toLowerCase()}>
                        <span>{task.priority}</span>
                    </Priority>
                    <div>
                        <span>{task.subsystem ? task.subsystem : 'No Subsystem'}</span>
                    </div>
                    <div>{task.type}</div>
                </ContainerRight>
                <ContainerLeft isThereIcon={role.deleteTask}>
                    <Author>{task.author.name}</Author>
                    <div>{moment(task.created).format('D MMM YYYY HH:mm')}</div>
                </ContainerLeft>
                <ContainerIcons>
                    {role.deleteTask && (
                        <Tooltip title="Delete task" placement="top">
                            <DeleteIcon color="error" onClick={() => deleteTask(task._id)} />
                        </Tooltip>
                    )}
                </ContainerIcons>
            </Container>
            <Divider />
        </Wrapper>
    )
};

export default Task;
