'use client'
import styled from 'styled-components';

const StyledDiv = styled.div`
    align-self: center;
    font-size: 1.3rem;
`

export default function Matched({ valueMatches, suitMatches }) {
    return (
        <StyledDiv>
            <p>Value matched: {valueMatches}</p>
            <p>Suit matched: {suitMatches}</p>
        </StyledDiv>
    )
}