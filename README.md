<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# BookRack 📚

BookRack is a robust, full-featured library management system built with [NestJS](https://nestjs.com/) and [MongoDB](https://www.mongodb.com/). It provides a secure, scalable, and extensible backend for managing books, users, and borrowing operations, making it ideal for schools, universities, or community libraries.

---

## Table of Contents

- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
  - [Testing](#testing)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🔑 Key Features (Backend)

- **User Authentication**: Secure JWT tokens stored in HTTP-only cookies
- **Role-Based Access Control**: Manage admin and standard user permissions
- **Book Management**: Add, update, delete, and view books
- **Borrow & Return System**: Tracks borrowing, return status, and due dates
- **Availability Tracking**: Dynamically updates available copies of each book
- **Overdue Book Detection**: Flags books not returned on time
- **Swagger API Docs**: Interactive documentation (development mode)
- **Clean Modular Structure**: DTOs, services, guards, decorators, and custom error handling
- **CORS & Cookie Auth**: Ready for frontend integration

---

## Architecture Overview

BookRack follows a modular, layered architecture:

- **Controllers**: Handle HTTP requests and responses.
- **Services**: Encapsulate business logic.
- **Schemas/Models**: Define MongoDB collections using Mongoose.
- **Guards & Decorators**: Implement authentication and authorization.
- **DTOs**: Validate and type-check incoming data.

This separation of concerns ensures maintainability, scalability, and testability.

---

## 🛠️ Tech Stack

**Backend:**
- [NestJS](https://nestjs.com/) (TypeScript)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [Passport.js](http://www.passportjs.org/) (JWT & Local strategies)
- [class-validator](https://github.com/typestack/class-validator)
- [Swagger](https://swagger.io/) via [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction)
- [Jest](https://jestjs.io/) for testing

**Frontend (Planned):**
- [React.js](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Query](https://tanstack.com/query/latest) or [SWR](https://swr.vercel.app/)

---

## 🧑‍💻 Learning & Motivation

This project is my playground for mastering authentication, security, API design, and modular architecture. As I transition into full-stack development, BookRack helps me bridge backend and frontend skills in a real-world context.

---

## 💬 Feedback & Collaboration

I'm open to feedback, tips, or collaboration opportunities from fellow devs! Feel free to open issues, submit PRs, or connect with me.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)
- MongoDB instance (local or cloud)

### Installation

```bash
git clone https://github.com/yourusername/bookrack.git
cd bookrack
pnpm install
```

### Configuration

1. Copy `.env.example` to `.env` and fill in your MongoDB URI and secrets.
2. Adjust config in `src/common/config/env.config.ts` as needed.

### Running the Application

```bash
# Development
pnpm run start:dev

# Production
pnpm run build
pnpm run start:prod
```

The server will start on the port specified in your `.env` (default: 3000).

### Testing

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

## API Documentation

Swagger UI: [http://localhost:3000/api-docs](http://localhost:3000/api-docs) (development mode)

---

## Project Structure

```
bookrack/
├── src/
│   ├── app.module.ts
│   ├── auth/                # Authentication & authorization logic
│   ├── book/                # Book management (CRUD, schemas, DTOs)
│   ├── borrow-book/         # Borrowing logic, records, overdue
│   ├── common/              # Shared utilities, config, decorators, guards
│   ├── user/                # User management
│   └── ...                  # Other modules
├── test/                    # e2e tests
├── .env                     # Environment variables
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

## Deployment

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

### Cloud Deployment

- **Docker**: Add a `Dockerfile` for containerized deployments.
- **Cloud Providers**: Deploy to AWS, Heroku, DigitalOcean, etc.
- **NestJS Mau**: For a seamless AWS deployment, check out [NestJS Mau](https://mau.nestjs.com).

---

## Contributing

Contributions are welcome! Please:

1. Fork the repository.
2. Create a feature branch.
3. Write clear, well-tested code.
4. Submit a pull request with a detailed description.

For major changes, open an issue first to discuss your ideas.

---

## License

MIT

---

## Acknowledgements

- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Passport.js](http://www.passportjs.org/)
- [Jest](https://jestjs.io/)
- All contributors and the open-source community!

---

**Happy coding! 🚀**
