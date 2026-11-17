import { CompetitionInfo } from '@/types';

export const EVENT_CONFIG = {
  name: "El Nino Synapse",
  tagline: "Unleash Innovation, Creativity & Engineering",
  dates: "2 & 3 December",
  location: "College Campus / Auditorium & Tech Labs",
  description: "Welcome to El Nino Synapse — the premier inter-college tech & creativity fest on 2 & 3 December featuring 3 flagship competitions: Hackathon, Ideathon, and Reel Making, alongside a grand on-campus Science Exhibition showcase! Showcase your innovations and take home exciting prizes and trophies!",
  upiDetails: {
    upiId: "elnino.synapse@okaxis",
    payeeName: "El Nino Synapse Fest",
    phone: "+91 95185 62840",
    note: "Please mention Team Name in UPI payment note"
  },
  coordinators: [
    {
      name: "Yash Jadhav",
      phone: "95185 62840",
      rawPhone: "+919518562840",
      role: "Lead Event Coordinator"
    },
    {
      name: "Arpit Dambhare",
      phone: "94219 34932",
      rawPhone: "+919421934932",
      role: "Technical Coordinator"
    },
    {
      name: "Yash Yadav",
      phone: "82754 67373",
      rawPhone: "+918275467373",
      role: "Registration & Queries Coordinator"
    }
  ],
  competitions: [
    {
      id: "hackathon",
      name: "Hackathon",
      tagline: "6 Hours Hackathon • Problem Statement on Time",
      fee: 300,
      feeLabel: "₹300 / team",
      minMembers: 2,
      maxMembers: 4,
      icon: "Terminal",
      accentColor: "from-blue-600 to-indigo-600",
      badge: "6-Hour Coding Sprint",
      isRegisterable: true,
      rules: [
        "Problem statement will be revealed ON TIME at the kickoff of the hackathon",
        "Duration: Strictly 6 Hours of non-stop building and coding",
        "Team size: 2 to 4 members per team",
        "All code must be written during the event duration",
        "Bring your own laptops, chargers, and extension cords",
        "Judging based on originality, technical complexity, completion, and live demo"
      ],
      description: "A fast-paced 6-hour hackathon where the problem statement is unveiled live on the spot. Build a functional prototype under the clock and pitch to industry judges!"
    },
    {
      id: "ideathon",
      name: "Ideathon",
      tagline: "5-7 Min Presentation • 7-8 Slides Limit • 3 Members",
      fee: 200,
      feeLabel: "₹200 / team",
      minMembers: 3,
      maxMembers: 3,
      icon: "Lightbulb",
      accentColor: "from-purple-600 to-pink-600",
      badge: "3 Members Team",
      isRegisterable: true,
      rules: [
        "Team size: Strictly 3 members total",
        "Presentation duration: 5 to 7 minutes per team",
        "Slide limit: Strictly 7 to 8 slides in presentation deck",
        "Followed by 2 to 3 minutes of Jury Q&A",
        "Focus on problem clarity, proposed solution, market feasibility & impact",
        "Submit presentation deck in PDF / PPT format prior to the round"
      ],
      description: "Pitch your revolutionary startup or tech idea in front of esteemed panelists. Hone your pitch, respect the 7-8 slides limit, and captivate the jury within 7 minutes!"
    },
    {
      id: "reel-making",
      name: "Reel Making Competition",
      tagline: "60 Seconds Reel • 2 Members Total",
      fee: 150,
      feeLabel: "₹150 / entry",
      minMembers: 2,
      maxMembers: 2,
      icon: "Video",
      accentColor: "from-rose-600 to-amber-600",
      badge: "2 Members Total",
      isRegisterable: true,
      rules: [
        "Team size: 2 members total",
        "Duration: Strictly up to 60 seconds (Reel format 9:16)",
        "Must be original content shot during the fest or adhering to the theme",
        "Judged on creativity, cinematography, editing pacing, audio sync, and storytelling",
        "No plagiarized footage or copyrighted watermark templates allowed"
      ],
      description: "Show off your cinematic flair, visual storytelling, and viral video creation skills. 60 seconds to impress the judges and grab the audience's attention!"
    },
    {
      id: "science-exhibition",
      name: "Science Exhibition",
      tagline: "Working Models • Live Demonstrations • Scientific Innovation",
      fee: 0,
      feeLabel: "Open Showcase",
      minMembers: 1,
      maxMembers: 3,
      icon: "Atom",
      accentColor: "from-emerald-600 to-teal-600",
      badge: "Campus Showcase (2 & 3 Dec)",
      isRegisterable: false,
      scheduleInfo: "2 & 3 December • 10:30 AM onwards • Exhibition Hall",
      rules: [
        "Held live on campus in the Exhibition Hall across both days (2 & 3 December)",
        "Showcases working physical models, robotics prototypes, automation, and scientific experiments",
        "Open to all college students, faculty, and visiting guests — no online portal registration fee",
        "Setup tables, power supply, and display space provided on campus",
        "Live demonstrations and Q&A with visiting faculty juries and student delegates",
        "Outstanding scientific models will be recognized with Special Jury Honors at the Grand Valedictory"
      ],
      description: "Demonstrating working science models, sustainable technology hardware, and interactive physics & robotics prototypes. Experience live innovation and scientific curiosity directly on campus!"
    }
  ] as CompetitionInfo[],
  schedule: [
    {
      day: "Day 1 — 2 December",
      events: [
        { time: "09:00 AM", title: "Inauguration & Welcome Address", venue: "Main Auditorium" },
        { time: "10:00 AM", title: "Hackathon Problem Statement Reveal & Kickoff (6 Hours)", venue: "Computing Labs" },
        { time: "10:30 AM", title: "Science Exhibition Setup & Public Display", venue: "Exhibition Hall" },
        { time: "04:00 PM", title: "Hackathon Code Freeze & Final Project Demos", venue: "Lab 1 & 2" },
        { time: "05:00 PM", title: "Reel Making Competition: Submissions Deadline", venue: "Media Desk" }
      ]
    },
    {
      day: "Day 2 — 3 December",
      events: [
        { time: "09:30 AM", title: "Ideathon Round: 5-7 Min Presentations", venue: "Seminar Hall" },
        { time: "11:00 AM", title: "Science Exhibition Final Jury Evaluation", venue: "Exhibition Hall" },
        { time: "02:00 PM", title: "Reel Screening & Audience Choice Voting", venue: "Auditorium" },
        { time: "04:30 PM", title: "Grand Valedictory & Awards Distribution", venue: "Main Stage" }
      ]
    }
  ],
  faqs: [
    {
      q: "Can a student participate in multiple competitions?",
      a: "Yes! Students can register online for Hackathon, Ideathon, and Reel Making. Science Exhibition is held live as an open campus showcase across both days (2 & 3 Dec) in the Exhibition Hall!"
    },
    {
      q: "Do I need to register online for the Science Exhibition?",
      a: "No advance online registration is needed for the Science Exhibition! It is held directly in the campus Exhibition Hall on 2 & 3 December with working models and live demos. For exhibit table space allocations, contact coordinator Arpit Dambhare (94219 34932) or Yash Jadhav (95185 62840)."
    },
    {
      q: "How do we pay the registration fee?",
      a: "You can pay via any UPI app (GPay, PhonePe, Paytm) using the official QR code or UPI ID provided on the registration form. Upload your payment screenshot and enter the 12-digit UTR/Transaction ID during registration."
    },
    {
      q: "Is cross-college or cross-branch team formation allowed?",
      a: "Yes! Students from different branches, years, or colleges can form a team together."
    },
    {
      q: "Who can I contact for queries or registration assistance?",
      a: "You can directly call our Student Coordinators: Yash Jadhav (95185 62840), Arpit Dambhare (94219 34932), or Yash Yadav (82754 67373) anytime!"
    },
    {
      q: "When will the Hackathon problem statement be released?",
      a: "The problem statement will be announced live on time at the opening of the 6-hour hackathon sprint on 2 December."
    },
    {
      q: "Will certificates be provided to all participants?",
      a: "Yes! Every registered student who participates will receive an official Certificate of Participation from El Nino Synapse, and winners will receive cash prizes, trophies, and Certificates of Excellence."
    }
  ]
};
