import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import Login from '../../components/Login/Login';
import { DataContext } from '../../context';
import { loginRequest } from '../../requests';

const LoginPage: React.FunctionComponent = () => {
    const { setUser, setNotification } = useContext(DataContext);

    const history = useHistory();

    const loginInSystem = (email: string, password: string) => {
        return loginRequest(email, password)
                    .then(({ data }) => {
                            setUser(data);
                            localStorage.setItem('user', JSON.stringify(data));
                            history.push('/tasks');
                    })
                    .catch((error) => {
                        setNotification({ isOpen: true, status: error.response.status, message: error.response.data.message });
                    });
    };

    return <Login login={(email, password) => loginInSystem(email, password)} />;
};

export default LoginPage;
