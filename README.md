# BookRack 📚

BookRack is a modern, full-featured library management system for schools, universities, and community libraries. It consists of a robust backend built with [NestJS](https://nestjs.com/) and [MongoDB](https://www.mongodb.com/), and a responsive frontend built with [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Vite](https://vitejs.dev/).

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## 🚀 Features

- User authentication (register, login, logout, session restore)
- Role-based access control (admin/user)
- Book management (add, update, delete, view)
- Borrow and return system with due date tracking
- Overdue book detection and availability tracking
- User profile and library summary
- Password strength meter and validation
- Responsive UI with TailwindCSS
- Toast notifications and loading states
- Swagger API docs (backend)

---

## 🛠️ Tech Stack

**Backend:**
- [NestJS](https://nestjs.com/) (TypeScript)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [Passport.js](http://www.passportjs.org/) (JWT & Local strategies)
- [class-validator](https://github.com/typestack/class-validator)
- [Swagger](https://swagger.io/) via [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction)
- [Jest](https://jestjs.io/) for testing

**Frontend:**
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for fast development
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [React Query](https://tanstack.com/query/latest) for data fetching/caching
- [Axios](https://axios-http.com/) for HTTP requests
- [Zod](https://zod.dev/) for schema validation
- [React Hook Form](https://react-hook-form.com/) for forms

---

## 🏗️ Architecture Overview

BookRack follows a modular, layered architecture:

- **Backend:** Controllers, services, schemas/models, guards, decorators, DTOs for clean separation of concerns.
- **Frontend:** Modular components, hooks, Zustand stores, and schema validation for maintainability and scalability.

---


## 🧪 Demo/Test Accounts

To make it easy to explore BookRack, the database seed script creates the following users by default. You can use these credentials to log in and test the app:

### Admin Accounts

| Name         | Email                | Password      |
|--------------|----------------------|---------------|
| Alice Admin  | alice@central.com    | Password123!  |
| Bob Admin    | bob@tech.com         | Password123!  |
| Carol Admin  | carol@kids.com       | Password123!  |

### Member Accounts

| Name          | Email                | Password      | Organization      |
|---------------|----------------------|---------------|-------------------|
| Dave Member   | dave@central.com     | Password123!  | Central Library   |
| Eve Member    | eve@tech.com         | Password123!  | Tech Library      |
| Frank Member  | frank@kids.com       | Password123!  | Kids Library      |
| Grace Member  | grace@central.com    | Password123!  | Central Library   |
| Heidi Member  | heidi@tech.com       | Password123!  | Tech Library      |

All accounts use the password `Password123!`.

---
## 🏁 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm, npm, or yarn
- MongoDB instance (local or cloud)

### Installation

```bash
git clone https://github.com/yourusername/bookrack.git
cd bookrack
```

### Configuration

#### Backend

1. Copy `.env.example` to `.env` in the root and fill in your MongoDB URI and secrets.
2. Adjust config in `src/common/config/env.config.ts` as needed.

#### Frontend

1. Go to the `client` directory:
    ```bash
    cd client
    ```
2. Create a `.env` file if needed (see `.env.example`).
3. Set `VITE_API_URL` to your backend server URL (default: `http://localhost:3330/api`).

### Running the Application

#### Backend

```bash
# Development
pnpm run start:dev

# Production
pnpm run build
pnpm run start:prod
```

The server will start on the port specified in your `.env` (default: 3000).

#### Frontend

```bash
cd client
pnpm run dev
```

The app will be available at [http://localhost:4400](http://localhost:4400) (or your configured port).

### Testing (Backend)

```bash
# Run all unit tests
pnpm run test

# Watch mode
pnpm run test:watch

# Test coverage
pnpm run test:cov

# End-to-end tests
pnpm run test:e2e
```

---

## 📦 Project Structure

```
bookrack/
├── client/                  # React frontend
│   ├── src/
│   └── ...
├── src/                     # NestJS backend
│   ├── app.module.ts
│   ├── auth/
│   ├── book/
│   ├── borrow-book/
│   ├── common/
│   ├── user/
│   └── ...
├── test/                    # e2e tests
├── .env                     # Environment variables
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

## 📖 API Documentation

Swagger UI: [http://localhost:3300/api-docs](http://localhost:3000/api-docs) (development mode)

---

## 🚀 Deployment

BookRack is production-ready and can be deployed to any Node.js hosting platform.

### Steps

1. **Build the project**:
   ```bash
   pnpm run build
   ```
2. **Set environment variables** (see [Configuration](#configuration)).
3. **Start the server**:
   ```bash
   pnpm run start:prod
   ```
4. **Deploy the frontend** (see Vite docs for static hosting or deploy to Vercel/Netlify).

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository.
2. Create a feature branch.
3. Write clear, well-tested code.
4. Submit a pull request with a detailed description.

For major changes, open an issue first to discuss your ideas.

---

## 📄 License

MIT

---

## 🙏 Acknowledgements

- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [React](https://react.dev/)
- [Passport.js](http://www.passportjs.org/)
- [Jest](https://jestjs.io/)
- All contributors and the open-source community!

---

**Happy reading with BookRack!**