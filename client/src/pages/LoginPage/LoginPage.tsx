import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import Login from '../../components/Login/Login';
import { DataContext } from '../../context';

const LoginPage: React.FunctionComponent = () => {
    const { setToken } = useContext(DataContext);

    const history = useHistory();

    const loginInTMS = (email: string, password: string) => {
        return axios({
            method: 'post',
            url: 'http://localhost:3000/api/auth/login',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: `email=${email}&password=${password}`,
        })
            .then(({ data: { accessToken }}) => {
                setToken(accessToken);
                history.push('/tasks');
            })
            .catch((error) => console.log(error));
    };

    return <Login login={(email, password) => loginInTMS(email, password)} />;
};

export default LoginPage;
