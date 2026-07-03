# Project Context: ComeOn Frontend Test

## What this is

A take-home technical assignment for a Frontend Developer role at ComeOn Group
(job posting stack: React, TypeScript, Next.js). Submission deadline: **July 8**.
The reviewers will use this as the basis for a follow-up technical discussion,
so code quality, architecture choices, and clear reasoning matter more than
raw feature count.

Original assignment repo (reference only, not forked):
<https://github.com/comeon-group/comeon-frontend-test>

## The task

Build a minimal casino website frontend on top of a provided mock API
(`json-server`). Core screens:

1. **Login** — POST `/login` with username/password. Success shows the games
   list. Failure shows an inline error and keeps the form usable.
2. **Logout** — POST `/logout`. Returns user to login screen, clears state.
3. **Games list** (auth-gated) — GET `/games` and `/categories`. Text search
   (as-you-type) and category filter, combinable. Clicking a game's play icon
   opens the game screen.
4. **Game play screen** (auth-gated) — calls `comeon.game.launch('gamecode')`
   into a `#game-launch` div. Includes a back button to the games list.

The app must be responsive. Extra polish beyond the bare requirements is
explicitly welcomed by the assignment brief.

## Tech stack (decided)

- **Next.js** (App Router) + TypeScript — matches the job posting's actual
  stack, not just "any React setup."
- **Tailwind CSS** — custom styling instead of the Semantic UI the assignment
  boilerplate ships with; the brief explicitly invites restyling.
- **React Hook Form + Zod** — form handling and validation/schema typing for
  login and API response shapes.
- **json-server** (pinned to 0.17.3 or earlier — v1+ changed CLI/config
  behavior and is NOT what the assignment expects) running the mock API
  separately from the Next.js dev server.
- No Redux, no React Query, no Zustand — deliberately kept out at this scope.
  If asked in interview: would introduce React Query first if the app grew
  (caching, request dedupe), Zustand only if cross-tree state got messy.

## Architecture decisions

- Real Next.js routes: `/login`, `/games`, `/games/[code]` — not client-side
  state-only screen switching. This is the one place Next.js meaningfully
  changes the design vs. a plain SPA.
- Auth gating handled in a layout/client guard, redirecting to `/login` when
  no player is in context. Not using middleware — the mock API returns no
  real token/session, so a full server-side auth check would be theater.
  This is a **known, intentional simplification** — call it out, don't hide it.
- Auth/player state lives in a small React Context, persisted to
  `sessionStorage` so a refresh doesn't kick the user back to login.
- `next.config.ts` rewrites/proxies `/api/*` to the local json-server
  instance (`localhost:3001`) to avoid CORS and to demonstrate the BFF-style
  pattern Next.js is good at, rather than hardcoding a cross-origin fetch URL.
- Initial `/games` and `/categories` data fetched server-side where
  reasonable (Server Component), passed down as props; interactive pieces
  (search, filters, login form, game launch) are Client Components.

## Conventions

- Concise, direct naming. No unnecessary abstraction for a project this size.
- Every async call handles loading and error states, not just the happy path.
- Debounce the search input.
- Commit incrementally with meaningful messages — the assignment explicitly
  says they're watching for this, and it's a natural interview walkthrough.
- README in the repo root must cover: install/run instructions for both the
  Next.js app and json-server, assumptions made, and a short "what I'd add
  with more time" section.

## Mock API notes

- Data source: `mock/mock-data.json`, served via `mock/mock-api.js`
  middleware through json-server.
- No real tokens returned on login — auth state is a client-side convenience,
  not real session security. Don't over-engineer around this.

## What NOT to do

- Don't fork the assignment repo directly as the submission repo.
- Don't reach for a heavy UI kit (MUI, Chakra) — a hand-styled UI reads
  better for a design-forward product like a casino site.
- Don't add libraries just to pad the stack — be ready to justify every
  dependency in the interview.
