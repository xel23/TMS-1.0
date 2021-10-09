import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { DataContext } from '../../context';

import { TASK_PRIORITIES, TASK_STATUSES, TASK_TYPES } from '../CreateTask/__mock__/data';

import { comments } from './__mock__/comments';
import { history } from './__mock__/history';

import {
    Loading,
    Wrapper,
    RightWrapper,
    LeftWrapper,
    DateInfo,
    Name,
    Summary,
    Description,
    CommentContainer,
    ButtonWrapper,
    ButtonName,
    CommentItem,
    CommentTitle,
    HistoryItem,
    HistoryTitle,
    HistoryData,
    Category,
    Item,
    Error,
    useTextFieldStyles,
    useSelectStyles,
    useAccordionStyles,
    useAccordionSummaryStyles,
    useAccordionDetailsStyles,
} from './TaskDetails.styles';

export interface Task {
    _id: string;
    summary: string,
    description: string | null,
    author: {
        userId: string,
        name: string
    },
    assignee: string | null,
    type: string,
    priority: string,
    subsystem: string | null,
    status: string,
    created: Date,
    updated: Date | null,
    updatedBy: {
        userId: string,
        name: string
    },
    verifiedBy: string | null;
}

export interface TaskDetailsProps {
    task: Task;
    isLoaded: boolean;
    updateTask: (summary: string, description: string, assignee: string, type: string, priority: string, subsystem: string, status: string, verifiedBy: string) => void;
}

