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

function getKVConfig(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    return { url, token };
  }
  return null;
}

/**
 * Load all registrations.
 * Checks Vercel KV / Upstash Redis first (if connected via Vercel Storage),
 * then falls back to /tmp or local data file, and memory cache.
 */
export async function getAllRegistrations(): Promise<CompetitionRegistration[]> {
  const kv = getKVConfig();

  // 1. Try Vercel KV / Upstash Redis for permanent cross-deployment storage
  if (kv) {
    try {
      const res = await fetch(`${kv.url}/get/el_nino_synapse_registrations`, {
        headers: {
          Authorization: `Bearer ${kv.token}`
        },
        cache: 'no-store'
      });

      if (res.ok) {
        const json = await res.json();
        let parsed: CompetitionRegistration[] | null = null;
        if (typeof json.result === 'string') {
          try {
            parsed = JSON.parse(json.result);
          } catch (e) {
            parsed = null;
          }
        } else if (Array.isArray(json.result)) {
          parsed = json.result;
        }

        if (Array.isArray(parsed)) {
          memoryRegistrations = parsed;
          return parsed;
        }
      }
    } catch (kvErr) {
      console.warn("KV fetch fallback to disk/memory:", kvErr);
    }
  }

  // 2. Fallback to disk (/tmp on Vercel)
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
 * Persists permanently to Vercel KV, /tmp disk, and triggers Cloud Webhook (Google Sheets / Discord).
 */
export async function saveRegistration(registration: CompetitionRegistration): Promise<CompetitionRegistration> {
  const current = await getAllRegistrations();
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
    console.warn("Could not write registration to disk:", err);
  }

  // 2. Persist permanently to Vercel KV / Upstash Redis
  const kv = getKVConfig();
  if (kv) {
    try {
      await fetch(`${kv.url}/set/el_nino_synapse_registrations`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kv.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.error("KV save error:", e);
    }
  }

  // 3. Permanent Cloud Webhook (e.g. Google Sheets, Discord, Zapier)
  if (process.env.REGISTRATION_WEBHOOK_URL) {
    try {
      fetch(process.env.REGISTRATION_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'new_registration',
          id: registration.id,
          competition: registration.competitionName,
          teamName: registration.teamName,
          fee: registration.fee,
          leaderName: registration.leader.name,
          leaderEmail: registration.leader.email,
          leaderPhone: registration.leader.phone,
          branchAndYear: registration.leader.branchAndYear,
          college: registration.leader.college,
          membersCount: registration.members.length,
          members: registration.members.map(m => `${m.name} (${m.phone})`).join(', '),
          utr: registration.payment.transactionId,
          registeredAt: registration.createdAt
        })
      }).catch(err => console.error("Webhook trigger error:", err));
    } catch (e) {
      // Non-blocking
    }
  }

  return registration;
}

export async function getRegistrationById(id: string): Promise<CompetitionRegistration | null> {
  const all = await getAllRegistrations();
  return all.find(r => r.id.toLowerCase() === id.toLowerCase()) || null;
}

export async function updateRegistrationStatus(id: string, status: 'confirmed' | 'pending_verification' | 'rejected'): Promise<boolean> {
  const all = await getAllRegistrations();
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

  const kv = getKVConfig();
  if (kv) {
    try {
      await fetch(`${kv.url}/set/el_nino_synapse_registrations`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kv.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(all)
      });
    } catch (e) {
      console.error("KV status update error:", e);
    }
  }

  return true;
}

export async function deleteRegistration(id: string): Promise<boolean> {
  const all = await getAllRegistrations();
  const filtered = all.filter(r => r.id.toLowerCase() !== id.toLowerCase());
  if (filtered.length === all.length) return false;

  memoryRegistrations = filtered;

  try {
    const filePath = getDataFilePath();
    fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), 'utf-8');
  } catch (err) {
    console.warn("File write fallback:", err);
  }

  const kv = getKVConfig();
  if (kv) {
    try {
      await fetch(`${kv.url}/set/el_nino_synapse_registrations`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kv.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filtered)
      });
    } catch (e) {
      console.error("KV delete sync error:", e);
    }
  }

  return true;
}
