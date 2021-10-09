import React from 'react';
import moment from 'moment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Name } from '../TaskDetails.styles';
import { HistoryItem, HistoryTitle, HistoryData, Category } from './HistoryComponent.styles';

type HistoryItemArray = {
    category: string;
    author: { name: string };
    added: string;
    removed: string;
    timestamp: Date;
}

interface HistoryComponentProps {
    history: HistoryItemArray[];
}

const HistoryComponent: React.FunctionComponent<HistoryComponentProps> = ({ history }) => {
    return (
        <>
            {history.map((historyItem, index) => (
                <HistoryItem key={`${historyItem.author.name}_${index}`}>
                    <HistoryTitle>
                        <Name>{historyItem.author.name}</Name>&nbsp;{moment(historyItem.timestamp).format('D MMM YYYY HH:mm')}
                    </HistoryTitle>
                    <HistoryData>
                        <Category>{historyItem.category}</Category>:&nbsp;{historyItem.removed}&nbsp;&nbsp;<ArrowForwardIcon fontSize="small" />&nbsp;&nbsp;{historyItem.added}
                    </HistoryData>
                </HistoryItem>
            ))}
        </>
    )
};

export default HistoryComponent;
