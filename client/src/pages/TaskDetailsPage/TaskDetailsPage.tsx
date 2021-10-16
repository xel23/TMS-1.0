import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import TaskDetails, { Task, Comment } from '../../components/TaskDetails/TaskDetails';
import { getTaskRequest, updateTaskRequest, getCommentsRequest, createCommentRequest, updateCommentRequest, deleteCommentRequest } from '../../requests';
import { DataContext } from '../../context';

const TaskDetailsPage: React.FunctionComponent = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [task, setTask] = useState<Task>({
        _id: '',
        summary: '',
        description: null,
        author: { userId: '', name: '' },
        assignee: null,
        type: '',
        priority: '',
        subsystem: null,
        status: '',
        created: new Date(""),
        updated: null,
        updatedBy: { userId: '', name: '' },
        verifiedBy: null,
    });
    const [comments, setComments] = useState<Comment[]>([]);
    const [isCommentUpdated, setIsCommentUpdated] = useState<boolean>(true);

    const { user: { accessToken }, setNotification } = useContext(DataContext);
    const { taskId } = useParams<{ taskId: string }>();

    const getTask = () => {
        return getTaskRequest(taskId, accessToken)
            .then(({ data: { task } }) => {
                setTask(task);
            })
            .catch((error) => {
                setNotification({ isOpen: true, status: error.response.status, message: error.response.data.message })
            })
    };

    const getComments = () => {
        return getCommentsRequest(taskId, accessToken)
            .then(({ data: { comments }}) => {
                setComments([...comments]);
            })
            .catch((error) => {
                setNotification({ isOpen: true, status: error.response.status, message: error.response.data.message })
            })
    };

    useEffect(() => {
        getTask().then(() => {
            getComments().then(() => {
                setIsLoaded(true);
            });
        });
    }, []);

    const isFieldChanged = (enteredValue: string, propsValue: string | null) => {
        if (!propsValue && enteredValue === '') {
            return false;
        }

        return enteredValue !== propsValue;
    };

    const updateTask = (summary: string, description: string, assignee: string, type: string, priority: string, subsystem: string, status: string, verifiedBy: string) => {
        const updatedTask = {};

        isFieldChanged(summary, task.summary) && Object.assign(updatedTask, { summary: summary });
        isFieldChanged(description, task.description) && Object.assign(updatedTask, { description: description });
        isFieldChanged(assignee, task.assignee) && Object.assign(updatedTask, { assignee: assignee });
        isFieldChanged(type, task.type) && Object.assign(updatedTask, { type: type });
        isFieldChanged(priority, task.priority) && Object.assign(updatedTask, { priority: priority });
        isFieldChanged(subsystem, task.subsystem) && Object.assign(updatedTask, { subsystem: subsystem });
        isFieldChanged(status, task.status) && Object.assign(updatedTask, { status: status });
        isFieldChanged(verifiedBy, task.verifiedBy) && Object.assign(updatedTask, { verifiedBy: verifiedBy });

        updateTaskRequest(updatedTask, task._id, accessToken)
            .then(({ status, data: { task } }) => {
                setTask(task);
                setNotification({ isOpen: true, status: status, message: "Task successfully updated" });
            })
            .catch((error) => {
                setTask(task);
                setNotification({ isOpen: true, status: error.response.status, message: error.response.data.message });
            })
    };

    const createComment = (text: string) => {
        createCommentRequest(task._id, text, accessToken)
            .then(({ status, data: { comment }}) => {
                setComments((prev) => [...prev, comment]);
                setNotification({ isOpen: true, status: status, message: "Comment successfully added" });
            })
            .catch((error) => {
                setNotification({ isOpen: true, status: error.response.status, message: error.response.data.message });
            })
    };

    const updateComment = (commentId: string, text: string) => {
        setIsCommentUpdated(false);

        updateCommentRequest(commentId, text, accessToken)
            .then(({ status, data: { comment }}) => {
                const index = comments.findIndex(({_id }) => _id === commentId);
                const updatedComments = [...comments.slice(0, index), comment, ...comments.slice(index + 1, comments.length)];

                setIsCommentUpdated(true);
                setComments([...updatedComments]);
                setNotification({ isOpen: true, status: status, message: "Comment successfully updated" });
            })
            .catch((error) => {
                setNotification({ isOpen: true, status: error.response.status, message: error.response.data.message });
            })
    };

    const deleteComment = (commentId: string) => {
        deleteCommentRequest(commentId, accessToken)
            .then(({ status }) => {
                setComments((prev) => [...prev.filter(({ _id }) => _id !== commentId)]);
                setNotification({ isOpen: true, status: status, message: "Comment successfully deleted" });
            })
            .catch((error) => {
                setNotification({ isOpen: true, status: error.response.status, message: error.response.data.message });
            })
    };

    return (
        <TaskDetails
            task={task}
            comments={comments}
            isLoaded={isLoaded}
            isCommentUpdated={isCommentUpdated}
            updateTask={updateTask}
            createComment={createComment}
            updateComment={updateComment}
            deleteComment={deleteComment}
        />
    );
};

export default TaskDetailsPage;
