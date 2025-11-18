## art-frontend

A React + Vite frontend for the Violet Bergeson art storefront and portfolio.  
Features a list of available artwork for purchase, a portfolio gallery, an artist bio, and a cart/checkout flow backed by a JSON API.

### Tech stack

- **Framework**: React 19, React Router 7
- **Build tool**: Vite
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite`)
- **Data & state**: Axios, Zustand, Zod, `@art-vbst/art-types`

### Getting started

- **Prerequisites**: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

### Environment variables

Create a `.env` file in the project root (or use your deployment platform’s env settings) and define:

- **`VITE_API_HOST`**: Base URL for the backend API (used by Axios).
- **`VITE_CONTACT_EMAIL`**: Email address used for “Contact support” links and mailto actions.
