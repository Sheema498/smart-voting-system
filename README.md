# VoteSphere — Modern Transparent & Secure Smart Voting System

VoteSphere is an enterprise-grade, human-designed, frontend-only single-page digital voting application. Built with **React 18**, **Tailwind CSS**, and **Vite**, VoteSphere simulates a modern democratic election platform offering cryptographically verifiable ballot receipts, zero-knowledge privacy, accessible multi-device workflows, and real-time tally auditability without relying on any server backend or external database.

---

## 🌟 Key Capabilities

- **Zero-Trace Ballot Privacy**: Decouples voter authentication credentials from submitted candidate ballots, guaranteeing strict democratic anonymity.
- **Cryptographic Receipt Audit**: Generates instant SHA-256 digital ballot receipts and verification codes (`VS-REC-2026-XXXXX`) that voters can print, download, and cross-reference against the public ledger.
- **3-Step Ballot Wizard**: Guided, accessible voting interface with candidate policy previews, ballot confirmation safeguards, and 4-digit voting PIN signature.
- **Dynamic Voter Dashboard**: Real-time status cards, active jurisdiction ballot indicators, upcoming election timelines, and voter participation metrics.
- **Universal Accessibility (WCAG 2.1 AA)**: Semantic HTML5, accessible ARIA attributes, high-contrast palette, visible keyboard focus indicators, and screen-reader friendliness.
- **100% Client-Side Persistence**: State, voter profile customizations, cast ballots, and notification bulletins persist cleanly across sessions via `localStorage`.

---

## 🧭 Application Routes

| Route | Page | Access Level | Description |
|---|---|---|---|
| `/` | Landing Page | Public | Hero showcase, trust metrics, active election cards, 5-step workflow, FAQ |
| `/about` | About & Integrity | Public | Cryptographic model explainer, accessibility commitment, security pillars |
| `/elections` | Election Directory | Public / Protected | Filterable listing by active/upcoming/completed status, category, and search |
| `/elections/:id` | Election Details | Public / Protected | Certified rules, eligibility guidelines, candidate previews, and direct vote CTA |
| `/candidates` | Candidate Directory | Public / Protected | Searchable directory with policy tags, party filters, and sort options |
| `/candidates/:id` | Candidate Profile | Public / Protected | Full candidate biography, policy priorities, experience, and direct voting link |
| `/login` | Authentication Portal | Public | Simulated voter sign-in with 1-click demo credential auto-fill |
| `/register` | Voter Registration | Public | Citizen registration form issuing official simulated Voter IDs (`VS-XXXXX-2026`) |
| `/dashboard` | Voter Dashboard | Protected | Active ballot notifications, voter stats, quick actions, and receipt history |
| `/voting` | Voting Hub | Protected | Ballot center showing open polls and voter participation status |
| `/voting/:electionId` | Ballot Booth | Protected | Step-by-step voting wizard: Candidate Select → Review → PIN Signature |
| `/vote-confirmation` | Ballot Verification | Protected | Pre-submission audit check and irreversible submission notice |
| `/vote-success` | Official Vote Receipt | Protected | Confetti celebration, SHA-256 receipt, print and text download |
| `/results` | Election Tallies | Public / Protected | Live percentage breakdowns, turnout statistics, winner badges, and audit explorer |
| `/notifications` | Civic Bulletins | Protected | Notification center with unread filters, mark as read, and delete |
| `/profile` | Voter Profile | Protected | Editable safe profile fields (name, district, theme), voting history ledger |
| `/404` | Not Found Page | Public | Clean 404 illustration with active navigation recovery links |

---

## 🔑 Demo Credentials

For testing and demonstration, you can log in instantly using the demo credential quick-fill button on the `/login` screen, or enter:

- **Voter ID:** `VS-94820-2026`
- **Password:** `DemoVoter2026!`
- **Voting PIN:** `1234`

---

## 🛠️ Technology Stack

- **UI Framework**: React 18
- **Bundler & Tooling**: Vite 8 (ESM, Hot Module Replacement)
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 6
- **Iconography**: Lucide React
- **Celebration Animations**: Canvas Confetti
- **State Architecture**: React Context (`AuthContext`, `VotingContext`, `NotificationContext`) + `localStorage` persistence

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended; v22 supported)
- npm (v9 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/Sheema498/smart-voting-system.git
cd smart-voting-system

# Install dependencies
npm install

# Launch development server
npm run dev
```

The application will launch at `http://localhost:5173`.

### Production Build
```bash
# Compile and optimize for production
npm run build

# Preview production build locally
npm run preview
```

The optimized static assets will be output to the `dist/` directory.

---

## 🔒 Security & Privacy Notice

VoteSphere operates entirely on the client side. No external network requests, database connections, API keys, or remote telemetry are used. All election and voter records are simulated locally within your browser sandbox.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
