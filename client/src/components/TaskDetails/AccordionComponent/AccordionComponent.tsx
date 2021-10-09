import React from 'react';
import Accordion from '@mui/material/Accordion/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useAccordionStyles, useAccordionSummaryStyles, useAccordionDetailsStyles } from './AccordionComponent.styles';

interface AccordionComponentProps {
    title: string;
}

const AccordionComponent: React.FunctionComponent<AccordionComponentProps> = (props) => {
    const { root: accordionRoot, expanded } = useAccordionStyles();
    const { root: accordionSummaryRoot } = useAccordionSummaryStyles();
    const { root: accordionDetailsRoot } = useAccordionDetailsStyles();

    return (
        <Accordion classes={{ root: accordionRoot, expanded }}>
            <AccordionSummary
                classes={{ root: accordionSummaryRoot }}
                expandIcon={<ExpandMoreIcon />}
            >
                <div>{props.title}</div>
            </AccordionSummary>
            <AccordionDetails classes={{ root : accordionDetailsRoot }}>
                {props.children}
            </AccordionDetails>
        </Accordion>
    )
};

export default AccordionComponent;
