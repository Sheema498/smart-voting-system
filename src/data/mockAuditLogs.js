export const mockAuditLogs = [
  {
    id: "audit-101",
    timestamp: "2026-09-15T09:14:22Z",
    eventType: "BALLOT_CAST",
    severity: "INFO",
    actor: "voter-usr-2026-9482",
    electionId: "elec-2026-sc",
    details: "Ballot cast anonymously with SHA-256 confirmation hash generated.",
    hash: "0x8f4c2e19a0d8b573c9f1165a29db4ef891a27e01b33d45c6",
    ipMasked: "192.168.1.***"
  },
  {
    id: "audit-102",
    timestamp: "2026-09-15T08:30:10Z",
    eventType: "ADMIN_LOGIN",
    severity: "INFO",
    actor: "admin-commissioner-01",
    electionId: null,
    details: "Administrator logged in to supervisory dashboard with 2FA token.",
    hash: "0x3a9f182c4019e83bd651a293817f091ab5421c998e3f421a",
    ipMasked: "10.0.4.***"
  },
  {
    id: "audit-103",
    timestamp: "2026-09-14T21:45:00Z",
    eventType: "POLLS_OPENED",
    severity: "SECURITY",
    actor: "system-scheduler",
    electionId: "elec-2026-youth",
    details: "Polls officially opened for National Youth Policy Advisory Council 2026.",
    hash: "0x99281a8f902cb4517192837f827419a827419e8471b3901a",
    ipMasked: "SYSTEM_CRON"
  },
  {
    id: "audit-104",
    timestamp: "2026-09-14T17:12:30Z",
    eventType: "VOTER_REGISTERED",
    severity: "INFO",
    actor: "voter-usr-2026-10492",
    electionId: null,
    details: "New citizen voter registration verified in Metro District 1.",
    hash: "0x44b9102837418a9c82749102837491028471928374819283",
    ipMasked: "172.16.8.***"
  },
  {
    id: "audit-105",
    timestamp: "2026-09-14T11:05:14Z",
    eventType: "RESULTS_CERTIFIED",
    severity: "SECURITY",
    actor: "electoral-board-chair",
    electionId: "elec-2026-green",
    details: "Green Energy Referendum official returns certified and sealed into immutable archive.",
    hash: "0x118273918273918273918273918273918273918273918273",
    ipMasked: "10.0.1.***"
  },
  {
    id: "audit-106",
    timestamp: "2026-09-13T19:22:45Z",
    eventType: "CANDIDATE_ACCREDITED",
    severity: "INFO",
    actor: "admin-commissioner-01",
    electionId: "elec-2026-sc",
    details: "Candidate Aria Sterling compliance disclosures verified and approved.",
    hash: "0x778291028374910283749102837491028374910283749102",
    ipMasked: "10.0.4.***"
  },
  {
    id: "audit-107",
    timestamp: "2026-09-13T14:10:05Z",
    eventType: "INTEGRITY_CHECK_PASS",
    severity: "INFO",
    actor: "cryptographic-auditor-node",
    electionId: "elec-2026-sc",
    details: "Automated Merkle tree root hash verified across 9,840 ballot receipts.",
    hash: "0x559201928374819283748192837481928374819283748192",
    ipMasked: "LOCAL_DAEMON"
  },
  {
    id: "audit-108",
    timestamp: "2026-09-12T16:00:00Z",
    eventType: "BULLETIN_BROADCAST",
    severity: "INFO",
    actor: "admin-communications",
    electionId: "elec-2026-civic",
    details: "Sent 3-day remaining voting reminder bulletin to all registered voters.",
    hash: "0x339102837491028374910283749102837491028374910283",
    ipMasked: "10.0.2.***"
  }
];
