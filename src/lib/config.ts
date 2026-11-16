export const HACKATHON_CONFIG = {
  name: "HACKSPARK 2026",
  tagline: "Build the Future with AI, Code & Open Innovation",
  description: "Join 500+ builders, designers, and visionaries for a 36-hour sprint to prototype breakthrough applications. Compete for $30,000+ in prizes, get mentorship from top tech leaders, and turn your bold ideas into reality.",
  startDate: "2026-12-05T09:00:00Z",
  endDate: "2026-12-07T18:00:00Z",
  registrationDeadline: "2026-12-01T23:59:59Z",
  location: "Hybrid (Online Global + San Francisco Hub)",
  prizePool: "$30,000+",
  stats: [
    { label: "Prize Pool", value: "$30,000+" },
    { label: "Hacking Duration", value: "36 Hours" },
    { label: "Global Hackers", value: "500+" },
    { label: "Mentors & Judges", value: "30+" },
  ],
  tracks: [
    {
      id: "ai-agents",
      name: "AI & Autonomous Agents",
      icon: "Bot",
      color: "from-blue-500 to-indigo-500",
      description: "Build autonomous multi-agent workflows, multimodal assistants, or novel LLM-powered systems solving real-world friction."
    },
    {
      id: "web3-defi",
      name: "Web3 & Decentralized Tech",
      icon: "Cpu",
      color: "from-purple-500 to-pink-500",
      description: "Innovate on smart contracts, zero-knowledge proofs, DeFi protocols, or decentralized physical infrastructure (DePIN)."
    },
    {
      id: "climate-tech",
      name: "Climate & Sustainability",
      icon: "Leaf",
      color: "from-emerald-500 to-teal-500",
      description: "Tackle carbon footprints, circular economy, renewable energy allocation, or green supply chain transparency."
    },
    {
      id: "health-tech",
      name: "HealthTech & BioInnovation",
      icon: "Activity",
      color: "from-rose-500 to-orange-500",
      description: "Empower patient outcomes, remote diagnostics, mental well-being, or biomedical data discovery."
    },
    {
      id: "open-innovation",
      name: "Open Innovation & Developer Tools",
      icon: "Sparkles",
      color: "from-amber-500 to-yellow-500",
      description: "Anything out-of-the-box! Developer productivity tools, games, creative hardware hacks, or quirky utilities."
    }
  ],
  prizes: [
    {
      rank: "1st Place",
      title: "Grand Champion",
      amount: "$12,000",
      perks: ["Direct VC pitch meeting", "Cloud credits ($10,000)", "Winner trophies & swag boxes", "Fast-track accelerator interview"]
    },
    {
      rank: "2nd Place",
      title: "First Runner-Up",
      amount: "$7,000",
      perks: ["Cloud credits ($5,000)", "Mentorship package", "Winner trophies & swag"]
    },
    {
      rank: "3rd Place",
      title: "Second Runner-Up",
      amount: "$4,000",
      perks: ["Cloud credits ($2,500)", "Winner medals & swag"]
    },
    {
      rank: "Category Awards",
      title: "5x Track Winners",
      amount: "$1,000 each",
      perks: ["Dedicated track trophy", "Sponsor sponsor swag", "Spotlight feature"]
    },
    {
      rank: "Special Awards",
      title: "Best Beginner Hack & Best UI",
      amount: "$1,000 each",
      perks: ["Recognition certificate", "Hardware gadget kits", "Developer gear"]
    }
  ],
  schedule: [
    {
      time: "Nov 15, 2026",
      title: "Registrations Open",
      description: "Sign up as a solo hacker or team of up to 4 members."
    },
    {
      time: "Dec 01, 2026",
      title: "Registration Closes",
      description: "Final team confirmations and team matchmaking assistance."
    },
    {
      time: "Dec 05, 09:00 AM",
      title: "Opening Ceremony & Hacking Begins",
      description: "Keynote, challenge reveals, and 36-hour countdown starts."
    },
    {
      time: "Dec 06, 02:00 PM",
      title: "Mentor Checkpoints & Workshops",
      description: "Get 1-on-1 code reviews and pitch feedback from industry veterans."
    },
    {
      time: "Dec 06, 09:00 PM",
      title: "Hacking Deadline & Submissions",
      description: "Push repository links, demo video, and project summaries to Devpost."
    },
    {
      time: "Dec 07, 04:00 PM",
      title: "Live Demo & Awards Ceremony",
      description: "Top 10 finalists present live on stage/stream. Winners announced!"
    }
  ],
  faqs: [
    {
      q: "Who can participate?",
      a: "Anyone with a passion for building! Students, professionals, designers, and self-taught developers of all skill levels are welcome."
    },
    {
      q: "Is there any registration fee?",
      a: "No! HACKSPARK 2026 is 100% free for all accepted participants, including meals/swag (in-person) and digital credits/mentorship (virtual)."
    },
    {
      q: "Can I participate alone or do I need a team?",
      a: "Both! You can register as a solo hacker or with a team of up to 4 people. We will also host a team formation session before the event if you're looking for teammates."
    },
    {
      q: "What if I've never attended a hackathon before?",
      a: "First-timers are especially welcome! We have dedicated Beginner Mentors, beginner-friendly workshops, and a dedicated 'Best Beginner Hack' prize."
    },
    {
      q: "Can I work on an existing project?",
      a: "All code must be written during the 36-hour hackathon period. You may use open-source libraries, APIs, and pre-existing design systems, but the core implementation must be fresh."
    },
    {
      q: "How will projects be judged?",
      a: "Projects are evaluated on 4 criteria: Innovation & Creativity (25%), Technical Execution (25%), Practical Impact & Usability (25%), and Presentation (25%)."
    }
  ],
  sponsors: [
    { name: "Vercel", tier: "Title Partner" },
    { name: "Google Cloud", tier: "Cloud Partner" },
    { name: "GitHub", tier: "Developer Partner" },
    { name: "Supabase", tier: "Database Partner" },
    { name: "OpenAI", tier: "AI Partner" }
  ]
};
