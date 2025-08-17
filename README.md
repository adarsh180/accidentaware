# AccidentAware

AI-powered accident detection and emergency response system built with Next.js, featuring smart helmet technology and real-time monitoring.

## 🚀 Features

- **Smart Helmet Integration**: IoT-enabled helmets with accident detection sensors
- **Real-time Monitoring**: Live tracking and analytics dashboard
- **Emergency Response**: Automatic SOS alerts and location sharing
- **User Management**: Comprehensive user profiles and riding history
- **Payment Integration**: Razorpay integration for product purchases
- **Admin Dashboard**: Analytics and user management for administrators

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Payment**: Razorpay
- **Maps**: Leaflet with React Leaflet
- **UI Components**: Radix UI

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Razorpay account (for payments)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/accidentaware.git
cd accidentaware
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the environment template:

```bash
cp .env.example .env
```

Update `.env` with your actual values:

```env
DATABASE_URL="your_postgresql_connection_string"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secret_key"
RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
NEXT_PUBLIC_RAZORPAY_KEY="your_razorpay_key_id"
```

### 4. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed database (optional)
npm run seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The application can be deployed on any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run seed` - Seed database with sample data

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── dashboard/      # User dashboard
│   ├── admin/          # Admin panel
│   └── ...
├── components/         # Reusable components
│   ├── ui/            # UI components
│   ├── sections/      # Page sections
│   └── ...
├── lib/               # Utility functions
└── types/             # TypeScript definitions
```

## 🔐 Security Features

- Environment variables for sensitive data
- NextAuth.js for secure authentication
- Input validation with Zod
- CSRF protection
- Secure headers configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please open an issue on GitHub.

---

**AccidentAware** - Making roads safer with AI-powered technology.
