export const mockNotifications = [
  {
    id: "notif-1",
    title: "Election Opening: Student Council General Election 2026",
    message: "Voting is now officially open for the University Student Council General Election. Review candidates and cast your ballot before September 20.",
    category: "election",
    type: "info", // "info", "success", "alert", "reminder"
    timestamp: "2026-09-10T08:00:00Z",
    read: false,
    link: "/voting/elec-2026-sc",
    actionText: "Vote Now"
  },
  {
    id: "notif-2",
    title: "Urgent Voting Reminder: Civic Leadership Board",
    message: "Only 3 days remain to cast your ballot for the Metropolitan Civic Leadership Board election. Ensure your community voice is represented.",
    category: "reminder",
    type: "reminder",
    timestamp: "2026-09-14T10:30:00Z",
    read: false,
    link: "/voting/elec-2026-civic",
    actionText: "Cast Ballot"
  },
  {
    id: "notif-3",
    title: "Certified Results Published: Green Energy Referendum",
    message: "The electoral commission has published the certified results for the Community Green Energy & Sustainability Referendum. Option YES passed with 65.2% approval.",
    category: "results",
    type: "success",
    timestamp: "2026-08-16T14:00:00Z",
    read: true,
    link: "/results",
    actionText: "View Certified Results"
  },
  {
    id: "notif-4",
    title: "Security Verification: Digital Voter PIN Active",
    message: "Your digital voting PIN and cryptographic voter credential have been verified for the 2026 election cycle. No further identity verification is required.",
    category: "security",
    type: "info",
    timestamp: "2026-09-05T12:00:00Z",
    read: true,
    link: "/profile",
    actionText: "View Profile"
  },
  {
    id: "notif-5",
    title: "Candidate Debates Recording Available",
    message: "Video recordings and transcribed policy statements from the Student Council presidential debate have been uploaded to candidate profiles.",
    category: "candidates",
    type: "info",
    timestamp: "2026-09-12T16:45:00Z",
    read: false,
    link: "/candidates",
    actionText: "Explore Candidates"
  }
];
