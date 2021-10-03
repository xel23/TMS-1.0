import React, { useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { DataContext } from '../../context';

const Notification: React.FunctionComponent = () => {
    const { notification, setNotification } = useContext(DataContext);

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification({ isOpen: false, status: -1, message: '' });
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            open={notification.isOpen}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <SnackbarContent
                style={{
                    backgroundColor:
                        (notification.status === 400 || notification.status === 403 || notification.status === 404 || notification.status === 500)
                            ? '#d32f2f'
                            : notification.status !== -1
                            ? '#2e7d32'
                            : 'transparent'
                }}
                message={notification.message}
                action={action}
            />
        </Snackbar>
    )
};

export default Notification;
