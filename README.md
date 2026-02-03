# AlgoArena - Competitive Coding Platform 🚀

AlgoArena is a modern, interactive, and high-performance competitive coding platform built with **React**, **Chakra UI**, and **Framer Motion**. It features real-time code execution simulation, 1v1 battles, and immersive game logic visualization.

## ✨ Features

- **Dynamic Hero Section**: Interactive spotlight effects and floating code animations.
- **Game Logic Visualization**: Visual representations of algorithms (Tetris, Maze Solver).
- **Interactive Coding Arena**:
  - **1 vs AI Mode**: Test your skills against an AI opponent.
  - **1 vs 1 Mode**: Simulate live battles with real-time feedback.
- **Mock Code Editor**: Syntax highlighting look-alike with language switching.
- **Live Leaderboards**: Real-time ranking updates.
- **Responsive Design**: Fully optimized for all screen sizes using Chakra UI.
- **Clean Architecture**: Component-based structure with separated concerns.

## 🛠 Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Chakra UI](https://chakra-ui.com/) + [Emotion](https://emotion.sh/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: Chakra UI Icons & Custom SVG Paths
- **Build Tool**: Vite

## 🚀 Getting Started

Follow these steps to set up the project locally:

### Prerequisites

Make sure you have Node.js installed on your machine.
- [Node.js Download](https://nodejs.org/)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd next-gen
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install React, Chakra UI, Framer Motion, and other required packages.

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to view the application.

## 📁 Project Structure

```
next-gen/
├── src/
│   ├── components/      # Reusable UI components (Header, Footer)
│   ├── sections/        # Page sections (Hero, Games, Arena, etc.)
│   ├── theme/           # Chakra UI theme configuration
│   ├── assets/          # Static assets
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Entry point with Providers
├── public/              # Public assets
├── package.json         # Project dependencies
└── vite.config.js       # Vite configuration
```

## 🎨 Clean Architecture & Best Practices

- **Component Decomposition**: The UI is broken down into small, reusable components (`Header`, `Footer`) and feature-specific sections (`Hero`, `Arena`).
- **Theming**: A centralized `theme` object handles colors, fonts, and component styles, ensuring consistency.
- **Responsive Design**: All components use Chakra UI's responsive props (e.g., `fontSize={{ base: 'md', lg: 'xl' }}`).
- **Interactive Elements**: Used `Framer Motion` for smooth entry animations and interaction feedback.
- **Code Organization**: Logic and view concerns are separated where possible within components.

## 📄 License

This project is licensed under the MIT License.
