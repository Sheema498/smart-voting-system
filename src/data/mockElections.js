export const mockElections = [
  {
    id: "elec-2026-sc",
    title: "University Student Council General Election 2026",
    shortTitle: "Student Council Election",
    category: "Academic & Campus",
    status: "active", // "active", "upcoming", "completed"
    startDate: "2026-09-10T08:00:00Z",
    endDate: "2026-09-20T18:00:00Z",
    description: "Annual democratic election to select student body executive representatives including President, Vice President, Academic Liaison, and Welfare Commissioner for the 2026-2027 academic term.",
    rules: [
      "All registered undergraduate and postgraduate students in good standing are eligible to vote.",
      "Each voter can cast exactly one ballot for their chosen candidate.",
      "Ballots are cryptographically hashed and anonymous upon submission.",
      "Voting closes strictly at 18:00 UTC on September 20, 2026."
    ],
    eligibility: "Enrolled active students with valid Student ID",
    totalEligibleVoters: 14200,
    totalVotesCast: 9840,
    positions: ["Student Body President", "Vice President", "Academic Officer", "Student Welfare Director"],
    featured: true,
    badgeText: "High Turnout",
    urgencyLevel: "medium", // "high", "medium", "low"
    bannerGradient: "from-blue-600 via-indigo-600 to-sky-500",
    candidateIds: ["cand-1", "cand-2", "cand-3", "cand-4"]
  },
  {
    id: "elec-2026-civic",
    title: "Metropolitan Civic Leadership Board 2026",
    shortTitle: "Civic Leadership Board",
    category: "Community & Civic",
    status: "active",
    startDate: "2026-09-08T09:00:00Z",
    endDate: "2026-09-18T20:00:00Z",
    description: "Empowering residents of districts 1 through 7 to elect 3 citizen commissioners overseeing local urban development, renewable transit, public parks, and neighborhood cultural grants.",
    rules: [
      "Registered residents aged 18 or older residing within metro municipal limits.",
      "Verified residency through simulated digital ID verification.",
      "Selection provides weighted representation for district community projects.",
      "Results verified by an independent civic auditing committee."
    ],
    eligibility: "Metro district registered residents 18+",
    totalEligibleVoters: 45000,
    totalVotesCast: 28410,
    positions: ["Metropolitan Commissioner", "Parks & Sustainability Chair"],
    featured: true,
    badgeText: "Ends in 3 Days",
    urgencyLevel: "high",
    bannerGradient: "from-emerald-600 via-teal-600 to-cyan-600",
    candidateIds: ["cand-5", "cand-6", "cand-7", "cand-8"]
  },
  {
    id: "elec-2026-youth",
    title: "National Youth Policy Advisory Council 2026",
    shortTitle: "Youth Advisory Council",
    category: "Youth & Policy",
    status: "active",
    startDate: "2026-09-12T00:00:00Z",
    endDate: "2026-09-25T23:59:00Z",
    description: "National forum giving emerging youth leaders a direct consultative voice into federal education reform, digital economy apprenticeships, and climate resilience frameworks.",
    rules: [
      "Open to young citizens aged 16 through 28.",
      "One ballot per authenticated digital voter identity.",
      "Ranked or direct preference for primary regional delegate.",
      "Audit trail verifiable via instant digital ballot hash."
    ],
    eligibility: "Verified youth delegates aged 16-28",
    totalEligibleVoters: 62000,
    totalVotesCast: 39500,
    positions: ["National Youth Representative", "Innovation Spokesperson"],
    featured: false,
    badgeText: "Open Voting",
    urgencyLevel: "low",
    bannerGradient: "from-purple-600 via-violet-600 to-indigo-600",
    candidateIds: ["cand-9", "cand-10", "cand-11"]
  },
  {
    id: "elec-2026-tech",
    title: "Open Technology & Innovation Board Election 2026",
    shortTitle: "Tech & Innovation Board",
    category: "Technology & Governance",
    status: "upcoming",
    startDate: "2026-10-01T00:00:00Z",
    endDate: "2026-10-15T23:59:00Z",
    description: "Selection of external industry advisors and open-source steering members overseeing digital privacy infrastructure, smart city open APIs, and community technology funds.",
    rules: [
      "Registered technology council members and verified contributors.",
      "Candidates must have completed independent compliance disclosures.",
      "Voting opens October 1, 2026."
    ],
    eligibility: "Accredited Technology Guild members & contributors",
    totalEligibleVoters: 8500,
    totalVotesCast: 0,
    positions: ["Steering Council Lead", "Open Data Architect"],
    featured: false,
    badgeText: "Upcoming",
    urgencyLevel: "low",
    bannerGradient: "from-amber-600 via-orange-600 to-rose-600",
    candidateIds: ["cand-12", "cand-13"]
  },
  {
    id: "elec-2026-green",
    title: "Community Green Energy & Sustainability Referendum 2026",
    shortTitle: "Green Energy Referendum",
    category: "Environment & Energy",
    status: "completed",
    startDate: "2026-08-01T08:00:00Z",
    endDate: "2026-08-15T20:00:00Z",
    description: "Historic public referendum on allocating 15% of annual municipal infrastructure reserves to localized rooftop solar grids and carbon-neutral public fleet buses.",
    rules: [
      "Certified public referendum completed under independent electoral observation.",
      "Final certification completed August 16, 2026.",
      "Results are binding for the 2027 fiscal budget."
    ],
    eligibility: "All municipal taxpayers and resident voters",
    totalEligibleVoters: 58000,
    totalVotesCast: 42150,
    positions: ["Referendum Initiative A (Solar Transition)", "Referendum Initiative B (Fleet Modernization)"],
    featured: false,
    badgeText: "Certified Results",
    urgencyLevel: "low",
    bannerGradient: "from-teal-600 via-emerald-700 to-green-800",
    candidateIds: ["cand-14", "cand-15"],
    winnerCandidateId: "cand-14"
  }
];
