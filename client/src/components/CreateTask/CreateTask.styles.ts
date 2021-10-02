import styled from 'styled-components';
import { createStyles, makeStyles } from '@material-ui/core';

export const Wrapper = styled.div`
    display: grid;
    justify-content: center;
    margin: 2.5vh 0 5vh 0;
`;

export const useTextFieldStyles = makeStyles(() =>
    createStyles({
        root: {
            '& .MuiOutlinedInput-input': {
                width: '55vw',
                padding: '8px',
            },

            '& .MuiOutlinedInput-multiline': {
                height: '70px',
                alignItems: 'start',
                padding: 0,
            }
        }
    })
);

export const useSelectStyles = makeStyles(() =>
    createStyles({
        outlined: {
            padding: '8px',
        }
    })
);
