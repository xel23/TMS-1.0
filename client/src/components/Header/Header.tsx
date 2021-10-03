import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { DataContext } from '../../context';

import { Container, Item, useAppBarStyles, useToolbarStyles, useIconStyles } from './Header.styles';

const Header: React.FunctionComponent = () => {
    const { token, setToken } = useContext(DataContext);

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
                    {token === '' ? (
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
                {token !== '' && <ExitToAppIcon classes={{ root: iconRoot }} onClick={() => {
                    setToken('');
                    history.push('/login');
                }} />}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
