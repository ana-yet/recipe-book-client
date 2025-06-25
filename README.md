# Recipe Book - Culinary Collection Platform 🍳📖

[![Live Demo](https://i.ibb.co/xSkz7vsx/rcp-1.png)](https://recipe-book-525e2.web.app/)

A full-stack recipe sharing platform with authentication, dynamic content management, and interactive features. Built for food enthusiasts to discover, share, and manage culinary creations.

## Key Features 🚀

### 🔐 User Authentication

- Firebase-powered login/logout system
- Protected routes for recipe management
- User profile indicator with interactive logout dropdown

### 🎯 Homepage Experience

- Hero image slider with food photography
- Trending recipes section (sorted by likes)
- Special category sections:
  - Bachelor's Quick Meals 🎓
  - Qurbani Special Recipes 🐑
- Animated content reveals with React Awesome Reveal

### 📜 Recipe Management

- Add new recipes with image upload capability
- Personalized "My Recipes" dashboard
- Public recipe catalog with filtering/search (future-ready)

### ❤️ Interactive Elements

- Context-aware like button:
  - Enabled for others' recipes
  - Disabled for own creations
- Recipe cards with hover effects and tooltips
- Toast notifications for user actions

### 🔍 Detailed Recipe View

- Complete recipe breakdown:
  - Ingredients list
  - Step-by-step instructions
  - Cooking time & difficulty
  - Nutritional information (if available)
- Social share buttons (future implementation)

## Tech Stack 🛠️

**Frontend**

- React + Vite (Javascript)
- React Router v6 for navigation
- Tailwind CSS + DaisyUI for modern styling
- React Icons for visual elements

**State & Effects**

- React Awesome Reveal for animations
- React Toastify for notifications
- React Tooltip for hover information

**Backend Services**

- Firebase Authentication
- Firestore Database (implied for data storage)
- Environment variables via dotenv

**Utilities**

- NanoID for unique identifiers
- React Helmet Async for SEO management

## Installation Guide 💻

1. Clone repository:

```bash
Uploading soon....
```

## Project Structure 🗂️

```
/src
├── components/      # Reusable components
│   ├── Auth/       # Authentication components
│   ├── Recipes/    # Recipe cards and forms
│   └── UI/         # Common UI elements
├── contexts/       # Auth context
├── firebase/       # Firebase config
├── pages/          # Route components
└── routes/         # Protected routes
```

## Contributing 🤝

- Contributions are welcome! Please follow these steps:

```
Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request
```

Happy Cooking! 👨🍳👩🍳 - Developed with ❤️ by Anayet
