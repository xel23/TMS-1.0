import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import moment from 'moment';

import TextFieldComponent from './TextFieldComponent/TextFieldComponent';

import { User } from '../UserManagement/UserManagement';

import { Wrapper, UserName, DottedLine, FieldsWrapper, ErrorWrapper, ButtonWrapper } from './UserProfile.styles';
import { ButtonName, Error } from '../TaskDetails/TaskDetails.styles';

interface UserProfileProps {
    user: User,
    updateProfile: (name: string, email: string) => void,
}

const UserProfile: React.FunctionComponent<UserProfileProps> = ({ user, updateProfile }) => {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');

    useEffect(() => {
        setEmail(user.email);
        setName(user.name);
    }, [user]);

    return (
        <Wrapper>
            <UserName>{user.name}</UserName>
            <DottedLine />
            <FieldsWrapper>
                <TextFieldComponent fieldName='Email' value={email} setValue={(value) => setEmail(value)} />
                <TextFieldComponent fieldName='Name' value={name} setValue={(value) => setName(value)} />
                <TextFieldComponent fieldName='Registration date' value={moment(user.regDate).format('D MMMM YYYY')} isDisabled={true} />
                <TextFieldComponent fieldName='Role' value={user.role.name} isDisabled={true} />
            </FieldsWrapper>
            {email === '' || name === '' && <ErrorWrapper><Error>*Fields cannot be empty</Error></ErrorWrapper>}
            <ButtonWrapper>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={email === '' || name === ''}
                    onClick={() => updateProfile(name, email)}
                >
                    <ButtonName>Update profile</ButtonName><ArrowForwardIcon fontSize="small"/>
                </Button>
            </ButtonWrapper>
        </Wrapper>
    )
};

export default UserProfile;
