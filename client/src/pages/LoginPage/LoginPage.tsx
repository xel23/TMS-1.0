import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import Login from '../../components/Login/Login';
import { DataContext } from '../../context';
import { loginGoogleRequest, loginRequest } from '../../requests';

const LoginPage: React.FunctionComponent = () => {
    const { setUser, setNotification } = useContext(DataContext);

    const history = useHistory();

    const loginGoogle = (token: string) => {
        return loginGoogleRequest(token)
            .then(({ status, data: { userId, name, accessToken, role, message } }) => {
                const user = { userId: userId, name: name, accessToken: accessToken, role: role };

                if (status === 201) {
                    setNotification({ isOpen: true, status: status, message: message });
                }

                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                history.push('/tasks');
            })
            .catch((error) => {
                setNotification({ isOpen: true, status: error.response.status, message: error.response.data.message });
            });
    };

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

    return <Login login={(email, password) => loginInSystem(email, password)} googleLogin={loginGoogle}/>;
};

export default LoginPage;
