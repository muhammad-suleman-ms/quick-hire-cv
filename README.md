# ATS-Friendly Resume Builder

A modern, responsive resume builder application that helps users create ATS-friendly resumes and CVs with professional templates. Features include a user-friendly step-by-step builder, free and premium template options, and PDF export functionality.

![Screenshot](attached_assets/Screenshot 2025-04-29 at 7.57.27 AM.png)

## Features

- 📝 Professional, ATS-friendly resume and CV templates
- 🧙‍♂️ Step-by-step resume builder interface
- 🔒 Authentication system with protected routes
- 💰 Subscription model with free and premium tiers
- 📱 Fully responsive design for all devices
- 📥 PDF export functionality
- 💼 User dashboard to manage multiple resumes
- 📊 PostgreSQL database integration

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js
- **Payments**: Stripe
- **Build Tools**: Vite

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- Stripe account (for payment processing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/resume-builder.git](https://github.com/muhammad-suleman-ms/quick-hire-cv.git
   cd quick-hire-cv
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory based on the `.env.example` file:
   ```
   # Database Configuration
   DATABASE_URL=postgresql://username:password@hostname:port/database
   PGHOST=hostname
   PGPORT=5432
   PGUSER=username
   PGPASSWORD=password
   PGDATABASE=database

   # Stripe Configuration
   STRIPE_SECRET_KEY=your_stripe_secret_key
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

   # Session Configuration
   SESSION_SECRET=a_long_random_string_for_session_security

   # Application Settings
   NODE_ENV=development
   PORT=5000
   ```

4. Set up the database:
   ```bash
   npm run db:push
   ```

### Connecting to Your PostgreSQL Database

To connect the application to your PostgreSQL database:

1. Install PostgreSQL on your local machine or use a cloud-hosted solution like Neon.tech

2. Create a new database for the application:
   ```sql
   CREATE DATABASE resume_builder;
   ```

3. Update the `.env` file with your PostgreSQL credentials:
   ```
   DATABASE_URL=postgresql://username:password@hostname:port/resume_builder
   PGHOST=hostname
   PGPORT=5432
   PGUSER=username
   PGPASSWORD=password
   PGDATABASE=resume_builder
   ```

4. Run the database migration to create the necessary tables:
   ```bash
   npm run db:push
   ```

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   ├── App.tsx       # Main application component
│   │   └── main.tsx      # Entry point
│
├── server/               # Backend Express application
│   ├── db.ts             # Database connection
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage abstraction
│   └── vite.ts           # Vite integration
│
├── shared/               # Shared code between client and server
│   └── schema.ts         # Database schema and types
│
├── .env                  # Environment variables (not committed)
├── .env.example          # Example environment variables
├── drizzle.config.ts     # Drizzle ORM configuration
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## Usage

1. Create an account or sign in
2. Choose a resume template
3. Fill in your personal information, experience, education, and skills
4. Preview your resume
5. Download as PDF (Premium features require subscription)

## Database Migrations

When you make changes to the database schema in `shared/schema.ts`, you need to update your database:

```bash
# Push schema changes to the database
npm run db:push
```

## Subscription Management

### Upgrading to Premium

To upgrade from a free account to premium:

1. Navigate to the Subscription page
2. Select the Premium plan
3. Enter payment information using Stripe
4. After successful payment, you'll have immediate access to premium features:
   - All premium templates
   - No watermarks
   - Multiple download formats
   - Advanced content suggestions

### Managing Subscriptions

Users can manage their subscription from the dashboard:

1. Go to Dashboard > Settings > Subscription
2. View current plan and subscription status
3. Cancel or renew subscription as needed

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Connection string for PostgreSQL database |
| `PGHOST` | PostgreSQL hostname |
| `PGPORT` | PostgreSQL port (typically 5432) |
| `PGUSER` | PostgreSQL username |
| `PGPASSWORD` | PostgreSQL password |
| `PGDATABASE` | PostgreSQL database name |
| `STRIPE_SECRET_KEY` | Stripe secret key for payment processing |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe publishable key for payment forms |
| `SESSION_SECRET` | Secret for session management |
| `NODE_ENV` | Environment (development, production) |
| `PORT` | Port for the application server |

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Stripe](https://stripe.com/) for payment processing
- [Drizzle ORM](https://orm.drizzle.team/) for database operations
