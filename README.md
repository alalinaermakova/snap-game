## Snap Game

Snap Game is a web application that allows users to play the classic card game Snap. In this game, players compete to match cards based on their value or suit.

## Features
Shuffle the deck of cards.
Draw cards from the deck.
Match cards based on their value or suit.
Keep track of matched cards.
Display snap messages when matches are found.

## Technologies Used
React.js: Frontend JavaScript library for building user interfaces.
Next.js: React framework for server-side rendering and routing.
Styled-components: Library for styling React components using tagged template literals.
Jest and React Testing Library: For unit and integration testing of React components.
Axios: Promise-based HTTP client for making API requests.
OpenDeck API: API used to fetch and draw cards for the game.
Installation
To run the Snap Game locally, follow these steps:

Clone the repository to your local machine:
```bash
git clone <repository-url>
```

Navigate to the project directory:
```bash
cd snap-game
```

Install dependencies using npm or yarn:
```bash
npm install
# or
yarn install
```

Start the development server:
```bash
npm run dev
# or
yarn dev
```

Run tests:
```bash
npm run test
```

Open your browser and navigate to http://localhost:3000 to view the Snap Game.


## Usage
Click the "Shuffle Deck" button to shuffle the deck of cards.
Click the "Draw Card" button to draw a card from the deck.
If two consecutive cards match based on their value or suit, a snap message will be displayed.
The game keeps track of matched cards, and when all cards have been matched, the game ends.
Contributing
Contributions to Snap Game are welcome! If you find any issues or have suggestions for improvement, please open an issue or create a pull request on GitHub.

License
This project is licensed under the MIT License.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!