# Assignment Submission Notes

## Requirements checklist

### Login

- Login form is connected to the `/login` call.
- Correct username/password takes you to the games list.
- Wrong username/password shows an error message and lets you try again.

### Log out

- The log out button is connected to the `/logout` call.
- Logging out returns you to the login screen with empty fields.

### Games list

- Only visible when logged in, otherwise you're sent to the login screen.
- Lists all games and all categories from the API.
- Typing filters the list by name.
- Clicking a category filters the list by category.
- Clicking a game's play icon opens that game.

### Game play screen

- Only visible when logged in.
- Loads the selected game through the provided `comeon.game.launch()` API.
- Has a link back to the games list.

### Responsive layout

- The app works and looks right across different screen sizes, from mobile
  to desktop.

## Why the game itself doesn't play

Clicking play correctly opens the game screen and requests the right game.
Actually loading and showing the game is handled by a third-party script I
was given, and that part isn't working. There's nothing on my end left to
fix.

## Extras beyond the requirements

- Toggle between grid and list view for the games list, remembered next time
  you visit.
- Clicking a game in list view expands it to show its description.
- Smooth animated transitions when moving between the games list and a
  game's detail page.
- Light/dark theme toggle.
- A profile menu showing the logged-in player's avatar and info, with the
  log out action inside it.
- Friendly error messages if the API can't be reached, instead of a blank or
  broken page.
- Input validation on the login form before it even reaches the server.
- Going to the site's home page sends you straight to the right place:
  games list if you're logged in, login screen if not.

## Libraries used and why

- **Next.js**: the framework the project is built on, gives routing and a
  good default setup out of the box.
- **Tailwind CSS**: used for styling throughout, keeps styles close to the
  markup and made the responsive layout quicker to build.
- **react-hook-form**: handles the login form's state and validation flow
  with less boilerplate than wiring it up by hand.
- **zod**: used to check that what the API sends back actually matches the
  shape the app expects, so a bad response fails clearly instead of quietly
  breaking the UI.
- **motion**: powers the animations and transitions (view toggle, expanding
  cards, page transitions).

I'd normally reach for React Query on a project like this to handle fetching,
caching, and loading/error states. For a project this small, with only two
endpoints being read once per visit and no need for caching, refetching, or
background updates, that would be more setup than value. I used React's
built-in context and state instead, since it covers everything this app
actually needs.