const TaskDetails: React.FunctionComponent<TaskDetailsProps> = ({ task, isLoaded, updateTask }) => {
    const { user: { role } } = useContext(DataContext);

    const [summary, setSummary] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [assignee, setAssignee] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [priority, setPriority] = useState<string>('');
    const [subsystem, setSubsystem] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [verifiedBy, setVerifiedBy] = useState<string>('');

    const [errors, setErrors] = useState<{ summary: boolean, description: boolean }>({ summary: false, description: false });

    useEffect(() => {
        setSummary(task.summary);
        setDescription(task.description ? task.description : '');
        setAssignee(task.assignee ? task.assignee : '');
        setType(task.type);
        setPriority(task.priority);
        setSubsystem(task.subsystem ? task.subsystem : '');
        setStatus(task.status);
        setVerifiedBy(task.verifiedBy ? task.verifiedBy : '');
    }, [task.summary, task.description, task.assignee, task.type, task.priority, task.subsystem, task.status, task.verifiedBy]);

    const { root: textFieldRoot } = useTextFieldStyles();
    const { outlined, disabled } = useSelectStyles();
    const { root: accordionRoot, expanded } = useAccordionStyles();
    const { root: accordionSummaryRoot } = useAccordionSummaryStyles();
    const { root: accordionDetailsRoot } = useAccordionDetailsStyles();

    return !isLoaded ? <Loading><CircularProgress size={100} /></Loading> : (
        <Wrapper>
            <div>
                <DateInfo>
                    Created by&nbsp;<Name>{task.author.name}</Name>&nbsp;{moment(task.created).format('D MMM YYYY HH:mm')}
                    &nbsp;&nbsp;&nbsp;
                    {task.updatedBy && <>Updated by&nbsp;<Name>{task.updatedBy.name}</Name>&nbsp;{task.updated && moment(task.updated).format('D MMM YYYY HH:mm')}</>}
                </DateInfo>
                <RightWrapper>
                    <div>
                        <Summary>
                            <TextField
                                classes={{ root: textFieldRoot }}
                                className="summary"
                                InputProps={{ disableUnderline: true }}
                                variant="standard"
                                disabled={!role.updateTask}
                                placeholder="Write a summary"
                                value={summary}
                                error={errors.summary}
                                onChange={(event) => {
                                    setSummary(event.target.value);
                                    setErrors((prev) => ({ ...prev, summary: event.target.value === '' }))
                                }}
                            />
                            {errors.summary && <Error>*The summary field cannot be empty</Error>}
                        </Summary>
                        <Description>
                            <TextField
                                classes={{ root: textFieldRoot }}
                                className="description"
                                InputProps={{ disableUnderline: true }}
                                variant="standard"
                                disabled={!role.updateTask}
                                placeholder="Write a description"
                                value={description}
                                error={errors.description}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                    setErrors((prev) => ({ ...prev, description: event.target.value === '' }))
                                }}
                            />
                            {errors.description && <Error>*The description field cannot be empty</Error>}
                        </Description>
                    </div>
                    <div>
                        <CommentContainer>
                            <TextField
                                classes={{ root: textFieldRoot }}
                                variant="outlined"
                                placeholder="Write a comment"
                                multiline
                                maxRows={4}
                                value={comment}
                                onChange={(event) => setComment(event.target.value)}
                            />
                            <ButtonWrapper>
                                <Button variant="contained" color="primary" disabled={comment === ''} onClick={() => {}}>
                                    <ButtonName>Add comment</ButtonName><AddIcon fontSize="small"/>
                                </Button>
                            </ButtonWrapper>
                        </CommentContainer>
                        <Accordion classes={{ root: accordionRoot, expanded }}>
                            <AccordionSummary
                                classes={{ root: accordionSummaryRoot }}
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <div>Comments</div>
                            </AccordionSummary>
                            <AccordionDetails classes={{ root : accordionDetailsRoot }}>
                                <>
                                    {comments.map((comment, index) => (
                                        <CommentItem key={`${comment.author}_${index}`}>
                                            <CommentTitle>
                                                <Name>{comment.author}</Name>&nbsp;commented {moment(comment.created).format('D MMM YYYY HH:mm')}
                                            </CommentTitle>
                                            <div>{comment.text}</div>
                                        </CommentItem>
                                    ))}
                                </>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion classes={{ root: accordionRoot, expanded }}>
                            <AccordionSummary
                                classes={{ root: accordionSummaryRoot }}
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <div>History</div>
                            </AccordionSummary>
                            <AccordionDetails classes={{ root : accordionDetailsRoot }}>
                                <>
                                    {history.map((historyItem, index) => (
                                        <HistoryItem key={`${historyItem.author.name}_${index}`}>
                                            <HistoryTitle>
                                                <Name>{historyItem.author.name}</Name>&nbsp;{moment(historyItem.timestamp).format('D MMM YYYY HH:mm')}
                                            </HistoryTitle>
                                            <HistoryData>
                                                <Category>{historyItem.category}</Category>:&nbsp;{historyItem.removed}&nbsp;&nbsp;<ArrowForwardIcon fontSize="small" />&nbsp;&nbsp;{historyItem.added}
                                            </HistoryData>
                                        </HistoryItem>
                                    ))}
                                </>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </RightWrapper>
            </div>
            <LeftWrapper>
                <Item>
                    <div>Assignee</div>
                    <TextField
                        classes={{ root: textFieldRoot }}
                        variant="standard"
                        disabled={!role.updateTask}
                        placeholder="Enter email address"
                        value={assignee}
                        onChange={(event) => setAssignee(event.target.value)}
                    />
                </Item>
                <Item>
                    <div>Type</div>
                    <Select
                        classes={{ outlined, disabled }}
                        variant="standard"
                        disabled={!role.updateTask}
                        value={type}
                        onChange={(event) => setType(event.target.value as string)}
                    >
                        {TASK_TYPES.map((taskType) => (
                            <MenuItem key={taskType} value={taskType}>{taskType}</MenuItem>
                        ))}
                    </Select>
                </Item>
                <Item>
                    <div>Priority</div>
                    <Select
                        classes={{ outlined, disabled }}
                        variant="standard"
                        disabled={!role.updateTask}
                        value={priority}
                        onChange={(event) => setPriority(event.target.value as string)}
                    >
                        {TASK_PRIORITIES.map((taskPriority) => (
                            <MenuItem key={taskPriority} value={taskPriority}>{taskPriority}</MenuItem>
                        ))}
                    </Select>
                </Item>
                <Item>
                    <div>Subsystem</div>
                    <TextField
                        classes={{ root: textFieldRoot }}
                        variant="standard"
                        disabled={!role.updateTask}
                        placeholder="Enter subsystem"
                        value={subsystem}
                        onChange={(event) => setSubsystem(event.target.value)}
                    />
                </Item>
                <Item>
                    <div>Status</div>
                    <Select
                        classes={{ outlined, disabled }}
                        variant="standard"
                        disabled={!role.updateTask}
                        value={status}
                        onChange={(event) => setStatus(event.target.value as string)}
                    >
                        {TASK_STATUSES.map((taskStatus) => (
                            <MenuItem key={taskStatus} value={taskStatus}>{taskStatus}</MenuItem>
                        ))}
                    </Select>
                </Item>
                <Item>
                    <div>Verified By</div>
                    <TextField
                        classes={{ root: textFieldRoot }}
                        variant="standard"
                        disabled={!role.updateTask}
                        placeholder="Enter email address"
                        value={verifiedBy}
                        onChange={(event) => setVerifiedBy(event.target.value)}
                    />
                </Item>
                {role.updateTask && (
                    <ButtonWrapper className="update_btn">
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={errors.summary || errors.description}
                            onClick={() => updateTask(summary, description, assignee, type, priority, subsystem, status, verifiedBy)}
                        >
                                <ButtonName>Update task</ButtonName><ArrowForwardIcon fontSize="small"/>
                        </Button>
                    </ButtonWrapper>
                )}
            </LeftWrapper>
        </Wrapper>
    );
};

export default TaskDetails;
