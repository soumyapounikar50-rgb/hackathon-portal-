import fs from 'fs';
import path from 'path';
import { CompetitionRegistration } from '../types';
import { Redis } from '@upstash/redis';

const SEED_REGISTRATIONS: CompetitionRegistration[] = [];

let memoryRegistrations: CompetitionRegistration[] = [];
let redisClient: Redis | null = null;

function getDataFilePath(): string {
  if (process.env.VERCEL) {
    return path.join('/tmp', 'el_nino_registrations.json');
  }
  return path.join(process.cwd(), 'data', 'el_nino_registrations.json');
}

export function getKVConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (url && token) {
    return { url, token };
  }
  return null;
}

function getRedis(): Redis | null {
  if (redisClient) return redisClient;
  const cfg = getKVConfig();
  if (cfg) {
    try {
      redisClient = new Redis({
        url: cfg.url,
        token: cfg.token
      });
      return redisClient;
    } catch (e) {
      console.warn("Failed to initialize Upstash Redis client:", e);
    }
  }
  return null;
}

async function syncToCloud(registrations: CompetitionRegistration[]): Promise<void> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set('el_nino_registrations', registrations);
    } catch (e) {
      console.error("Cloud Redis write error:", e);
    }
  }
}

export async function saveReceiptImage(id: string, base64Data: string): Promise<void> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set(`receipt:${id}`, base64Data);
    } catch (e) {
      console.error(`Cloud Redis receipt:${id} write error:`, e);
    }
  }
}

export async function getReceiptImage(id: string): Promise<string | null> {
  const redis = getRedis();
  if (redis) {
    try {
      const data = await redis.get<string>(`receipt:${id}`);
      if (data) return data;
    } catch (e) {
      console.error(`Cloud Redis receipt:${id} read error:`, e);
    }
  }
  return null;
}

/**
 * Load all registrations.
 * Checks Upstash Redis / Vercel KV first (permanent cross-deployment cloud database),
 * then falls back to /tmp or local data file, and memory cache.
 */
export async function getAllRegistrations(): Promise<CompetitionRegistration[]> {
  const redis = getRedis();

  // 1. Try Upstash Redis / Vercel KV for permanent cloud storage
  if (redis) {
    try {
      const data = await redis.get<CompetitionRegistration[]>('el_nino_registrations');
      if (Array.isArray(data)) {
        // Automatically optimize any raw Base64 screenshots into clean short URLs in Upstash
        let needsSync = false;
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://hackathon-portal-pi.vercel.app';
        for (const reg of data) {
          if (reg.payment?.screenshotUrl && reg.payment.screenshotUrl.startsWith('data:image/')) {
            await saveReceiptImage(reg.id, reg.payment.screenshotUrl);
            reg.payment.screenshotUrl = `${appUrl}/api/receipt/${reg.id}`;
            needsSync = true;
          }
        }
        if (needsSync) {
          await redis.set('el_nino_registrations', data);
        }

        memoryRegistrations = data;
        return data;
      }
    } catch (redisErr) {
      console.warn("Redis fetch fallback to disk/memory:", redisErr);
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
 * Persists permanently to Upstash Redis, /tmp disk, and triggers Cloud Webhook (Google Sheets / Discord).
 */
export async function saveRegistration(registration: CompetitionRegistration): Promise<CompetitionRegistration> {
  // If screenshot is raw Base64, save to receipt:<id> in Redis and store clean URL in Upstash
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://hackathon-portal-pi.vercel.app';
  if (registration.payment?.screenshotUrl && registration.payment.screenshotUrl.startsWith('data:image/')) {
    await saveReceiptImage(registration.id, registration.payment.screenshotUrl);
    registration.payment.screenshotUrl = `${appUrl}/api/receipt/${registration.id}`;
  }

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

  // 2. Persist permanently to Cloud Redis (Upstash / Vercel KV)
  await syncToCloud(updated);

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

  await syncToCloud(all);
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

  await syncToCloud(filtered);
  return true;
}
