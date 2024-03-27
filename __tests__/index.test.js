import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import request from 'supertest';
import fetchMock from 'jest-fetch-mock'
import Home from '@/app/page';
import { deckApi } from '@/utils/api';
import deckMock from '../__mocks__/deck.json';
import cardMock from '../__mocks__/card.json';
import cardSpadesMock from '../__mocks__/card_spades.json';
import cardHeartMock from '../__mocks__/card_heart.json';
import cardClubsMock from '../__mocks__/card_clubs.json';
import cardLast from '../__mocks__/card_last.json';

const baseUrl = deckApi._baseUrl;
let deckId;

describe('Home', () => {
    it('renders a heading', () => {
        render(<Home />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument()
    });
});

describe('Api testing', () => {
    beforeAll(async () => {
        const createResponse = await request(baseUrl).get('/deck/new/shuffle/?deck_count=1');
        deckId = createResponse.body.deck_id;
    });

    it('draws a card from the deck', async () => {
        const response = await request(baseUrl).get(`/deck/${deckId}/draw/?count=1`)
        expect(response.body).toHaveProperty('cards');
        expect(response.body.cards).toHaveLength(1);
    });
});

describe('Mock api testing to get deck info',  () => {
    beforeEach(() => {
        fetch.mockResponse(request => {
            if (request.url.startsWith('https://deckofcardsapi.com/api/deck/new/shuffle/')) {
                return Promise.resolve({
                    body: JSON.stringify(deckMock),
                    status: 200,
                    statusText: 'OK',
                    headers: [],
                });
            } else if (request.url.startsWith('https://deckofcardsapi.com/api/deck/test_deck_id/draw')) {
                return Promise.resolve({
                    body: JSON.stringify(cardMock),
                    status: 200,
                    statusText: 'OK',
                    headers: [],
                });
            } else {
                return Promise.resolve({ status: 404, statusText: 'Not Found', headers: [], body: '' });
            }
        });

        fetchMock.enableMocks();
    });

    it('click button shuffle deck to get new deck', async () => {
        render(<Home />);

        const buttonShuffleDeck = screen.getByText('shuffle deck');
        fireEvent.click(buttonShuffleDeck);

        expect(await screen.findByText('Remaining cards: 52')).toBeInTheDocument();
    });

    it('get new deck and draws a card', async () => {
        render(<Home />);

        const btnShuffleDeck = screen.getByText('shuffle deck');
        fireEvent.click(btnShuffleDeck);

        expect(await screen.findByText('Remaining cards: 52')).toBeInTheDocument();

        const btnDrawCard = screen.getByText('draw card');
        fireEvent.click(btnDrawCard);

        expect(await screen.findByText('Remaining cards: 51')).toBeInTheDocument();
    });

    it('compare two cards with same value', async () => {
        render(<Home />);

        const btnShuffleDeck = screen.getByText('shuffle deck');
        fireEvent.click(btnShuffleDeck);

        await screen.findByText('Remaining cards: 52')

        const btnDrawCard = screen.getByText('draw card');
        fireEvent.click(btnDrawCard);

        await screen.findByText('Remaining cards: 51')

        const btnDrawCard2 = screen.getByText('draw card');
        
        fetchMock.resetMocks()
        fetchMock.once(JSON.stringify(cardSpadesMock))

        fireEvent.click(btnDrawCard2);
        await screen.findByText('Remaining cards: 50')

        expect(await screen.findByText('value snap')).toBeInTheDocument();
    });

    it('compare two cards with same suit', async () => {
        render(<Home />);

        const btnShuffleDeck = screen.getByText('shuffle deck');
        fireEvent.click(btnShuffleDeck);

        await screen.findByText('Remaining cards: 52')

        const btnDrawCard = screen.getByText('draw card');
        fireEvent.click(btnDrawCard);

        await screen.findByText('Remaining cards: 51')

        const btnDrawCard2 = screen.getByText('draw card');
        
        fetchMock.resetMocks()
        fetchMock.once(JSON.stringify(cardHeartMock))

        fireEvent.click(btnDrawCard2);
        await screen.findByText('Remaining cards: 50')

        expect(await screen.findByText('suit snap')).toBeInTheDocument();
    });

    it('compare two cards and no snap suit or snap value', async () => {
        render(<Home />);

        const btnShuffleDeck = screen.getByText('shuffle deck');
        fireEvent.click(btnShuffleDeck);

        await screen.findByText('Remaining cards: 52')

        const btnDrawCard = screen.getByText('draw card');
        fireEvent.click(btnDrawCard);

        await screen.findByText('Remaining cards: 51')

        const btnDrawCard2 = screen.getByText('draw card');
        
        fetchMock.resetMocks()
        fetchMock.once(JSON.stringify(cardClubsMock))

        fireEvent.click(btnDrawCard2);
        await screen.findByText('Remaining cards: 50')

        expect(screen.queryByText('suit snap')).toBeNull();
    });

    it('button is not displayed on the screen after 52 cards', async () => {
        render(<Home />);
        const btnDrawCard2 = screen.getByText('draw card');

        fetchMock.once(JSON.stringify(cardLast));

        fireEvent.click(btnDrawCard2);
        await screen.findByText('Remaining cards: 0')

        expect(btnDrawCard2).toBeNull();

    });
});