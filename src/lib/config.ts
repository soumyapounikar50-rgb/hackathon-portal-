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
      tagline: "Day 2 (3 Dec) • Statement at 10 AM Sharp • 2-4 Members",
      fee: 300,
      feeLabel: "₹300 / team",
      minMembers: 2,
      maxMembers: 4,
      icon: "Terminal",
      accentColor: "from-blue-600 via-teal-500 to-indigo-600",
      badge: "Day 2 • 3 Dec",
      timingDetails: {
        reporting: "9:00 AM to 9:30 AM",
        startsAt: "10:00 AM Sharp (Statement Released)",
        briefing: "Judges round on desk: 3:30 PM | Evaluation at 4:00 PM",
        departure: "Prize distribution and departure till 5:00 to 5:30 PM"
      },
      importantNotes: [
        "The problem will be released on time",
        "Carry your own things as per need ( Laptop, Mouse , Extension, etc )",
        "PPT of the prototype and its working, basics, motive , objective, conclusion all summary of it in 7 to 8 slides",
        "Get your GitHub account ready to connect",
        "Refreshment will be provided on the venue by the staff of the event"
      ],
      rules: [
        "Event Day: Day 2 — 3rd of December",
        "Reporting Time: 9:00 AM to 9:30 AM",
        "Hackathon statement released at 10:00 AM sharp | Starts at 10:00 AM",
        "Judges round on desk: 3:30 PM | Evaluation at 4:00 PM",
        "Prize distribution and departure till 5:00 to 5:30 PM",
        "Carry your own things as per need ( Laptop, Mouse , Extension, etc )",
        "PPT of the prototype and its working, basics, motive , objective, conclusion all summary of it in 7 to 8 slides",
        "Get your GitHub account ready to connect",
        "Refreshment will be provided on the venue by the staff of the event",
        "ALL PROBLEM STATEMENTS, TOPICS WILL BE GIVEN ON TIME",
        "Team size: 2 to 4 members total (₹300 per team)"
      ],
      description: "Intensive prototype-building sprint on Day 2 (3 December). Hackathon statement released at 10:00 AM sharp! Judges desk reviews at 3:30 PM, evaluation at 4:00 PM, and prize distribution till 5:30 PM. Refreshments provided by event staff."
    },
    {
      id: "ideathon",
      name: "Ideathon",
      tagline: "Day 1 (2 Dec) • 5-7 Min Pitch • 7-8 Slides • 3 Members",
      fee: 200,
      feeLabel: "₹200 / team",
      minMembers: 3,
      maxMembers: 3,
      icon: "Lightbulb",
      accentColor: "from-purple-600 via-pink-600 to-amber-500",
      badge: "Day 1 • 2 Dec",
      timingDetails: {
        reporting: "9:00 to 9:30 AM",
        startsAt: "11:00 AM (Event Inauguration at 10:00 AM)",
        briefing: "Evaluation till 2:00 PM | Prize Distribution till 3:00 PM",
        departure: "Departure as per on-time given schedule"
      },
      importantNotes: [
        "PPT slide limit 7 to 8",
        "Ideathon pitching time 5 to 7 minutes",
        "Proper explanation of the idea",
        "All problem statements, topics will be given on time"
      ],
      rules: [
        "Event Day: Day 1 — 2nd of December",
        "Reporting time: 9:00 to 9:30 AM",
        "Event inauguration: 10:00 AM | Start from 11:00 AM",
        "Evaluation till 2:00 PM | Prize Distribution till 3:00 PM",
        "PPT slide limit: 7 to 8 slides strictly",
        "Ideathon pitching time: 5 to 7 minutes per team",
        "Proper explanation of the idea, problem statement, solution & execution",
        "ALL PROBLEM STATEMENTS, TOPICS WILL BE GIVEN ON TIME",
        "Team size: 3 members total (₹200 per team)"
      ],
      description: "Pitch your revolutionary idea on Day 1 (2 December). Event inauguration at 10:00 AM, pitching starts from 11:00 AM. 5 to 7 minutes pitch with a 7 to 8 slides PPT limit. Evaluation till 2:00 PM and Prize Distribution till 3:00 PM!"
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
      day: "Day 1 — 2 December (Ideathon & Reel Making)",
      events: [
        { time: "09:00 AM - 09:30 AM", title: "Ideathon & Reel Making: Reporting & Registration", venue: "Reporting Desk / Auditorium" },
        { time: "10:00 AM", title: "Event Inauguration Ceremony", venue: "Main Auditorium" },
        { time: "10:00 AM", title: "Reel Making: Day 1 Event Shoot Kickoff (In Event Hours)", venue: "Campus Arenas" },
        { time: "11:00 AM", title: "Ideathon: Pitching Starts (5-7 Min Pitching, 7-8 Slides)", venue: "Seminar Hall" },
        { time: "02:00 PM", title: "Ideathon: Evaluation Round (Till 2:00 PM)", venue: "Seminar Hall" },
        { time: "03:00 PM", title: "Ideathon: Prize Distribution (Till 3:00 PM)", venue: "Main Stage" },
        { time: "On-Time Schedule", title: "Day 1 Departure as per on-time given schedule", venue: "Campus Exit" }
      ]
    },
    {
      day: "Day 2 — 3 December (Hackathon & Reel Making)",
      events: [
        { time: "09:00 AM - 09:30 AM", title: "Hackathon & Reel Making: Reporting Time", venue: "Computing Labs / Media Center" },
        { time: "10:00 AM Sharp", title: "Hackathon: Statement Released at 10:00 AM Sharp & Starts", venue: "Computing Labs" },
        { time: "10:00 AM", title: "Reel Making: Day 2 Event Shoot & Laptop Editing", venue: "Media Lab" },
        { time: "01:00 PM", title: "Staff Refreshments on Venue for Participants", venue: "Dining Area" },
        { time: "02:00 PM", title: "Reel Screening & Audience Choice Voting", venue: "Auditorium" },
        { time: "03:30 PM", title: "Hackathon: Judges Round on Desk", venue: "Computing Labs" },
        { time: "04:00 PM", title: "Hackathon: Evaluation Round", venue: "Computing Labs" },
        { time: "05:00 PM - 05:30 PM", title: "Prize Distribution & Departure (Till 5:00 to 5:30 PM)", venue: "Main Auditorium" }
      ]
    }
  ],
  faqs: [
    {
      q: "What is the schedule for Ideathon (Day 1 — 2 Dec)?",
      a: "Reporting Time is 9:00 AM to 9:30 AM. Event Inauguration is at 10:00 AM, and pitching starts from 11:00 AM. Evaluation continues till 2:00 PM, and Prize Distribution is till 3:00 PM. Pitching time is strictly 5 to 7 minutes with a 7 to 8 slides PPT limit."
    },
    {
      q: "What is the schedule and requirements for Hackathon (Day 2 — 3 Dec)?",
      a: "Reporting Time is 9:00 AM to 9:30 AM. The Hackathon problem statement is released at 10:00 AM sharp and hackathon starts at 10:00 AM. Judges desk review is at 3:30 PM, Evaluation at 4:00 PM, followed by Prize Distribution and departure till 5:00 to 5:30 PM. Participants must carry their own things (Laptop, Mouse, Extension, etc.), prepare a 7-8 slide PPT prototype summary, have their GitHub account ready, and refreshments will be provided on the venue by the event staff."
    },
    {
      q: "What are the timings and guidelines for the Reel Making Competition?",
      a: "Reporting Time is 9:00 AM to 9:30 AM, and the competition starts promptly at 10:00 AM. All instructions and regulations are given upon reporting. It is conducted across both 2 days during official event hours. Participants cover the event in real-time, focus on Event Awareness and El:Nino Awareness reels, and must carry their own laptops and cameras for shooting and editing. Departure time is as per the on-time given schedule."
    },
    {
      q: "Can a student participate in multiple competitions?",
      a: "Yes! Since Ideathon is conducted on Day 1 (2 Dec) and Hackathon on Day 2 (3 Dec), students are welcome to participate in both competitions!"
    },
    {
      q: "Are problem statements provided in advance?",
      a: "No. ALL PROBLEM STATEMENTS AND TOPICS WILL BE GIVEN ON TIME live at the venue."
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
      q: "Will certificates be provided to all participants?",
      a: "Yes! Every registered student who participates will receive an official Certificate of Participation from El Nino Synapse, and winners will receive cash prizes, trophies, and Certificates of Excellence."
    }
  ]
};
