import React from 'react';

import Login from '../../components/Login/Login';

const LoginPage: React.FunctionComponent = () => {
    return <Login login={(email, password) => console.log(email, password)} />;
};

export default LoginPage;
