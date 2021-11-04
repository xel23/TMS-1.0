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

import { ButtonName } from '../../pages/TasksPage/TasksPage.styles';
import { Wrapper, ButtonWrapper, RoleIcon, IconsWrapper, UpdateIconWrapper, useSelectStyles, useTableStyles } from './UserManagement.styles';

interface Role {
    [key: string]: boolean | string,
    name: string,
    updateTask: boolean,
    readTask: boolean,
    createTask: boolean,
    deleteTask: boolean,
    readUser: boolean,
    updateUser: boolean,
    createUser: boolean,
    deleteUser: boolean,
}

export interface User {
    _id: string,
    email: string,
    name: string,
    regDate: Date,
    role: Role,
}

interface UserManagementProps {
    users: User[],
}

const initialRole: Role = {
    name: '',
    updateTask: false,
    readTask: false,
    createTask: false,
    deleteTask: false,
    readUser: false,
    updateUser: false,
    createUser: false,
    deleteUser: false,
};

const UserManagement: React.FunctionComponent<UserManagementProps> = ({ users }) => {
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
                    {users.map(({ _id, name, role }) => (
                        <TableRow key={_id}>
                            <TableCell align="left">{name}</TableCell>
                            <TableCell align="center">{renderPermitCell(_id, 'readUser', role.readUser)}</TableCell>
                            <TableCell align="center">{renderPermitCell(_id, 'createUser', role.createUser)}</TableCell>
                            <TableCell align="center">{renderPermitCell(_id, 'updateUser', role.updateUser)}</TableCell>
                            <TableCell align="center">{renderPermitCell(_id, 'deleteUser', role.deleteUser)}</TableCell>
                            <TableCell align="center">{renderPermitCell(_id, 'readTask', role.readTask)}</TableCell>
                            <TableCell align="center">{renderPermitCell(_id, 'createTask', role.createTask)}</TableCell>
                            <TableCell align="center">{renderPermitCell(_id, 'updateTask', role.updateTask)}</TableCell>
                            <TableCell align="center">{renderPermitCell(_id, 'deleteTask', role.deleteTask)}</TableCell>
                            <TableCell align="right">
                                <IconsWrapper>
                                    {_id === editableUserId && (
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
                                                setEditableUserId((prev) => prev === _id ? '' : _id);
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
