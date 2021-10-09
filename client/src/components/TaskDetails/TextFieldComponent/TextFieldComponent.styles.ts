import { createStyles, makeStyles } from '@mui/styles';

export const useTextFieldStyles = makeStyles(() =>
    createStyles({
        root: {
            '& .MuiOutlinedInput-input': {
                padding: '8px',
            },

            '& .MuiInputBase-multiline': {
                height: '70px',
                alignItems: 'start',
                padding: 0,
            },

            '& .MuiInputBase-input.Mui-disabled': {
                cursor: 'not-allowed',
            },

            '&.summary > div:first-child': {
                fontSize: '32px',
                color: 'rgba(0, 0, 0, 0.87)',
            },

            '&.description > div:first-child': {
                color: 'rgba(0, 0, 0, 0.87)',
            }
        },
    })
);
