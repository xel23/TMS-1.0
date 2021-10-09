import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Wrapper, ButtonWrapper, FieldName, ButtonName, Error, useTextFieldStyles } from '../Register/Register.styles';

interface LoginProps {
    login: (email: string, password: string) => void;
}

const Login: React.FunctionComponent<LoginProps> = ({ login }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ email: boolean, password: boolean }>({ email: false, password: false });

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = event;

        setEmail(value);
        setErrors((prev) => ({ ...prev, email: value === '' }));
    };

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = event;

        setPassword(value);
        setErrors((prev) => ({ ...prev, password: value === '' }));
    };

    const handleClick = () => {
        if (email !== '' && password !== '') {
            login(email, password);
        }

        setErrors({ email: email === '', password: password === '' });
    };

    const { root } = useTextFieldStyles();

    return (
        <Wrapper>
            <FieldName>Email address</FieldName>
            <TextField
                classes={{ root }}
                required
                error={errors.email}
                variant="outlined"
                placeholder="Enter email"
                value={email}
                onChange={handleChangeEmail}
            />
            <FieldName>Password</FieldName>
            <TextField
                classes={{ root }}
                required
                error={errors.password}
                type="password"
                variant="outlined"
                placeholder="Enter password"
                value={password}
                onChange={handleChangePassword}
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
