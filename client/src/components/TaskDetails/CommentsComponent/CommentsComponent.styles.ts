import styled from 'styled-components';

export const CommentItem = styled.div`
    margin-bottom: 15px;
`;

export const CommentTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    color: rgb(0 0 0 / 54%);
    
    & > div:first-child {
        display: flex;
    }
`;

export const EditableComment = styled.div`
    display: flex;
    gap: 10px;
    margin: 5px 0;
`;

export const IconsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    
    & > svg {
        cursor: pointer;
    }
`;
