import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Register from '../../components/Register/Register';
import { DataContext } from '../../context';
import { registerRequest } from '../../requests';

const RegisterPage: React.FunctionComponent = () => {
    const { setUser, setNotification } = useContext(DataContext);

    const history = useHistory();

    const registerInSystem = (name: string, email: string, password: string) => {
        return registerRequest(name, email, password)
                    .then(({ status, data: { userId, name, accessToken, role, message }}) => {
                        const user = { userId: userId, name: name, accessToken: accessToken, role: role };

                        setUser(user);
                        localStorage.setItem('user', JSON.stringify(user));
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
