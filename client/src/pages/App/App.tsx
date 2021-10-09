import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../../components/Header/Header';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';
import TasksPage from '../TasksPage/TasksPage';
import TaskDetailsPage from '../TaskDetailsPage/TaskDetailsPage';
import CreateTaskPage from '../CreateTaskPage/CreateTaskPage';
import Notification from '../../components/Notification/Notification';

import { DataContext } from '../../context';

import { Wrapper } from './App.styles';

const App: React.FunctionComponent = () => {
    const { user: { accessToken } } = useContext(DataContext);

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
                    <Route path="/register" component={() => <RegisterPage />} />
                    <Route path="/login" component={() => <LoginPage />} />
                    <Route path="/dashboard">
                        {accessToken === '' ? <Redirect to="/login" /> : <div>Dashboard page</div>}
                    </Route>
                    <Route exact path="/tasks">
                        {accessToken === '' ? <Redirect to="/login" /> : <TasksPage />}
                    </Route>
                    <Route path="/tasks/:taskId">
                        {accessToken === '' ? <Redirect to="/login" /> : <TaskDetailsPage />}
                    </Route>
                    <Route path="/create_task">
                        {accessToken === '' ? <Redirect to="/login" /> : <CreateTaskPage />}
                    </Route>
                    <Route path="/archive">
                        {accessToken === '' ? <Redirect to="/login" /> : <div>Archive page</div>}
                    </Route>
                </Switch>
                <Notification />
            </BrowserRouter>
        </Wrapper>
    );
};

export default App;
