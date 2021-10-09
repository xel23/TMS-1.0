import styled from 'styled-components';
import { createStyles, makeStyles } from '@mui/styles';

export const FieldName = styled.div`
    font-size: 18px;
    margin: 15px 0 5px 0;
`;

export const useTextFieldStyles = makeStyles(() =>
    createStyles({
        root: {
            '& .MuiOutlinedInput-input': {
                width: '35vw',
                padding: '8px',
            }
        }
    })
);
