# Inna Pickle

**A little coast at your table.**

A coastal food-brand website introducing Inna Pickle: chunky kelp pickles, with kimchi and sauces imagined for the future range. Scottish inspiration meets Scandinavian simplicity through sea-green colours, illustrated textures and playful typography.

[Visit the website](https://inna-pickle.lukelesliemelville.chatgpt.site)

![Inna Pickle coastal brand artwork](public/assets/ocean-background.webp)

## The experience

- An animated ocean-inspired homepage with motion controls and responsive navigation.
- Product collections with flavour descriptions, concept pricing and coming-soon status.
- A table journal featuring recipes, cheeseboard ideas and food pairings.
- Launch-list registration and stockist enquiries, with consent and server-side validation.
- Privacy information and layouts for mobile and desktop.

This is a pre-launch brand website. Products, packaging and some prices are concepts; the site does not offer checkout or take payments.

## Built with

React 19, TypeScript and Next.js conventions, running on Vinext and Vite. Styling uses CSS and Tailwind CSS 4. Form submissions are stored in Cloudflare D1, with a Drizzle schema and SQL migration.

## Run locally

Requires Node.js **22.13 or newer** and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by the development server (normally http://localhost:5173).

```sh
npm run build   # Build the application
npm run start   # Preview the built Cloudflare Worker locally
npm run lint    # Run ESLint
```

### Set up local form storage

After building, apply the included migration to the local D1 database:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_chunky_bucky.sql
```

Then run `npm run start`. Apply the migration once per local database. Forms require the `DB` binding and the `interests` table; a static-file host alone will not run the submission endpoint.

## Project structure

| Path | Purpose |
| --- | --- |
| `app/` | Pages, shared interface, styles and form endpoint |
| `public/assets/` | Brand imagery and media |
| `db/` | Database access and schema |
| `drizzle/` | Database migration |
| `build/`, `scripts/` | Worker integration and development tooling |
| `.openai/hosting.json` | Sites hosting bindings |

## Hosting

The current website is hosted on ChatGPT Sites. This repository contains its source; publishing to GitHub does not redeploy the live site. Deployments require a compatible Worker runtime and a D1 database bound as `DB`.

Environment files, local databases, dependencies and generated build output are excluded from version control. No customer signup records are included.

## Rights

No open-source licence is granted by this repository. Brand materials and project code remain subject to their owners’ rights; bundled third-party notices are retained in `build/` and `vendor/`.
