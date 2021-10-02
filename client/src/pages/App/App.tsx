import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../../components/Header/Header';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';
import TasksPage from '../TasksPage/TasksPage';
import CreateTaskPage from '../CreateTaskPage/CreateTaskPage';

import { Wrapper } from './App.styles';

const App: React.FunctionComponent = () => {
    return (
        <Wrapper>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/register" component={() => <RegisterPage />} />
                    <Route path="/login" component={() => <LoginPage />} />
                    <Route path="/dashboard">Dashboard page</Route>
                    <Route exact path="/tasks" component={() => <TasksPage />} />
                    <Route path="/tasks/:taskId">Task page</Route>
                    <Route path="/create_task" component={() => <CreateTaskPage />} />
                    <Route path="/edit_task/:taskId">Edit task page</Route>
                    <Route path="/archive">Archive page</Route>
                </Switch>
            </BrowserRouter>
        </Wrapper>
    );
};

export default App;
