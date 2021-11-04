import styled from 'styled-components';
import { createStyles, makeStyles } from '@mui/styles';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 25px;
`;

export const UserName = styled.div`
    width: 45vw;
    font-size: 32px;
    font-style: italic;
    margin-bottom: 10px;
`;

export const DottedLine = styled.div`
    border: none;
    border-top: 2px dotted #1976d2;
    width: 45vw;
    margin-bottom: 30px;
`;

export const FieldsWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    justify-items: center;
        
    & > div {
        width: 45vw;
        display: grid;
        grid-template-columns: 2fr 3fr;
        justify-items: start;
        align-items: center;
        margin-bottom: 15px;
        
        & > div:first-child {
            font-weight: bold;
        }
        
        & > div:last-child {
            width: 100%;
        }
    }
`;

export const ErrorWrapper = styled.div`
    width: 45vw;
    margin-top: 5px;
    
    & > div {
        margin: 0px;
    }
`;

export const ButtonWrapper = styled.div`
    width: 45vw;
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
`;

export const useTextFieldStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',

            '& .MuiOutlinedInput-input': {
                padding: '8px',
            },

            '& .MuiInputBase-input.Mui-disabled': {
                cursor: 'not-allowed',
            },
        },
    })
);
