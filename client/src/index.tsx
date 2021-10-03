import React from 'react';
import ReactDOM from 'react-dom';

import App from './pages/App/App';

import { DataContextProvider } from './context';

ReactDOM.render(
    <React.StrictMode>
        <DataContextProvider>
            <App />
        </DataContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
