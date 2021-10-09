import { createStyles, makeStyles } from '@mui/styles';

export const useSelectStyles = makeStyles(() =>
    createStyles({
        outlined: {
            padding: '8px',
        },
        disabled: {
            cursor: 'not-allowed !important',
        },
    })
);
