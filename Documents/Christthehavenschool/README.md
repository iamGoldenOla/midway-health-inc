# Christ The Haven School

## Welcome to Christ The Haven School

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Backend Architecture

This repository also includes a comprehensive backend architecture for the school website:

- **Framework**: Fastify with TypeScript
- **Database**: PostgreSQL (via Supabase) with Drizzle ORM
- **Authentication**: Supabase Auth with JWT and Google OAuth
- **Validation**: Zod for input validation
- **API Documentation**: Fastify Swagger

### Features

- **Authentication**: JWT-based authentication with Google OAuth support via Supabase
- **User Management**: Role-based access control (student, teacher, admin)
- **Student Management**: Student profiles, enrollment, and grade tracking
- **Class Management**: Class creation, assignment to teachers, student enrollment
- **Form Management**: Dynamic form templates and submissions
- **Security**: Input validation with Zod, rate limiting, and XSS protection
- **API Documentation**: OpenAPI/Swagger documentation available at `/docs`

### Deployment

The backend is designed for deployment on traditional web hosts via cPanel with Node.js support.