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
    education: "B.A. Economics & Public Policy, expected 2027",
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
    quote: "Democracy begins on campus when every voice has a seat at the table.",
    policyPositions: {
      budgeting: "Reallocate 15% of executive gala funds directly into student textbook hardship grants.",
      campusLife: "Extend weekend campus shuttle hours until 3:00 AM.",
      sustainability: "Eliminate single-use plastics across student center vendors by Spring 2027."
    }
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
    education: "B.S. Software Engineering, expected 2027",
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
    quote: "Our campus should be an engine for bold innovation and global opportunity.",
    policyPositions: {
      budgeting: "Prioritize digital infrastructure upgrades and server scalability.",
      campusLife: "Build high-speed makerspaces accessible to all majors.",
      sustainability: "Incentivize digital courseware to reduce paper syllabus waste."
    }
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
    education: "B.S. Biomedical Sciences, expected 2027",
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
    quote: "Education should be transformative, universally accessible, and equitable.",
    policyPositions: {
      budgeting: "Cap course lab fees and standardize syllabus requirements.",
      campusLife: "Provide quiet sensory rooms in every faculty building.",
      sustainability: "Expand digital loaner laptops via campus libraries."
    }
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
    education: "B.A. Psychology, expected 2027",
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
    quote: "A healthy, supported student body is the foundation of academic success.",
    policyPositions: {
      budgeting: "Dedicate 20% of student fee surpluses to crisis counseling staff.",
      campusLife: "Ensure comprehensive multi-faith prayer and quiet reflection spaces.",
      sustainability: "Introduce reusable food container rental programs."
    }
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
    education: "Ph.D. Urban Planning & Transport Systems, MIT",
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
    quote: "A vibrant city is designed for pedestrians, families, and future generations.",
    policyPositions: {
      budgeting: "Direct 30% of municipal parking revenues into neighborhood street repairs.",
      campusLife: "Extend protected separated bike lanes by 25 miles.",
      sustainability: "Achieve 50% tree canopy coverage across vulnerable heat island districts."
    }
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
    education: "B.S. Business Administration, State University",
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
    quote: "Thriving local merchants are the heartbeat of safe and connected neighborhoods.",
    policyPositions: {
      budgeting: "Cut bureaucratic commercial licensing inspection backlogs.",
      campusLife: "Create clean, safe open-air dining plazas on weekends.",
      sustainability: "Provide commercial energy-efficiency audit vouchers."
    }
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
    education: "J.D. Environmental Law, Georgetown Law",
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
    quote: "Our natural spaces belong to the public and must be stewarded with integrity.",
    policyPositions: {
      budgeting: "Protect municipal conservation trust funds from budget diversion.",
      campusLife: "Increase park ranger patrols and install emergency beacon towers.",
      sustainability: "Convert municipal mowing fleets to all-electric equipment."
    }
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
    education: "B.A. Historic Preservation & Public Administration",
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
    quote: "Investing in community recreation builds character, friendship, and strong neighborhoods.",
    policyPositions: {
      budgeting: "Prioritize neighborhood athletic field turf restoration.",
      campusLife: "Expand senior walking clubs and outdoor chess tables.",
      sustainability: "Repair stormwater drain lines beneath municipal recreation centers."
    }
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
    education: "B.S. Computer Science & Public Policy, Stanford",
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
    quote: "The future cannot simply happen to young people; we must author it ourselves.",
    policyPositions: {
      budgeting: "Cap student loan interest rates at 0%.",
      campusLife: "Expand digital public libraries with free textbook licensing.",
      sustainability: "Authorize federal green apprenticeship stipends."
    }
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
    education: "Associate of Applied Science in Renewable Energy Systems",
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
    quote: "Skill, craftsmanship, and enterprise are the foundation of economic independence.",
    policyPositions: {
      budgeting: "Equalize federal grants for vocational trades alongside 4-year degrees.",
      campusLife: "Support portable health insurance benefits for freelancers.",
      sustainability: "Equip vocational training programs with heat-pump installation kits."
    }
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
    education: "M.S. Data Ethics & Governance, Oxford",
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
    quote: "Technology should serve human dignity, not commodify our privacy.",
    policyPositions: {
      budgeting: "Ban automated biometric tracking in public high schools.",
      campusLife: "Mandate algorithmic transparency on standardized exam grading.",
      sustainability: "Tax data centers based on cooling water footprint."
    }
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
    education: "Ph.D. Computer Systems, University of Tokyo",
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
    quote: "True technological sovereignty requires verifiable, open infrastructure.",
    policyPositions: {
      budgeting: "Mandate open standards for all government software procurements.",
      campusLife: "Protect public digital communications with post-quantum cryptography.",
      sustainability: "Prioritize energy-efficient software compilation and runtime standards."
    }
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
    education: "M.S. Spatial Information Science, UC Berkeley",
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
    quote: "Open data turns passive citizens into empowered community problem solvers.",
    policyPositions: {
      budgeting: "Fund neighborhood citizen science air-sensor networks.",
      campusLife: "Publish real-time municipal public transit location streams.",
      sustainability: "Make municipal building thermal insulation datasets public."
    }
  },

  // Green Energy Referendum (cand-14, cand-15)
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
    education: "Citizen Initiative Resolution #482",
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
    quote: "Investing in renewable energy is an investment in our children's health and economic resilience.",
    policyPositions: {
      budgeting: "Allocate 15% of annual capital surplus funds to renewable municipal solar.",
      campusLife: "Provide free solar shaded pavilions in public parks.",
      sustainability: "Cut municipal carbon footprint by 40% before 2030."
    }
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
    education: "Citizen Initiative Counter-Proposition #482-B",
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
    quote: "Preserving fiscal flexibility ensures our community is ready for unforeseen emergencies.",
    policyPositions: {
      budgeting: "Preserve rainy day contingency balances at or above 20% of budget.",
      campusLife: "Avoid capital reallocation that could delay street repaving.",
      sustainability: "Rely on market incentives rather than municipal mandates."
    }
  },

  // Healthcare Advisory Board (cand-16 to cand-18)
  {
    id: "cand-16",
    name: "Dr. Maya Lin",
    position: "Patient Advocacy Delegate",
    electionId: "elec-2026-health",
    party: "Community Health Coalition",
    partyColor: "bg-rose-100 text-rose-800 border-rose-200",
    avatarBg: "bg-rose-600",
    avatarInitials: "ML",
    tagline: "Expanding community health clinics, maternal wellness support, and bilingual care navigators.",
    bio: "Dr. Maya Lin is a family physician and community health director who established four free weekend clinics for uninsured workers and immigrant families.",
    education: "M.D., Johns Hopkins School of Medicine; M.P.H., Harvard T.H. Chan",
    priorities: [
      "Establish mobile vaccination and preventive screening vans in 12 zip codes",
      "Hire 30 full-time multilingual community healthcare navigators",
      "Cap prescription copays at community health pharmacies to $10",
      "Integrate pediatric mental health services into public schools"
    ],
    experience: [
      "Medical Director, Eastside Community Health Clinic (2019-2026)",
      "Advisory Board, State Maternal Health Commission",
      "Author, Urban Primary Care Access Study"
    ],
    votes: 8940,
    quote: "Healthcare is a fundamental human right, not a privilege for the few.",
    policyPositions: {
      budgeting: "Direct 40% of health advisory grants to maternal and infant wellness.",
      campusLife: "Provide free mental health first aid workshops in neighborhood libraries.",
      sustainability: "Implement sustainable, zero-waste hospital medical supply procurement."
    }
  },
  {
    id: "cand-17",
    name: "Samuel Brody",
    position: "Preventive Care Coordinator",
    electionId: "elec-2026-health",
    party: "Wellness & Prevention First",
    partyColor: "bg-teal-100 text-teal-800 border-teal-200",
    avatarBg: "bg-teal-600",
    avatarInitials: "SB",
    tagline: "Focusing on nutrition education, chronic disease prevention, and community exercise programs.",
    bio: "Samuel Brody is a registered dietitian and public health epidemiologist who led municipal initiatives reducing juvenile diabetes rates by 18% over six years.",
    education: "M.S. Nutritional Epidemiology, Cornell University",
    priorities: [
      "Provide fresh produce voucher prescriptions for families managing diabetes",
      "Install outdoor fitness equipment in 15 public neighborhood parks",
      "Subsidize community cooking and nutrition classes across civic centers",
      "Expand free blood pressure and cholesterol screenings at grocery stores"
    ],
    experience: [
      "Coordinator, Municipal Chronic Disease Prevention Program (2020-2026)",
      "Past President, State Dietetic Association",
      "Coach, Special Olympics Unified Sports"
    ],
    votes: 6420,
    quote: "Preventing illness before it begins transforms lives and saves millions in public funds.",
    policyPositions: {
      budgeting: "Incentivize local grocers stocking fresh produce in food desert areas.",
      campusLife: "Build accessible walking paths in every senior living quadrant.",
      sustainability: "Encourage plant-forward dietary options in institutional cafeterias."
    }
  },
  {
    id: "cand-18",
    name: "Fatima Zahra",
    position: "Patient Advocacy Delegate",
    electionId: "elec-2026-health",
    party: "Seniors & Disability Rights Action",
    partyColor: "bg-purple-100 text-purple-800 border-purple-200",
    avatarBg: "bg-purple-600",
    avatarInitials: "FZ",
    tagline: "Protecting home healthcare aides, accessible medical transport, and prescription affordability.",
    bio: "Fatima Zahra is an elder care advocate and former hospital social worker who led campaigns securing subsidized paratransit rides for dialysis patients.",
    education: "Master of Social Work (MSW), Columbia University",
    priorities: [
      "Guarantee same-day accessible paratransit rides for essential medical visits",
      "Increase training stipends and living wages for in-home caregivers",
      "Create caregiver respite day centers in every borough",
      "Distribute free medical alert emergency buttons to low-income seniors"
    ],
    experience: [
      "Director, Elder Care Advocacy Project (2018-2026)",
      "Co-Chair, Governor's Taskforce on Aging with Dignity",
      "Volunteer Ombudsman, Long-Term Care Facilities"
    ],
    votes: 4460,
    quote: "Our moral standing as a society is judged by how we care for our elders and vulnerable neighbors.",
    policyPositions: {
      budgeting: "Expand Medicaid home-care reimbursement rates to prevent institutionalization.",
      campusLife: "Provide free wheelchair maintenance tune-ups at neighborhood community centers.",
      sustainability: "Encourage low-energy medical cooling systems in senior housing."
    }
  },

  // Cultural Heritage Endowment (cand-19, cand-20)
  {
    id: "cand-19",
    name: "Claire Delacroix",
    position: "Cultural Endowment Trustee",
    electionId: "elec-2026-arts",
    party: "Arts for All Municipal Coalition",
    partyColor: "bg-violet-100 text-violet-800 border-violet-200",
    avatarBg: "bg-violet-600",
    avatarInitials: "CD",
    tagline: "Free museum admission for youth, public sculpture installations, and grassroots performance grants.",
    bio: "Claire Delacroix is a museum curator and community muralist who organized 50+ neighborhood art walks and public library gallery showcases.",
    education: "M.A. Art History & Museum Studies, Courtauld Institute",
    priorities: [
      "Provide $5,000 micro-grants directly to 100 emerging local visual and performing artists",
      "Institute free admission days at all municipal museums twice monthly",
      "Convert vacant municipal storefronts into subsidized artist studio cooperatives",
      "Launch a youth creative writing and poetry fellowship in public schools"
    ],
    experience: [
      "Chief Curator, City Contemporary Art Center (2019-2025)",
      "President, Municipal Arts Alliance",
      "Trustee, Public Poetry Project"
    ],
    votes: 7210,
    quote: "Art is not a luxury; it is the living memory and creative soul of a community.",
    policyPositions: {
      budgeting: "Allocate 1% of municipal building construction budgets to public art.",
      campusLife: "Host quarterly free outdoor symphony concerts in city parks.",
      sustainability: "Require public art installations using recycled and eco-friendly materials."
    }
  },
  {
    id: "cand-20",
    name: "Arthur Pendelton",
    position: "Cultural Endowment Trustee",
    electionId: "elec-2026-arts",
    party: "Historic Landmark Preservation Society",
    partyColor: "bg-amber-100 text-amber-800 border-amber-200",
    avatarBg: "bg-amber-700",
    avatarInitials: "AP",
    tagline: "Restoring historic theater stages, acoustic concert halls, and traditional craft apprenticeships.",
    bio: "Arthur Pendelton is an architectural historian who successfully campaigned to save the historic 1928 Grand Civic Theater from commercial demolition.",
    education: "M.Arch & Historic Preservation, University of Pennsylvania",
    priorities: [
      "Complete acoustic and structural restorations of the historic Grand Civic Theater",
      "Establish public heritage walking tour trails with interactive audio guides",
      "Fund traditional woodworking, masonry, and stained-glass apprentice guilds",
      "Digitize 150 years of municipal historical photographs into an open archive"
    ],
    experience: [
      "President, Historic Landmarks Defense Council (2015-2026)",
      "Architectural Advisor, Municipal Historical Commission",
      "Author, Architecture and Heritage of the River Valley"
    ],
    votes: 5240,
    quote: "Preserving our architectural legacy grounds future generations in their authentic history.",
    policyPositions: {
      budgeting: "Establish tax credits for property owners restoring certified historic facades.",
      campusLife: "Offer free historical walking lectures for public school students.",
      sustainability: "Promote adaptive reuse of historic masonry buildings over demolition."
    }
  },

  // Transit Expansion (cand-21, cand-22)
  {
    id: "cand-21",
    name: "Measure A: Approve Northern Light Rail Surcharge",
    position: "Referendum Choice",
    electionId: "elec-2026-transit",
    party: "Rapid Transit Coalition",
    partyColor: "bg-blue-100 text-blue-800 border-blue-200",
    avatarBg: "bg-blue-700",
    avatarInitials: "YES",
    tagline: "Construct 18 miles of automated electric light rail connecting 8 new stations in northern residential suburbs.",
    bio: "Approving Measure A levies a 0.5% sales surcharge to fund the Northern Light Rail line, reducing highway traffic congestion by an estimated 25,000 cars daily.",
    education: "Regional Transit Authority Proposal 2026-A",
    priorities: [
      "Connect 8 new light rail stations with free commuter park-and-ride garages",
      "Guarantee 6-minute peak frequency with 100% automated electric train cars",
      "Create 2,200 construction and permanent transit operations union jobs",
      "Provide free transit passes for veterans, seniors, and active students"
    ],
    experience: [
      "Endorsed by Regional Trade Unions Council",
      "Reviewed by Federal Transit Administration",
      "Supported by Clean Air Transit Advocates"
    ],
    votes: 0,
    quote: "Efficient mass transit connects workers to opportunities and cuts regional emissions.",
    policyPositions: {
      budgeting: "Fund rail expansion via dedicated sales tax with independent oversight.",
      campusLife: "Provide protected bike lockers at all transit stations.",
      sustainability: "Run train systems on 100% certified wind and solar contracts."
    }
  },
  {
    id: "cand-22",
    name: "Measure A: Reject Northern Light Rail Surcharge",
    position: "Referendum Choice",
    electionId: "elec-2026-transit",
    party: "Transit Tax Accountability Panel",
    partyColor: "bg-slate-100 text-slate-800 border-slate-200",
    avatarBg: "bg-slate-700",
    avatarInitials: "NO",
    tagline: "Oppose new sales tax surcharges; optimize existing rapid bus routes without long-term municipal debt.",
    bio: "Rejecting Measure A protects consumers against sales tax increases during economic inflation, advocating instead for low-cost dedicated express bus lanes on existing roadways.",
    education: "Transit Tax Review Advisory #2026-A-NO",
    priorities: [
      "Protect working families from an estimated $180 annual average sales tax hike",
      "Invest in rapid bus lanes requiring zero rail track construction debt",
      "Prioritize roadway pothole repairs on arterial commuting avenues",
      "Audit existing transit authority overtime expenditures"
    ],
    experience: [
      "Endorsed by Small Business Taxpayers Federation",
      "Analyzed by Independent Fiscal Research Bureau",
      "Supported by Commuters for Fiscal Responsibility"
    ],
    votes: 0,
    quote: "Smart transit solutions should be cost-effective, practical, and delivered without new taxes.",
    policyPositions: {
      budgeting: "Freeze sales tax rates to maintain economic competitiveness.",
      campusLife: "Prioritize flexible bus rapid transit over rigid rail infrastructure.",
      sustainability: "Upgrade existing diesel bus fleets to hybrid without debt issuance."
    }
  },

  // Faculty Senate Election (cand-23 to cand-25)
  {
    id: "cand-23",
    name: "Prof. Sarah Sterling",
    position: "Senate Chair Candidate",
    electionId: "elec-2026-faculty",
    party: "Academic Governance Alliance",
    partyColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    avatarBg: "bg-indigo-700",
    avatarInitials: "SS",
    tagline: "Safeguarding academic freedom, equitable research overhead recovery, and faculty self-governance.",
    bio: "Prof. Sarah Sterling is Professor of Comparative Literature with 18 years of university service. She previously chaired the Faculty Grievance Committee and successfully defended tenure guidelines.",
    education: "Ph.D. Comparative Literature, Yale University",
    priorities: [
      "Protect faculty peer-review autonomy against administrative overreach",
      "Cap administrative hiring and redirect overhead into competitive research grants",
      "Establish subsidized campus child care for early-career assistant professors",
      "Ensure transparent salary equity audits across all collegiate departments"
    ],
    experience: [
      "Chair, University Grievance Committee (2021-2025)",
      "Senator, Academic Senate (2016-2026)",
      "Distinguished Faculty Teaching Award Recipient"
    ],
    votes: 1040,
    quote: "The heart of a great university is its scholars, its students, and fearless inquiry.",
    policyPositions: {
      budgeting: "Cap executive administrator salaries at 4x average faculty salaries.",
      campusLife: "Provide free on-campus daycare slots for junior faculty and researchers.",
      sustainability: "Transition university endowment away from fossil fuel holdings."
    }
  },
  {
    id: "cand-24",
    name: "Dr. Gregory Vance",
    position: "STEM Faculty Liaison",
    electionId: "elec-2026-faculty",
    party: "Research Innovation Coalition",
    partyColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
    avatarBg: "bg-cyan-700",
    avatarInitials: "GV",
    tagline: "Modernizing laboratory computing clusters, patent royalty sharing, and interdisciplinary grants.",
    bio: "Dr. Gregory Vance is Professor of Mechanical Engineering and Director of the Advanced Materials Nanotech Lab, bringing in over $12 million in competitive scientific research grants.",
    education: "Ph.D. Mechanical Engineering, Caltech",
    priorities: [
      "Upgrade campus high-performance supercomputing cluster for AI and physics simulations",
      "Increase faculty and graduate student patent royalty shares to 50%",
      "Streamline IRB and research compliance approval workflows to under 14 days",
      "Provide matching funds for collaborative multi-department research proposals"
    ],
    experience: [
      "Director, Nanotechnology Research Center (2018-2026)",
      "Co-Chair, STEM Research Ethics Committee",
      "Fellow, National Academy of Engineering"
    ],
    votes: 750,
    quote: "Empowering breakthrough research requires cutting bureaucratic delays and funding world-class tools.",
    policyPositions: {
      budgeting: "Reinvest 25% of university intellectual property licensing into lab equipment.",
      campusLife: "Build shared maker cleanrooms accessible to all science faculty.",
      sustainability: "Subsidize solar power generation on campus scientific facilities."
    }
  },
  {
    id: "cand-25",
    name: "Dr. Ananya Roy",
    position: "Senate Chair Candidate",
    electionId: "elec-2026-faculty",
    party: "Adjunct & Non-Tenure Equity Forum",
    partyColor: "bg-amber-100 text-amber-800 border-amber-200",
    avatarBg: "bg-amber-700",
    avatarInitials: "AR",
    tagline: "Multi-year contracts for teaching faculty, health coverage for adjuncts, and workload caps.",
    bio: "Dr. Ananya Roy is Associate Teaching Professor in Sociology who founded the University Teaching Faculty Union and championed long-term renewable contracts.",
    education: "Ph.D. Sociology, University of Chicago",
    priorities: [
      "Mandate minimum 3-year renewable contracts for non-tenure-track faculty",
      "Guarantee full healthcare benefits for all adjunct instructors teaching 2+ courses",
      "Cap class sizes in introductory writing and social science seminars",
      "Provide dedicated office space and professional development travel funds"
    ],
    experience: [
      "President, Teaching Faculty Caucus (2020-2026)",
      "Member, Academic Standards & Curricular Committee",
      "Faculty Advisor, First-Generation College Student Mentorship"
    ],
    votes: 400,
    quote: "A stable, dignified faculty environment is the single best predictor of student success.",
    policyPositions: {
      budgeting: "Ensure equal per-course pay parity across all colleges.",
      campusLife: "Provide private meeting rooms for adjunct office hours.",
      sustainability: "Promote digital syllabi and paperless grading platforms."
    }
  },

  // Co-op Housing Board (cand-26, cand-27)
  {
    id: "cand-26",
    name: "Miriam Ortiz",
    position: "Tenant Association Representative",
    electionId: "elec-2026-housing",
    party: "Tenant Voice Cooperative",
    partyColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    avatarBg: "bg-emerald-700",
    avatarInitials: "MO",
    tagline: "Rent increase caps, transparent maintenance reserves, and green heat-pump conversions.",
    bio: "Miriam Ortiz has lived in the Greenlands Cooperative for 22 years, serving as tenant president and managing multi-building solar heating conversions.",
    education: "B.A. Urban Studies, State University",
    priorities: [
      "Cap annual cooperative maintenance fee hikes at cost-of-living inflation",
      "Complete heat-pump heating and cooling conversions across 600 apartment units",
      "Publish full quarterly building repair receipts and vendor contracts online",
      "Establish a community tenant mediation board for neighbor dispute resolution"
    ],
    experience: [
      "President, Greenlands Tenants Association (2018-2026)",
      "Co-op Finance Committee Trustee",
      "Volunteer Neighborhood Mediator"
    ],
    votes: 8940,
    quote: "Housing is where dignity begins; cooperative ownership means sharing respect and decisions.",
    policyPositions: {
      budgeting: "Build an emergency facade repair reserve without levying special assessments.",
      campusLife: "Build a community garden and compost pavilion behind building C.",
      sustainability: "Achieve net-zero electrical energy consumption across shared hallways."
    }
  },
  {
    id: "cand-27",
    name: "Arthur Sterling-Hayes",
    position: "Finance Committee Director",
    electionId: "elec-2026-housing",
    party: "Cooperative Capital Stewardship",
    partyColor: "bg-slate-100 text-slate-800 border-slate-200",
    avatarBg: "bg-slate-700",
    avatarInitials: "AS",
    tagline: "Prudent reserve investments, roof membrane warranties, and competitive vendor bidding.",
    bio: "Arthur Sterling-Hayes is a retired certified public accountant and co-op owner who audited municipal pension funds and restructured cooperative debt obligations.",
    education: "B.S. Accounting & CPA Certification",
    priorities: [
      "Mandate three competitive sealed bids for all building contracts over $25,000",
      "Invest reserve funds in high-yield insured treasury securities earning 4.5%",
      "Complete prioritized waterproofing of subterranean garage parking decks",
      "Modernize building security access fobs and intercom systems"
    ],
    experience: [
      "Senior Partner, Accounting & Forensic Auditing (Retired)",
      "Treasurer, Cooperative Board of Directors (2016-2024)",
      "Member, Municipal Building Code Review Committee"
    ],
    votes: 5260,
    quote: "Disciplined financial management protects our property values and keeps homes affordable.",
    policyPositions: {
      budgeting: "Maintain at least $2.5 million in FDIC-insured liquid reserve deposits.",
      campusLife: "Install automated package lockers in every lobby vestibule.",
      sustainability: "Conduct thermal imaging audits before replacing older windows."
    }
  }
];
