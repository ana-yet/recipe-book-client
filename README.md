# Recipe Book - Culinary Collection Platform 🍳📖
###  Live Link: recipe-book-525e2.web.app
[![Live Demo](https://i.ibb.co/xSkz7vsx/rcp-1.png)](https://recipe-book-525e2.web.app/)

A modern full-stack recipe-sharing platform for food lovers to explore, create, and manage recipes. Whether you're a student looking for quick meals or a home chef crafting traditional dishes, Recipe Book brings the culinary world to your fingertips with user authentication, dynamic UI, personalized dashboards, and smooth interactions.

## 🧾 Project Description
Recipe Book is built for aspiring and experienced cooks alike to:

-📤 Share their favorite recipes.

-📚 Explore categorized dishes.

-💖 Like and interact with others’ creations.

-🔐 Manage their own recipe library via secure authentication.

With a clean user experience, animated interface, and responsive design, this platform makes digital recipe management both practical and delightful.

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
```
git clone https://github.com/your-username/recipe-book.git
cd recipe-book
```
2. Install Dependencies
```
npm install
```
3. Environment Setup
- Create a .env file at root.

- Add your Firebase config keys like:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

4. Run the App
```
npm run dev
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
