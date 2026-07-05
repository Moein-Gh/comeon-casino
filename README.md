# ComeOn Casino

A minimal casino website frontend for the ComeOn Group frontend take-home
assignment. Built with Next.js (App Router), TypeScript, and Tailwind CSS,
against the assignment's `json-server`-backed API.

## Requirements

- Node.js 18+
- The assignment's API server (`login`, `logout`, `games`, `categories`)
  already running on `http://localhost:3000`. This app doesn't provision or
  ship that server — bring your own instance.

### Test accounts

| username | password |
| -------- | -------- |
| rebecka  | secret   |
| eric     | dad      |
| stoffe   | rock     |

## Running the app

```bash
npm install
npm run dev
```

The app runs on `http://localhost:3002` (not the Next.js default 3000,
since that's where the API server is expected to run). `next.config.ts`
rewrites `/api/*` requests to `http://localhost:3000/*` so the browser never
talks to the API cross-origin directly.

Open [http://localhost:3002](http://localhost:3002) — it redirects to
`/login` (or straight to `/games` if already logged in).

## Assumptions & known simplifications

- **No real session/token.** The API doesn't return an auth token, so
  "being logged in" is just the `/login` response cached in
  `sessionStorage` for the tab's lifetime. The `/games` and `/games/[code]`
  routes are gated by a client-side check (`app/games/layout.tsx` +
  `components/layout/GamesGuard.tsx`) rather than real middleware, since
  there's no server-side session to verify against, and the games/categories
  data itself is only fetched client-side after that guard passes — an
  unauthenticated visitor never triggers a request to the API. This is an
  intentional simplification given the take-home API, not an oversight.
- **Ports.** The API server is expected on port 3000, which collides with
  Next's default dev port, so the app runs on 3002 instead (see
  `package.json`'s `dev` script and `next.config.ts`'s rewrite target).
- **No React Query / Redux / Zustand.** Kept out deliberately at this scope.
  Games/categories are fetched once on entering `/games` with plain `fetch`;
  search and category filtering happen client-side over that already-fetched
  list.

## What I'd add with more time

- A real loading UI (skeletons) for the games list instead of the plain text
  "Loading…" state while the client fetch is in flight.
- Tests (component tests for the login form and game filtering, at least).
- Persisting the "logged in" state across a full page reload with something
  sturdier than `sessionStorage`, if this were backed by a real auth system.
- An actual design pass on the QuickSpin game iframe sizing — it's a fixed
  640×480 iframe from the vendor script, so it doesn't scale as gracefully as
  the rest of the responsive layout.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- React Hook Form + Zod (login form validation)
- `motion` for interaction animations
