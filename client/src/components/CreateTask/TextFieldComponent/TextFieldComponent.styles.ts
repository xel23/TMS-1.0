import { createStyles, makeStyles } from '@mui/styles';

export const useTextFieldStyles = makeStyles(() =>
    createStyles({
        root: {
            '& .MuiOutlinedInput-input': {
                width: '55vw',
                padding: '8px',
            },

            '& .MuiInputBase-multiline': {
                height: '70px',
                alignItems: 'start',
                padding: 0,
            }
        }
    })
);
