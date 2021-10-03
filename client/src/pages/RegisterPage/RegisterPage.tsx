import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Register from '../../components/Register/Register';
import { DataContext } from '../../context';
import { registerRequest } from '../../requests';

const RegisterPage: React.FunctionComponent = () => {
    const { setToken } = useContext(DataContext);

    const history = useHistory();

    const registerInSystem = (name: string, email: string, password: string) => {
        return registerRequest(name, email, password)
                    .then(({ data: { accessToken }}) => {
                        setToken(accessToken);
                        localStorage.setItem('accessToken', accessToken);
                        history.push('/tasks');
                    })
                    .catch((error) => console.log(error));
    };

    return <Register register={(name, email, password) => registerInSystem(name, email, password)} />;
};

export default RegisterPage;
