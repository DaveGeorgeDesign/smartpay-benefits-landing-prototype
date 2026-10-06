# SmartPay – Benefits Landing page prototype

React (Vite) prototype of the "Your Benefits" landing page from the Figma file
*DGD - SmartPay - Benefits Landing Page* (Landing Page section).

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # static build in dist/ (drag onto Netlify Drop to deploy)
```

## Page states

All eight states drawn in Figma are built in. Switch between them with the
"Prototype state" pill in the bottom-left corner, or link straight to one with
`?state=`:

| `?state=`     | Figma frame |
|---------------|-------------|
| `closed`      | New user, no benefits, Election Window closed |
| `open`        | New user, no benefits, Election Window open |
| `closes-soon` | New user, no benefits, Election Window closes soon |
| `basket`      | Window open, benefits in basket |
| `pot`         | Window open, Benefit Pot module |
| `one`         | Engaged user, single benefit |
| `two`         | Engaged user, 2 benefits |
| `four`        | Engaged user, 4 benefits (default) |

Interactive: hide-sensitive-info toggle (masks £ values), FAQ accordion,
search field, hover states. Layout is responsive with the Figma mobile layout
below 768px.

## Assets

Photos, icons and logos were exported from the Figma file. Card photos are
2x renders of the card image frames, so the "Popular" and "New benefit" tags
are also baked into those three photos (the live tag sits exactly on top).
