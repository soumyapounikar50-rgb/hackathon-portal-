import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CompetitionRegistration } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRegistrationId(competitionId: string): string {
  const prefixMap: Record<string, string> = {
    'hackathon': 'HACK',
    'ideathon': 'IDEA',
    'reel-making': 'REEL',
    'science-exhibition': 'SCI'
  };
  const prefix = prefixMap[competitionId] || 'FEST';
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `ENS-${prefix}-${randomSuffix}`;
}

export function convertRegistrationsToCSV(registrations: CompetitionRegistration[]): string {
  const headers = [
    "Registration ID",
    "Competition",
    "Team Name",
    "Total Members",
    "Fee (INR)",
    "Leader Name",
    "Leader Email",
    "Leader Phone",
    "Leader Branch / Year",
    "Leader College",
    "Member 2 Name",
    "Member 2 Email",
    "Member 2 Phone",
    "Member 2 Branch/Year",
    "Member 2 College",
    "Member 3 Name",
    "Member 3 Email",
    "Member 3 Phone",
    "Member 3 Branch/Year",
    "Member 3 College",
    "Member 4 Name",
    "Member 4 Email",
    "Member 4 Phone",
    "Member 4 Branch/Year",
    "Member 4 College",
    "Payment Method",
    "UTR / Transaction ID",
    "Status",
    "Registered At"
  ];

  const escapeCSV = (value: string | number | undefined | null) => {
    if (value === undefined || value === null) return '""';
    const stringVal = String(value).replace(/"/g, '""');
    return `"${stringVal}"`;
  };

  const rows = registrations.map(reg => {
    const m1 = reg.members[0];
    const m2 = reg.members[1];
    const m3 = reg.members[2];

    return [
      escapeCSV(reg.id),
      escapeCSV(reg.competitionName),
      escapeCSV(reg.teamName),
      escapeCSV(1 + reg.members.length),
      escapeCSV(reg.fee),
      escapeCSV(reg.leader.name),
      escapeCSV(reg.leader.email),
      escapeCSV(reg.leader.phone),
      escapeCSV(reg.leader.branchAndYear),
      escapeCSV(reg.leader.college),
      // Member 2
      escapeCSV(m1?.name || ''),
      escapeCSV(m1?.email || ''),
      escapeCSV(m1?.phone || ''),
      escapeCSV(m1?.branchAndYear || ''),
      escapeCSV(m1?.college || ''),
      // Member 3
      escapeCSV(m2?.name || ''),
      escapeCSV(m2?.email || ''),
      escapeCSV(m2?.phone || ''),
      escapeCSV(m2?.branchAndYear || ''),
      escapeCSV(m2?.college || ''),
      // Member 4
      escapeCSV(m3?.name || ''),
      escapeCSV(m3?.email || ''),
      escapeCSV(m3?.phone || ''),
      escapeCSV(m3?.branchAndYear || ''),
      escapeCSV(m3?.college || ''),
      // Payment
      escapeCSV(reg.payment.method.toUpperCase()),
      escapeCSV(reg.payment.transactionId),
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
