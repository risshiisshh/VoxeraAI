import type { Topic, Guide } from "@/types";

// ─── Topics ───────────────────────────────────────────────────
export const LEARN_TOPICS: Topic[] = [
  {
    id: "voter-registration",
    title: "Voter Registration & EPIC",
    description: "How to register using Form 6, get your EPIC (Voter ID), and update details using Form 8 or the Voter Helpline App.",
    icon: "📋",
    color: "#F5A623",
    articleCount: 4,
    slug: "voter-registration",
  },
  {
    id: "evm-vvpat",
    title: "EVM & VVPAT Process",
    description: "How Electronic Voting Machines and the VVPAT paper trail work — from casting your vote to verification.",
    icon: "🗳️",
    color: "#3B82F6",
    articleCount: 3,
    slug: "evm-vvpat",
  },
  {
    id: "electoral-system",
    title: "Indian Electoral System",
    description: "Lok Sabha, Rajya Sabha, State Legislative Assemblies — how India's multi-tiered representative democracy works.",
    icon: "🏛️",
    color: "#22C55E",
    articleCount: 3,
    slug: "electoral-system",
  },
  {
    id: "candidates-parties",
    title: "Candidates & Parties",
    description: "Research candidates using the KYC App, read affidavits, check criminal antecedents, and understand party manifestos.",
    icon: "👥",
    color: "#A855F7",
    articleCount: 3,
    slug: "candidates-parties",
  },
  {
    id: "voter-rights",
    title: "Your Voter Rights",
    description: "Know your legal protections at the polls, the Model Code of Conduct, and how to use RTI for election transparency.",
    icon: "⚖️",
    color: "#EC4899",
    articleCount: 3,
    slug: "voter-rights",
  },
  {
    id: "local-government",
    title: "Panchayati Raj & Local Bodies",
    description: "Gram Panchayats, Municipal Corporations, Ward Committees — why local elections shape your everyday life most.",
    icon: "🏘️",
    color: "#EAB308",
    articleCount: 3,
    slug: "local-government",
  },
];

