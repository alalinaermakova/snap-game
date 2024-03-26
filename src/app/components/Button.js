'use cient'
import styled from 'styled-components';

const StyledDiv = styled.div`
    align-self: center;
    background: none;
    border: none;
    padding: 5px 15px;
    font-size: 16px;
    line-height: 24px;
    width: 400;
    transition: 0.3s;
    cursor: pointer;
    position: relative;
    outline: none;

    &.gb-cutter {
        border: 2px solid #111827;
        border-radius: 5px;
        box-shadow: 3px 3px 0 #111827;
        font-size: 1.125rem;
        font-weight: 700;
        overflow: hidden;
        color: #111827;

        &::before {
            content: "";
            position: absolute;
            z-index: -1;
            transition: 0.5s;
            top: 100%;
            left: 0;
            width: 150%;
            aspect-ratio: 1;
            background: #111827;
            transform: translate(50%, 0%) rotateZ(-45deg);
        }

        &:hover::before {
            transform: translate(-20%, -60%) rotateZ(-45deg);
        }

        &:hover {
            box-shadow: 0 0 0;
            color: #eee;
        }
    }
`;

export default function Button({children, onClick}) {
    return (
        <StyledDiv className='gb-cutter' onClick={onClick}>
            {children}
        </StyledDiv>
    )
}