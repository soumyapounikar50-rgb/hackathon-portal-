import crypto from 'crypto';
import { getAllRegistrations } from './storage';
import { StudentMember } from '../types';

// Rate Limiting Store: stores attempt timestamps per IP
interface RateLimitRecord {
  attempts: number[];
  lockedUntil?: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Clean up old rate limit records periodically
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((record, key) => {
    record.attempts = record.attempts.filter(t => now - t < 15 * 60 * 1000);
    if (record.attempts.length === 0 && (!record.lockedUntil || record.lockedUntil < now)) {
      rateLimitMap.delete(key);
    }
  });
}, 5 * 60 * 1000);

/**
 * Constant-Time String Comparison using crypto.timingSafeEqual
 * Protects against side-channel timing attacks that guess passkeys character-by-character.
 */
export function timingSafeCompare(userInput: string, secret: string): boolean {
  if (typeof userInput !== 'string' || typeof secret !== 'string') {
    return false;
  }

  // Hash both inputs using SHA-256 so buffers have identical byte lengths
  const hashUser = crypto.createHash('sha256').update(userInput).digest();
  const hashSecret = crypto.createHash('sha256').update(secret).digest();

  return crypto.timingSafeEqual(hashUser, hashSecret);
}

/**
 * Strict Rate Limiter with Anti-Brute-Force IP Lockout
 * @param ip Client IP address
 * @param action Category identifier ('admin_auth' | 'registration_submission')
 * @param maxAttempts Max allowed attempts within the time window
 * @param windowMs Time window in milliseconds
 * @param lockoutMs Lockout period if threshold exceeded
 */
export function checkRateLimit(
  ip: string,
  action: 'admin_auth' | 'registration_submission',
  maxAttempts: number = 5,
  windowMs: number = 10 * 60 * 1000,
  lockoutMs: number = 15 * 60 * 1000
): { allowed: boolean; remaining: number; retryAfterSec?: number } {
  const key = `${action}:${ip || 'unknown'}`;
  const now = Date.now();
  let record = rateLimitMap.get(key);

  if (!record) {
    record = { attempts: [] };
    rateLimitMap.set(key, record);
  }

  // Check if IP is currently locked out
  if (record.lockedUntil && record.lockedUntil > now) {
    const retryAfterSec = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  // Filter attempts within the sliding window
  record.attempts = record.attempts.filter(t => now - t < windowMs);

  if (record.attempts.length >= maxAttempts) {
    // Lock out the attacker
    record.lockedUntil = now + lockoutMs;
    const retryAfterSec = Math.ceil(lockoutMs / 1000);
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  return { allowed: true, remaining: maxAttempts - record.attempts.length };
}

/**
 * Record a failed attempt
 */
export function recordRateLimitAttempt(ip: string, action: 'admin_auth' | 'registration_submission') {
  const key = `${action}:${ip || 'unknown'}`;
  let record = rateLimitMap.get(key);
  if (!record) {
    record = { attempts: [] };
    rateLimitMap.set(key, record);
  }
  record.attempts.push(Date.now());
}

/**
 * Reset rate limit attempts (e.g. on successful login)
 */
export function resetRateLimit(ip: string, action: 'admin_auth' | 'registration_submission') {
  const key = `${action}:${ip || 'unknown'}`;
  rateLimitMap.delete(key);
}

/**
 * Input Sanitization to prevent XSS, HTML/Script injection & CSV Formula injection
 */
export function sanitizeInput(input: string | undefined | null, maxLen: number = 250): string {
  if (!input || typeof input !== 'string') return '';
  
  // Truncate length
  let clean = input.slice(0, maxLen).trim();

  // Prevent CSV Formula Injection (=, +, -, @ at beginning)
  if (/^[=+\-@]/.test(clean)) {
    clean = `'${clean}`;
  }

  // Escape dangerous HTML entities
  clean = clean
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  return clean;
}

/**
 * Validate and sanitize student member fields
 */
export function sanitizeStudent(member: StudentMember): StudentMember {
  return {
    name: sanitizeInput(member.name, 100),
    email: sanitizeInput(member.email?.toLowerCase(), 120),
    phone: sanitizeInput(member.phone, 25),
    branchAndYear: sanitizeInput(member.branchAndYear, 80),
    college: sanitizeInput(member.college, 150)
  };
}

/**
 * Anti-Fraud: Detect duplicate UTR / Transaction IDs
 * Prevents dishonest teams from submitting the same UPI receipt multiple times.
 */
export async function isDuplicateTransactionId(transactionId: string): Promise<boolean> {
  if (!transactionId || typeof transactionId !== 'string') return true;
  
  const normalized = transactionId.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  if (normalized.length < 6) return true; // Invalid format

  const all = await getAllRegistrations();
  return all.some(r => {
    const existing = r.payment?.transactionId?.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return existing === normalized;
  });
}
