export const mockFaq = [
  {
    id: 'faq-1',
    category: 'Security & Privacy',
    q: "How does VoteSphere ensure that my vote remains completely secret?",
    a: "VoteSphere implements cryptographic separation between your voter credential verification and your cast ballot. When you cast a ballot, your authorization token is invalidated so you cannot vote twice, while the ballot itself is detached from your identity, encrypted, and recorded with an anonymous hash receipt."
  },
  {
    id: 'faq-2',
    category: 'Ballot Casting',
    q: "Can I change my vote once it has been submitted?",
    a: "No. In accordance with strict democratic integrity standards, once a ballot receives a digital confirmation hash and is officially recorded, it cannot be edited or retracted. You will be prompted to carefully review your selections on the Ballot Confirmation screen before casting."
  },
  {
    id: 'faq-3',
    category: 'Audit & Verification',
    q: "What is a Digital Ballot Receipt and how do I use it?",
    a: "Upon casting your vote, VoteSphere generates an official Digital Ballot Receipt containing a unique SHA-256 cryptographic verification hash and timestamp. You can download or print this receipt to audit that your ballot was included in the election tally without exposing who you voted for."
  },
  {
    id: 'faq-4',
    category: 'Technical Support',
    q: "What if I experience technical issues while voting?",
    a: "VoteSphere continuously saves your in-progress ballot locally until final signature submission. If your browser window closes or network drops before you enter your verification PIN, your ballot has not been cast and you can safely resume."
  },
  {
    id: 'faq-5',
    category: 'Eligibility',
    q: "Who is eligible to vote in each election?",
    a: "Eligibility requirements are defined by the organizing body for each specific election (e.g., student enrollment for student council elections, municipal residency for civic boards). The system automatically validates your voter registration profile before unlocking the ballot booth."
  },
  {
    id: 'faq-6',
    category: 'Results & Certification',
    q: "How are election results calculated and verified?",
    a: "Votes are tallied in real-time as ballots are verified. Once an election ends, the tally is locked and certified through automated algorithmic reconciliation, providing published breakdowns and turnout analytics for full public transparency."
  },
  {
    id: 'faq-7',
    category: 'Security & Privacy',
    q: "Can election administrators see which candidate I selected?",
    a: "No. Administrators only have access to voter participation statuses (whether a registered voter has cast a ballot) and aggregate election tallies. The cryptographic decoupling algorithm strictly prevents any administrator, auditor, or third-party from linking voter identity to specific ballot selections."
  },
  {
    id: 'faq-8',
    category: 'Ballot Casting',
    q: "What happens if I forget my 4-digit voting security PIN?",
    a: "You can securely reset your voting PIN through the voter security settings page or via the simulated credential recovery workflow on the sign-in page. For demonstration profiles, the default demo PIN is 1234."
  },
  {
    id: 'faq-9',
    category: 'Eligibility',
    q: "Can I vote in multiple districts or elections?",
    a: "You may vote in all elections for which your registered district, faculty, or community affiliation qualifies you. However, you can only cast a single ballot per election."
  },
  {
    id: 'faq-10',
    category: 'Technical Support',
    q: "Which browsers and devices are supported by VoteSphere?",
    a: "VoteSphere is built with responsive, web-standards compliant code and fully supports modern evergreen browsers including Chrome, Firefox, Safari, Edge, as well as mobile iOS and Android web browsers."
  },
  {
    id: 'faq-11',
    category: 'Audit & Verification',
    q: "How do I independently audit an election outcome?",
    a: "Navigate to the Public Results page or the Admin Audit Ledger. You can query any ballot verification hash, check election block summaries, and verify cryptographic continuity across all recorded votes."
  },
  {
    id: 'faq-12',
    category: 'Results & Certification',
    q: "What is an election certification lock?",
    a: "When the scheduled voting window concludes, the election enters a certified review state. The system cryptographically seals all ballots, calculates final winner percentages, generates audit export packages, and prevents any further ballot intake."
  }
];
