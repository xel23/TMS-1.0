import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../../components/Header/Header';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';
import TasksPage from '../TasksPage/TasksPage';
import TaskDetailsPage from '../TaskDetailsPage/TaskDetailsPage';
import CreateTaskPage from '../CreateTaskPage/CreateTaskPage';
import UserManagementPage from '../UserManagementPage/UserManagementPage';
import UserProfilePage from '../UserProfilePage/UserProfilePage';
import Notification from '../../components/Notification/Notification';

import { DataContext } from '../../context';

import { Wrapper } from './App.styles';

const App: React.FunctionComponent = () => {
    const { user: { accessToken, role } } = useContext(DataContext);

    return (
        <Wrapper>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return (
                                accessToken === '' ?
                                    <Redirect to="/login" /> :
                                    <Redirect to="/tasks" />)
                        }}
                    />
                    <Route path="/register">
                        {accessToken !== '' ? <Redirect to="/tasks" /> : <RegisterPage />}
                    </Route>
                    <Route path="/login">
                        {accessToken !== '' ? <Redirect to="/tasks" /> : <LoginPage />}
                    </Route>
                    <Route exact path="/tasks">
                        {accessToken === '' ? <Redirect to="/login" /> : <TasksPage />}
                    </Route>
                    <Route path="/tasks/:taskId">
                        {accessToken === '' ? <Redirect to="/login" /> : !role.readTask ? <Redirect to="/tasks" /> : <TaskDetailsPage />}
                    </Route>
                    <Route path="/create_task">
                        {accessToken === '' ? <Redirect to="/login" /> : !role.createTask ? <Redirect to="/tasks" /> : <CreateTaskPage />}
                    </Route>
                    <Route path="/management">
                        {accessToken === '' ? <Redirect to="/login" /> : role.name !== 'admin' ? <Redirect to="/tasks" /> : <UserManagementPage />}
                    </Route>
                    <Route path="/profile">
                        {accessToken === '' ? <Redirect to="/login" /> : <UserProfilePage />}
                    </Route>
                </Switch>
                <Notification />
            </BrowserRouter>
        </Wrapper>
    );
};

export default App;
