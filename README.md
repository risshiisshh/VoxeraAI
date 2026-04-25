# VoxeraAI — Your AI Civic Guide

VoxeraAI is an AI-powered civic education platform designed to make Indian democracy and elections accessible to every citizen. It replaces complex jargon and static textbooks with an interactive AI assistant, verified learning modules, and a real-time booth locator.

Built for a modern, accessible experience with a premium dark-mode interface.

## ✨ Features

- **AI Civic Assistant**: Ask questions about elections, candidates, and voting rights and get instant, non-partisan answers powered by Google's Gemini AI.
- **Learn Hub**: Explore topics like EVM & VVPAT, Voter Registration, and the Electoral System with dynamic, generated articles.
- **Find Booths**: Locate polling stations across India using the integrated Google Maps locator, with quick access to official ECI portals.
- **Guest-First Experience**: No mandatory sign-ups. Use the app completely anonymously, or sign in via Google/Email to save your progress and preferences.
- **Responsive Dark Design**: Premium UI built with Tailwind CSS, featuring subtle micro-animations and a glassmorphic aesthetic.

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router, Turbopack)
- **Styling**: Tailwind CSS (Custom Dark Mode tokens)
- **AI Integration**: Google Generative AI (`@google/generative-ai`) — Gemini 1.5 Flash
- **Backend & Auth**: Firebase (Auth, Firestore)
- **Deployment**: Configured for Google Cloud Run (Docker) / Vercel

## 🚀 Getting Started

### 1. Environment Variables
Create a `.env.local` file in the root directory (based on `.env.production`):

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"

# Google Gemini API Key
GEMINI_API_KEY="your-gemini-api-key"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🐳 Docker & Cloud Run Deployment

The project includes a multi-stage `Dockerfile` optimized for Next.js standalone output.

### Local Docker Build
```bash
docker build -t voxeraai .
docker run -p 8080:8080 voxeraai
```

### Google Cloud Run
VoxeraAI is ready for serverless deployment on Google Cloud Run. Ensure you pass the environment variables during deployment:

```bash
gcloud run deploy voxeraai \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="GEMINI_API_KEY=your_key,NEXT_PUBLIC_FIREBASE_API_KEY=..."
```

## 📜 License

This project is built with ❤️ for democracy.
