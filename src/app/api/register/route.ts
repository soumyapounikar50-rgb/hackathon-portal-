import { NextRequest, NextResponse } from 'next/server';
import { saveRegistration, getAllRegistrations, getRegistrationById } from '@/lib/storage';
import { generateRegistrationId } from '@/lib/utils';
import { CompetitionRegistration } from '@/types';
import { 
  checkRateLimit, recordRateLimitAttempt, sanitizeInput, 
  sanitizeStudent, isDuplicateTransactionId 
} from '@/lib/security';
import { sendRegistrationConfirmationEmail } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') || '127.0.0.1';
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\s\-()]{7,20}$/;

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);

    // 1. Anti-Bot / Anti-Spam Rate Limiting: Max 8 submissions per 10 minutes per IP
    const rate = checkRateLimit(clientIp, 'registration_submission', 8, 10 * 60 * 1000, 15 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: `Too many registration attempts from this device. Please wait ${rate.retryAfterSec} seconds before trying again.` },
        { status: 429 }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid or oversized payload received. Please upload a compressed screenshot image.' },
        { status: 400 }
      );
    }

    // 2. Mandatory Fields Check
    if (!body.competitionId || !body.teamName || !body.leader) {
      return NextResponse.json(
        { error: 'Missing required fields: Competition, Team Name, and Student details are required.' },
        { status: 400 }
      );
    }

    const validCompetitions = ['hackathon', 'ideathon', 'reel-making'];
    if (!validCompetitions.includes(body.competitionId)) {
      return NextResponse.json(
        { error: 'Invalid competition selected. Please choose Hackathon, Ideathon, or Reel Making.' },
        { status: 400 }
      );
    }

    const rawLeader = body.leader;
    if (!rawLeader.name || !rawLeader.email || !rawLeader.phone || !rawLeader.branchAndYear || !rawLeader.college) {
      return NextResponse.json(
        { error: 'Please fill in all details for Member #1 (Name, Email, Phone, Branch/Yr, College).' },
        { status: 400 }
      );
    }

    // 3. Format Validation (Email & Phone)
    if (!EMAIL_REGEX.test(rawLeader.email)) {
      return NextResponse.json({ error: 'Invalid email address provided for Team Leader.' }, { status: 400 });
    }
    if (!PHONE_REGEX.test(rawLeader.phone)) {
      return NextResponse.json({ error: 'Invalid phone number provided for Team Leader.' }, { status: 400 });
    }

    // 4. Payment UTR & Anti-Duplicate Fraud Check
    const rawUtr = body.payment?.transactionId?.trim();
    if (!rawUtr || rawUtr.length < 6) {
      return NextResponse.json(
        { error: 'Please enter a valid 12-digit UPI Transaction ID / UTR.' },
        { status: 400 }
      );
    }

    if (await isDuplicateTransactionId(rawUtr)) {
      return NextResponse.json(
        { error: `This UPI Transaction ID (${rawUtr}) has already been used by another team. Duplicate payment submissions are rejected.` },
        { status: 409 }
      );
    }

    // 5. Screenshot Payload Verification (Strict 500 KB Limit, Valid Data URI)
    let sanitizedScreenshot: string | undefined = undefined;
    if (body.payment?.screenshotUrl) {
      const screenshot = String(body.payment.screenshotUrl);
      // 500 KB binary = ~683 KB Base64 string length
      const MAX_SCREENSHOT_BASE64_LEN = 700 * 1024;
      if (screenshot.length > MAX_SCREENSHOT_BASE64_LEN) {
        return NextResponse.json(
          { error: 'Screenshot file size exceeds the strict 500 KB limit. Please upload a compressed screenshot under 500 KB.' }, 
          { status: 413 }
        );
      }
      if (!screenshot.startsWith('data:image/')) {
        return NextResponse.json({ error: 'Invalid screenshot file format. Only images are allowed.' }, { status: 400 });
      }
      sanitizedScreenshot = screenshot;
    }

    // 6. Sanitize All Inputs
    const cleanLeader = sanitizeStudent(rawLeader);
    const cleanMembers = Array.isArray(body.members)
      ? body.members.map((m: any) => sanitizeStudent(m))
      : [];

    const newRegistration: CompetitionRegistration = {
      id: generateRegistrationId(body.competitionId),
      competitionId: sanitizeInput(body.competitionId, 30) as any,
      competitionName: sanitizeInput(body.competitionName, 50),
      teamName: sanitizeInput(body.teamName, 80),
      fee: Number(body.fee) || 0,
      leader: cleanLeader,
      members: cleanMembers,
      payment: {
        method: 'upi',
        transactionId: sanitizeInput(rawUtr, 50),
        screenshotUrl: sanitizedScreenshot,
        amount: Number(body.payment?.amount) || Number(body.fee) || 0
      },
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // 7. Save to Storage
    const saved = await saveRegistration(newRegistration);

    // Track rate limit attempt
    recordRateLimitAttempt(clientIp, 'registration_submission');

    // 8. Trigger Automated Confirmation Email (non-blocking)
    const origin = req.nextUrl.origin || `https://${req.headers.get('host') || 'el-nino-synapse.vercel.app'}`;
    sendRegistrationConfirmationEmail(saved, origin).catch((mailErr) => {
      console.error('[Auto-Mail Background Error]:', mailErr);
    });

    return NextResponse.json({
      success: true,
      message: 'Registration successfully secured and recorded! Confirmation email dispatched.',
      registration: saved
    }, { status: 201 });

  } catch (error: any) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { error: 'An error occurred while securing your registration. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const sanitizedId = sanitizeInput(id, 40);
      const found = await getRegistrationById(sanitizedId);
      if (!found) {
        return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
      }
      return NextResponse.json({ registration: found });
    }

    const all = await getAllRegistrations();
    return NextResponse.json({
      totalCount: all.length,
      competitions: {
        hackathon: all.filter(r => r.competitionId === 'hackathon').length,
        ideathon: all.filter(r => r.competitionId === 'ideathon').length,
        'reel-making': all.filter(r => r.competitionId === 'reel-making').length
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}
