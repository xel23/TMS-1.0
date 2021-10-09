import React, { createContext, useState } from 'react';

type Role = {
    name: string,
    readTask: boolean,
    createTask: boolean,
    updateTask: boolean,
    deleteTask: boolean,
    readUser: boolean,
    createUser: boolean,
    updateUser: boolean,
    deleteUser: boolean,
}

type User = {
    userId: string,
    name: string,
    accessToken: string,
    role: Role,
}

type Notification = {
    isOpen: boolean,
    status: number,
    message: string,
}

export const initialUser = {
    userId: '',
    name: '',
    accessToken: '',
    role: {
        name: '',
        readTask: false,
        createTask: false,
        updateTask: false,
        deleteTask: false,
        readUser: false,
        createUser: false,
        updateUser: false,
        deleteUser: false,
    },
};

const initialNotification = {
    isOpen: false,
    status: -1,
    message: '',
};

const DataContext = createContext<{
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>,
    notification: Notification,
    setNotification: React.Dispatch<React.SetStateAction<Notification>>,
}>({
    user: initialUser,
    setUser: () => {},
    notification: initialNotification,
    setNotification: () => {}
});

const DataContextProvider = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    const currentUser = localStorage.getItem('user');
    const [user, setUser] = useState<User>(currentUser ? JSON.parse(currentUser) : initialUser);
    const [notification, setNotification] = useState<Notification>(initialNotification);

    return (
        <DataContext.Provider value={{ user, setUser, notification, setNotification }}>
            { props.children }
        </DataContext.Provider>
    );
};

export { DataContext, DataContextProvider };
