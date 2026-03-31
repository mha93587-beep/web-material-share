# Web Material — The Vault

A frontend-only React + Vite application for a cloud file storage and sharing platform, migrated from Lovable to Replit.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for bundling and dev server (port 5000)
- **React Router v6** for client-side routing
- **TanStack Query** for data fetching
- **shadcn/ui** + Radix UI for components
- **Tailwind CSS** for styling
- **Sonner** for toast notifications

## Project Structure

```
src/
  App.tsx          # Root component and route definitions
  pages/           # Page-level components (Index, Upload, Files, Shared, Profile, etc.)
  components/      # Shared and UI components
  hooks/           # Custom React hooks (including use-theme)
  lib/             # Utility helpers
  assets/          # Static assets
```

## Running the App

```bash
npm run dev      # Dev SSR server (port 5000)
npm run build    # Production build (client + server bundles)
npm run preview  # Run production SSR server
```

## SSR Architecture

SSR is enabled via a custom Express server (`server.js`) with Vite middleware in dev mode:

- `src/entry-client.tsx` — Client hydration entry (uses `hydrateRoot` + `BrowserRouter`)
- `src/entry-server.tsx` — Server render entry (uses `renderToString` + `StaticRouter`)
- `server.js` — Express server: in dev uses Vite middleware; in prod serves from `dist/`
- `index.html` — Has `<!--app-html-->` placeholder replaced by server-rendered HTML
- Build output: `dist/client/` (frontend assets) and `dist/server/` (SSR bundle)

## Key Notes

- SSR enabled: every page's full HTML is rendered on the server before sending to the browser
- `lovable-tagger` dev plugin was removed (Lovable-specific, not needed on Replit)
- `use-theme.tsx` is SSR-safe: browser APIs (`localStorage`, `window`) only accessed in `useEffect`
- Vite config: `host: "0.0.0.0"`, `allowedHosts: true`, port 5000, `build.outDir: dist/client`
