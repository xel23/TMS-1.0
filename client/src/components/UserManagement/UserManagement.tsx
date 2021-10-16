import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { HEADER_TITLE } from './consts';

import { users } from './__mock__/users';

import { ButtonName } from '../../pages/TasksPage/TasksPage.styles';
import { Wrapper, ButtonWrapper, RoleIcon, IconsWrapper, UpdateIconWrapper, useSelectStyles, useTableStyles } from './UserManagement.styles';

interface Role {
    [key: string]: boolean,
    updateTask: boolean,
    readTask: boolean,
    createTask: boolean,
    deleteTask: boolean,
    readUser: boolean,
    updateUser: boolean,
    createUser: boolean,
    deleteUser: boolean,
}

const initialRole: Role = {
    updateTask: false,
    readTask: false,
    createTask: false,
    deleteTask: false,
    readUser: false,
    updateUser: false,
    createUser: false,
    deleteUser: false,
};

const UserManagement: React.FunctionComponent = () => {
    const [editableUserId, setEditableUserId] = useState<string>('');
    const [editableUser, setEditableUser] = useState<Role>(initialRole);

    const { headRoot } = useTableStyles();
    const { select, icon } = useSelectStyles();

    const renderPermitCell = (userId: string, permitName: string, isAllowed: boolean) => {
        if (userId === editableUserId) {
            return (
                <Select
                    classes={{ select, icon }}
                    variant="standard"
                    disableUnderline
                    value={editableUser[permitName]}
                    onChange={(event) => setEditableUser((prev) => ({ ...prev, [permitName]: event.target.value === 'true' }))}
                >
                    {['true', 'false'].map((option: string) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </Select>
            )
        } else {
            return <RoleIcon>{isAllowed ? <DoneIcon color="success" /> : <ClearIcon color="error" />}</RoleIcon>;
        }
    };

    return (
        <Wrapper>
            <ButtonWrapper>
                <Button variant="outlined">
                    <ButtonName>Add new user</ButtonName><PersonAddIcon fontSize="small" />
                </Button>
            </ButtonWrapper>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {HEADER_TITLE.map((title, index) => (
                            <TableCell key={title} classes={{ root: headRoot }} align={index === 0 ? 'left' : 'center'}>
                                {title}
                            </TableCell>
                        ))}
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(({ userId, name, role }) => (
                        <TableRow key={userId}>
                            <TableCell align="left">{name}</TableCell>
                            <TableCell align="center">{renderPermitCell(userId, 'readUser', role.readUser)}</TableCell>
                            <TableCell align="center">{renderPermitCell(userId, 'createUser', role.createUser)}</TableCell>
                            <TableCell align="center">{renderPermitCell(userId, 'updateUser', role.updateUser)}</TableCell>
                            <TableCell align="center">{renderPermitCell(userId, 'deleteUser', role.deleteUser)}</TableCell>
                            <TableCell align="center">{renderPermitCell(userId, 'readTask', role.readTask)}</TableCell>
                            <TableCell align="center">{renderPermitCell(userId, 'createTask', role.createTask)}</TableCell>
                            <TableCell align="center">{renderPermitCell(userId, 'updateTask', role.updateTask)}</TableCell>
                            <TableCell align="center">{renderPermitCell(userId, 'deleteTask', role.deleteTask)}</TableCell>
                            <TableCell align="right">
                                <IconsWrapper>
                                    {userId === editableUserId && (
                                        <UpdateIconWrapper>
                                            <Tooltip title="Update user" placement="top">
                                                <ArrowForwardIcon color="secondary" onClick={() =>{}} />
                                            </Tooltip>
                                        </UpdateIconWrapper>
                                    )}
                                    <Tooltip title="Edit user" placement="top">
                                        <EditIcon
                                            color="action"
                                            onClick={() => {
                                                setEditableUserId((prev) => prev === userId ? '' : userId);
                                                setEditableUser(role);
                                            }}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Delete user" placement="top">
                                        <DeleteIcon color="error" onClick={() =>{}} />
                                    </Tooltip>
                                </IconsWrapper>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Wrapper>
    );
};

export default UserManagement;
