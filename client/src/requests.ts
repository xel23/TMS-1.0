import axios from 'axios';

export const registerInTMS = (name: string, email: string, password: string) => {
    return axios({
        method: 'post',
        url: 'http://localhost:3000/api/auth/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({ name: name, email: email, password: password }),
    })
};

export const loginInTMS = (email: string, password: string) => {
    return axios({
        method: 'post',
        url: 'http://localhost:3000/api/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({ email: email, password: password }),
    })
};

export const getTasks = (token: string) => {
    return axios({
        method: 'get',
        url: 'http://localhost:3000/api/tasks',
        headers: {
            'Authorization': `Basic ${token}`,
        },
    });
};

export const deleteTask = (taskId: string, token: string) => {
    return axios({
        method: 'delete',
        url: `http://localhost:3000/api/tasks/${taskId}`,
        headers: {
            'Authorization': `Basic ${token}`,
        },
    });
};
