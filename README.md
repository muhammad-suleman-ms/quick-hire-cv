# ResumeBuilder - ATS-Friendly Resume Creator

A comprehensive web application for building ATS-friendly resumes with multiple design templates and a user-friendly interface.

## Features

- **Multiple Resume Templates**: Choose from a variety of professionally designed templates
- **ATS Optimization**: All templates are designed to pass through Applicant Tracking Systems
- **Step-by-Step Builder**: Intuitive interface that guides you through each section of your resume
- **Premium Templates**: Subscription model with free and premium templates
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop devices
- **User Authentication**: Secure login and registration system
- **Dashboard**: Manage all your resumes in one place
- **PDF Export**: Download your resume in PDF format
- **Admin Dashboard**: Monitor users, analytics, and manage content

## Technology Stack

- **Frontend**: React, Redux, TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with session-based auth
- **Payments**: Stripe integration for premium subscriptions
- **Deployments**: Docker for containerization, ready for cloud deployment

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL
- Docker and Docker Compose (optional, for containerized setup)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/resume-builder.git
   cd resume-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database configuration and other settings.

4. Set up the database:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Using Docker (optional)

1. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

2. The application will be available at `http://localhost:5000`

## Environment Variables

The following environment variables are used in the application:

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgres://postgres:postgres@localhost:5432/resume_builder |
| SESSION_SECRET | Secret key for session encryption | |
| NODE_ENV | Environment mode (development/production) | development |
| PORT | Port for the server to listen on | 5000 |
| STRIPE_SECRET_KEY | Stripe API secret key for payments | |
| VITE_STRIPE_PUBLIC_KEY | Stripe public key for frontend | |

## Project Structure

```
resume-builder/
├── client/              # Frontend React application
│   ├── public/          # Static assets
│   └── src/             # React components and logic
│       ├── components/  # Reusable UI components
│       ├── hooks/       # Custom React hooks
│       ├── lib/         # Utility functions
│       ├── pages/       # Page components
│       └── store/       # Redux store configuration
├── server/              # Backend Node.js/Express API
│   ├── routes.ts        # API routes
│   ├── storage.ts       # Database access layer
│   └── auth.ts          # Authentication logic
├── shared/              # Shared code between frontend and backend
│   └── schema.ts        # Database schema and types
├── migrations/          # Database migrations
└── docker-compose.yml   # Docker configuration
```

## User Types

1. **Free Users**:
   - Can create up to 3 resumes
   - Access to free templates only
   - Basic formatting options

2. **Premium Users**:
   - Unlimited resume creation
   - Access to all templates (including premium)
   - Advanced formatting options
   - Priority support

3. **Admin Users**:
   - All premium features
   - Access to admin dashboard
   - User management capabilities
   - Analytics and reporting tools

## Admin Access

To access the admin dashboard:
1. Navigate to `/info/admin` to see admin credentials
2. Log in with admin credentials at `/auth`
3. Access admin dashboard at `/admin/dashboard`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.