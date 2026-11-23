export type CompetitionId = 
  | 'hackathon'
  | 'ideathon'
  | 'reel-making';

export interface StudentMember {
  name: string;
  email: string;
  phone: string;
  branchAndYear: string;
  college: string;
}

export interface PaymentDetails {
  method: 'upi' | 'cash';
  transactionId: string; // UTR or Reference number
  screenshotUrl?: string; // Base64 data URL or uploaded URL
  amount: number;
}

export interface CompetitionRegistration {
  id: string; // e.g. ENS-HACK-1042
  competitionId: CompetitionId;
  competitionName: string;
  teamName: string;
  fee: number;
  leader: StudentMember;
  members: StudentMember[]; // Additional members
  payment: PaymentDetails;
  status: 'confirmed' | 'pending_verification' | 'rejected';
  createdAt: string;
}

export interface CompetitionInfo {
  id: CompetitionId;
  name: string;
  tagline: string;
  fee: number; // in INR (₹)
  feeLabel: string;
  minMembers: number; // Total including leader
  maxMembers: number;
  icon: string;
  accentColor: string;
  badge: string;
  rules: string[];
  description: string;
  timingDetails?: {
    reporting: string;
    startsAt: string;
    briefing: string;
    departure: string;
  };
  importantNotes?: string[];
  isOutOfTheBox?: boolean;
}
