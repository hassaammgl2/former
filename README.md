# Form Builder App

## Project Description

This is a feature-rich Form Builder application built with Next.js, Prisma, and shadcn/ui. It allows users to create and manage forms, with robust authentication and a comprehensive dashboard to view form submissions. The application leverages a modern web stack to provide a fast, secure, and intuitive user experience.

## Features

-   **Authentication:** Secure user authentication powered by a custom "Better Auth" service integrated with NextAuth.js.
-   **Form Builder:** Intuitive drag-and-drop interface for creating custom forms with various field types, supported by a dynamic field factory.
-   **Dashboard:** A comprehensive administrative dashboard to manage created forms, view submissions, and analyze data.
-   **Database Integration:** Powered by Prisma ORM for efficient and type-safe database interactions with PostgreSQL.
-   **Responsive Design:** Built with shadcn/ui and Tailwind CSS for a modern, responsive, and accessible user interface.
-   **State Management:** Utilizes Zustand (or similar, inferred from `src/store/builderStore.ts`) for efficient client-side state management, particularly for the form builder.

## Technologies Used

-   **Framework:** Next.js (React)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS, shadcn/ui
-   **Database:** PostgreSQL (with Docker for local setup)
-   **ORM:** Prisma
-   **Package Manager:** Bun
-   **Authentication:** Custom "Better Auth" service (integrated with NextAuth.js)
-   **State Management:** Zustand (inferred)

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

-   Node.js (v20 or higher)
-   Bun (v1.0 or higher)
-   Docker (for database setup with `docker-compose.yaml`)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/form-builder-app.git
    cd form-builder-app
    ```

2.  Install dependencies using Bun:

    ```bash
    bun install
    ```

### Environment Variables

Create a `.env` file in the root directory based on `.env.example` (if present, otherwise assume common Next.js/Prisma env vars) and fill in the required environment variables, including:

-   `DATABASE_URL`: Connection string for your PostgreSQL database.
-   `NEXTAUTH_SECRET`: A random string used to sign and encrypt JWTs. Generate one using `openssl rand -base64 32`.
-   `NEXTAUTH_URL`: The URL of your application (e.g., `http://localhost:3000`).

### Database Setup

1.  Start the database using Docker Compose:

    ```bash
    docker-compose up -d
    ```

2.  Run Prisma migrations to set up your database schema:

    ```bash
    bun prisma migrate dev
    ```

3.  (Optional) Seed the database with initial data:

    ```bash
    bun prisma db seed
    ```

### Running the Development Server

To start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── src/
│   ├── app/                # Next.js app directory
│   │   ├── (auth)/         # Authentication related pages (sign-in, sign-up)
│   │   ├── (builder)/      # Form builder interface and components
│   │   ├── (dashboard)/    # User dashboard, forms management, submissions, profile, settings
│   │   ├── api/            # API routes (e.g., NextAuth.js catch-all route)
│   │   └── landing/        # Landing page
│   ├── components/         # Reusable UI components
│   │   ├── custom/         # Custom general-purpose components
│   │   ├── form/           # Form-specific components (e.g., TextField, TextFieldConfigs)
│   │   └── ui/             # shadcn/ui components
│   ├── constants/          # Application-wide constants
│   ├── generated/          # Generated code (e.g., Prisma client)
│   ├── hooks/              # Custom React hooks
│   ├── layout/             # Main application layout components (AppLayout, header, footer)
│   ├── lib/                # Utility functions and helpers
│   │   └── field-factory.tsx # Logic for dynamic form field creation
│   ├── services/           # Backend services (Better Auth client, Prisma client)
│   │   └── better-auth/    # Custom authentication service
│   ├── store/              # Client-side state management (e.g., builderStore for form builder)
│   │   └── builderStore.ts # Zustand store for form builder state
│   ├── types/              # TypeScript type definitions
│   └── proxy.ts            # Proxy configuration or utilities (if significant)
├── prisma/                 # Prisma schema and migrations
├── public/                 # Static assets
└── ...                     # Other configuration files (.gitignore, package.json, etc.)
```

## License

This project is licensed under the MIT License.

## Code Architecture Overview

Based on the file structure and typical Next.js project patterns, here's a textual overview of the code architecture:

**1. Frontend (Next.js Application):**

*   **`src/app`**: This is the core Next.js App Router directory, organizing the application into various routes and components.
    *   **`(auth)`**: Contains pages and logic for user authentication (sign-in, sign-up).
    *   **`(builder)`**: Houses the main form builder interface, including components for designing forms (e.g., `FieldsSelectMenu.tsx`, `FormCanvas.tsx`).
    *   **`(dashboard)`**: Encompasses the user dashboard, with sub-routes for managing forms, viewing submissions, integrations, user profile, and settings.
    *   **`api`**: Defines Next.js API routes, notably `auth/[...all]/route.ts`, which indicates integration with a custom authentication service (likely NextAuth.js-based).
    *   **`landing`**: The public-facing landing page of the application.
*   **`src/components`**: Reusable UI components.
    *   **`custom`**: General-purpose custom components (e.g., `inputs-wrapper.tsx`, `logo.tsx`).
    *   **`form`**: Components specifically for form rendering and configuration (e.g., `TextField.tsx`, `TextFieldConfigs.tsx`).
    *   **`ui`**: `shadcn/ui` components, providing a set of pre-styled and accessible UI primitives.
*   **`src/layout`**: Defines the overall application layout, including `AppLayout.tsx`, header, and footer components.
*   **`src/store/builderStore.ts`**: Likely implements client-side state management, possibly using Zustand, for the form builder's dynamic state.
*   **`src/hooks`**: Custom React hooks for encapsulating reusable frontend logic.
*   **`src/lib`**: Utility functions and helpers, with `field-factory.tsx` being a key component for dynamic form field creation.
*   **`src/types`**: TypeScript type definitions for various parts of the application.

**2. Backend/Services:**

*   **Next.js API Routes (`src/app/api`)**: Handle API requests from the frontend, processing data, and interacting with backend services.
*   **`src/services/better-auth`**: A custom authentication service, suggesting a modular approach to user authentication, likely integrating with NextAuth.js (as indicated by `src/app/api/auth/[...all]/route.ts`).
*   **`src/services/prisma/prisma.ts`**: Centralizes the Prisma client instance for database interactions, ensuring consistent and type-safe data access.

**3. Database Layer:**

*   **`prisma/schema.prisma`**: Defines the application's database schema using Prisma's declarative language.
*   **`prisma/migrations`**: Manages database schema changes over time through migrations.
*   **`src/generated/prisma`**: Contains the auto-generated Prisma client, providing a type-safe ORM for interacting with the database.
*   **PostgreSQL**: The assumed database, likely configured via `DATABASE_URL` and managed locally with `docker-compose.yaml`.

**4. Development and Build Tooling:**

*   **Bun**: Used as the package manager for installing dependencies and running scripts.
*   **TypeScript**: The primary programming language for the entire codebase.
*   **Tailwind CSS & `shadcn/ui`**: For styling and UI component libraries.
*   **ESLint**: For maintaining code quality and style consistency.
*   **Husky**: Configured for Git hooks, likely to automate tasks like linting before commits.

**High-Level Interaction Flow:**

Users interact with the Next.js frontend. Frontend components make API calls to Next.js API routes (e.g., for authentication, form submission, data retrieval). The API routes then utilize the custom `better-auth` service for authentication and the Prisma service to interact with the PostgreSQL database, powered by the defined Prisma schema. The form builder leverages `field-factory.tsx` for dynamic UI generation and `builderStore.ts` for managing its complex state.
