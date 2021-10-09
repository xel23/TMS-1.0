import React from 'react';
import moment from 'moment';

import { Name } from '../TaskDetails.styles';
import { CommentItem, CommentTitle  } from './CommentsComponent.styles';

type Comment = {
    author: string;
    text: string;
    created: Date;
}

interface CommentsProps {
    comments: Comment[];
}

const CommentsComponent: React.FunctionComponent<CommentsProps> = ({ comments }) => {
    return (
        <>
            {comments.map((comment, index) => (
                <CommentItem key={`${comment.author}_${index}`}>
                    <CommentTitle>
                        <Name>{comment.author}</Name>&nbsp;commented {moment(comment.created).format('D MMM YYYY HH:mm')}
                    </CommentTitle>
                    <div>{comment.text}</div>
                </CommentItem>
            ))}
        </>
    )
};

export default CommentsComponent;
