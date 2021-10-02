import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TasksPage from '../TasksPage/TasksPage';

const App: React.FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/register">Register page</Route>
                <Route path="/login">Login page</Route>
                <Route path="/dashboard">Dashboard page</Route>
                <Route exact path="/tasks" component={() => <TasksPage />} />
                <Route path="/tasks/:taskId">Task page</Route>
                <Route path="/create_task">Create task page</Route>
                <Route path="/edit_task/:taskId">Edit task page</Route>
                <Route path="/archive">Archive page</Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
