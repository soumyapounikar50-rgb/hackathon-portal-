export type HackathonTrack = 
  | 'ai-agents'
  | 'web3-defi'
  | 'climate-tech'
  | 'health-tech'
  | 'open-innovation';

export interface TeamMember {
  name: string;
  email: string;
  role: string;
  github?: string;
  linkedin?: string;
}

export interface Registration {
  id: string; // e.g. HACK-2026-8921
  registrationType: 'solo' | 'team';
  teamName?: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  collegeOrCompany: string;
  graduationYear?: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  primaryTrack: HackathonTrack;
  skills: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  projectPitch?: string;
  members: TeamMember[];
  tshirtSize?: string;
  dietaryRestrictions?: string;
  agreedToTerms: boolean;
  status: 'confirmed' | 'pending' | 'waitlisted';
  createdAt: string;
}

export interface RegistrationFormData {
  registrationType: 'solo' | 'team';
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  collegeOrCompany: string;
  graduationYear: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  primaryTrack: HackathonTrack;
  skills: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  projectPitch: string;
  members: TeamMember[];
  tshirtSize: string;
  dietaryRestrictions: string;
  agreedToTerms: boolean;
}
