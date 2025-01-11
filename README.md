Notes Application
A full-stack MERN application for managing personal notes with authentication and real-time updates.
Frontend (React + Vite)
Features

🔐 Secure user authentication
📝 Create, read, update, and delete notes
🏷️ Categorize notes
🔍 Search functionality
🌓 Dark/Light mode
📱 Responsive design
🎯 Real-time updates

Tech Stack

React 18
React Router v6
Tailwind CSS
Axios for API calls
Context API for state management
Vite build tool

Getting Started

Clone the repository:

bashCopygit clone https://github.com/yourusername/notes-app.git
cd notes-app/frontend

Install dependencies:

bashCopynpm install

Create a .env file in the root directory:

envCopyVITE_API_URL=http://localhost:5001/api

Start the development server:

bashCopynpm run dev
Folder Structure
Copyfrontend/
├── src/
│ ├── components/ # React components
│ │ ├── auth/ # Authentication related components
│ │ ├── dashboard/ # Dashboard components
│ │ ├── layout/ # Layout components
│ │ └── profile/ # User profile components
│ ├── context/ # React Context providers
│ ├── services/ # API services
│ ├── styles/ # Global styles
│ └── utils/ # Utility functions
├── public/ # Static assets
└── index.html # Entry HTML file
Available Scripts

npm run dev - Start development server
npm run build - Build for production
npm run preview - Preview production build
npm run lint - Run ESLint
npm test - Run tests
