# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a full-stack TypeScript monorepo built with Better-T-Stack that integrates Convex (backend-as-a-service) with Better-Auth for authentication. The project demonstrates a modern authentication pattern using the `@convex-dev/better-auth` adapter to bridge Better-Auth with Convex's database and HTTP routing.

## Monorepo Structure

- **apps/web**: React frontend using TanStack Router (file-based routing), Vite, TailwindCSS v4, and shadcn/ui
- **packages/backend**: Convex backend functions, schema, and HTTP routes

The project uses Turborepo for build orchestration and Bun as the package manager.

## Commands

### Development
```bash
bun install                 # Install dependencies
bun dev:setup               # Configure Convex project (first-time setup)
bun dev                     # Run all apps (web frontend + Convex backend)
bun dev:web                 # Run only the web app (port 3001)
bun dev:server              # Run only the Convex backend
```

### Building and Type Checking
```bash
bun build                   # Build all packages
bun check-types             # Type check all packages
```

## Authentication Architecture

The authentication system uses Better-Auth with a Convex adapter, creating a unique integration pattern:

### Backend (packages/backend/convex/)

1. **auth.config.ts**: Configures Better-Auth providers for cross-domain authentication with Convex
2. **auth.ts**: Creates the Better-Auth instance with:
   - `authComponent` - the `@convex-dev/better-auth` client that provides the database adapter
   - `createAuth()` - factory function that configures Better-Auth with Convex adapter
   - `getCurrentUser` - Convex query to get authenticated user via authComponent
3. **http.ts**: Registers Better-Auth HTTP routes on Convex's HTTP router using `authComponent.registerRoutes()`
4. **convex.config.ts**: Integrates the Better-Auth Convex component using `defineApp().use(betterAuth)`

### Frontend (apps/web/src/)

1. **lib/auth-client.ts**: Creates Better-Auth React client with `convexClient()` and `crossDomainClient()` plugins
2. **main.tsx**: Wraps the app with `ConvexBetterAuthProvider` to provide both Convex and auth context

### Key Integration Points

- Better-Auth stores user data in Convex's database via the adapter
- HTTP authentication endpoints are exposed through Convex's HTTP router
- Frontend uses `ConvexBetterAuthProvider` to unify Convex queries/mutations with authentication state
- Authentication requires `SITE_URL` (frontend URL) and `CONVEX_SITE_URL` environment variables for cross-domain support

## Convex Backend Patterns

### Database Schema
Define schema in `packages/backend/convex/schema.ts` using `defineSchema()` and `defineTable()`.

### Functions
- **Queries**: Use `query()` from `./_generated/server` for read operations
- **Mutations**: Use `mutation()` from `./_generated/server` for write operations
- **HTTP Routes**: Use `httpRouter()` in `http.ts` for REST-like endpoints

### Authentication in Functions
Access authenticated user via:
```typescript
const identity = await ctx.auth.getUserIdentity();
```
Or use the authComponent:
```typescript
const user = await authComponent.getAuthUser(ctx);
```

## Frontend Patterns

### Routing
Uses TanStack Router with file-based routing in `apps/web/src/routes/`. The router tree is auto-generated in `routeTree.gen.ts`.

### Convex Integration
- Import generated API from backend: `@convex-better-auth/backend`
- Use Convex React hooks: `useQuery()`, `useMutation()` from `convex/react`
- Frontend connects via `VITE_CONVEX_URL` environment variable

### UI Components
shadcn/ui components are in `apps/web/src/components/ui/`. Uses TailwindCSS v4 with class-variance-authority for variants.

## Environment Variables

### Backend (packages/backend/)
- `SITE_URL`: Frontend URL for CORS and authentication
- `CONVEX_SITE_URL`: Convex deployment URL
- Managed by Convex deployment system

### Frontend (apps/web/)
- `VITE_CONVEX_URL`: Convex backend URL (from Convex dashboard)
- `VITE_CONVEX_SITE_URL`: For Better-Auth cross-domain support

## Important Notes

- The `convex/` directory in packages/backend/ is where all backend code lives
- Convex auto-generates TypeScript types in `_generated/` - never edit these manually
- TanStack Router auto-generates route tree - never edit `routeTree.gen.ts` manually
- When adding new Convex functions, they become available via the generated API
- The project uses workspace protocol for internal package dependencies
- Catalog dependencies in root package.json provide version consistency across workspace
