import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Registration } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate unique alphanumeric Registration ID
export function generateRegistrationId(): string {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `HACK-2026-${randomSuffix}`;
}

// Convert registrations array into a clean CSV string
export function convertRegistrationsToCSV(registrations: Registration[]): string {
  const headers = [
    "Registration ID",
    "Type",
    "Team Name",
    "Leader Name",
    "Leader Email",
    "Leader Phone",
    "College / Company",
    "Graduation Year",
    "Experience Level",
    "Track",
    "Skills",
    "Team Members Count",
    "Team Members Details",
    "GitHub URL",
    "LinkedIn URL",
    "Portfolio URL",
    "Project Pitch",
    "T-Shirt Size",
    "Dietary Restrictions",
    "Status",
    "Registered At"
  ];

  const escapeCSV = (value: string | number | undefined | null) => {
    if (value === undefined || value === null) return '""';
    const stringVal = String(value).replace(/"/g, '""');
    return `"${stringVal}"`;
  };

  const rows = registrations.map(reg => {
    const memberSummary = reg.members
      .map(m => `${m.name} (${m.role} - ${m.email})`)
      .join('; ');

    return [
      escapeCSV(reg.id),
      escapeCSV(reg.registrationType),
      escapeCSV(reg.teamName || 'N/A'),
      escapeCSV(reg.leaderName),
      escapeCSV(reg.leaderEmail),
      escapeCSV(reg.leaderPhone),
      escapeCSV(reg.collegeOrCompany),
      escapeCSV(reg.graduationYear || 'N/A'),
      escapeCSV(reg.experienceLevel),
      escapeCSV(reg.primaryTrack),
      escapeCSV(reg.skills.join(', ')),
      escapeCSV(reg.members.length),
      escapeCSV(memberSummary),
      escapeCSV(reg.githubUrl || ''),
      escapeCSV(reg.linkedinUrl || ''),
      escapeCSV(reg.portfolioUrl || ''),
      escapeCSV(reg.projectPitch || ''),
      escapeCSV(reg.tshirtSize || 'N/A'),
      escapeCSV(reg.dietaryRestrictions || 'None'),
      escapeCSV(reg.status),
      escapeCSV(reg.createdAt)
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\r\n');
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateString;
  }
}
