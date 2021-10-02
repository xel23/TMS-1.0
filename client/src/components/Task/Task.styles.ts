import styled from 'styled-components';

export const Wrapper = styled.div`
    margin: 20px 0;
    
    & > a {
        color: unset;
        text-decoration: none;
        
        &:hover {
            text-decoration: underline;
        }
    }
`;

export const Container = styled.div`
    display: grid;
    grid-template-columns: 4fr 1fr 0.2fr;
`;

export const ContainerRight = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    
    & > div {
        padding: 5px;
        padding-left: 10px;
    }
    
    & > * > span {
        display: block;
        border-right: 1px solid #ddd;
        margin-right: -5px;
    }
`;

export const ContainerLeft = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    justify-items: center;
    
    & > div {
        padding: 5px;
    }
`;

export const ContainerIcons = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    
    & > svg {
        cursor: pointer;
    }
`;

export const Status = styled.div`
    font-weight: bold;
    
    &.open {
        color: #f0ad4e;
        border-bottom: 2.5px solid #f0ad4e;
    }
    
    &.in-progress {
        color: #0047b2;
        border-bottom: 2.5px solid #0047b2;
    }
    
    &.done {
        color: #5cb85c;
        border-bottom: 2.5px solid #5cb85c;
    }
`;

export const Priority = styled.div`
    font-weight: bold;
    
    &.highest {
        color: #d9534f;
        border-bottom: 2.5px solid #d9534f;
    }
    
    &.high {
        color: #dda0dd;
        border-bottom: 2.5px solid #dda0dd;
    }
    
    &.normal {
        color: #5bc0de;
        border-bottom: 2.5px solid #5bc0de;
    }
    
    &.low {
        color: #0064a1;
        border-bottom: 2.5px solid #0064a1;
    }
    
    &.lowest {
        color: #909090;
        border-bottom: 2.5px solid #909090;
    }
`;

export const Author = styled.div`
    font-weight: bold;
    color: #3875d7;
`;
