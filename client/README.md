# BookRack Client 📚

BookRack Client is the modern, responsive frontend for the BookRack library management system. Built with **React**, **TypeScript**, and **Vite**, it provides a seamless user experience for managing books, borrowing, and user accounts. This app is designed to work with the [BookRack server](../server).

---

## 🚀 Features

- User authentication (register, login, logout, session restore)
- Protected and public routes
- Book search, borrowing, and return flows
- User profile and library summary
- Password strength meter and validation
- Responsive UI with TailwindCSS
- Toast notifications and loading states

---

## 🛠️ Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for fast development
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [React Query](https://tanstack.com/query/latest) for data fetching/caching
- [Axios](https://axios-http.com/) for HTTP requests
- [Zod](https://zod.dev/) for schema validation
- [React Hook Form](https://react-hook-form.com/) for forms

---

## 🏁 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm, npm, or yarn
- [BookRack server](../server) running (see its README)

### Installation

```bash
git clone https://github.com/yourusername/bookrack.git
cd bookrack/client
pnpm install
```

### Configuration

- Create a `.env` file if needed (see `.env.example`).
- Set `VITE_API_URL` to your backend server URL (default: `http://localhost:3330/api`).

### Running the App

```bash
pnpm run  dev
```

The app will be available at [http://localhost:4400](http://localhost:4400) (or your configured port).

---

## 📦 Project Structure

```
client/
├── src/
│   ├── api/           # API functions (auth, books, etc.)
│   ├── assets/        # Images and static assets
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Route-based pages
│   ├── schemas/       # Zod validation schemas
│   ├── stores/        # Zustand state stores
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main app component
│   └── main.tsx       # Entry point
├── index.html
├── package.json
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests.

---

## 📄 License

MIT

---

**Happy reading with BookRack!**
