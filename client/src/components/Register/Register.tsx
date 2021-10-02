import React, { ChangeEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { Wrapper, ButtonWrapper, FieldName, ButtonName, useTextFieldStyles } from "./Register.styles";

interface RegisterProps {
    register: (name: string, email: string, password: string) => void;
}

const Register: React.FunctionComponent<RegisterProps> = ({ register }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    };

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    };

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    };

    const handleClick = () => {
        if (name !== '' && email !== '' && password !== '') {
            register(name, email, password);
        }
    };

    const { root } = useTextFieldStyles();

    return (
        <Wrapper>
            <FieldName>Name</FieldName>
            <TextField
                classes={{ root }}
                required
                variant="outlined"
                placeholder="Enter name"
                value={name}
                onChange={handleChangeName}
            />
            <FieldName>Email address</FieldName>
            <TextField
                classes={{ root }}
                required
                variant="outlined"
                placeholder="Enter email"
                value={email}
                onChange={handleChangeEmail}
            />
            <FieldName>Password</FieldName>
            <TextField
                classes={{ root }}
                required
                type="password"
                variant="outlined"
                placeholder="Enter password"
                value={password}
                onChange={handleChangePassword}
            />
            <ButtonWrapper>
                <Button variant="outlined" onClick={handleClick}>
                    <ButtonName>Submit</ButtonName><ArrowForwardIcon fontSize="small"/>
                </Button>
            </ButtonWrapper>
        </Wrapper>
    )
};

export default Register;
