# Project: MARU-EGG ADMIN

## Overview

Admin platform built with Next.js + TypeScript.
Provides features for chatbot maintenance and management.

## Repository Structure

- /src
  - /api # Server communication code (axios)
  - /app
    - /admission-active # File management and activation by admission type
    - /admission-detail # Admission information management
    - /admission-extra # Prompt management by admission type
    - /home # Main dashboard
    - /major-detail # Department information management
    - /question-list # View all questions and edit answers
  - /components # Shared components
  - /configs # Config files (TanStack Query setup)
  - /hooks # Custom hooks
  - /stores
    - /queries # Server fetching and server state via TanStack Query
    - /store # Client state management via Zustand
  - /types # Shared types
  - /utils # Shared utility functions

## Tech Stack

- Node 24
- PNPM
- TypeScript
- Next.js 15 App Router
- React 19
- Tailwind CSS 3

## Common Commands

```bash
pnpm dev        # Start development server (Turbopack)
pnpm build      # Production build
pnpm lint       # Run ESLint
pnpm commit     # Create a commit via Commitizen (commit convention)
pnpm storybook  # Start Storybook
```

## Architecture Patterns

- Data fetching and server state: TanStack Query (`/stores/queries`)
- Client state: Zustand (`/stores/store`)
- API calls: axios, abstracted in `/api` — never call axios directly in components
- Styling: Tailwind CSS utility classes only, no inline styles

## Planning

- Before coding, always check the skill files in `/.agents`:
  - `vercel-react-best-practices`: Hooks rules, rendering optimization, state management patterns
  - `vercel-composition-patterns`: Component composition patterns for reusability and scalability
  - `web-design-guidelines`: Project design system and UI guidelines
- Always ask for a clear explanation before starting complex tasks or architectural changes
- After completing a task with significant changes, append a summary of those changes to the relevant directory's CLAUDE.md

## Known Gotchas

- Next.js 15 + React 19: be explicit about `"use client"` / `"use server"` directives
- Do not use `querys` as a folder name — the correct folder name is `queries`
