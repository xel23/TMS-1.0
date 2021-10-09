import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import TextFieldComponent from './TextFieldComponent/TextFieldComponent';

import { Wrapper, ButtonWrapper, ButtonName, Error } from '../Register/Register.styles';

interface LoginProps {
    login: (email: string, password: string) => void;
}

const Login: React.FunctionComponent<LoginProps> = ({ login }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ email: boolean, password: boolean }>({ email: false, password: false });

    const handleClick = () => {
        if (email !== '' && password !== '') {
            login(email, password);
        }

        setErrors({ email: email === '', password: password === '' });
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
        </Wrapper>
    )
};

export default Login;
