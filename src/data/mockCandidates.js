export const mockCandidates = [
  // Student Council Election (cand-1 to cand-4)
  {
    id: "cand-1",
    name: "Aria Sterling",
    position: "Student Body President Candidate",
    electionId: "elec-2026-sc",
    party: "Campus Progress Alliance",
    partyColor: "bg-blue-100 text-blue-800 border-blue-200",
    avatarBg: "bg-blue-600",
    avatarInitials: "AS",
    tagline: "Empowering every student voice with affordable campus dining, transparent governance, and 24/7 library amenities.",
    bio: "Aria Sterling is a senior studying Economics and Public Policy. Over the past three years, Aria served as Chair of the Student Advisory Panel, negotiating subsidized transit passes and introducing free menstrual hygiene access across campus dormitories.",
    priorities: [
      "Expand 24/7 quiet study zones with high-speed power charging hubs",
      "Introduce 35% student discount vouchers for campus dining halls",
      "Launch student mental health peer-support drop-in clinics",
      "Publish quarterly student union expenditure reports publicly"
    ],
    experience: [
      "Chair, Campus Student Advisory Panel (2025-2026)",
      "Student Delegate to Academic Senate (2024-2025)",
      "Co-Founder, University Food Security Network"
    ],
    votes: 3840,
    quote: "Democracy begins on campus when every voice has a seat at the table."
  },
  {
    id: "cand-2",
    name: "Marcus Chen",
    position: "Student Body President Candidate",
    electionId: "elec-2026-sc",
    party: "Innovate Campus Coalition",
    partyColor: "bg-purple-100 text-purple-800 border-purple-200",
    avatarBg: "bg-purple-600",
    avatarInitials: "MC",
    tagline: "Driving technological innovation, student venture funding, and industry career accelerators.",
    bio: "Marcus Chen is a fourth-year Software Engineering major who led the university's annual hackathon and helped establish the Student Tech Incubator, securing $50,000 in student micro-grants.",
    priorities: [
      "Create a student innovation incubator fund with direct alumni mentorship",
      "Modernize course registration systems to prevent server crashes",
      "Partner with 100+ national tech and research employers for co-op internships",
      "Establish sustainable campus e-waste recycling depots"
    ],
    experience: [
      "Director, University Annual Hackathon (2025)",
      "Treasurer, Engineering Student Society (2024-2025)",
      "Undergraduate Research Assistant, Robotics Lab"
    ],
    votes: 3210,
    quote: "Our campus should be an engine for bold innovation and global opportunity."
  },
  {
    id: "cand-3",
    name: "Zainab Al-Mansoor",
    position: "Academic Affairs Officer",
    electionId: "elec-2026-sc",
    party: "Independent Student Voice",
    partyColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    avatarBg: "bg-emerald-600",
    avatarInitials: "ZA",
    tagline: "Advocating for fair grading standards, accessible academic textbooks, and flexible lecture capture.",
    bio: "Zainab is a third-year Biomedical Sciences student committed to academic equity. She successfully petitioned for the university-wide open educational resource textbook initiative, saving students an estimated $120,000.",
    priorities: [
      "Mandate recorded lectures across all foundational STEM lecture courses",
      "Provide zero-cost open textbook alternatives in 80% of core syllabi",
      "Implement transparent academic appeal guidelines and ombudsperson support",
      "Expand undergraduate research grant allocations by 25%"
    ],
    experience: [
      "Department Student Representative, Life Sciences (2024-2026)",
      "Editor, University Undergraduate Science Journal",
      "Peer Academic Tutor"
    ],
    votes: 1850,
    quote: "Education should be transformative, universally accessible, and equitable."
  },
  {
    id: "cand-4",
    name: "Devon Reynolds",
    position: "Student Welfare Director",
    electionId: "elec-2026-sc",
    party: "Wellbeing & Inclusion Action",
    partyColor: "bg-amber-100 text-amber-800 border-amber-200",
    avatarBg: "bg-amber-600",
    avatarInitials: "DR",
    tagline: "Fostering inclusive campus culture, accessible disability accommodations, and mental wellbeing resources.",
    bio: "Devon Reynolds is a Psychology major and accessibility advocate who led the university disability accessibility audit and pioneered quiet sensory spaces inside the student union.",
    priorities: [
      "Cut mental health counseling wait times down to under 5 business days",
      "Wheelchair-accessible automated door retrofits across older lecture halls",
      "Halal, Kosher, and vegan dietary labeling standardization across campus cafeterias",
      "Subsidized emergency student housing assistance fund"
    ],
    experience: [
      "Coordinator, Student Accessibility Working Group (2025)",
      "Resident Assistant, West Campus Residential Village",
      "Volunteer Crisis Hotline Counselor"
    ],
    votes: 940,
    quote: "A healthy, supported student body is the foundation of academic success."
  },

  // Metropolitan Civic Leadership Election (cand-5 to cand-8)
  {
    id: "cand-5",
    name: "Dr. Evelyn Vance",
    position: "Metropolitan Commissioner Candidate",
    electionId: "elec-2026-civic",
    party: "Civic Integrity & Transit Coalition",
    partyColor: "bg-teal-100 text-teal-800 border-teal-200",
    avatarBg: "bg-teal-600",
    avatarInitials: "EV",
    tagline: "Clean rapid transit, transparent city budgets, and green neighborhood parks for every borough.",
    bio: "Dr. Evelyn Vance holds a PhD in Urban Planning and has 14 years of experience working with regional transit authorities and clean air coalitions. She advocates for zero-emission bus corridors and data-driven infrastructure investments.",
    priorities: [
      "Deploy 45 new zero-emission electric buses connecting underserved outer districts",
      "Protect 120 acres of urban green canopy and establish new community rain gardens",
      "Implement real-time open municipal ledger showing every contract above $10,000",
      "Cap annual municipal property tax hikes for senior residents on fixed incomes"
    ],
    experience: [
      "Senior Urban Policy Advisor, Regional Transit Council (2018-2025)",
      "Co-Chair, Clean Rivers Urban Watershed Committee",
      "Adjunct Lecturer in Urban Ecology"
    ],
    votes: 11420,
    quote: "A vibrant city is designed for pedestrians, families, and future generations."
  },
  {
    id: "cand-6",
    name: "Julian Torres",
    position: "Metropolitan Commissioner Candidate",
    electionId: "elec-2026-civic",
    party: "Neighborhood Economic Growth Party",
    partyColor: "bg-sky-100 text-sky-800 border-sky-200",
    avatarBg: "bg-sky-600",
    avatarInitials: "JT",
    tagline: "Empowering small businesses, modernizing street lighting, and revitalizing historic commercial corridors.",
    bio: "Julian Torres is a lifelong community resident, neighborhood grocer, and president of the Metro Small Business Alliance. He champions regulatory streamlining for artisans and neighborhood market revitalization.",
    priorities: [
      "Fast-track commercial business permits to under 14 days for local startups",
      "Install solar LED smart street lights in 30 high-pedestrian corridors",
      "Provide zero-interest micro-loans for storefront repairs and digital commerce upgrades",
      "Expand weekend open-air farmers markets across public plazas"
    ],
    experience: [
      "President, Metro Small Business Alliance (2021-2026)",
      "District 4 Community Board Member (2016-2022)",
      "Rotary Club Community Service Chair"
    ],
    votes: 9320,
    quote: "Thriving local merchants are the heartbeat of safe and connected neighborhoods."
  },
  {
    id: "cand-7",
    name: "Soraya Patel",
    position: "Parks & Sustainability Chair",
    electionId: "elec-2026-civic",
    party: "Green Horizon Movement",
    partyColor: "bg-green-100 text-green-800 border-green-200",
    avatarBg: "bg-green-600",
    avatarInitials: "SP",
    tagline: "Preserving wetlands, expanding children's play parks, and achieving carbon-neutral civic facilities.",
    bio: "Soraya Patel is an environmental lawyer who has successfully represented community groups in defending public parklands against commercial overdevelopment.",
    priorities: [
      "Create 5 new accessible all-abilities playgrounds in residential districts",
      "Mandate solar canopies over all municipal parking structures",
      "Establish neighborhood composting and food waste drop-off sites",
      "Plant 25,000 native shade trees along public walkways by 2028"
    ],
    experience: [
      "Environmental Attorney, Public Lands Trust (2017-2026)",
      "Member, Municipal Climate Adaptation Working Group",
      "Volunteer Wilderness Trail Guide"
    ],
    votes: 5240,
    quote: "Our natural spaces belong to the public and must be stewarded with integrity."
  },
  {
    id: "cand-8",
    name: "Kenneth Blackwell",
    position: "Parks & Sustainability Chair",
    electionId: "elec-2026-civic",
    party: "Heritage & Community Trust",
    partyColor: "bg-slate-100 text-slate-800 border-slate-200",
    avatarBg: "bg-slate-700",
    avatarInitials: "KB",
    tagline: "Preserving historic civic architecture while improving neighborhood recreational field maintenance.",
    bio: "Kenneth Blackwell has served 20 years in community recreation management and historic preservation, overseeing restorations of historic pavilions and youth sports fields.",
    priorities: [
      "Refurbish community youth soccer and baseball diamonds across all 7 districts",
      "Preserve historic clock towers, library facades, and memorial bridges",
      "Upgrade security call boxes and public emergency assistance poles in major parks",
      "Establish free weekend sports clinics for elementary school youth"
    ],
    experience: [
      "Community Parks Administrator (2010-2025)",
      "Youth Sports League Volunteer Director",
      "City Historical Landmark Society Trustee"
    ],
    votes: 2430,
    quote: "Investing in community recreation builds character, friendship, and strong neighborhoods."
  },

  // National Youth Policy Advisory Council (cand-9 to cand-11)
  {
    id: "cand-9",
    name: "Kavya Sharma",
    position: "National Youth Representative",
    electionId: "elec-2026-youth",
    party: "Future Forward Youth Collective",
    partyColor: "bg-rose-100 text-rose-800 border-rose-200",
    avatarBg: "bg-rose-600",
    avatarInitials: "KS",
    tagline: "Bridging the digital divide, expanding green STEM apprenticeships, and advocating for affordable starter housing.",
    bio: "Kavya Sharma is a 22-year-old grassroots organizer who represented youth delegations at international environmental conventions. She founded a coding fellowship that trained over 1,500 rural students.",
    priorities: [
      "Guarantee 100,000 paid national green technology apprenticeships",
      "Abolish interest charges on federal public education loans",
      "Provide free broadband internet subsidies for low-income student households",
      "Establish statutory youth seats on regional development commissions"
    ],
    experience: [
      "Founder, CodeBridge Youth Initiative",
      "Youth Ambassador, International Climate Taskforce (2025)",
      "Debate Captain & National Policy Finalist"
    ],
    votes: 18450,
    quote: "The future cannot simply happen to young people; we must author it ourselves."
  },
  {
    id: "cand-10",
    name: "Liam O'Connor",
    position: "National Youth Representative",
    electionId: "elec-2026-youth",
    party: "NextGen Enterprise Guild",
    partyColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    avatarBg: "bg-indigo-600",
    avatarInitials: "LO",
    tagline: "Empowering young entrepreneurs, creative freelancers, and vocational trades apprentices.",
    bio: "Liam O'Connor is a 24-year-old renewable energy technician and vocational training advocate who founded a regional coop supporting young electricians, plumbers, and technicians.",
    priorities: [
      "Provide tax credits for young tradespeople and vocational school graduates",
      "Create portable healthcare benefits for freelance creative and gig economy workers",
      "Fund makerspaces and shared tool libraries in 50 mid-sized communities",
      "Establish low-interest equipment purchase loans for young craftspeople"
    ],
    experience: [
      "Lead Technician, SunGrid Cooperative",
      "Youth Vocational Training Council Delegate",
      "Apprentice Guild Mentor"
    ],
    votes: 14120,
    quote: "Skill, craftsmanship, and enterprise are the foundation of economic independence."
  },
  {
    id: "cand-11",
    name: "Amara Ndiaye",
    position: "Innovation Spokesperson",
    electionId: "elec-2026-youth",
    party: "Digital Rights & Equity Caucus",
    partyColor: "bg-violet-100 text-violet-800 border-violet-200",
    avatarBg: "bg-violet-600",
    avatarInitials: "AN",
    tagline: "Safeguarding algorithmic fairness, data privacy for minors, and ethical AI development guidelines.",
    bio: "Amara is a 23-year-old AI ethics researcher whose published works on algorithmic bias in admissions testing received international recognition.",
    priorities: [
      "Establish digital bill of rights protecting student biometric and learning data",
      "Require ethical bias audits on automated government decision systems",
      "Promote open-source educational software in primary and secondary schools",
      "Launch national digital media literacy curriculum to counter disinformation"
    ],
    experience: [
      "Fellow, Center for Digital Justice & Ethics",
      "Contributor, Open Algorithm Auditing Framework",
      "Youth Advisory Board, Internet Safety Watch"
    ],
    votes: 6930,
    quote: "Technology should serve human dignity, not commodify our privacy."
  },

  // Tech & Innovation Board (cand-12, cand-13)
  {
    id: "cand-12",
    name: "Dr. Hiroshi Tanaka",
    position: "Steering Council Lead",
    electionId: "elec-2026-tech",
    party: "Open Core Governance Alliance",
    partyColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
    avatarBg: "bg-cyan-600",
    avatarInitials: "HT",
    tagline: "Fostering interoperable open-source digital infrastructure and decentralized data sovereignty.",
    bio: "Dr. Hiroshi Tanaka is an open-source maintainer with over two decades contributing to cryptography and distributed networking standards.",
    priorities: [
      "Fund core open-source infrastructure maintainers with community grants",
      "Ensure open API interoperability across civic tech services",
      "Promote end-to-end verifiable audit logs for public record systems"
    ],
    experience: [
      "Open Source Foundation Core Trustee",
      "Author of 4 international networking RFCs",
      "Distinguished Systems Architect"
    ],
    votes: 0,
    quote: "True technological sovereignty requires verifiable, open infrastructure."
  },
  {
    id: "cand-13",
    name: "Elena Vasquez",
    position: "Open Data Architect",
    electionId: "elec-2026-tech",
    party: "Civic Tech Collective",
    partyColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    avatarBg: "bg-emerald-600",
    avatarInitials: "EV",
    tagline: "Unlocking public data for citizen science, transit tracking, and climate monitoring.",
    bio: "Elena Vasquez has spearheaded civic hacking groups and developed open data dashboards used by hundreds of thousands of daily transit riders.",
    priorities: [
      "Publish 100% of non-sensitive municipal operational data in open formats",
      "Build citizen-accessible dashboards for air quality and clean water metrics",
      "Establish annual civic hackathons addressing local community challenges"
    ],
    experience: [
      "Founder, Civic City Open Data Project",
      "Former Chief Data Officer, Urban Mobility Lab",
      "Open Knowledge Fellow"
    ],
    votes: 0,
    quote: "Open data turns passive citizens into empowered community problem solvers."
  },

  // Green Referendum (cand-14, cand-15)
  {
    id: "cand-14",
    name: "Option YES: Adopt Green Energy Solar & Transit Transition",
    position: "Referendum Proposition 1",
    electionId: "elec-2026-green",
    party: "Clean Future Initiative",
    partyColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    avatarBg: "bg-emerald-700",
    avatarInitials: "YES",
    tagline: "Approve 15% infrastructure allocation for localized rooftop solar grids and zero-emission municipal transit fleets.",
    bio: "Adopting Proposition 1 directs municipal capital funds towards clean solar power on schools, libraries, and public transit facilities, reducing greenhouse emissions by 40% by 2030.",
    priorities: [
      "Equip 45 public schools with clean solar arrays reducing utility overhead",
      "Transition 100% of municipal bus fleets to electric by 2029",
      "Create 650 local union jobs in clean energy installation",
      "Save estimated $14 million in municipal fuel costs over 10 years"
    ],
    experience: [
      "Endorsed by 42 Neighborhood Civic Associations",
      "Reviewed by Municipal Clean Energy Advisory Board",
      "Supported by Regional Public Health Council"
    ],
    votes: 27480,
    quote: "Investing in renewable energy is an investment in our children's health and economic resilience."
  },
  {
    id: "cand-15",
    name: "Option NO: Maintain Current Municipal Capital Reserve Allocation",
    position: "Referendum Proposition 1",
    electionId: "elec-2026-green",
    party: "Fiscal Prudence Committee",
    partyColor: "bg-slate-100 text-slate-800 border-slate-200",
    avatarBg: "bg-slate-600",
    avatarInitials: "NO",
    tagline: "Retain existing emergency capital reserves for unforeseen roadway repairs and water main updates.",
    bio: "Maintaining the status quo preserves emergency reserve buffers for aging water pipes, bridge maintenance, and emergency response reserves without committing dedicated long-term allocations.",
    priorities: [
      "Protect municipal emergency contingency reserves against economic downturns",
      "Prioritize essential subterranean water pipe and sewer repairs",
      "Allow gradual, non-mandated fleet upgrades as existing vehicles reach end-of-life"
    ],
    experience: [
      "Endorsed by Taxpayers Oversight Council",
      "Reviewed by Municipal Budget Analysts",
      "Supported by Local Infrastructure Coalition"
    ],
    votes: 14670,
    quote: "Preserving fiscal flexibility ensures our community is ready for unforeseen emergencies."
  }
];
