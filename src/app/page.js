'use client'

import { useEffect, useState } from "react";
import { deckApi } from "@/utils/api";
import { suitSnap, valueSnap, noSnap } from "@/utils/constants";
import styles from "./page.module.css";
import Card from "./components/Card";
import SnapMessage from "./components/SnapMessage";
import Matched from "./components/Matched";
import Button from "./components/Button";

export default function Home() {
  const [suitMatches, setSuitMatches] = useState(0);
  const [valueMatches, setValueMatches] = useState(0);
  const [deck, setDeck] = useState({ 
    deck_id: "",
    remaining: ""
  });
  const [snap, setSnap] = useState(noSnap);
  const [rightCard, setRightCard] = useState({
    code: '',
    image: '',
    value: '',
    suit: '',
    drawn: false
  });
  const [leftCard, setLeftCard] = useState({
    code: '',
    image: '',
    value: '',
    suit: '',
    drawn: false
  });

  function shuffleNewDeck() {
    setLeftCard(prevLeftCard => ({ ...prevLeftCard, drawn: false }));
    setRightCard(prevRightCard => ({ ...prevRightCard, drawn: false }));
    setSnap(noSnap);
    deckApi.getDeck()
      .then((data) => {
        const { deck_id, remaining } = data;
        setDeck({ deck_id, remaining });
      })
      .catch((err) => {
        console.error('Error shuffling deck:', err);
      })
  }

  useEffect(() => {
    shuffleNewDeck();
  }, []);

  function drawCard() {
    deckApi.drawCard(deck.deck_id)
      .then((data) => {
        const newRightCard = data.cards[0]
        const previousRightCard = rightCard
        if (previousRightCard.drawn) {
          setLeftCard(previousRightCard)
        }
        newRightCard.drawn = true
        setRightCard(newRightCard)
        if (newRightCard.drawn && previousRightCard.drawn) {
          compareCards(previousRightCard, newRightCard)
        }
        const remainingCards = data.remaining
        const updatedDeck = { ...deck, remaining: remainingCards };
        setDeck(updatedDeck);
      })
      .catch((err) => {
        console.error('Error drawing card:', err);
      })
  }

  function compareCards(left, right) {
    if(left.value === right.value) {
      setValueMatches(prevValueMatches => prevValueMatches + 1);
      setSnap(valueSnap)
    } else if (left.suit === right.suit) {
      setSuitMatches(prevSuitMatches => prevSuitMatches  + 1)
      setSnap(suitSnap)
    } else {
      setSnap(noSnap)
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Snap!</h1>
      <Button onClick={() => shuffleNewDeck()}>shuffle deck</Button>
      <p className={styles.counter}>Remaining cards: {deck.remaining}</p>
      <SnapMessage snap={snap} valueSnap={valueSnap} suitSnap={suitSnap} />
      <div className={styles.cardList}>
        <Card card={leftCard} />
        <Card card={rightCard} />
      </div>
        {deck.remaining !== '' && deck.remaining !== 0 && (
          <Button onClick={() => drawCard()}>draw card</Button>
          )}
        {deck.remaining === 0 && (
          <Matched valueMatches={valueMatches} suitMatches={suitMatches} />
        )}
    </main>
  );
};
