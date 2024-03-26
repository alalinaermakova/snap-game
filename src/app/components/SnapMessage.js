'use client'
import { motion, AnimatePresence } from "framer-motion"
import styled from 'styled-components';

const StyledDiv = styled.div`
    position: absolute;
    top: 49%;
    right: 47%;
    align-self: center;
    & p {
        font-size: 1.3rem;
    }
`

export default function SnapMessage({ snap, valueSnap, suitSnap }) {
    return (
        <StyledDiv>
            <AnimatePresence>
                {snap == suitSnap && 
                    (<motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            ease: "linear",
                            duration: 1
                        }}
                    >suit snap
                    </motion.p>
                )}
                {snap == valueSnap && 
                    (<motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >value snap
                    </motion.p>
                )}
            </AnimatePresence>
        </StyledDiv>
    )
};