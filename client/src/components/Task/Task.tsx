import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import { Wrapper, Container, ContainerRight, ContainerLeft, ContainerIcons, Status, Priority, Author } from "./Task.styles";

export interface TaskProps {
    id: string;
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

const Task: React.FunctionComponent<TaskProps> = (props) => {
    return (
        <Wrapper>
            <div>{props.summary}</div>
            <Container>
                <ContainerRight>
                    <Status className={props.status.toLowerCase().replace(' ', '-')}>
                        <span>{props.status}</span>
                    </Status>
                    <div>
                        <span>{props.assignee ? props.assignee : 'Unassigned'}</span>
                    </div>
                    <Priority className={props.priority.toLowerCase()}>
                        <span>{props.priority}</span>
                    </Priority>
                    <div>
                        <span>{props.subsystem ? props.subsystem : 'No Subsystem'}</span>
                    </div>
                    <div>{props.type}</div>
                </ContainerRight>
                <ContainerLeft>
                    <Author>{props.author.name}</Author>
                    <div>{moment(props.created).format('D MMM YYYY HH:mm')}</div>
                </ContainerLeft>
                <ContainerIcons>
                    <Tooltip title="Edit task" placement="top">
                        <Link to={`/edit_task/${props.id}`}>
                            <CreateIcon color="action" />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Delete task" placement="top">
                        <DeleteIcon color="secondary" />
                    </Tooltip>
                </ContainerIcons>
            </Container>
            <Divider />
        </Wrapper>
    )
};

export default Task;
