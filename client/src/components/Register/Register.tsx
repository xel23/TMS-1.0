import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import TextFieldComponent from '../Login/TextFieldComponent/TextFieldComponent';

import { Wrapper, ButtonWrapper, ButtonName, Error } from './Register.styles';

interface RegisterProps {
    register: (name: string, email: string, password: string) => void;
}

const Register: React.FunctionComponent<RegisterProps> = ({ register }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ name: boolean, email: boolean, password: boolean }>({ name: false, email: false, password: false });

    const handleClick = () => {
        if (name !== '' && email !== '' && password !== '') {
            register(name, email, password);
        }

        setErrors({ name: name === '', email: email === '', password: password === '' });
    };

    return (
        <Wrapper>
            <TextFieldComponent
                fieldName="Name"
                placeholder="Enter name"
                value={name}
                error={errors.name}
                setValue={(value) => setName(value)}
                setErrors={(error) => setErrors((prev) => ({ ...prev, name: error }))}
            />
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

export default Register;
