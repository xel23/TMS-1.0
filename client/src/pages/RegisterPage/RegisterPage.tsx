import React from 'react';

import Register from '../../components/Register/Register';

const RegisterPage: React.FunctionComponent = () => {
    return <Register register={(name, email, password) => console.log(name, email, password)} />;
};

export default RegisterPage;
