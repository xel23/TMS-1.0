import styled from 'styled-components';
import { createStyles, makeStyles } from '@mui/styles';

export const Wrapper = styled.div`
    margin: 25px;
`;

export const ButtonWrapper = styled.div`
    margin-bottom: 25px;
`;

export const RoleIcon = styled.div`
    display: flex;
    justify-content: center;
`;

export const IconsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    
    & > svg {
        cursor: pointer;
    }
`;

export const UpdateIconWrapper = styled.div`
    display: flex;
    margin-left: -34px;
    
    & > svg {
        cursor: pointer;
    }
`;

export const useSelectStyles = makeStyles(() =>
    createStyles({
        select: {
            padding: '0 !important',
        },
        icon: {
            display: 'none !important',
        },
    })
);

export const useTableStyles = makeStyles(() =>
    createStyles({
        headRoot: {
            textTransform: 'uppercase',
            // @ts-ignore
            fontWeight: 'bold !important',
        },
    })
);
