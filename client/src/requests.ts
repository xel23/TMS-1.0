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

export const deleteTaskRequest = (taskId: string, token: string) => {
    return axios({
        method: 'delete',
        url: `http://localhost:3000/api/tasks/${taskId}`,
        headers: {
            'Authorization': `Basic ${token}`,
        },
    });
};
