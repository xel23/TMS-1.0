import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Register from '../../components/Register/Register';
import { DataContext } from '../../context';
import { registerRequest } from '../../requests';

const RegisterPage: React.FunctionComponent = () => {
    const { setToken, setNotification } = useContext(DataContext);

    const history = useHistory();

    const registerInSystem = (name: string, email: string, password: string) => {
        return registerRequest(name, email, password)
                    .then(({ status, data: { accessToken, message }}) => {
                        setToken(accessToken);
                        localStorage.setItem('accessToken', accessToken);
                        history.push('/tasks');
                        setNotification({ isOpen: true, status: status, message: message });
                    })
                    .catch((error) => {
                        setNotification({ isOpen: true, status: error.response.status, message: error.response.data.message });
                    });
    };

    return <Register register={(name, email, password) => registerInSystem(name, email, password)} />;
};

export default RegisterPage;
