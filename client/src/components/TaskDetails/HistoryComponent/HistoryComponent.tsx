import React from 'react';
import moment from 'moment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Name } from '../TaskDetails.styles';
import { HistoryItem, HistoryTitle, HistoryData, Category } from './HistoryComponent.styles';

import { History } from '../TaskDetails';

interface HistoryComponentProps {
    history: History[];
}

const HistoryComponent: React.FunctionComponent<HistoryComponentProps> = ({ history }) => {
    const renderHistoryItem = ({ author, timestamp, added, removed }: History) => {
        return (
            <>
                {added.map(({ category, value }, index) => (
                    <HistoryItem key={`${author}_${index}`}>
                        <HistoryTitle>
                            <Name>{author}</Name>&nbsp;{moment(timestamp).format('D MMM YYYY HH:mm')}
                        </HistoryTitle>
                        <HistoryData>
                            <Category>{category}</Category>:&nbsp;{removed[index].value}&nbsp;&nbsp;<ArrowForwardIcon fontSize="small" />&nbsp;&nbsp;{value}
                        </HistoryData>
                    </HistoryItem>
                ))}
            </>
        )
    };

    return (
        <>
            {history.map((historyItem) => renderHistoryItem(historyItem))}
        </>
    )
};

export default HistoryComponent;
