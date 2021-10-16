import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Name } from '../TaskDetails.styles';
import { CommentItem, CommentTitle, EditableComment } from './CommentsComponent.styles';

import { Comment } from '../TaskDetails';

interface CommentsProps {
    isCommentUpdated: boolean;
    comments: Comment[];
    updateComment: (commentId: string, text: string) => void;
    deleteComment: (commentId: string) => void;
}

const CommentsComponent: React.FunctionComponent<CommentsProps> = ({ isCommentUpdated, comments, updateComment, deleteComment }) => {
    const [editableCommentId, setEditableCommentId] = useState<string>('');
    const [editableCommentText, setEditableCommentText] = useState<string>('');

    useEffect(() => {
       if (isCommentUpdated) {
           setEditableCommentId('');
           setEditableCommentText('');
       }
    }, [isCommentUpdated]);

    return (
        <>
            {comments.map(({ _id, author, created, text }) => (
                <CommentItem key={_id}>
                    <CommentTitle>
                        <div>
                            <Name>{author}</Name>&nbsp;commented {moment(created).format('D MMM YYYY HH:mm')}
                        </div>
                        <div>
                            <Tooltip title="Edit comment" placement="top">
                                <EditIcon
                                    color="action"
                                    onClick={() => {
                                        setEditableCommentId((prev) => prev === _id ? '' : _id);
                                        setEditableCommentText(text);
                                    }}
                                />
                            </Tooltip>
                            <Tooltip title="Delete comment" placement="top">
                                <DeleteIcon color="error" onClick={() => deleteComment(_id)} />
                            </Tooltip>
                        </div>
                    </CommentTitle>
                    {_id === editableCommentId
                        ? (
                            <EditableComment>
                                <TextField
                                    variant="standard"
                                    placeholder="Enter comment"
                                    value={editableCommentText}
                                    onChange={(event) => setEditableCommentText(event.target.value)}
                                />
                                <Tooltip title="Update comment" placement="top">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={editableCommentText.length === 0}
                                        onClick={() => updateComment(_id, editableCommentText)}
                                    >
                                        <ArrowForwardIcon fontSize="small"/>
                                    </Button>
                                </Tooltip>
                            </EditableComment>
                        ) : (
                            <div>{text}</div>
                        )}
                </CommentItem>
            ))}
        </>
    )
};

export default CommentsComponent;
