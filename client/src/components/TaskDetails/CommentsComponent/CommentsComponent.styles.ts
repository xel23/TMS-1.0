import styled from 'styled-components';

export const CommentItem = styled.div`
    margin-bottom: 15px;
`;

export const CommentTitle = styled.div`
    display: flex;
    justify-content: space-between;
    color: rgb(0 0 0 / 54%);
    margin-bottom: -5px;
    
    & > div:first-child {
        display: flex;
    }
    
    & > * > svg {
        cursor: pointer;
    }
`;

export const EditableComment = styled.div`
    display: flex;
    gap: 10px;
    margin: 5px 0;
`;
