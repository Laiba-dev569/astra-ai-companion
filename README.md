# Astra AI Companion 🌌

Astra is a fully interactive, futuristic 3D Web Companion built with React Three Fiber, Vite, and Node.js. She responds to your voice, organizes floating memories in zero-gravity, and possesses real conversational intelligence powered by Google Gemini.

## ✨ Features
- **Holographic 3D Interface:** Fully interactive procedural humanoid built with `three.js`.
- **Zero-Gravity Physics:** Spawn "Memories" that orbit the AI. Click and drag them into the Black Hole to delete them.
- **Voice Recognition:** Speak directly to Astra using your browser's Web Speech API.
- **Dynamic Lighting:** The environment lighting reacts in real-time to Astra's "Mood" (Idle, Thinking, Alert).
- **Cinematic Effects:** Toggle "Warp Speed" or cast a "Holographic Diagnostic Scan" over her body.
- **True AI Brain:** Full-Stack Node.js backend seamlessly integrated with the Google Gemini API.

## 🚀 Local Development (How to Run)

Since this is a full-stack application, you must run both the Frontend and the Backend servers.

### 1. Prerequisites
- Node.js installed on your machine.
- A free Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 2. Setup
Clone the repository and install dependencies:
```bash
git clone https://github.com/Laiba-dev569/astra-ai-companion.git
cd astra-ai-companion
npm install
```

### 3. Environment Variables
Create a file named `.env` in the root folder and add your Gemini API Key:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 4. Boot up the Servers
Open **two** separate terminal windows inside your project folder.

**Terminal 1 (Frontend):**
```bash
npm run dev
```

**Terminal 2 (Backend):**
```bash
npm run server
```

Open your browser to `http://localhost:5173` to meet Astra!

---

## 🌍 Deploying to Production (Render.com)

This application is configured for a unified deployment on Render (meaning the Node.js backend will automatically serve the built React files).

1. Create an account on [Render.com](https://render.com/).
2. Create a new **"Web Service"** and connect this GitHub repository.
3. Configure the Web Service with the following settings:
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run server`
4. Under the "Environment Variables" section in Render, add a new variable:
   - Key: `GEMINI_API_KEY`
   - Value: `[Paste your API key]`
5. Click **Deploy**! Render will build your React app and boot up your Express server automatically.
