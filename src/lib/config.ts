import { CompetitionInfo } from '@/types';

export const EVENT_CONFIG = {
  name: "El Nino Synapse",
  tagline: "Unleash Innovation, Creativity & Engineering",
  dates: "2 & 3 December",
  location: "College Campus / Auditorium & Tech Labs",
  description: "Welcome to El Nino Synapse — the premier inter-college tech & creativity fest featuring 4 power-packed competitions: Hackathon, Ideathon, Reel Making, and Science Exhibition. Compete with top minds, showcase your skills, and take home exciting prizes and trophies!",
  upiDetails: {
    upiId: "elnino.synapse@okaxis",
    payeeName: "El Nino Synapse Fest",
    phone: "+91 98765 43210",
    note: "Please mention Team Name in UPI payment note"
  },
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
      tagline: "60 Seconds Reel • 2 Members Total",
      fee: 150,
      feeLabel: "₹150 / entry",
      minMembers: 2,
      maxMembers: 2,
      icon: "Video",
      accentColor: "from-rose-600 to-amber-600",
      badge: "2 Members Total",
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
      tagline: "Working Models • Live Demonstration • Scientific Innovation",
      fee: 150,
      feeLabel: "₹150 / entry",
      minMembers: 1,
      maxMembers: 3,
      icon: "Atom",
      accentColor: "from-emerald-600 to-teal-600",
      badge: "1-3 Members",
      rules: [
        "Team size: 1 to 3 members per exhibit",
        "Must showcase a working physical model, experimental demo, or prototype",
        "Setup table and power connection will be provided on campus",
        "Every team will present their project to visiting judges and delegates",
        "Evaluation criteria: Scientific principle, innovation, working capability, and explanation"
      ],
      description: "Demonstrate working science models, hardware innovations, and experimental exhibits. Inspire curiosity and bring scientific concepts to life!"
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
      a: "Yes! As long as the event schedules do not overlap (e.g. Science Exhibition on Day 1 and Ideathon on Day 2), participants may register for more than one event."
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
      q: "When will the Hackathon problem statement be released?",
      a: "The problem statement will be announced live on time at the opening of the 6-hour hackathon sprint on 2 December."
    },
    {
      q: "Will certificates be provided to all participants?",
      a: "Yes! Every registered student who participates will receive an official Certificate of Participation from El Nino Synapse, and winners will receive cash prizes, trophies, and Certificates of Excellence."
    }
  ]
};
