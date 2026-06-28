# Mars Countdown

A dependency-free static site for [marscountdown.org](https://marscountdown.org/), reframed as a factual SpaceX Mars mission tracker.

## Stack

- Framework: none
- Package manager: none
- Source files: project root
- Deployment target: static hosting, including Vercel

## Local Development

From this directory:

```powershell
python -m http.server 5173
```

Then open `http://localhost:5173/`.

## Content Updates

Factual copy and date configuration are centralized in `app.js`.

```js
const MARS_TARGET_DATE = "2028-11-01T00:00:00Z";
```

`November 1, 2028 at 00:00 UTC` is a visual planning proxy for the earliest plausible late-2028 Mars opportunity. It is not a confirmed SpaceX launch date.

## Deployment

If the Vercel project is already linked locally, deploy with:

```powershell
vercel deploy --prod
```

This checkout does not currently include `.vercel/project.json`, so the project may need to be linked first:

```powershell
vercel link
vercel deploy --prod
```
