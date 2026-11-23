import { CompetitionInfo } from '@/types';

export const EVENT_CONFIG = {
  name: "El Niño Awareness Program",
  tagline: "Unleash Innovation, Creativity & Environmental Action",
  dates: "2 & 3 December",
  college: {
    name: "Tulsiramji Gaikwad-Patil College of Engineering & Technology",
    fullName: "Tulsiramji Gaikwad-Patil College of Engineering & Technology (An Autonomous Institute)",
    shortName: "TGPCET",
    subtext: "An Autonomous Institute • DTE Code: 4151",
    website: "https://www.tgpcet.com",
    logo: "/college-logo.png"
  },
  location: "Tulsiramji Gaikwad-Patil College of Engineering & Technology (TGPCET), Nagpur",
  description: "Welcome to El Niño Awareness Program — the premier inter-college tech & creativity fest on 2 & 3 December organized by Tulsiramji Gaikwad-Patil College of Engineering & Technology (TGPCET). Featuring 3 flagship competitions: Hackathon (Day 1), Ideathon (Day 2), and Reel Making (Out of the Box • Both Days). Showcase your innovation, technical skills, and creativity to take home exciting cash prizes, trophies, and certificates!",
  upiDetails: {
    upiId: "",
    payeeName: "El Niño Awareness Program",
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
      name: "Shravan Yadav",
      phone: "82754 67373",
      rawPhone: "+918275467373",
      role: "Registration & Queries Coordinator"
    },
    {
      name: "Tejas Dhanvij",
      phone: "75071 12190",
      rawPhone: "+917507112190",
      role: "Student Coordinator"
    },
    {
      name: "Soumya Pounikar",
      phone: "93564 06119",
      rawPhone: "+919356406119",
      role: "Student Coordinator"
    }
  ],
  competitions: [
    {
      id: "hackathon",
      name: "Hackathon",
      tagline: "Day 1 (2 Dec) • Statement at 10 AM Sharp • 2-4 Members",
      fee: 300,
      feeLabel: "₹300 / team",
      minMembers: 2,
      maxMembers: 4,
      icon: "Terminal",
      accentColor: "from-blue-600 via-teal-500 to-indigo-600",
      badge: "Day 1 (2 Dec)",
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
        "Event Day: Day 1 — 2nd of December",
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
      description: "Intensive prototype-building sprint on Day 1 (2 December). Hackathon statement released at 10:00 AM sharp! Judges desk reviews at 3:30 PM, evaluation at 4:00 PM, and prize distribution till 5:30 PM. Refreshments provided by event staff."
    },
    {
      id: "ideathon",
      name: "Ideathon",
      tagline: "Day 2 (3 Dec) • 5-7 Min Pitch • 7-8 Slides • 3 Members",
      fee: 200,
      feeLabel: "₹200 / team",
      minMembers: 3,
      maxMembers: 3,
      icon: "Lightbulb",
      accentColor: "from-purple-600 via-pink-600 to-amber-500",
      badge: "Day 2 (3 Dec)",
      timingDetails: {
        reporting: "9:00 to 9:30 AM",
        startsAt: "11:00 AM (Event Opening at 10:00 AM)",
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
        "Event Day: Day 2 — 3rd of December",
        "Reporting time: 9:00 to 9:30 AM",
        "Event opening: 10:00 AM | Start from 11:00 AM",
        "Evaluation till 2:00 PM | Prize Distribution till 3:00 PM",
        "PPT slide limit: 7 to 8 slides strictly",
        "Ideathon pitching time: 5 to 7 minutes per team",
        "Proper explanation of the idea, problem statement, solution & execution",
        "ALL PROBLEM STATEMENTS, TOPICS WILL BE GIVEN ON TIME",
        "Team size: 3 members total (₹200 per team)"
      ],
      description: "Pitch your revolutionary idea on Day 2 (3 December). Event opening at 10:00 AM, pitching starts from 11:00 AM. 5 to 7 minutes pitch with a 7 to 8 slides PPT limit. Evaluation till 2:00 PM and Prize Distribution till 3:00 PM!"
    },
    {
      id: "reel-making",
      name: "Reel Making Competition",
      tagline: "⚡ Out of the Box • Conducted on Both Days (2 & 3 Dec) • 2 Members",
      fee: 150,
      feeLabel: "₹150 / entry",
      minMembers: 2,
      maxMembers: 2,
      icon: "Video",
      accentColor: "from-rose-500 via-fuchsia-500 to-amber-400",
      badge: "Out of the Box • Both Days (2 & 3 Dec)",
      isOutOfTheBox: true,
      timingDetails: {
        reporting: "9:00 AM to 9:30 AM (Both Days)",
        startsAt: "10:00 AM (Day 1 & Day 2)",
        briefing: "All instructions and regulations regarding Reel Making Competition will be given upon reporting.",
        departure: "Departure time as per on-time given event schedule"
      },
      importantNotes: [
        "This will be conducted 2 day (Both Days — 2 & 3 Dec)",
        "In the event hours",
        "Event covering in the event time",
        "Event Awareness of the program",
        "El:Nino Awareness reels",
        "Carrying your own laptops, cameras for shoot"
      ],
      rules: [
        "⚡ Out of the Box: Conducted across BOTH Days (Day 1 & Day 2)",
        "Reporting Time: 9:00 AM to 9:30 AM on both days | Starts strictly at 10:00 AM",
        "All instructions are given and regulations regarding Reel Making Competition upon reporting",
        "Departure Time as per on-time given schedule",
        "Conducted across 2 days during official event hours",
        "Event covering strictly in the event time",
        "Focus Themes: Event Awareness of the program & El:Nino Awareness reels",
        "Mandatory: Carrying your own laptops, cameras for shoot and editing",
        "Duration: Up to 60 seconds (9:16 vertical video reel format)",
        "Team size: Exactly 2 members total (₹150 per team)"
      ],
      description: "An Out-of-the-Box creative competition running continuously across BOTH days (2 & 3 Dec)! Report between 9:00 AM - 9:30 AM (starts at 10:00 AM). Capture live fest moments during event hours, produce Event Awareness & El:Nino Awareness reels, and edit on your own laptops."
    }
  ] as CompetitionInfo[],
  schedule: [
    {
      day: "Day 1 — 2 December (Hackathon & Reel Making)",
      events: [
        { time: "09:00 AM - 09:30 AM", title: "Hackathon & Reel Making: Reporting & Registration", venue: "Computing Labs / Media Desk" },
        { time: "10:00 AM Sharp", title: "Hackathon: Problem Statement Released & Kickoff (6 Hours)", venue: "Computing Labs" },
        { time: "10:00 AM", title: "Reel Making (Day 1): Live Event Shoot Begins (In Event Hours)", venue: "Campus Grounds & Arenas" },
        { time: "01:00 PM", title: "Staff Refreshments & Mid-Sprints Break", venue: "Dining Area" },
        { time: "03:30 PM", title: "Hackathon: Judges Round on Desk (Live Prototype Review)", venue: "Computing Labs" },
        { time: "04:00 PM", title: "Hackathon: Official Evaluation Round", venue: "Computing Labs" },
        { time: "05:00 PM - 05:30 PM", title: "Hackathon Prize Distribution & Day 1 Departure", venue: "Main Auditorium" }
      ]
    },
    {
      day: "Day 2 — 3 December (Ideathon & Reel Making)",
      events: [
        { time: "09:00 AM - 09:30 AM", title: "Ideathon & Reel Making: Day 2 Reporting", venue: "Seminar Hall / Media Center" },
        { time: "10:00 AM", title: "Day 2 Inauguration & Opening Ceremony", venue: "Main Auditorium" },
        { time: "10:00 AM", title: "Reel Making (Day 2): Event Shoot & Video Editing on Own Laptops", venue: "Media Lab" },
        { time: "11:00 AM", title: "Ideathon: Pitching Rounds Start (5-7 Min Pitching, 7-8 Slides)", venue: "Seminar Hall" },
        { time: "02:00 PM", title: "Ideathon: Evaluation Round (Till 2:00 PM)", venue: "Seminar Hall" },
        { time: "02:00 PM", title: "Reel Making: Grand Screening & Audience Choice Voting", venue: "Main Auditorium" },
        { time: "03:00 PM", title: "Ideathon: Prize Distribution (Till 3:00 PM)", venue: "Main Stage" },
        { time: "04:30 PM", title: "Grand Valedictory Ceremony & Overall Program Awards", venue: "Main Auditorium" },
        { time: "On-Time Schedule", title: "Departure as per on-time given schedule", venue: "Campus Exit" }
      ]
    }
  ],
  faqs: [
    {
      q: "What is the schedule and requirements for Hackathon (Day 1 — 2 Dec)?",
      a: "Reporting Time is 9:00 AM to 9:30 AM on Day 1 (2 Dec). The Hackathon problem statement is released at 10:00 AM sharp and hackathon starts at 10:00 AM. Judges desk review is at 3:30 PM, Evaluation at 4:00 PM, followed by Prize Distribution and departure till 5:00 to 5:30 PM. Participants must carry their own things (Laptop, Mouse, Extension, etc.), prepare a 7-8 slide PPT prototype summary, have their GitHub account ready, and refreshments will be provided on the venue by the event staff."
    },
    {
      q: "What is the schedule for Ideathon (Day 2 — 3 Dec)?",
      a: "Reporting Time is 9:00 AM to 9:30 AM on Day 2 (3 Dec). Event Opening is at 10:00 AM, and pitching starts from 11:00 AM. Evaluation continues till 2:00 PM, and Prize Distribution is till 3:00 PM. Pitching time is strictly 5 to 7 minutes with a 7 to 8 slides PPT limit."
    },
    {
      q: "How is the Reel Making Competition conducted (Out of the Box)?",
      a: "Reel Making is an Out-of-the-Box competition conducted across BOTH Day 1 and Day 2 (2 & 3 Dec) during official event hours! Reporting Time is 9:00 AM to 9:30 AM on both days. Participants cover the live events in real-time, create Event Awareness and El:Nino Awareness reels, and must carry their own laptops and cameras for shooting and editing. Grand screening and voting take place on Day 2 at 2:00 PM."
    },
    {
      q: "Can a student participate in multiple competitions?",
      a: "Yes! Since Hackathon is conducted on Day 1 (2 Dec) and Ideathon on Day 2 (3 Dec), students are welcome to participate in both competitions!"
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
      a: "You can directly call our Student Coordinators: Yash Jadhav (95185 62840), Arpit Dambhare (94219 34932), Shravan Yadav (82754 67373), Tejas Dhanvij (75071 12190), or Soumya Pounikar (93564 06119) anytime!"
    },
    {
      q: "Will certificates be provided to all participants?",
      a: "Yes! Every registered student who participates will receive an official Certificate of Participation from El Niño Awareness Program, and winners will receive cash prizes, trophies, and Certificates of Excellence."
    }
  ]
};
