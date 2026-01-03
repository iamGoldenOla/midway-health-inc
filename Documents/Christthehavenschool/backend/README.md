# Christ The Haven School Backend

Backend API for Christ The Haven School website, built with Fastify, TypeScript, and integrated with Supabase for database, authentication, and storage.

## Features

- **Authentication**: JWT-based authentication with Google OAuth support via Supabase
- **User Management**: Role-based access control (student, teacher, admin)
- **Student Management**: Student profiles, enrollment, and grade tracking
- **Class Management**: Class creation, assignment to teachers, student enrollment
- **Form Management**: Dynamic form templates and submissions
- **Security**: Input validation with Zod, rate limiting, and XSS protection
- **API Documentation**: OpenAPI/Swagger documentation available at `/docs`

## Tech Stack

- **Framework**: Fastify
- **Language**: TypeScript
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Drizzle ORM
- **Authentication**: Supabase Auth
- **Validation**: Zod
- **API Documentation**: Fastify Swagger

## Database Schema

The application uses the following main tables:

- `user_profiles`: Extended user information with roles
- `students`: Student-specific information
- `teachers`: Teacher-specific information
- `classes`: Class information with teacher assignments
- `enrollments`: Student-class enrollment relationships
- `form_templates`: Dynamic form templates
- `form_submissions`: Submitted form data

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/google` - Google OAuth login
- `GET /api/v1/auth/me` - Get current user profile
- `POST /api/v1/auth/logout` - Logout user

### Students
- `GET /api/v1/students/:id` - Get student profile
- `POST /api/v1/students` - Create student (admin only)
- `PUT /api/v1/students/:id` - Update student (admin/teacher)
- `DELETE /api/v1/students/:id` - Delete student (admin only)

### Classes
- `GET /api/v1/classes` - Get all classes
- `GET /api/v1/classes/:id` - Get class with enrolled students
- `POST /api/v1/classes` - Create class (admin only)
- `PUT /api/v1/classes/:id` - Update class (admin only)
- `DELETE /api/v1/classes/:id` - Delete class (admin only)
- `POST /api/v1/classes/enroll` - Enroll student in class

### Forms
- `GET /api/v1/forms/templates` - Get all form templates
- `GET /api/v1/forms/templates/:id` - Get form template by ID
- `POST /api/v1/forms/templates` - Create form template (admin only)
- `POST /api/v1/forms/submit` - Submit form
- `GET /api/v1/forms/:id/submissions` - Get submissions for a form

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_url
CORS_ORIGIN=*
```

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your environment variables

3. Run in development mode:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to cPanel.

## API Documentation

API documentation is available at `/docs` when the server is running.

## Security Features

- JWT token authentication
- Role-based access control
- Input validation with Zod
- Rate limiting
- XSS protection
- Row Level Security (RLS) in Supabase