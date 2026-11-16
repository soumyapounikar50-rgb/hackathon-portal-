import fs from 'fs';
import path from 'path';
import { CompetitionRegistration } from '../types';

const SEED_REGISTRATIONS: CompetitionRegistration[] = [
  {
    id: "ENS-HACK-1001",
    competitionId: "hackathon",
    competitionName: "Hackathon",
    teamName: "CodeCrafters",
    fee: 300,
    leader: {
      name: "Rohan Sharma",
      email: "rohan.sharma@example.com",
      phone: "+91 98765 12345",
      branchAndYear: "CSE / 3rd Year",
      college: "Institute of Technology"
    },
    members: [
      {
        name: "Ananya Deshmukh",
        email: "ananya.d@example.com",
        phone: "+91 98765 54321",
        branchAndYear: "IT / 3rd Year",
        college: "Institute of Technology"
      },
      {
        name: "Kabir Verma",
        email: "kabir.v@example.com",
        phone: "+91 98765 67890",
        branchAndYear: "AI & DS / 2nd Year",
        college: "Institute of Technology"
      }
    ],
    payment: {
      method: "upi",
      transactionId: "UPI412984920192",
      amount: 300
    },
    status: "confirmed",
    createdAt: "2026-11-16T09:00:00.000Z"
  },
  {
    id: "ENS-IDEA-2001",
    competitionId: "ideathon",
    competitionName: "Ideathon",
    teamName: "EcoVanguard",
    fee: 200,
    leader: {
      name: "Sneha Nair",
      email: "sneha.nair@example.com",
      phone: "+91 98123 45678",
      branchAndYear: "Mechanical / 4th Year",
      college: "Engineering College Pune"
    },
    members: [
      {
        name: "Aditya Joshi",
        email: "aditya.j@example.com",
        phone: "+91 98234 56789",
        branchAndYear: "Electrical / 4th Year",
        college: "Engineering College Pune"
      },
      {
        name: "Riddhi Kapoor",
        email: "riddhi.k@example.com",
        phone: "+91 98345 67890",
        branchAndYear: "Civil / 3rd Year",
        college: "Engineering College Pune"
      }
    ],
    payment: {
      method: "upi",
      transactionId: "UPI412984923301",
      amount: 200
    },
    status: "confirmed",
    createdAt: "2026-11-16T10:15:00.000Z"
  },
  {
    id: "ENS-REEL-3001",
    competitionId: "reel-making",
    competitionName: "Reel Making Competition",
    teamName: "Cinematic Duo",
    fee: 150,
    leader: {
      name: "Varun Malhotra",
      email: "varun.m@example.com",
      phone: "+91 99887 76655",
      branchAndYear: "ECE / 2nd Year",
      college: "National Tech Institute"
    },
    members: [
      {
        name: "Tanvi Saxena",
        email: "tanvi.s@example.com",
        phone: "+91 99887 11223",
        branchAndYear: "ECE / 2nd Year",
        college: "National Tech Institute"
      }
    ],
    payment: {
      method: "upi",
      transactionId: "UPI412984999882",
      amount: 150
    },
    status: "pending_verification",
    createdAt: "2026-11-16T11:45:00.000Z"
  },
  {
    id: "ENS-SCI-4001",
    competitionId: "science-exhibition",
    competitionName: "Science Exhibition",
    teamName: "Quantum Innovators",
    fee: 150,
    leader: {
      name: "Deepak Choudhary",
      email: "deepak.c@example.com",
      phone: "+91 97654 32109",
      branchAndYear: "Physics / 3rd Year",
      college: "Science & Arts College"
    },
    members: [
      {
        name: "Meera Kulkarni",
        email: "meera.k@example.com",
        phone: "+91 97654 88990",
        branchAndYear: "Applied Electronics / 3rd Year",
        college: "Science & Arts College"
      }
    ],
    payment: {
      method: "upi",
      transactionId: "UPI412985001122",
      amount: 150
    },
    status: "confirmed",
    createdAt: "2026-11-16T12:30:00.000Z"
  }
];

let memoryRegistrations: CompetitionRegistration[] = [...SEED_REGISTRATIONS];

function getDataFilePath(): string {
  if (process.env.VERCEL) {
    return path.join('/tmp', 'el_nino_registrations.json');
  }
  return path.join(process.cwd(), 'data', 'el_nino_registrations.json');
}

export function getAllRegistrations(): CompetitionRegistration[] {
  try {
    const filePath = getDataFilePath();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(data) as CompetitionRegistration[];
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

export async function saveRegistration(registration: CompetitionRegistration): Promise<CompetitionRegistration> {
  const current = getAllRegistrations();
  const updated = [registration, ...current.filter(r => r.id !== registration.id)];
  memoryRegistrations = updated;

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

  return registration;
}

export function getRegistrationById(id: string): CompetitionRegistration | null {
  const all = getAllRegistrations();
  return all.find(r => r.id.toLowerCase() === id.toLowerCase()) || null;
}

export function updateRegistrationStatus(id: string, status: 'confirmed' | 'pending_verification' | 'rejected'): boolean {
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
