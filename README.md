# Gemma Testing
This is a project to test how well Gemma 4 can handle building a web app!

## Goals
1. A working web app that we can investigate
2. Test coverage (Pending: requires additional testing framework)
3. Well structured -- no files over 400 lines of code, clear inline readme.md to explain decisions and components
4. Use typescript and appropriate node or node-ish tooling

## Components
- **App**: The root component that manages the application state and routing via hash changes.
- **Home**: A landing page showcasing the project's features and the technology stack used.
- **Tetris**: A fully functional, interactive Tetris game implementation.

## Decisions
- **Preact**: Chosen for its small footprint and high performance, making it ideal for a lightweight web app.
- **Vite**: Used as the build tool and development server for its speed and excellent TypeScript support.
- **@odla-ai/ui**: Leveraged to provide high-quality, accessible, and consistent UI primitives.
- **Lucide-preact**: Used for a clean and modern icon set.
- **TypeScript**: Implemented to ensure type safety and improve developer experience.

## Completed
* Improved home page design
* Implemented tabbed interface (Home & Tetris)
* Implemented functional Tetris game
