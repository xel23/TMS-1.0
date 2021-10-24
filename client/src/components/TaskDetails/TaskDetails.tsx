import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import AccordionComponent from './AccordionComponent/AccordionComponent';
import CommentsComponent from './CommentsComponent/CommentsComponent';
import HistoryComponent from './HistoryComponent/HistoryComponent';
import SelectComponent from './SelectComponent/SelectComponent';
import TextFieldComponent from './TextFieldComponent/TextFieldComponent';

import { DataContext } from '../../context';

import { TASK_PRIORITIES, TASK_STATUSES, TASK_TYPES } from '../CreateTask/__mock__/data';

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
    Item,
    Error,
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

export interface Comment {
    _id: string,
    taskId: string,
    text: string,
    author: string,
    created: Date,
    edited: boolean | null,
}

export interface History {
    taskId: string,
    author: string,
    timestamp: Date,
    added: Array<{ category: string; value: string }>,
    removed: Array<{ category: string; value: string }>,
}

export interface TaskDetailsProps {
    task: Task;
    comments: Comment[];
    history: History[];
    isLoaded: boolean;
    isCommentUpdated: boolean;
    updateTask: (summary: string, description: string, assignee: string, type: string, priority: string, subsystem: string, status: string, verifiedBy: string) => void;
    createComment: (text: string) => void;
    updateComment: (commentId: string, text: string) => void;
    deleteComment: (commentId: string) => void;
}

const TaskDetails: React.FunctionComponent<TaskDetailsProps> = ({ task, comments, history, isLoaded, isCommentUpdated, updateTask, createComment, updateComment, deleteComment }) => {
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

    const addComment = () => {
        createComment(comment);
        setComment('');
    };

    return !isLoaded ? <Loading><CircularProgress size={100} /></Loading> : (
        <Wrapper>
            <div>
                <DateInfo>
                    Created by&nbsp;<Name>{task.author.name}</Name>&nbsp;{moment(task.created).format('D MMM YYYY HH:mm')}
                    &nbsp;&nbsp;&nbsp;
                    {task.updatedBy && <>Updated by&nbsp;<Name>{task.updatedBy.name}</Name>&nbsp;{task.updated && moment(task.updated).format('D MMM YYYY HH:mm')}</>}
                </DateInfo>
                <RightWrapper isThereCommentField={role.updateTask}>
                    <div>
                        <Summary>
                            <TextFieldComponent
                                className="summary"
                                InputProps={{ disableUnderline: true }}
                                isDisabled={!role.updateTask}
                                placeholder="Write a summary"
                                value={summary}
                                error={errors.summary}
                                setValue={(value) => setSummary(value)}
                                setError={(error) => setErrors((prev) => ({ ...prev, summary: error }))}
                            />
                            {errors.summary && <Error>*The summary field cannot be empty</Error>}
                        </Summary>
                        <Description>
                            <TextFieldComponent
                                className="description"
                                InputProps={{ disableUnderline: true }}
                                isDisabled={!role.updateTask}
                                placeholder="Write a description"
                                value={description}
                                error={errors.description}
                                setValue={(value) => setDescription(value)}
                                setError={(error) => setErrors((prev) => ({ ...prev, description: error }))}
                            />
                            {errors.description && <Error>*The description field cannot be empty</Error>}
                        </Description>
                    </div>
                    <div>
                        {role.updateTask && (
                            <CommentContainer>
                                <TextFieldComponent
                                    variant="outlined"
                                    isMultiline={true}
                                    placeholder="Write a comment"
                                    maxRows={4}
                                    value={comment}
                                    setValue={(value) => setComment(value)}
                                />
                                <ButtonWrapper>
                                    <Button variant="contained" color="primary" disabled={comment === ''} onClick={addComment}>
                                        <ButtonName>Add comment</ButtonName><AddIcon fontSize="small"/>
                                    </Button>
                                </ButtonWrapper>
                            </CommentContainer>
                        )}
                        <AccordionComponent title="Comments">
                            <CommentsComponent
                                isCommentUpdated={isCommentUpdated}
                                comments={comments}
                                updateComment={updateComment}
                                deleteComment={deleteComment}
                            />
                        </AccordionComponent>
                        <AccordionComponent title="History">
                            <HistoryComponent history={history}/>
                        </AccordionComponent>
                    </div>
                </RightWrapper>
            </div>
            <LeftWrapper>
                <Item>
                    <TextFieldComponent
                        fieldName="Assignee"
                        isDisabled={!role.updateTask}
                        placeholder="Enter email address"
                        value={assignee}
                        setValue={(value) => setAssignee(value)}
                    />
                </Item>
                <SelectComponent
                    fieldName="Type"
                    value={type}
                    isDisabled={!role.updateTask}
                    options={TASK_TYPES}
                    setValue={(value) => setType(value)}
                />
                <SelectComponent
                    fieldName="Priority"
                    value={priority}
                    isDisabled={!role.updateTask}
                    options={TASK_PRIORITIES}
                    setValue={(value) => setPriority(value)}
                />
                <Item>
                    <TextFieldComponent
                        fieldName="Subsystem"
                        isDisabled={!role.updateTask}
                        placeholder="Enter subsystem"
                        value={subsystem}
                        setValue={(value) => setSubsystem(value)}
                    />
                </Item>
                <SelectComponent
                    fieldName="Status"
                    value={status}
                    isDisabled={!role.updateTask}
                    options={TASK_STATUSES}
                    setValue={(value) => setStatus(value)}
                />
                <Item>
                    <TextFieldComponent
                        fieldName="Verified By"
                        isDisabled={!role.updateTask}
                        placeholder="Enter email address"
                        value={verifiedBy}
                        setValue={(value) => setVerifiedBy(value)}
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
