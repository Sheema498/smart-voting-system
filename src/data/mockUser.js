export const defaultMockUser = {
  id: "voter-usr-2026-9482",
  voterId: "VS-94820-2026",
  name: "Elena Rostova",
  email: "elena.rostova@votesphere.demo",
  phone: "+1 (555) 382-9014",
  district: "Metro District 4 (Central Academic)",
  registrationDate: "2024-03-15",
  status: "Verified Active",
  avatarInitials: "ER",
  avatarBg: "bg-indigo-600",
  notificationPreferences: {
    electionAlerts: true,
    resultUpdates: true,
    securityNotices: true,
    emailDigest: false
  },
  votingPin: "1234",
  votingHistory: [
    {
      electionId: "elec-2026-green",
      electionTitle: "Community Green Energy & Sustainability Referendum 2026",
      castTimestamp: "2026-08-12T11:42:19Z",
      receiptHash: "0x8f4c2e19a0d8b573c9f1165a29db4ef891a27e01b33d45c6",
      status: "Verified & Tallied",
      confirmationCode: "VS-REC-2026-88391",
      candidateName: "Option YES: Adopt Green Energy Solar & Transit Transition"
    }
  ]
};

export const demoCredentials = {
  voterId: "VS-94820-2026",
  password: "DemoVoter2026!",
  pin: "1234"
};
