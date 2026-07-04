# ComeOn Casino

A minimal casino website frontend for the ComeOn Group frontend take-home
assignment. Built with Next.js (App Router), TypeScript, and Tailwind CSS,
against a `json-server` mock API.

## Requirements

- Node.js 18+
- Two terminals: one for the mock API, one for the Next.js app.

## Running the mock API

The mock API data and middleware live in `mock/`. From the project root:

```bash
npx json-server --watch mock/mock-data.json --middlewares mock/mock-api.js --port 3000
```

This serves `/login`, `/logout`, `/games`, and `/categories` on
`http://localhost:3000`.

> Use a json-server version below v1 (the `npx` command above resolves one
> automatically); v1+ changed the CLI/config in ways that don't match this
> mock API's middleware.

### Test accounts

| username | password |
| -------- | -------- |
| rebecka  | secret   |
| eric     | dad      |
| stoffe   | rock     |

## Running the app

In a second terminal:

```bash
npm install
npm run dev
```

The app runs on `http://localhost:3002` (not the Next.js default 3000,
since that's where json-server is running above). `next.config.ts` rewrites
`/api/*` requests to `http://localhost:3000/*` so the browser never talks to
the mock API cross-origin directly.

Open [http://localhost:3002](http://localhost:3002) — it redirects to
`/login`.

## Assumptions & known simplifications

- **No real session/token.** The mock API doesn't return an auth token, so
  "being logged in" is just the `/login` response cached in
  `sessionStorage` for the tab's lifetime. The `/games` and `/games/[code]`
  routes are gated by a client-side check (`app/games/layout.tsx`) rather
  than real middleware, since there's no server-side session to verify
  against. This is an intentional simplification given the mock API, not an
  oversight.
- **Ports.** json-server defaults to port 3000, which collides with Next's
  default dev port, so the app runs on 3002 instead (see `package.json`'s
  `dev` script and `next.config.ts`'s rewrite target).
- **No React Query / Redux / Zustand.** Kept out deliberately at this scope.
  Games/categories are fetched once per page load with plain `fetch`; search
  and category filtering happen client-side over that already-fetched list.

## What I'd add with more time

- A real loading UI (`loading.tsx` / skeletons) for the games list instead of
  the blank moment before the server-rendered HTML arrives.
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
- `json-server` (mock API only, not part of the app's own dependencies)
