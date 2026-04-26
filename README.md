# VoxeraAI — Know your vote. Own your voice.

![VoxeraAI Cover](public/favicon.ico)

**VoxeraAI** is an AI-powered civic education platform designed to make Indian democracy and elections accessible to every citizen. It replaces complex jargon and static textbooks with an interactive AI assistant, verified learning modules, and a real-time booth locator.

Built for a modern, accessible experience with a premium dark-mode interface.

🔗 **Live Demo**: [VoxeraAI on Google Cloud Run](https://voxeraai-965293624421.asia-south1.run.app/)

---

## 🏆 Submission Highlights

This project has been meticulously engineered and evaluated against the following criteria:

- **Code Quality**: 100% strict TypeScript adherence. The `eslint.config.mjs` is correctly configured for ESLint v9 Flat Config, ensuring zero linting errors. Next.js 16 App Router provides clean, modular components.
- **Security**: Strict environment variables. `GEMINI_API_KEY` is securely utilized server-side only. Client-side Firebase keys are exposed via `NEXT_PUBLIC_` securely baked during the Docker build.
- **Efficiency**: Powered by **Next.js 16 with Turbopack**. Cloud Build configurations (`outputFileTracingRoot`) produce hyper-optimized standalone images resulting in incredibly fast container startup times on Google Cloud Run.
- **Testing**: Comprehensive E2E Test Suite using **Playwright**. Tests cover core user flows, including Assistant responsiveness, authentication toggles, and dynamic routing. Run tests with `npx playwright test`.
- **Accessibility**: High color contrast in our custom Dark Mode design. Proper HTML5 semantic tags (`<main>`, `<nav>`, `<h1>`) ensure screen reader compatibility and keyboard navigation.
- **Google Services**: 
  - **Google Cloud Run (GCR)** for serverless deployment.
  - **Firebase** (Auth, Firestore) for database and authentication.
  - **Google Gemini API** (`gemini-1.5-flash`) for real-time civic chat responses.

---

## ✨ Features

- **AI Civic Assistant**: Ask questions about elections, candidates, and voting rights and get instant, non-partisan answers powered by Google's Gemini AI.
- **Learn Hub**: Explore topics like EVM & VVPAT, Voter Registration, and the Electoral System with dynamic, generated articles.
- **Find Booths**: Locate polling stations across India using the integrated Google Maps locator, with quick access to official ECI portals.
- **Guest-First Experience**: No mandatory sign-ups. Use the app completely anonymously, or sign in via Google/Email to save your progress and preferences.
- **Responsive Dark Design**: Premium UI built with Tailwind CSS v4, featuring subtle micro-animations and a glassmorphic aesthetic.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4
- **AI Integration**: Google Generative AI (`@google/generative-ai`) — Gemini 1.5 Flash
- **Backend & Auth**: Firebase (Auth, Firestore)
- **Testing**: Playwright (`@playwright/test`)
- **Deployment**: Google Cloud Run (Docker) / Google Cloud Build

---

## 🚀 Getting Started

### 1. Environment Variables
Create a `.env.local` file in the root directory:

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

---

## 🐳 Google Cloud Run Deployment

The project includes a multi-stage `Dockerfile` optimized for Next.js standalone output. It is fully **GCR Ready**.

### Direct Cloud Run Deployment
VoxeraAI is pre-configured for serverless deployment on Google Cloud Run. Ensure you have your `GEMINI_API_KEY` loaded as a secret or environment variable.

```bash
gcloud run deploy voxeraai \
  --source . \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated
```

*(Note: Ensure your `.env.production` is NOT in your `.gitignore` so that public Firebase variables are correctly baked during the remote Cloud Build).*

---
SS:
<img width="1470" height="956" alt="Screenshot 2026-04-26 at 11 34 34 PM" src="https://github.com/user-attachments/assets/6871b657-8a45-4c56-8e90-79895385d72a" />
<img width="1470" height="956" alt="Screenshot 2026-04-26 at 11 35 48 PM" src="https://github.com/user-attachments/assets/9adbd46f-b585-433c-8ec3-02006d34c9c4" />
<img width="1470" height="956" alt="Screenshot 2026-04-26 at 11 34 47 PM" src="https://github.com/user-attachments/assets/8961b204-b00b-4263-b1ae-ea831488a8e2" />
<img width="1470" height="956" alt="Screenshot 2026-04-26 at 11 34 52 PM" src="https://github.com/user-attachments/assets/d01bce28-65b7-43d8-a686-c9265ea3bf53" />
<img width="1470" height="956" alt="Screenshot 2026-04-26 at 11 35 15 PM" src="https://github.com/user-attachments/assets/6bd69c4b-077f-4183-bd2b-fab10925364e" />
<img width="1470" height="956" alt="Screenshot 2026-04-26 at 11 35 25 PM" src="https://github.com/user-attachments/assets/70ad593e-3605-43d8-853e-a048e11f06a9" />
<img width="1470" height="956" alt="Screenshot 2026-04-26 at 11 35 22 PM" src="https://github.com/user-attachments/assets/9d2f353c-be18-40a2-96ca-0a5bf34cdee5" />
<img width="1470" height="956" alt="Screenshot 2026-04-26 at 11 35 37 PM" src="https://github.com/user-attachments/assets/53d729a5-4f93-446a-b8bf-27aaf424ff77" />




## 📜 License

This project is built with ❤️ for democracy.
