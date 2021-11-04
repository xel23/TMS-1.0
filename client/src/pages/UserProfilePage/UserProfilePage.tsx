import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

import UserProfile from '../../components/UserProfile/UserProfile';
import { User } from '../../components/UserManagement/UserManagement';
import { getUserRequest, updateUserRequest } from '../../requests';
import { DataContext } from '../../context';

import { Loading } from '../../components/TaskDetails/TaskDetails.styles';

const UserProfilePage: React.FunctionComponent = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState<User>({
        _id: '',
        email: '',
        name: '',
        regDate: new Date(),
        role: {
            name: '',
            updateTask: false,
            readTask: false,
            createTask: false,
            deleteTask: false,
            readUser: false,
            updateUser: false,
            createUser: false,
            deleteUser: false,
        },
    });
    const { user: { accessToken, userId }, setNotification } = useContext(DataContext);

    const getUser = () => {
        return getUserRequest(userId, accessToken)
            .then(({ data: { user }}) => {
                setUser(user);
            })
            .catch((error) => {
                setNotification({ isOpen: true, status: error.response.status, message: error.response.data.message })
            })
    };

    const updateUser = (name: string, email: string) => {
        const data = {};

        name !== user.name && Object.assign(data, { name: name });
        email !== user.email && Object.assign(data, { email: email });

        updateUserRequest(userId, accessToken, data)
            .then(({ status, data: { user } }) => {
                setUser(user);
                setNotification({ isOpen: true, status: status, message: "Profile successfully updated" });
            })
            .catch((error) => {
                setUser(user);
                setNotification({ isOpen: true, status: error.response.status, message: error.response.data.message });
            })
    };

    useEffect(() => {
        getUser().then(() => {
            setIsLoaded(true);
        })
    }, []);

    return !isLoaded ? <Loading><CircularProgress size={100} /></Loading> : <UserProfile user={user} updateProfile={updateUser} />;
};

export default UserProfilePage;
