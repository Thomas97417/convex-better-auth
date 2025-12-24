# convex-better-auth

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, TanStack Router, Convex, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Router** - File-based routing with full type safety
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Convex** - Reactive backend-as-a-service platform
- **Authentication** - Better-Auth
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
bun install
```

## Convex Setup

This project uses Convex as a backend. You'll need to set up Convex before running the app:

```bash
bun dev:setup
```

Follow the prompts to create a new Convex project and connect it to your application.

Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.
Your app will connect to the Convex cloud backend automatically.

## Project Structure

```
convex-better-auth/
├── apps/
│   ├── web/         # Frontend application (React + TanStack Router)
├── packages/
│   ├── backend/     # Convex backend functions and schema
```

## Available Scripts

- `bun dev`: Start all applications in development mode
- `bun build`: Build all applications
- `bun dev:web`: Start only the web application
- `bun dev:setup`: Setup and configure your Convex project
- `bun check-types`: Check TypeScript types across all apps

## Accéder au tableau de bord Convex

Pour visualiser, gérer et surveiller vos fonctions et votre base de données Convex en temps réel, lancez le tableau de bord Convex avec la commande suivante :

```bash
bunx convex dashboard
```

Cela ouvrira une interface web où vous pourrez :

- Voir l’état de vos déploiements
- Explorer et modifier les données stockées dans Convex
- Exécuter ou tester des fonctions backend à la volée
- Accéder aux logs et à l’historique des fonctions

> 💡 **Astuce :** Le tableau de bord nécessite d’être connecté à votre compte Convex. Suivez les instructions à l’écran si une authentification est requise.
