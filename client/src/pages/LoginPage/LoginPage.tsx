import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import Login from '../../components/Login/Login';
import { DataContext } from '../../context';
import { loginInTMS } from '../../requests';

const LoginPage: React.FunctionComponent = () => {
    const { setToken } = useContext(DataContext);

    const history = useHistory();

    const loginInSystem = (email: string, password: string) => {
        return loginInTMS(email, password)
                    .then(({ data: { accessToken }}) => {
                            setToken(accessToken);
                            history.push('/tasks');
                    })
                    .catch((error) => console.log(error));
    };

    return <Login login={(email, password) => loginInSystem(email, password)} />;
};

export default LoginPage;
