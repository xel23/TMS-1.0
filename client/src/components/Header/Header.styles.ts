import styled from 'styled-components';
import { createStyles, makeStyles } from '@mui/styles';

export const Container = styled.div`
    display: flex;
`;

export const Item = styled.div`
    margin: 0 20px 0 0;
    
    & > a {
        color: unset;
        text-decoration: none;
    }
`;

export const useAppBarStyles = makeStyles(() =>
    createStyles({
        root: {
            boxShadow: 'none !important',
        }
    })
);

export const useToolbarStyles = makeStyles(() =>
    createStyles({
        root: {
            justifyContent: 'space-between',
        }
    })
);

export const useIconStyles = makeStyles(() =>
    createStyles({
        root: {
            '&:hover': {
                cursor: 'pointer',
            }
        }
    })
);

