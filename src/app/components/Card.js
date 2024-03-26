'use client'
import Image from "next/image";
import styled from 'styled-components';
import { motion, AnimatePresence } from "framer-motion";

const StyledContainer = styled(motion.div)`
    height: '375px';
    width: '270px';
    position: 'relative';
    & img {
        object-fit: cover;
    }
`

export default function Card({ card }) {
    return (
        <AnimatePresence>
            <StyledContainer
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Image
                    src={card.drawn ? card.image : "https://opengameart.org/sites/default/files/card%20back%20black.png"}
                    height='375'
                    width='270'
                    alt="card"
                />
            </StyledContainer>
        </AnimatePresence>
    );
}