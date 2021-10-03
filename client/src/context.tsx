import React, { createContext, useState } from 'react';

const DataContext = createContext<{ token: string, setToken: React.Dispatch<React.SetStateAction<string>> }>({
    token: "",
    setToken: () => {},
});

const DataContextProvider = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    const accessToken = localStorage.getItem('accessToken');
    const [token, setToken] = useState<string>(accessToken ? accessToken : '');

    return (
        <DataContext.Provider value={{ token, setToken }}>
            { props.children }
        </DataContext.Provider>
    );
};

export { DataContext, DataContextProvider };
