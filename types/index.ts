// ─── User ──────────────────────────────────────────────────────
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  location?: UserLocation;
  role?: UserRole;
  goals?: string[];
  onboardingComplete?: boolean;
  createdAt?: string;
}

export interface UserLocation {
  country: string;
  state: string;
}

export type UserRole = "first-time-voter" | "experienced-voter" | "civic-educator";

// ─── Chat ──────────────────────────────────────────────────────
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  loading?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// ─── Election Timeline ─────────────────────────────────────────
export interface TimelineStep {
  id: string;
  step: number;
  title: string;
  description: string;
  status: "completed" | "active" | "upcoming";
  date?: string;
  details?: string[];
  icon?: string;
}

export interface ElectionInfo {
  name: string;
  date: string;
  location: string;
  type: "federal" | "state" | "local" | "primary" | "national";
  steps: TimelineStep[];
}

// ─── Learn Hub ─────────────────────────────────────────────────
export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  articleCount: number;
  slug: string;
}

export interface Guide {
  id: string;
  title: string;
  excerpt: string;
  readTime: number;
  topic: string;
  topicSlug: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  publishedAt: string;
  slug: string;
  contentPrompt: string;
  sections?: string[];
  source?: string;
}

export interface ArticleContent {
  guideId: string;
  markdown: string;
  generatedAt: string;
  source: string;
}

export interface UserProgress {
  guidesRead: string[];
  quizScores: Record<string, number>;
  lastVisited: string;
}

// ─── Onboarding ────────────────────────────────────────────────
export interface OnboardingData {
  location: UserLocation;
  role: UserRole;
  goals: string[];
}

export const ONBOARDING_GOALS = [
  { id: "understand-process", label: "Understand the voting process" },
  { id: "research-candidates", label: "Research candidates" },
  { id: "know-rights", label: "Know my rights" },
  { id: "stay-informed", label: "Stay informed year-round" },
  { id: "explain-others", label: "Help explain to others" },
  { id: "local-issues", label: "Follow local issues" },
] as const;
