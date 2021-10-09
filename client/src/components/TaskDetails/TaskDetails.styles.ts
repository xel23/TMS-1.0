import styled from 'styled-components';
import { createStyles, makeStyles } from '@material-ui/core';

export const Loading = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Wrapper = styled.div`
    height: calc(100vh - 114px);
    display: grid;
    grid-template-columns: 2.5fr 1fr;
    grid-gap: 30px;
    margin: 25px;
`;

export const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16vh;
`;

export const LeftWrapper = styled.div`
    height: fit-content;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    padding: 10px;
`;

export const DateInfo = styled.div`
    display: flex;
    color: rgb(0 0 0 / 54%);
`;

export const Name = styled.div`
    color: #0047b2;
`;

export const Summary = styled.div`
    margin: 15px 0;
    
    & > div:first-child {
        width: 100%;
    }
`;

export const Description = styled.div`
    margin-left: 20px;
    
    & > div:first-child {
        width: 100%;
    }
`;

export const CommentContainer = styled.div`
    margin-top: 35px;
    
    & > div:first-child {
        width: 100%;
    }
`;

export const ButtonWrapper = styled.div`
    margin: 15px 0;
    
    &.update_btn {
        display: flex;
        justify-content: flex-end;
    }
`;

export const ButtonName = styled.span`
    margin: 0 8px 0 0;
`;

export const CommentItem = styled.div`
    margin-bottom: 15px;
`;

export const CommentTitle = styled.div`
    display: flex;
    color: rgb(0 0 0 / 54%);
    margin-bottom: 5px;
`;

export const HistoryItem = styled.div`
    margin-bottom: 15px;
`;

export const HistoryTitle = styled.div`
    display: flex;
    color: rgb(0 0 0 / 54%);
    margin-bottom: 5px;
`;

export const HistoryData = styled.div`
    display: flex;
    align-items: center;
`;

export const Category = styled.div`
    font-style: italic;
`;

export const Item = styled.div`
    display: grid;
    grid-template-columns: 95px 1fr;
    grid-gap: 15px;
    align-items: center;
    margin-bottom: 25px;
    
    & > div:first-child {
        font-weight: bold;
    }
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
                padding: '8px',
            },

            '& .MuiOutlinedInput-multiline': {
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

export const useAccordionStyles = makeStyles(() =>
    createStyles({
        root: {
            boxShadow: 'none',
        },
        expanded: {
            margin: '0 !important',
        }
    })
);

export const useAccordionSummaryStyles = makeStyles(() =>
    createStyles({
        root: {
            fontWeight: 'bold',
            color: 'rgba(0, 0, 0, 0.26)',
            background: 'rgba(0, 0, 0, 0.12)',
            marginBottom: '10px',
        }
    })
);

export const useAccordionDetailsStyles = makeStyles(() =>
    createStyles({
        root: {
            flexDirection: 'column',
        }
    })
);
