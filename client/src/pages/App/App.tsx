import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../../components/Header/Header';
import TasksPage from '../TasksPage/TasksPage';

import { Wrapper } from './App.styles';

const App: React.FunctionComponent = () => {
    return (
        <Wrapper>
            <BrowserRouter>
                <Header />
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
        </Wrapper>
    );
};

export default App;
