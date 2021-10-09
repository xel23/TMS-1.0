import styled from 'styled-components';
import { createStyles, makeStyles } from '@mui/styles';

export const Placeholder = styled.div`
    color: rgba(0, 0, 0, 0.35)
`;

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

export const useMenuItemStyles = makeStyles(() =>
    createStyles({
        root: {
            padding: '0 !important',
        }
    })
);
