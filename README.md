# React + Vite

👕 WTWR — What to Wear

WTWR (What to Wear) is a full-stack web application that helps users decide what to wear based on the current weather in their location.
When a user logs in, the app fetches real-time weather data from a weather API and recommends clothing from their virtual wardrobe that fits the temperature and conditions (e.g., warm coat for cold days, t-shirt for sunny weather).

Users can add, edit, or delete their own clothing items and update their profile and avatar.

🌐 Project Repositories

Frontend (React): https://github.com/GTavarez/se_project_react

Backend (Express): https://github.com/GTavarez/se_project_express

🧩 Tech Stack

Frontend

React

React Router

CSS Modules

Backend

Node.js

Express.js

MongoDB & Mongoose

JWT Authentication

APIs

OpenWeatherMap API ([https://api.openweathermap.org])

⚙️ Setup Instructions

1. Clone the Repositories

# Frontend

git clone https://github.com/GTavarez/se_project_react.git

# Backend

git clone https://github.com/GTavarez/se_project_express.git

2. Install Dependencies
   cd se_project_express
   npm install

cd ../se_project_react
npm install

3. Run the App

Start both servers:

# Backend

npm start

# Frontend

npm run dev

Then open your browser at http://localhost:3000/

✨ Features

🌦️ Real-time clothing recommendations based on weather

👕 Add and remove clothing items from your wardrobe

🧍 User registration and login (secured with JWT)

🖼️ Edit user profile and avatar

🔒 Secure routes and token-based authentication

💻 Responsive and clean interface

👩‍💻 Developers

Developed by Gisell Tavarez for the Software Engineering Project (WTWR)
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
