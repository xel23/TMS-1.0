import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Container, Item, useAppBarStyles, useToolbarStyles } from './Header.styles';

const Header: React.FunctionComponent = () => {
    const { root: appBarRoot } = useAppBarStyles();
    const { root: toolbarRoot } = useToolbarStyles();

    return (
        <AppBar classes={{ root: appBarRoot }} position="static" color="primary">
            <Toolbar classes={{ root: toolbarRoot }}>
                <Container>
                    <Typography variant="h6" component="div">
                        <Item>Task Management System</Item>
                    </Typography>
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
                </Container>
                <ExitToAppIcon />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