// ─── Guides ───────────────────────────────────────────────────
export const LEARN_GUIDES: Guide[] = [
  // ── Voter Registration ──
  {
    id: "how-to-register-voter",
    title: "How to Register as a Voter in India",
    excerpt: "A complete step-by-step guide to checking your name in the electoral roll and submitting Form 6 online or offline.",
    readTime: 5,
    topic: "Voter Registration & EPIC",
    topicSlug: "voter-registration",
    difficulty: "beginner",
    publishedAt: "2026-01-10",
    slug: "how-to-register-voter",
    source: "https://voters.eci.gov.in",
    sections: ["Who Is Eligible?", "How to Check Your Name", "Submitting Form 6 Online", "Submitting Form 6 Offline", "What Happens Next?"],
    contentPrompt: `Write a detailed, beginner-friendly civic education article titled "How to Register as a Voter in India". 
    Cover: eligibility criteria (18+, Indian citizen, ordinary resident), how to check the electoral roll at voters.eci.gov.in, 
    filling Form 6 step-by-step via the Voter Helpline App and online portal, the offline process at BLO/ERO offices, 
    verification process and timelines, and what EPIC (Voter ID card) is. 
    Include official links and cite ECI sources. Use markdown with headers and bullet points. 
    Add a "Key Takeaways" section at the end.`,
  },
  {
    id: "update-voter-details",
    title: "How to Update Your Voter Details (Form 8)",
    excerpt: "Changed address or found an error in your voter card? Learn how to use Form 8 to update your information correctly.",
    readTime: 4,
    topic: "Voter Registration & EPIC",
    topicSlug: "voter-registration",
    difficulty: "beginner",
    publishedAt: "2026-01-20",
    slug: "update-voter-details",
    source: "https://voters.eci.gov.in",
    sections: ["When to Use Form 8", "Updating Your Address", "Correcting Name/DOB Errors", "Tracking Your Request"],
    contentPrompt: `Write a detailed civic education article titled "How to Update Your Voter Details Using Form 8".
    Cover: when Form 8 is needed (change of residence, name correction, date of birth correction, photo change), 
    online process via voters.eci.gov.in and the Voter Helpline App, offline process at Electoral Registration Office, 
    how to track application status, timelines, and common mistakes to avoid.
    Cite ECI official sources. Use markdown with clear sections and bullet points. Add a FAQ section.`,
  },
  {
    id: "voter-helpline-app",
    title: "Using the Voter Helpline App & Portal",
    excerpt: "The Voter Helpline App (1950) and voters.eci.gov.in are your one-stop resources. Here's everything they can do for you.",
    readTime: 4,
    topic: "Voter Registration & EPIC",
    topicSlug: "voter-registration",
    difficulty: "beginner",
    publishedAt: "2026-02-01",
    slug: "voter-helpline-app",
    source: "https://voters.eci.gov.in",
    sections: ["App Features Overview", "Finding Your Polling Station", "Downloading Voter Slip", "Calling 1950 Helpline"],
    contentPrompt: `Write a practical guide titled "Using the Voter Helpline App and ECI Portal (voters.eci.gov.in)".
    Cover: downloading and using the Voter Helpline App (Android/iOS), key features (electoral roll search, polling station finder, voter slip download, form submission), 
    using the 1950 national helpline, the voters.eci.gov.in portal features, and the KYC (Know Your Candidate) app.
    Make it very practical with step-by-step instructions. Add screenshots descriptions. Cite ECI sources.`,
  },
  {
    id: "home-voting-accessibility",
    title: "Home Voting for Senior Citizens & Persons with Disabilities",
    excerpt: "Citizens aged 85+ and persons with disabilities (PwD) can vote from home. Find out how to apply and what to expect.",
    readTime: 4,
    topic: "Voter Registration & EPIC",
    topicSlug: "voter-registration",
    difficulty: "intermediate",
    publishedAt: "2026-02-15",
    slug: "home-voting-accessibility",
    source: "https://eci.gov.in",
    sections: ["Who Is Eligible?", "How to Apply for Home Voting", "The Home Voting Process", "Accessibility at Polling Booths"],
    contentPrompt: `Write a compassionate, detailed article titled "Home Voting for Senior Citizens and Persons with Disabilities in India".
    Cover: eligibility (85+ age or PwD with at least 40% disability), how to register for home voting (Form 12D), 
    the postal ballot process, visit by polling team, accessibility facilities at polling stations (ramps, wheelchairs, braille), 
    companion voting rules, and ECI's Systematic Voters' Education and Electoral Participation (SVEEP) initiatives.
    Cite ECI Accessibility Guidelines. Use an empathetic, accessible tone.`,
  },

  // ── EVM & VVPAT ──
  {
    id: "how-evm-works",
    title: "How EVM & VVPAT Machines Work",
    excerpt: "Demystifying the Electronic Voting Machine: from casting your vote to the 7-second VVPAT verification slip.",
    readTime: 6,
    topic: "EVM & VVPAT Process",
    topicSlug: "evm-vvpat",
    difficulty: "beginner",
    publishedAt: "2026-01-15",
    slug: "how-evm-works",
    source: "https://eci.gov.in/evm",
    sections: ["What is an EVM?", "How Voting Works", "What is VVPAT?", "Are EVMs Tamper-Proof?", "The VVPAT Slip Count Process"],
    contentPrompt: `Write a comprehensive, factual article titled "How EVM and VVPAT Machines Work in Indian Elections".
    Cover: history of EVM introduction in India (1982 pilot, 2004 full rollout), components (Ballot Unit, Control Unit, VVPAT), 
    step-by-step voting process inside the polling booth, the 7-second VVPAT paper slip display, 
    EVM security features (one-time programmable chip, no network connectivity, manufacturing standards), 
    the VVPAT slip counting process, Supreme Court orders on VVPAT verification, and official ECI statements on tamper-proofing.
    Be factual and non-partisan. Cite ECI technical documentation.`,
  },
  {
    id: "polling-day-guide",
    title: "What to Expect on Polling Day",
    excerpt: "Everything you need to know before you walk into the polling booth: documents, process, rules, and your VVPAT slip.",
    readTime: 5,
    topic: "EVM & VVPAT Process",
    topicSlug: "evm-vvpat",
    difficulty: "beginner",
    publishedAt: "2026-02-10",
    slug: "polling-day-guide",
    source: "https://eci.gov.in",
    sections: ["Documents to Carry", "At the Polling Station", "Inside the Booth", "After Voting", "What Not to Do"],
    contentPrompt: `Write a practical, step-by-step guide titled "What to Expect on Polling Day in India".
    Cover: the 12 approved alternative ID documents (EPIC, Aadhaar, passport, driving licence, etc.), 
    arriving at the polling station, the queue process, identity verification by polling officer, 
    entering the voting compartment, pressing the EVM button, watching the VVPAT slip for 7 seconds,
    the indelible ink mark, prohibited items (mobile phones), Model Code of Conduct rules on polling day, 
    and what to do if your name is missing from the list.
    Make it very practical and reassuring for first-time voters.`,
  },
  {
    id: "evm-security-myths",
    title: "EVM Security: Facts vs. Myths",
    excerpt: "Separating verified facts from common misconceptions about EVM tampering, hacking, and reliability.",
    readTime: 7,
    topic: "EVM & VVPAT Process",
    topicSlug: "evm-vvpat",
    difficulty: "intermediate",
    publishedAt: "2026-03-01",
    slug: "evm-security-myths",
    source: "https://eci.gov.in/evm",
    sections: ["How EVMs Are Designed", "Pre-Election Security Protocol", "Common Myths Debunked", "Supreme Court Rulings", "Independent Assessments"],
    contentPrompt: `Write a balanced, evidence-based article titled "EVM Security in India: Facts vs. Myths".
    Cover: EVM technical architecture (standalone, no WiFi/Bluetooth, one-time programmable), 
    the manufacturing process (BEL and ECIL), pre-election mock polls and first-level checks, 
    the randomisation process for EVM allocation, candidate-set procedure, 
    EVM Challenge by ECI, Supreme Court judgments on VVPAT (Writ Petition Civil 273/2019), 
    and international expert assessments. 
    Address specific common myths factually and cite primary sources. Be non-partisan and factual.`,
  },

  // ── Electoral System ──
  {
    id: "lok-sabha-rajya-sabha",
    title: "Lok Sabha vs. Rajya Sabha: India's Parliament Explained",
    excerpt: "What are the two houses of Parliament, how are members elected, and what powers does each chamber hold?",
    readTime: 7,
    topic: "Indian Electoral System",
    topicSlug: "electoral-system",
    difficulty: "beginner",
    publishedAt: "2026-01-05",
    slug: "lok-sabha-rajya-sabha",
    source: "https://sansad.in",
    sections: ["The Lok Sabha", "The Rajya Sabha", "Key Differences", "How Bills Pass", "What Your MP Does"],
    contentPrompt: `Write a detailed civic education article titled "Lok Sabha vs. Rajya Sabha: India's Parliament Explained".
    Cover: Lok Sabha (composition, 543 seats, first-past-the-post system, 5-year term, powers including Money Bills), 
    Rajya Sabha (composition, 245 seats, indirect election by state legislatures, 6-year rotating terms, role as Upper House), 
    key constitutional differences and powers, how a bill becomes law (both houses), joint sessions, 
    role of Speaker and Vice President, what a Member of Parliament actually does in constituency and Parliament.
    Cite Constitution of India and sansad.in. Use clear language accessible to first-time voters.`,
  },
  {
    id: "first-past-the-post",
    title: "First-Past-the-Post: How India Counts Your Vote",
    excerpt: "India uses a simple plurality system. Here's exactly how votes are counted and how winners are declared in Indian elections.",
    readTime: 5,
    topic: "Indian Electoral System",
    topicSlug: "electoral-system",
    difficulty: "beginner",
    publishedAt: "2026-02-20",
    slug: "first-past-the-post",
    source: "https://eci.gov.in",
    sections: ["The FPTP System", "Constituency Boundaries", "How Counting Works", "Pros and Cons", "Alternative Systems Worldwide"],
    contentPrompt: `Write a clear, educational article titled "First-Past-the-Post: How India Counts Your Vote".
    Cover: explanation of the First-Past-the-Post (FPTP) electoral system, 
    India's 543 Lok Sabha constituencies and how they're divided, counting day process (strong rooms, randomisation, counting agents), 
    how a winner is declared (highest vote count, not majority needed), the role of the Returning Officer, 
    NOTA (None of the Above) and its implications, arguments for and against FPTP, 
    and brief mention of Proportional Representation used in other democracies.
    Use examples with hypothetical numbers to illustrate vote counting. Be politically neutral.`,
  },
  {
    id: "delimitation-constituencies",
    title: "How Delimitation Shapes Your Constituency",
    excerpt: "Every few decades, constituency boundaries are redrawn. This advanced explainer covers how it works and why it matters.",
    readTime: 8,
    topic: "Indian Electoral System",
    topicSlug: "electoral-system",
    difficulty: "advanced",
    publishedAt: "2026-03-10",
    slug: "delimitation-constituencies",
    source: "https://eci.gov.in",
    sections: ["What Is Delimitation?", "Delimitation Commission", "The 2026 Delimitation Exercise", "Reserved Seats (SC/ST)", "Impact on Representation"],
    contentPrompt: `Write a detailed advanced article titled "How Delimitation Shapes Your Constituency in India".
    Cover: definition and purpose of delimitation, Constitutional provisions (Article 82, 170), 
    history of Delimitation Commissions (1952, 1963, 1973, 2002, upcoming 2026), 
    the freeze on seat reallocation post-1976 (42nd Amendment) and its rationale, 
    how constituency boundaries are drawn using census data, reserved constituencies for SC and ST voters, 
    the upcoming 2026 delimitation exercise after the census, debates about population-based representation vs. development incentives, 
    and impact on political power distribution. Cite Constitution of India and Delimitation Commission reports.`,
  },

  // ── Candidates & Parties ──
  {
    id: "researching-candidates-kyc",
    title: "Researching Candidates: The KYC App and Affidavits",
    excerpt: "The KYC (Know Your Candidate) App lets you check a candidate's criminal record, assets, and education. Here's how.",
    readTime: 5,
    topic: "Candidates & Parties",
    topicSlug: "candidates-parties",
    difficulty: "beginner",
    publishedAt: "2026-01-25",
    slug: "researching-candidates-kyc",
    source: "https://affidavit.eci.gov.in",
    sections: ["The KYC App", "Reading a Candidate Affidavit", "Criminal Antecedents", "Assets and Liabilities", "Other Research Sources"],
    contentPrompt: `Write a practical guide titled "Researching Your Candidate: Using the KYC App and Reading Affidavits".
    Cover: ECI's Know Your Candidate (KYC) App and affidavit.eci.gov.in, 
    what information candidates must disclose (criminal cases, assets, liabilities, education, PAN), 
    how to read and interpret a candidate affidavit step-by-step, 
    understanding Form 26 (affidavit format), what criminal antecedents mean (conviction vs. charge), 
    other research sources (MyNeta.info, ADR India reports, party websites, Lok Dhaba), 
    and how to compare candidates fairly. Emphasize voter empowerment and non-partisan research.`,
  },
  {
    id: "understanding-party-manifestos",
    title: "How to Evaluate a Party Manifesto",
    excerpt: "Election manifestos are a party's promises. Learn what to look for, what questions to ask, and how to hold parties accountable.",
    readTime: 6,
    topic: "Candidates & Parties",
    topicSlug: "candidates-parties",
    difficulty: "intermediate",
    publishedAt: "2026-02-28",
    slug: "understanding-party-manifestos",
    source: "https://eci.gov.in",
    sections: ["What Is a Manifesto?", "Key Sections to Read", "Questions to Ask", "Tracking Past Promises", "Non-Partisan Resources"],
    contentPrompt: `Write an educational article titled "How to Read and Evaluate an Indian Political Party's Election Manifesto".
    Cover: what an election manifesto is and its legal status in India, 
    key sections typically found (economy, agriculture, defence, social welfare, education, women's issues), 
    framework for critically evaluating promises (specificity, funding source, timeline, past record), 
    how to track whether previous manifesto promises were fulfilled (PRS India, FactChecker.in, India Spend), 
    comparing manifestos across parties on specific issues you care about, 
    the Model Code of Conduct rules on manifesto promises. 
    Be completely non-partisan — do not favor any party. Focus on empowering voters with analytical tools.`,
  },
  {
    id: "anti-defection-law",
    title: "The Anti-Defection Law: Party Loyalty and Your Representative",
    excerpt: "India's 10th Schedule prevents MPs and MLAs from switching parties. But what happens when they do — and what does it mean for you?",
    readTime: 7,
    topic: "Candidates & Parties",
    topicSlug: "candidates-parties",
    difficulty: "advanced",
    publishedAt: "2026-03-20",
    slug: "anti-defection-law",
    source: "https://sansad.in",
    sections: ["The 10th Schedule", "When Defection Is Allowed", "The Speaker's Role", "Recent Cases", "Impact on Democracy"],
    contentPrompt: `Write a detailed advanced article titled "India's Anti-Defection Law: The 10th Schedule Explained".
    Cover: history and rationale of the 10th Schedule (added by 52nd Amendment, 1985), 
    what constitutes defection (voluntarily giving up party membership, voting against party whip), 
    exceptions (merger of at least 2/3 party members), the Speaker's quasi-judicial role in deciding defection cases, 
    constitutional debates around the Speaker's impartiality, Supreme Court judgments on disqualification timelines (Nabam Rebia case), 
    recent high-profile defection cases and political implications, and academic debates on whether the law restricts democratic representation. 
    Be factual, citing constitutional provisions and landmark Supreme Court cases.`,
  },

  // ── Voter Rights ──
  {
    id: "voter-rights-at-polls",
    title: "Your Voter Rights Inside the Polling Booth",
    excerpt: "What protections do you have at the polling station? Know your rights if your name is missing, your vote is challenged, or you face intimidation.",
    readTime: 5,
    topic: "Your Voter Rights",
    topicSlug: "voter-rights",
    difficulty: "beginner",
    publishedAt: "2026-01-30",
    slug: "voter-rights-at-polls",
    source: "https://eci.gov.in",
    sections: ["Right to Vote (Article 326)", "If Your Name Is Missing", "If Your Vote Is Challenged", "Right to Secrecy", "Reporting Violations"],
    contentPrompt: `Write a clear, empowering article titled "Your Voter Rights at the Polling Booth in India".
    Cover: constitutional right to vote (Article 326), right to secret ballot, 
    what to do if your name is not in the electoral roll at your booth (Voter Information Slip, Presiding Officer process), 
    the tendered ballot process if someone has voted in your name, 
    what voter intimidation is and how to report it (ECI Vigil App, 1950 helpline), 
    the right to vote for NOTA, rights of PwD and senior citizen voters, 
    what a polling agent can and cannot do, and how to file a complaint with the Election Commission.
    Be empowering and practical. This is for citizens exercising their franchise.`,
  },
  {
    id: "model-code-of-conduct",
    title: "The Model Code of Conduct: Keeping Elections Fair",
    excerpt: "The MCC is a set of rules for political parties and candidates during elections. It protects voters — here's what it covers.",
    readTime: 6,
    topic: "Your Voter Rights",
    topicSlug: "voter-rights",
    difficulty: "intermediate",
    publishedAt: "2026-02-25",
    slug: "model-code-of-conduct",
    source: "https://eci.gov.in",
    sections: ["What Is the MCC?", "Rules for Parties & Candidates", "Rules for the Government", "How to Report Violations", "MCC and Social Media"],
    contentPrompt: `Write a comprehensive article titled "The Model Code of Conduct: Keeping Indian Elections Fair".
    Cover: history and legal basis of the MCC (non-statutory but enforceable), when it comes into force (election schedule announcement), 
    rules for political parties (rallies, speeches, use of government resources), 
    rules for the incumbent government (no new schemes, no transfers of officials without EC permission), 
    paid news and political advertising rules, social media guidelines under MCC, 
    the cVIGIL App for reporting MCC violations, ECI's enforcement mechanisms, and landmark MCC enforcement cases.
    Cite ECI's official MCC document. Be factual and comprehensive.`,
  },
  {
    id: "rti-elections",
    title: "Using RTI for Election Transparency",
    excerpt: "The Right to Information Act is a powerful tool for election transparency. Learn how voters can use RTI to hold the system accountable.",
    readTime: 6,
    topic: "Your Voter Rights",
    topicSlug: "voter-rights",
    difficulty: "advanced",
    publishedAt: "2026-03-15",
    slug: "rti-elections",
    source: "https://rti.gov.in",
    sections: ["RTI and Elections", "What Information You Can Request", "Filing an RTI Application", "ECI's Response Track Record", "When RTI Gets Denied"],
    contentPrompt: `Write a detailed advanced article titled "Using RTI for Election Transparency in India".
    Cover: the RTI Act 2005 and its application to the Election Commission of India, 
    what election-related information can be obtained via RTI (polling station data, EVM certification records, candidate affidavit details, election expenses), 
    how to file an RTI application to ECI (Central Public Information Officer, online and offline methods), 
    fees and timelines, first and second appeals process, 
    notable RTI cases that revealed important election information, 
    information that is legitimately exempt under Section 8 of the RTI Act, 
    and organizations (ADR, CMS) that use RTI for election monitoring. Cite RTI Act 2005 and ECI RTI portal.`,
  },

  // ── Local Government ──
  {
    id: "panchayati-raj-explained",
    title: "Panchayati Raj: India's Grassroots Democracy",
    excerpt: "The 73rd Amendment created a three-tier Panchayat system. Understand how it works and why gram sabhas matter to your life.",
    readTime: 6,
    topic: "Panchayati Raj & Local Bodies",
    topicSlug: "local-government",
    difficulty: "beginner",
    publishedAt: "2026-02-05",
    slug: "panchayati-raj-explained",
    source: "https://panchayat.gov.in",
    sections: ["The 73rd Amendment", "Three-Tier Structure", "Gram Sabha vs. Gram Panchayat", "Panchayat Elections", "What Panchayats Control"],
    contentPrompt: `Write a clear, engaging article titled "Panchayati Raj: India's Grassroots Democracy Explained".
    Cover: the 73rd Constitutional Amendment (1992) and creation of Panchayati Raj Institutions, 
    the three-tier structure (Gram Panchayat, Panchayat Samiti/Block, Zila Parishad) and how it varies by state, 
    the Gram Sabha (village assembly) — who can attend, what it decides, its role vs. elected Gram Panchayat, 
    Panchayat elections (every 5 years, conducted by State Election Commissions), 
    the 33% reservation for women (and more in some states), SC/ST reservations, 
    the 29 subjects in the 11th Schedule that Panchayats can govern, MGNREGS social audit through Gram Sabha,
    and real-world examples of Panchayats driving local development. Cite 73rd Amendment and Ministry of Panchayati Raj.`,
  },
  {
    id: "municipal-corporations",
    title: "Municipal Corporations & Urban Local Bodies",
    excerpt: "City services — roads, water, waste management — are managed by Municipal Corporations. Here's how urban local democracy works.",
    readTime: 5,
    topic: "Panchayati Raj & Local Bodies",
    topicSlug: "local-government",
    difficulty: "beginner",
    publishedAt: "2026-02-18",
    slug: "municipal-corporations",
    source: "https://mohua.gov.in",
    sections: ["The 74th Amendment", "Types of Urban Bodies", "Ward Elections", "Mayor and Commissioner", "Services Under Municipal Control"],
    contentPrompt: `Write a practical article titled "Municipal Corporations and Urban Local Bodies in India".
    Cover: the 74th Constitutional Amendment (1992) creating Urban Local Bodies (ULBs), 
    types of ULBs (Municipal Corporation for large cities, Municipal Council, Nagar Panchayat), 
    ward committees and ward councillor elections, the Mayor and elected council vs. the appointed Municipal Commissioner (IAS officer), 
    the 18 subjects in the 12th Schedule (urban services: water, sanitation, roads, building permits, markets, public health), 
    property tax as the primary revenue source, the Smart Cities Mission and AMRUT schemes, 
    voter registration for municipal elections, and why your ward councillor may matter more than your MP for daily life.
    Use examples from major Indian cities. Cite Ministry of Housing & Urban Affairs.`,
  },
  {
    id: "why-local-elections-matter",
    title: "Why Local Elections Matter More Than You Think",
    excerpt: "Roads, schools, water supply, parks — local government controls your daily civic life. Here's why you should vote in every election.",
    readTime: 5,
    topic: "Panchayati Raj & Local Bodies",
    topicSlug: "local-government",
    difficulty: "intermediate",
    publishedAt: "2026-03-05",
    slug: "why-local-elections-matter",
    source: "https://eci.gov.in",
    sections: ["What Local Government Controls", "Low Voter Turnout Problem", "How to Find Your Ward", "Holding Local Officials Accountable", "Getting Involved"],
    contentPrompt: `Write an motivating, evidence-based article titled "Why Local Elections Matter More Than You Think".
    Cover: the specific services controlled by local bodies (pothole repair, drainage, public parks, street lighting, sanitation, building permits), 
    statistics on lower voter turnout in local vs. general elections in India, 
    how to find your ward boundary and councillor (through state municipal corporation websites), 
    tools for local accountability (ward sabhas, grievance portals, social audit), 
    examples of local elected representatives who drove significant change, 
    how to get involved beyond voting (ward committee meetings, public hearings, MGNREGS social audits), 
    and a call to action for greater civic participation. 
    Be inspiring and practical. Include specific actionable steps.`,
  },
];

// ─── Helpers ─────────────────────────────────────────────────
export function getTopicBySlug(slug: string): Topic | undefined {
  return LEARN_TOPICS.find((t) => t.slug === slug);
}

export function getGuidesByTopic(topicSlug: string): Guide[] {
  return LEARN_GUIDES.filter((g) => g.topicSlug === topicSlug);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return LEARN_GUIDES.find((g) => g.slug === slug);
}

export function getRelatedGuides(guide: Guide, count = 3): Guide[] {
  return LEARN_GUIDES.filter(
    (g) => g.topicSlug === guide.topicSlug && g.slug !== guide.slug
  ).slice(0, count);
}

export function getFeaturedGuide(): Guide {
  return LEARN_GUIDES[0];
}

export function getAllSlugs() {
  return {
    topics: LEARN_TOPICS.map((t) => t.slug),
    guides: LEARN_GUIDES.map((g) => ({ topic: g.topicSlug, article: g.slug })),
  };
}
