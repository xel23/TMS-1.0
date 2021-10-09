import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

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
    return (
        <Wrapper>
            <Link to={`tasks/${task._id}`}>
                <Summary>{task.summary}</Summary>
            </Link>
            <Container>
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
                <ContainerLeft>
                    <Author>{task.author.name}</Author>
                    <div>{moment(task.created).format('D MMM YYYY HH:mm')}</div>
                </ContainerLeft>
                <ContainerIcons>
                    <Tooltip title="Delete task" placement="top">
                        <DeleteIcon color="secondary" onClick={() => deleteTask(task._id)} />
                    </Tooltip>
                </ContainerIcons>
            </Container>
            <Divider />
        </Wrapper>
    )
};

export default Task;
