import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../../components/Header/Header';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';
import TasksPage from '../TasksPage/TasksPage';
import CreateTaskPage from '../CreateTaskPage/CreateTaskPage';

import { DataContext, DataContextProvider } from '../../context';

import { Wrapper } from './App.styles';

const App: React.FunctionComponent = () => {
    const { token } = useContext(DataContext);

    return (
        <DataContextProvider>
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
                                        <Redirect to="/tasks" />
                                )
                            }}
                        />
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
        </DataContextProvider>
    );
};

export default App;
