import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

import UserManagement, { User } from '../../components/UserManagement/UserManagement';
import { getUsersRequest } from '../../requests';
import { DataContext } from '../../context';

import { Loading } from '../../components/TaskDetails/TaskDetails.styles';

const UserManagementPage: React.FunctionComponent = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const { user: { accessToken }, setNotification } = useContext(DataContext);

    const getUsers = () => {
        return getUsersRequest(accessToken)
            .then(({ data: { users }}) => {
                setUsers([...users]);
            })
            .catch((error) => {
                setNotification({ isOpen: true, status: error.response.status, message: error.response.data.message })
            })
    };

    useEffect(() => {
        getUsers().then(() => {
            setIsLoaded(true);
        })
    }, []);

    return !isLoaded ? <Loading><CircularProgress size={100} /></Loading> : <UserManagement users={users} />;
};

export default UserManagementPage;
