import fs from 'fs';
import path from 'path';
import { CompetitionRegistration } from '../types';

const SEED_REGISTRATIONS: CompetitionRegistration[] = [];

let memoryRegistrations: CompetitionRegistration[] = [];

function getDataFilePath(): string {
  if (process.env.VERCEL) {
    return path.join('/tmp', 'el_nino_registrations.json');
  }
  return path.join(process.cwd(), 'data', 'el_nino_registrations.json');
}

/**
 * Load all registrations.
 * Reads from disk (/tmp on Vercel) or memory cache.
 */
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

/**
 * Save new registration.
 * Persists to disk/tmp and triggers optional Webhooks (Google Sheets / Discord).
 */
export async function saveRegistration(registration: CompetitionRegistration): Promise<CompetitionRegistration> {
  const current = getAllRegistrations();
  const updated = [registration, ...current.filter(r => r.id !== registration.id)];
  memoryRegistrations = updated;

  // 1. Persist to disk / /tmp
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

  // 2. Vercel KV / Upstash Redis support (If KV is added via Vercel Dashboard Storage)
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      fetch(`${process.env.KV_REST_API_URL}/set/registrations`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updated)
      }).catch(e => console.error("KV save error:", e));
    } catch (e) {
      // Non-blocking
    }
  }

  // 3. Permanent Cloud Webhook (Google Sheets / Discord / Telegram / Zapier)
  // If REGISTRATION_WEBHOOK_URL is set in Vercel Environment Variables, this safely backs up every entry!
  if (process.env.REGISTRATION_WEBHOOK_URL) {
    try {
      fetch(process.env.REGISTRATION_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'new_registration',
          registration: {
            id: registration.id,
            competition: registration.competitionName,
            teamName: registration.teamName,
            fee: registration.fee,
            leader: registration.leader,
            members: registration.members,
            utr: registration.payment.transactionId,
            registeredAt: registration.createdAt
          }
        })
      }).catch(err => console.error("Webhook trigger error:", err));
    } catch (e) {
      // Non-blocking
    }
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
