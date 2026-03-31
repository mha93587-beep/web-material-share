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
npm run dev
```

The dev server runs at port 5000.

## Key Notes

- Pure frontend app — no backend server required
- `lovable-tagger` dev plugin was removed (Lovable-specific, not needed on Replit)
- Vite config updated for Replit: `host: "0.0.0.0"`, `allowedHosts: true`, port 5000
