import { NextRequest, NextResponse } from 'next/server';
import { getAllRegistrations, updateRegistrationStatus } from '@/lib/storage';
import { convertRegistrationsToCSV } from '@/lib/utils';
import { timingSafeCompare, checkRateLimit, recordRateLimitAttempt, resetRateLimit } from '@/lib/security';

export const dynamic = 'force-dynamic';

const ADMIN_PASSKEY = process.env.ADMIN_SECRET || 'Synapse#Fest2026';

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') || '127.0.0.1';
}

function verifyAuthorization(req: NextRequest, ip: string): { authorized: boolean; error?: string; status?: number } {
  // Check if IP is currently locked out by brute-force detector
  const rate = checkRateLimit(ip, 'admin_auth', 5, 10 * 60 * 1000, 15 * 60 * 1000);
  if (!rate.allowed) {
    return {
      authorized: false,
      error: `Too many failed attempts. Security lockout active. Please try again in ${rate.retryAfterSec} seconds.`,
      status: 429
    };
  }

  // Extract provided key from Authorization header or ?key= param
  let candidateKey = '';
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    candidateKey = authHeader.slice(7).trim();
  } else {
    const { searchParams } = new URL(req.url);
    candidateKey = searchParams.get('key')?.trim() || '';
  }

  if (!candidateKey) {
    return { authorized: false, error: 'Unauthorized: Passkey required', status: 401 };
  }

  // Constant-time comparison (Prevents timing attacks)
  const isValid = timingSafeCompare(candidateKey, ADMIN_PASSKEY);

  if (!isValid) {
    recordRateLimitAttempt(ip, 'admin_auth');
    return {
      authorized: false,
      error: `Unauthorized: Invalid Admin Secret. (${rate.remaining - 1} attempts remaining before lockout)`,
      status: 401
    };
  }

  // Reset rate limit on successful authorization
  resetRateLimit(ip, 'admin_auth');
  return { authorized: true };
}

export async function GET(req: NextRequest) {
  const clientIp = getClientIp(req);
  const auth = verifyAuthorization(req, clientIp);

  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status || 401 });
  }

  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format');
  const compFilter = searchParams.get('competition');
  
  let registrations = getAllRegistrations();

  if (compFilter && compFilter !== 'all') {
    registrations = registrations.filter(r => r.competitionId === compFilter);
  }

  if (format === 'csv') {
    const csvContent = convertRegistrationsToCSV(registrations);
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="el-nino-synapse-registrations-${new Date().toISOString().slice(0, 10)}.csv"`
      }
    });
  }

  const totalFeeCollected = registrations.reduce((acc, r) => acc + (r.fee || 0), 0);
  const totalStudents = registrations.reduce((acc, r) => acc + 1 + (r.members ? r.members.length : 0), 0);

  return NextResponse.json({
    registrations,
    metrics: {
      totalRegistrations: registrations.length,
      totalStudents,
      totalFeeCollected,
      byCompetition: {
        hackathon: registrations.filter(r => r.competitionId === 'hackathon').length,
        ideathon: registrations.filter(r => r.competitionId === 'ideathon').length,
        'reel-making': registrations.filter(r => r.competitionId === 'reel-making').length,
        'science-exhibition': registrations.filter(r => r.competitionId === 'science-exhibition').length,
      }
    }
  });
}

export async function PATCH(req: NextRequest) {
  const clientIp = getClientIp(req);
  const auth = verifyAuthorization(req, clientIp);

  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status || 401 });
  }

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !['confirmed', 'pending_verification', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const success = updateRegistrationStatus(id, status);
    if (!success) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Status updated securely' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
  }
}
