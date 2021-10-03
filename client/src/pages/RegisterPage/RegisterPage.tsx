import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Register from '../../components/Register/Register';
import { DataContext } from '../../context';

const RegisterPage: React.FunctionComponent = () => {
    const { setToken } = useContext(DataContext);

    const history = useHistory();

    const registerInTMS = (name: string, email: string, password: string) => {
        return axios({
            method: 'post',
            url: 'http://localhost:3000/api/auth/register',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: `name=${name}&email=${email}&password=${password}`,
        })
            .then(({ data: { accessToken }}) => {
                setToken(accessToken);
                history.push('/tasks');
            })
            .catch((error) => console.log(error));
    };

    return <Register register={(name, email, password) => registerInTMS(name, email, password)} />;
};

export default RegisterPage;
