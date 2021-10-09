import { createStyles, makeStyles } from '@mui/styles';

export const useAccordionStyles = makeStyles(() =>
    createStyles({
        root: {
            boxShadow: 'none !important',
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
            color: 'rgba(0, 0, 0, 0.26) !important',
            background: 'rgba(0, 0, 0, 0.12) !important',
            marginBottom: '10px !important',
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
