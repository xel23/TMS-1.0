import React, { createContext, useState } from 'react';

const DataContext = createContext<{
    token: string,
    setToken: React.Dispatch<React.SetStateAction<string>>,
    notification: {
        isOpen: boolean,
        status: number,
        message: string,
    },
    setNotification: React.Dispatch<React.SetStateAction<{ isOpen: boolean, status: number, message: string }>>,
}>({
    token: "",
    setToken: () => {},
    notification: {
        isOpen: false,
        status: -1,
        message: "",
    },
    setNotification: () => {}
});

const DataContextProvider = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    const accessToken = localStorage.getItem('accessToken');
    const [token, setToken] = useState<string>(accessToken ? accessToken : '');
    const [notification, setNotification] = useState<{ isOpen: boolean, status: number, message: string }>({ isOpen: false, status: -1, message: '' });

    return (
        <DataContext.Provider value={{ token, setToken, notification, setNotification }}>
            { props.children }
        </DataContext.Provider>
    );
};

export { DataContext, DataContextProvider };
