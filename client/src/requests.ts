import axios from 'axios';

export const registerRequest = (name: string, email: string, password: string) => {
    return axios({
        method: 'post',
        url: 'http://localhost:3000/api/auth/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({ name: name, email: email, password: password }),
    })
};

export const loginRequest = (email: string, password: string) => {
    return axios({
        method: 'post',
        url: 'http://localhost:3000/api/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({ email: email, password: password }),
    })
};

export const loginGoogleRequest = (token: string) => {
    return axios({
        method: 'post',
        url: 'http://localhost:3000/api/auth/loginGoogle',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({ token }),
    })
};

export const getTaskRequest = (taskId: string, token: string) => {
    return axios({
        method: 'get',
        url: `http://localhost:3000/api/tasks/${taskId}`,
        headers: {
            'Authorization': `Basic ${token}`,
        },
    });
};

export const getTasksRequest = (token: string) => {
    return axios({
        method: 'get',
        url: 'http://localhost:3000/api/tasks',
        headers: {
            'Authorization': `Basic ${token}`,
        },
    });
};

export const createTaskRequest = (
    task: {
        summary: string,
        description: string | null,
        assignee: string | null,
        type: string,
        priority: string,
        subsystem: string | null,
        status: string
    }, token: string) => {
        return axios({
            method: 'post',
            url: 'http://localhost:3000/api/tasks',
            headers: {
                'Authorization': `Basic ${token}`,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(task),
        });
};

export const updateTaskRequest = (
    task: {
        summary?: string | null,
        description?: string | null,
        assignee?: string | null,
        type?: string | null,
        priority?: string | null,
        subsystem?: string | null,
        status?: string | null,
        verifiedBy?: string | null
    },
    taskId: string, token: string) => {
    return axios({
        method: 'post',
        url: `http://localhost:3000/api/tasks/${taskId}`,
        headers: {
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(task),
    });
};

export const deleteTaskRequest = (taskId: string, token: string) => {
    return axios({
        method: 'delete',
        url: `http://localhost:3000/api/tasks/${taskId}`,
        headers: {
            'Authorization': `Basic ${token}`,
        },
    });
};

export const getCommentsRequest = (taskId: string, token: string) => {
    return axios({
        method: 'get',
        url: `http://localhost:3000/api/comments/${taskId}`,
        headers: {
            'Authorization': `Basic ${token}`,
        },
    });
};

export const createCommentRequest = (taskId: string, text: string, token: string) => {
    return axios({
        method: 'post',
        url: 'http://localhost:3000/api/comments',
        headers: {
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({ taskId: taskId, text: text }),
    });
};

export const updateCommentRequest = (commentId: string, text: string, token: string) => {
    return axios({
        method: 'post',
        url: `http://localhost:3000/api/comments/${commentId}`,
        headers: {
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({ text: text }),
    });
};

export const deleteCommentRequest = (commentId: string, token: string) => {
    return axios({
        method: 'delete',
        url: `http://localhost:3000/api/comments/${commentId}`,
        headers: {
            'Authorization': `Basic ${token}`,
        },
    });
};

export const getHistoryRequest = (taskId: string, token: string) => {
    return axios({
        method: 'get',
        url: `http://localhost:3000/api/history/${taskId}`,
        headers: {
            'Authorization': `Basic ${token}`,
        },
    });
};
