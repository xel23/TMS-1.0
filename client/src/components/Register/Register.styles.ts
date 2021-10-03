import styled from 'styled-components';
import { createStyles, makeStyles } from '@material-ui/core';

export const Wrapper = styled.div`
    display: grid;
    justify-content: center;
    margin-top: 10vh;
`;

export const ButtonWrapper = styled.div`
    display: grid;
    justify-content: end;
    margin-top: 20px;
`;

export const FieldName = styled.div`
    font-size: 18px;
    margin: 15px 0 5px 0;
`;

export const ButtonName = styled.span`
    margin: 0 8px 0 0;
`;

export const Error = styled.span`
    color: #f30d0d;
    letter-spacing: 1px;
    margin: 15px 0 0 0;
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
