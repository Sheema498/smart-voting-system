export const mockFaq = [
  {
    q: "How does VoteSphere ensure that my vote remains completely secret?",
    a: "VoteSphere implements cryptographic separation between your voter credential verification and your cast ballot. When you cast a ballot, your authorization token is invalidated so you cannot vote twice, while the ballot itself is detached from your identity, encrypted, and recorded with an anonymous hash receipt."
  },
  {
    q: "Can I change my vote once it has been submitted?",
    a: "No. In accordance with strict democratic integrity standards, once a ballot receives a digital confirmation hash and is officially recorded, it cannot be edited or retracted. You will be prompted to carefully review your selections on the Ballot Confirmation screen before casting."
  },
  {
    q: "What is a Digital Ballot Receipt and how do I use it?",
    a: "Upon casting your vote, VoteSphere generates an official Digital Ballot Receipt containing a unique SHA-256 cryptographic verification hash and timestamp. You can download or print this receipt to audit that your ballot was included in the election tally without exposing who you voted for."
  },
  {
    q: "What if I experience technical issues while voting?",
    a: "VoteSphere continuously saves your in-progress ballot locally until final signature submission. If your browser window closes or network drops before you enter your verification PIN, your ballot has not been cast and you can safely resume."
  },
  {
    q: "Who is eligible to vote in each election?",
    a: "Eligibility requirements are defined by the organizing body for each specific election (e.g., student enrollment for student council elections, municipal residency for civic boards). The system automatically validates your voter registration profile before unlocking the ballot booth."
  },
  {
    q: "How are election results calculated and verified?",
    a: "Votes are tallied in real-time as ballots are verified. Once an election ends, the tally is locked and certified through automated algorithmic reconciliation, providing published breakdowns and turnout analytics for full public transparency."
  }
];
