import styled from 'styled-components';
import {createStyles, makeStyles} from '@mui/styles';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr repeat(3, 1fr);
    grid-gap: 15px;
    margin: 25px 0;
`;

export const useTextFieldStyles = makeStyles(() =>
    createStyles({
        root: {
            '& .MuiOutlinedInput-input': {
                padding: '8px',
            }
        }
    })
);

export const useSelectStyles = makeStyles(() =>
    createStyles({
        root: {
            height: 'fit-content',

            '& > div': {
                padding: '8px',
            }
        }
    })
);
