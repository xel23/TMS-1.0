import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { DataContext, initialUser } from '../../context';

import { Container, Item, useAppBarStyles, useToolbarStyles, useIconStyles } from './Header.styles';

const Header: React.FunctionComponent = () => {
    const { user: { accessToken }, setUser } = useContext(DataContext);

    const history = useHistory();

    const { root: appBarRoot } = useAppBarStyles();
    const { root: toolbarRoot } = useToolbarStyles();
    const { root: iconRoot } = useIconStyles();

    return (
        <AppBar classes={{ root: appBarRoot }} position="static" color="primary">
            <Toolbar classes={{ root: toolbarRoot }}>
                <Container>
                    <Typography variant="h6" component="div">
                        <Item>Task Management System</Item>
                    </Typography>
                    {accessToken === '' ? (
                        <>
                            <Typography variant="h6" component="div">
                                <Item>
                                    <Link to="/register">Register</Link>
                                </Item>
                            </Typography>
                            <Typography variant="h6" component="div">
                                <Item>
                                    <Link to="/login">Login</Link>
                                </Item>
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6" component="div">
                                <Item>
                                    <Link to="/dashboard">Dashboard</Link>
                                </Item>
                            </Typography>
                            <Typography variant="h6" component="div">
                                <Item>
                                    <Link to="/tasks">Task List</Link>
                                </Item>
                            </Typography>
                            <Typography variant="h6" component="div">
                                <Item>
                                    <Link to="/archive">Archive</Link>
                                </Item>
                            </Typography>
                        </>
                    )}
                </Container>
                {accessToken !== '' && <ExitToAppIcon classes={{ root: iconRoot }} onClick={() => {
                    setUser(initialUser);
                    localStorage.setItem('user', '');
                    history.push('/login');
                }} />}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
