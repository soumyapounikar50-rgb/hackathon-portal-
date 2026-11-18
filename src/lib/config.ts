import { CompetitionInfo } from '@/types';

export const EVENT_CONFIG = {
  name: "El Nino Synapse",
  tagline: "Unleash Innovation, Creativity & Engineering",
  dates: "2 & 3 December",
  location: "College Campus / Auditorium & Tech Labs",
  description: "Welcome to El Nino Synapse — the premier inter-college tech & creativity fest on 2 & 3 December featuring 3 flagship competitions: Hackathon, Ideathon, and Reel Making. Showcase your innovation, technical skills, and creativity to take home exciting cash prizes, trophies, and certificates!",
  upiDetails: {
    upiId: "",
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
      tagline: "60 Seconds Reel • 2 Days Event Coverage • 2 Members Total",
      fee: 150,
      feeLabel: "₹150 / entry",
      minMembers: 2,
      maxMembers: 2,
      icon: "Video",
      accentColor: "from-rose-600 via-pink-600 to-amber-500",
      badge: "2 Days • 2 Members",
      timingDetails: {
        reporting: "9:00 AM to 9:30 AM",
        startsAt: "10:00 AM",
        briefing: "All instructions and regulations regarding Reel Making Competition will be given upon reporting.",
        departure: "Departure time as per on-time given event schedule"
      },
      importantNotes: [
        "This will be conducted 2 day",
        "In the event hours",
        "Event covering in the event time",
        "Event Awareness of the program",
        "El:Nino Awareness reels",
        "Carrying your own laptops, cameras for shoot"
      ],
      rules: [
        "Reporting Time: 9:00 AM to 9:30 AM | Starts strictly at 10:00 AM",
        "All instructions are given and regulations regarding Reel Making Competition upon reporting",
        "Departure Time as per on-time given schedule",
        "Conducted across 2 days during official event hours",
        "Event covering strictly in the event time",
        "Focus Themes: Event Awareness of the program & El:Nino Awareness reels",
        "Mandatory: Carrying your own laptops, cameras for shoot and editing",
        "Duration: Up to 60 seconds (9:16 vertical video reel format)",
        "Team size: Exactly 2 members total (₹150 per team)"
      ],
      description: "Showcase your cinematic flair and creative storytelling across both 2 days of El Nino Synapse! Report between 9:00 AM - 9:30 AM (competition starts at 10:00 AM). Capture live fest moments during event hours, produce Event Awareness & El:Nino Awareness reels, and bring your own cameras and laptops."
    }
  ] as CompetitionInfo[],
  schedule: [
    {
      day: "Day 1 — 2 December",
      events: [
        { time: "09:00 AM - 09:30 AM", title: "Reel Making: Reporting & Regulations Briefing", venue: "Media Desk / Auditorium" },
        { time: "09:00 AM", title: "Fest Inauguration & Welcome Address", venue: "Main Auditorium" },
        { time: "10:00 AM", title: "Reel Making: Competition Starts (Day 1 Live Event Shoot)", venue: "Campus Arenas (In Event Hours)" },
        { time: "10:00 AM", title: "Hackathon Problem Statement Reveal & Kickoff (6 Hours)", venue: "Computing Labs" },
        { time: "01:00 PM", title: "Mentorship & Mid-Evaluation Round", venue: "Computing Labs" },
        { time: "04:00 PM", title: "Hackathon Code Freeze & Final Project Demos", venue: "Lab 1 & 2" },
        { time: "On-Time Schedule", title: "Day 1 Concludes (Departure as per given schedule)", venue: "Campus Grounds" }
      ]
    },
    {
      day: "Day 2 — 3 December",
      events: [
        { time: "09:00 AM - 09:30 AM", title: "Reel Making: Day 2 Reporting & Continued Shoot", venue: "Media Center" },
        { time: "09:30 AM", title: "Ideathon Round: 5-7 Min Presentations", venue: "Seminar Hall" },
        { time: "10:00 AM", title: "Reel Making: Editing on Own Laptops & Event Coverage", venue: "Media Lab" },
        { time: "12:00 PM", title: "Ideathon Final Jury Q&A", venue: "Seminar Hall" },
        { time: "02:00 PM", title: "Reel Screening & Audience Choice Voting", venue: "Auditorium" },
        { time: "04:30 PM", title: "Grand Valedictory & Awards Distribution", venue: "Main Stage" },
        { time: "On-Time Schedule", title: "Departure as per on-time given schedule", venue: "Campus Exit" }
      ]
    }
  ],
  faqs: [
    {
      q: "What are the reporting timings and guidelines for the Reel Making Competition?",
      a: "Reporting Time is 9:00 AM to 9:30 AM, and the competition starts promptly at 10:00 AM. All instructions and regulations are given upon reporting. It will be conducted across 2 days during official event hours. Participants must cover the event in the event time, focus on Event Awareness and El:Nino Awareness reels, and must carry their own laptops and cameras for shooting and editing. Departure time is as per the on-time given schedule."
    },
    {
      q: "Can a student participate in multiple competitions?",
      a: "Yes! As long as the schedules do not overlap (e.g. Hackathon on Day 1 and Ideathon on Day 2), students may register for more than one competition."
    },
    {
      q: "How do we pay the registration fee?",
      a: "You can pay via any UPI app (GPay, PhonePe, Paytm) by scanning the official QR code provided on the registration form. Upload your payment screenshot and enter the 12-digit UTR/Transaction ID during registration."
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
