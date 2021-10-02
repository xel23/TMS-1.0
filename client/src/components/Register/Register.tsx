import React, { ChangeEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { Wrapper, ButtonWrapper, FieldName, ButtonName, Error, useTextFieldStyles } from './Register.styles';

interface RegisterProps {
    register: (name: string, email: string, password: string) => void;
}

const Register: React.FunctionComponent<RegisterProps> = ({ register }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ name: boolean, email: boolean, password: boolean }>({ name: false, email: false, password: false });

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = event;

        setName(value);
        setErrors((prev) => ({ ...prev, name: value === '' }));
    };

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
        if (name !== '' && email !== '' && password !== '') {
            register(name, email, password);
        }

        setErrors({ name: name === '', email: email === '', password: password === '' });
    };

    const { root } = useTextFieldStyles();

    return (
        <Wrapper>
            <FieldName>Name</FieldName>
            <TextField
                classes={{ root }}
                required
                error={errors.name}
                variant="outlined"
                placeholder="Enter name"
                value={name}
                onChange={handleChangeName}
            />
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

export default Register;
