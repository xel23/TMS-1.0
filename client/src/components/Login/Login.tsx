import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { GoogleLogin } from 'react-google-login';

import TextFieldComponent from './TextFieldComponent/TextFieldComponent';

import { Wrapper, ButtonWrapper, ButtonName, Error } from '../Register/Register.styles';

interface LoginProps {
    login: (email: string, password: string) => void;
    googleLogin: (token: string) => void;
}

const Login: React.FunctionComponent<LoginProps> = ({ login, googleLogin }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ email: boolean, password: boolean }>({ email: false, password: false });

    const handleClick = () => {
        if (email !== '' && password !== '') {
            login(email, password);
        }

        setErrors({ email: email === '', password: password === '' });
    };

    const responseGoogle = (response: any) => {
        googleLogin(response.tokenId);
    };

    return (
        <Wrapper>
            <TextFieldComponent
                fieldName="Email address"
                placeholder="Enter email"
                value={email}
                error={errors.email}
                setValue={(value) => setEmail(value)}
                setErrors={(error) => setErrors((prev) => ({ ...prev, email: error }))}
            />
            <TextFieldComponent
                fieldName="Password"
                type="password"
                placeholder="Enter password"
                value={password}
                error={errors.password}
                setValue={(value) => setPassword(value)}
                setErrors={(error) => setErrors((prev) => ({ ...prev, password: error }))}
            />
            {Object.values(errors).includes(true) && <Error>*Fields are required</Error>}
            <ButtonWrapper>
                <Button variant="outlined" onClick={handleClick}>
                    <ButtonName>Submit</ButtonName><ArrowForwardIcon fontSize="small"/>
                </Button>
            </ButtonWrapper>
            <GoogleLogin
                clientId="214092743713-3le6m4idqf72f1fu8nd3hng5sosjmctk.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </Wrapper>
    )
};

export default Login;
