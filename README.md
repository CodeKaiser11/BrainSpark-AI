# BrainSpark AI

BrainSpark AI is an intelligent, full-stack educational and productivity platform designed to enhance the learning experience. It provides users with a suite of AI-powered tools such as smart quizzes, automated notes generation, interactive mind maps, problem solving (SnapSolve), and curated YouTube educational picks.

## Core Features

- **SnapSolve**: Quickly upload or snap images to get AI-assisted solutions to problems.
- **Mind Maps**: Generate and interact with visual mind maps for better concept retention.
- **Notes Generator**: Automatically generate structured study notes from various inputs.
- **Smart Quizzes**: Take AI-generated quizzes to test your knowledge on different subjects.
- **YouTube Picks**: Get curated educational video recommendations using the YouTube Data API.
- **AI Chat**: An integrated intelligent chat assistant to help with queries in real-time.
- **Dashboard & Analytics**: Track learning progress and manage your profile effectively.

## Tech Stack

### Frontend (React + Vite)
- **Framework**: React 19, Vite, React Router
- **Styling & UI**: Tailwind CSS 4
- **Visualization & Flow**: `@xyflow/react` for interactive mind maps, Recharts for analytics.
- **Data Processing**: `tesseract.js` for client-side OCR and `pdfjs-dist` for client-side PDF parsing.

### Backend (Node.js + Express)
- **Framework**: Node.js, Express
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT, BcryptJS
- **Integrations**: OpenAI API for AI tools, Google APIs for YouTube integration.
- **File Uploads**: Multer for handling file and image uploads.

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas cluster (or local instance)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd BrainSpark-AI
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   # Create a .env file and add your MongoDB URI, JWT Secret, YouTube API Key, OpenAI API Key, etc.
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the Application:**
   Open your browser and navigate to the frontend local server (usually `http://localhost:5173`).

## Project Structure
- `/frontend`: Client-side React application housing pages like SnapSolve, MindMaps, Dashboard, etc.
- `/backend`: Node.js Express server with routes for auth, chat, ai, upload, quiz, and youtube integrations.
- `.agent/`: Internal AI workflows and guidelines.
