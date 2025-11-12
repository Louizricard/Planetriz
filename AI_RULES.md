# AI Development Rules for Freelance App

This document outlines the technology stack and development guidelines for the Freelance application. All contributions, especially those from AI assistants, must adhere to these rules to ensure consistency, maintainability, and a high-quality codebase.

## Tech Stack Overview

The application is built on a modern, lightweight, and efficient technology stack:

-   **Framework**: **React** with **TypeScript** for a robust, type-safe, component-based architecture.
-   **Build Tool**: **Vite** is used for its fast development server and optimized build process.
-   **Routing**: **React Router** handles all client-side navigation and page routing.
-   **Styling**: **Tailwind CSS** is the exclusive choice for styling, applied directly as utility classes.
-   **UI Components**: The project uses **shadcn/ui** for a consistent, accessible, and customizable set of pre-built components.
-   **Icons**: **Lucide React** is the designated library for all icons to maintain visual uniformity.
-   **State Management**: Global application state is managed using the **React Context API** (`AppContext`, `I18nContext`). Component-level state is handled by React hooks (`useState`, `useEffect`, etc.).
-   **Backend**: The application currently uses mock data. For any future backend needs (authentication, database, serverless functions), **Supabase** will be the chosen provider.

## Library Usage and Development Rules

To maintain a clean and focused codebase, the following rules must be strictly followed:

1.  **UI Components**:
    -   **ALWAYS** use components from the **shadcn/ui** library when a suitable component exists.
    -   Do **NOT** introduce other UI libraries (e.g., Material-UI, Ant Design, Bootstrap).
    -   If a custom component is needed, create it from scratch using Tailwind CSS for styling, following the existing project structure (`src/components/`).

2.  **Styling**:
    -   All styling **MUST** be done using **Tailwind CSS** utility classes.
    -   Do **NOT** write custom CSS files or use CSS-in-JS libraries (e.g., styled-components, Emotion).
    -   Keep styling logic co-located with the component's JSX markup.

3.  **Icons**:
    -   **ONLY** use icons from the **lucide-react** library.
    -   Do **NOT** add custom SVG files or other icon libraries. This ensures visual consistency across the application.

4.  **Routing**:
    -   Continue using **React Router** for all routing.
    -   All route definitions **MUST** be kept within the `src/App.tsx` file to centralize navigation logic.

5.  **State Management**:
    -   For global state, extend the existing **React Context** pattern (`AppContext`).
    -   For local, component-specific state, use standard React hooks (`useState`, `useReducer`).
    -   Do **NOT** add complex state management libraries like Redux or Zustand without explicit approval.

6.  **File Structure**:
    -   Pages go in `src/pages/`.
    -   Reusable components go in `src/components/`.
    -   Custom hooks go in `src/hooks/`.
    -   Context providers go in `src/contexts/`.
    -   Type definitions go in `src/types.ts`.
    -   Constants and mock data go in `src/constants.ts`.

7.  **Backend and Authentication**:
    -   The application currently uses mock data for demonstration purposes.
    -   If real backend functionality is required (e.g., user authentication, database storage), the project **MUST** integrate **Supabase**. Do not use other backend-as-a-service providers.