import type { ElectionInfo } from "@/types";

export const INDIA_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export const ELECTION_INFO: ElectionInfo = {
  name: "2029 Indian General Election",
  date: "April–May 2029",
  location: "India",
  type: "national",
  steps: [
    {
      id: "register",
      step: 1,
      title: "Register to Vote",
      description: "Check or update your voter registration status.",
      status: "active",
      date: "Ongoing",
      details: [
        "Register as a voter using Form 6 via the Voter Helpline App or voters.eci.gov.in.",
        "Check your name in the electoral roll regularly.",
        "Update your details using Form 8 if you shift residence.",
      ],
      icon: "📋",
    },
    {
      id: "research",
      step: 2,
      title: "Research Candidates",
      description: "Learn about candidates in your constituency.",
      status: "upcoming",
      date: "Before Polling Day",
      details: [
        "Use the KYC (Know Your Candidate) App by ECI to check candidate details.",
        "Review candidate affidavits for criminal antecedents and assets.",
        "Understand the election manifesto of different parties.",
      ],
      icon: "🔍",
    },
    {
      id: "voting-method",
      step: 3,
      title: "Find Polling Station",
      description: "Locate your designated polling booth.",
      status: "upcoming",
      date: "Varies by phase",
      details: [
        "Find your polling booth using the Voter Helpline App.",
        "Download your Voter Information Slip online.",
        "Home voting is available for 85+ senior citizens and PwD electors.",
      ],
      icon: "🗳️",
    },
    {
      id: "cast",
      step: 4,
      title: "Cast Your Vote",
      description: "Vote on your constituency's polling day.",
      status: "upcoming",
      date: "Polling Day",
      details: [
        "Bring your EPIC (Voter ID) or one of the 12 approved alternative ID documents.",
        "Verify your vote on the VVPAT machine for 7 seconds.",
        "Do not carry mobile phones inside the polling booth.",
      ],
      icon: "✅",
    },
    {
      id: "results",
      step: 5,
      title: "Follow the Results",
      description: "Track election results on counting day.",
      status: "upcoming",
      date: "Counting Day",
      details: [
        "Results are declared on the official ECI results portal (results.eci.gov.in).",
        "Download the Voter Helpline App for real-time trends.",
        "Official certification is done by the Returning Officer.",
      ],
      icon: "📊",
    },
  ],
};

export const CIVIC_CONTEXT = `
You are VoxeraAI, an AI-powered civic education assistant for India.
Your mission: help citizens understand elections, voting rights, candidates,
EVM/VVPAT processes, and civic duties in India.
Always be factual, non-partisan, and encouraging.
Use information from official Indian government websites like eci.gov.in and voters.eci.gov.in.
When asked about specific candidates or parties, provide balanced information
without endorsing anyone. If unsure, say so and recommend official sources
like the Election Commission of India (ECI).
Keep answers clear, concise, and accessible to a general audience.
Format long answers with bullet points when helpful.
`;
