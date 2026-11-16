import fs from 'fs';
import path from 'path';
import { Registration } from '../types';

// Initial demo seed data so organizers immediately see how the portal & admin dashboard function
const SEED_REGISTRATIONS: Registration[] = [
  {
    id: "HACK-2026-1001",
    registrationType: "team",
    teamName: "NeuralWeavers",
    leaderName: "Alex Rivera",
    leaderEmail: "alex.rivera@example.com",
    leaderPhone: "+1 (555) 234-5678",
    collegeOrCompany: "UC Berkeley",
    graduationYear: "2026",
    experienceLevel: "advanced",
    primaryTrack: "ai-agents",
    skills: ["Python", "PyTorch", "Next.js", "LangChain"],
    githubUrl: "https://github.com/alexrivera-dev",
    linkedinUrl: "https://linkedin.com/in/alexrivera",
    projectPitch: "An autonomous multi-agent system for disaster response resource routing and situational mapping.",
    members: [
      { name: "Priya Patel", email: "priya@example.com", role: "AI Research", github: "https://github.com/priyapatel" },
      { name: "Liam Chen", email: "liam@example.com", role: "Frontend & UI", github: "https://github.com/liamc" }
    ],
    tshirtSize: "L",
    dietaryRestrictions: "Vegetarian",
    agreedToTerms: true,
    status: "confirmed",
    createdAt: "2026-11-15T10:30:00.000Z"
  },
  {
    id: "HACK-2026-1002",
    registrationType: "solo",
    leaderName: "Elena Rostova",
    leaderEmail: "elena.rostova@example.com",
    leaderPhone: "+1 (555) 987-6543",
    collegeOrCompany: "MIT Media Lab",
    graduationYear: "2025",
    experienceLevel: "intermediate",
    primaryTrack: "climate-tech",
    skills: ["TypeScript", "Solidity", "Rust", "TailwindCSS"],
    githubUrl: "https://github.com/elena-dev",
    linkedinUrl: "https://linkedin.com/in/elenarostova",
    projectPitch: "Verifiable micro-grid energy accounting on a decentralized ledger.",
    members: [],
    tshirtSize: "M",
    dietaryRestrictions: "None",
    agreedToTerms: true,
    status: "confirmed",
    createdAt: "2026-11-15T14:45:00.000Z"
  },
  {
    id: "HACK-2026-1003",
    registrationType: "team",
    teamName: "BioSynth AI",
    leaderName: "Marcus Vance",
    leaderEmail: "marcus.vance@example.com",
    leaderPhone: "+1 (555) 432-1098",
    collegeOrCompany: "Stanford University",
    graduationYear: "2027",
    experienceLevel: "advanced",
    primaryTrack: "health-tech",
    skills: ["FastAPI", "React", "BioPython", "Docker"],
    githubUrl: "https://github.com/marcusvance",
    projectPitch: "Real-time acoustic analysis for early pulmonary congestion detection via mobile microphones.",
    members: [
      { name: "Sarah Zhao", email: "szhao@example.com", role: "Biomedical Engineer" }
    ],
    tshirtSize: "XL",
    dietaryRestrictions: "Halal",
    agreedToTerms: true,
    status: "confirmed",
    createdAt: "2026-11-16T08:15:00.000Z"
  }
];

// In-memory cache for serverless invocation reuse
let memoryRegistrations: Registration[] = [...SEED_REGISTRATIONS];

// Determine data file path (supports /tmp in serverless environments like Vercel)
function getDataFilePath(): string {
  if (process.env.VERCEL) {
    return path.join('/tmp', 'registrations.json');
  }
  return path.join(process.cwd(), 'data', 'registrations.json');
}

// Load registrations from disk or return memory cache
export function getAllRegistrations(): Registration[] {
  try {
    const filePath = getDataFilePath();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(data) as Registration[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryRegistrations = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Storage read fallback to memory cache:", err);
  }
  return memoryRegistrations;
}

// Save a new registration
export async function saveRegistration(registration: Registration): Promise<Registration> {
  // Prepend to registrations list
  const current = getAllRegistrations();
  const updated = [registration, ...current.filter(r => r.id !== registration.id)];
  memoryRegistrations = updated;

  // Persist to file if possible
  try {
    const filePath = getDataFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (err) {
    console.warn("Could not write registration to disk (running in read-only environment):", err);
  }

  // If a Webhook is configured (e.g. Google Sheets / Discord / Slack / Zapier), notify it asynchronously
  if (process.env.REGISTRATION_WEBHOOK_URL) {
    try {
      fetch(process.env.REGISTRATION_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'new_registration',
          registration
        })
      }).catch(err => console.error("Webhook trigger error:", err));
    } catch (e) {
      // Non-blocking
    }
  }

  return registration;
}

// Get registration by ID
export function getRegistrationById(id: string): Registration | null {
  const all = getAllRegistrations();
  return all.find(r => r.id.toLowerCase() === id.toLowerCase()) || null;
}

// Update registration status
export function updateRegistrationStatus(id: string, status: 'confirmed' | 'pending' | 'waitlisted'): boolean {
  const all = getAllRegistrations();
  const index = all.findIndex(r => r.id.toLowerCase() === id.toLowerCase());
  if (index === -1) return false;

  all[index].status = status;
  memoryRegistrations = all;

  try {
    const filePath = getDataFilePath();
    fs.writeFileSync(filePath, JSON.stringify(all, null, 2), 'utf-8');
  } catch (err) {
    console.warn("File write fallback:", err);
  }
  return true;
}
