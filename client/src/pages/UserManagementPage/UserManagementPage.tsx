import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import UserManagement, { User, Role } from '../../components/UserManagement/UserManagement';
import { getUsersRequest, updateUserRequest } from '../../requests';
import { DataContext } from '../../context';

import { Loading } from '../../components/TaskDetails/TaskDetails.styles';

const UserManagementPage: React.FunctionComponent = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [arePermissionsUpdated, setArePermissionsUpdated] = useState<boolean>(true);
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

    const updateUserPermissions = (userId: string, role: Role) => {
        setArePermissionsUpdated(false);

        updateUserRequest(userId, accessToken, { role: role })
            .then(({ status, data: { user }}) => {
                const index = users.findIndex(({_id }) => _id === userId);
                const updatedUsers = [...users.slice(0, index), user, ...users.slice(index + 1, users.length)];

                setArePermissionsUpdated(true);
                setUsers([...updatedUsers]);
                setNotification({ isOpen: true, status: status, message: "User permissions successfully updated" });
            })
            .catch((error) => {
                setNotification({ isOpen: true, status: error.response.status, message: error.response.data.message });
            })
    };

    useEffect(() => {
        getUsers().then(() => {
            setIsLoaded(true);
        })
    }, []);

    return !isLoaded ? <Loading><CircularProgress size={100} /></Loading> : <UserManagement users={users} arePermissionsUpdated={arePermissionsUpdated} updateUserPermissions={updateUserPermissions} />;
};

export default UserManagementPage;
