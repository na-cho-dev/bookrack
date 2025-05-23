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

## Features

- **User Authentication & Authorization**: Secure JWT-based authentication, role-based access control (admin, user).
- **Book Management**: Add, update, delete, and list books. Track available and total copies.
- **Borrowing System**: Users can borrow and return books. The system tracks borrow records, due dates, and overdue books.
- **Overdue Management**: Easily query overdue books globally or per user.
- **RESTful API**: Clean, versioned, and well-documented endpoints.
- **Validation & Error Handling**: Strong DTO validation and consistent error responses.
- **Swagger Integration**: Interactive API documentation out-of-the-box.
- **Testing**: Comprehensive unit and e2e test setup with Jest.
- **Extensible**: Modular architecture for easy feature expansion.

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

## Tech Stack

- **Backend Framework**: [NestJS](https://nestjs.com/) (TypeScript)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Authentication**: [Passport.js](http://www.passportjs.org/) (JWT & Local strategies)
- **Validation**: [class-validator](https://github.com/typestack/class-validator), [class-transformer](https://github.com/typestack/class-transformer)
- **API Docs**: [Swagger](https://swagger.io/) via [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction)
- **Testing**: [Jest](https://jestjs.io/), [Supertest](https://github.com/visionmedia/supertest)
- **Linting/Formatting**: ESLint, Prettier

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)

### Installation

```bash
git clone https://github.com/yourusername/bookrack.git
cd bookrack
pnpm install
```

### Configuration

1. **Environment Variables**:  
   Copy `.env.example` to `.env` and fill in your MongoDB URI and other secrets.

   ```
   MONGODB_URI=mongodb://localhost:27017/bookrack
   JWT_SECRET=your_jwt_secret
   ```

2. **(Optional) Customization**:  
   Adjust configuration in `src/common/config/env.config.ts` as needed.

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

Once the server is running, access the interactive Swagger UI at:

```
http://localhost:3000/api-docs
```

This provides detailed documentation and allows you to try out all endpoints.

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

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

- [NestJS](https://nestjs.com/) for the powerful backend framework.
- [MongoDB](https://www.mongodb.com/) for the flexible NoSQL database.
- [Passport.js](http://www.passportjs.org/) for authentication.
- [Jest](https://jestjs.io/) for testing.
- All contributors and the open-source community!

---

**Happy coding! 🚀**
