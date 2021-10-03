import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../../components/Header/Header';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';
import TasksPage from '../TasksPage/TasksPage';
import CreateTaskPage from '../CreateTaskPage/CreateTaskPage';
import Notification from '../../components/Notification/Notification';

import { DataContext } from '../../context';

import { Wrapper } from './App.styles';

const App: React.FunctionComponent = () => {
    const { token } = useContext(DataContext);

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
                                token === '' ?
                                    <Redirect to="/login" /> :
                                    <Redirect to="/tasks" />)
                        }}
                    />
                    <Route path="/register" component={() => <RegisterPage />} />
                    <Route path="/login" component={() => <LoginPage />} />
                    <Route path="/dashboard">
                        {token === '' ? <Redirect to="/login" /> : <div>Dashboard page</div>}
                    </Route>
                    <Route exact path="/tasks">
                        {token === '' ? <Redirect to="/login" /> : <TasksPage />}
                    </Route>
                    <Route path="/tasks/:taskId">
                        {token === '' ? <Redirect to="/login" /> : <div>Task page</div>}
                    </Route>
                    <Route path="/create_task">
                        {token === '' ? <Redirect to="/login" /> : <CreateTaskPage />}
                    </Route>
                    <Route path="/edit_task/:taskId">
                        {token === '' ? <Redirect to="/login" /> : <div>Edit task page</div>}
                    </Route>
                    <Route path="/archive">
                        {token === '' ? <Redirect to="/login" /> : <div>Archive page</div>}
                    </Route>
                </Switch>
                <Notification />
            </BrowserRouter>
        </Wrapper>
    );
};

export default App;
