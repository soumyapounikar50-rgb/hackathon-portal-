import { NextRequest, NextResponse } from 'next/server';
import { saveRegistration, getAllRegistrations, getRegistrationById } from '@/lib/storage';
import { generateRegistrationId } from '@/lib/utils';
import { CompetitionRegistration } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.competitionId || !body.teamName || !body.leader) {
      return NextResponse.json(
        { error: 'Missing required fields: Competition, Team Name, and Member details are required.' },
        { status: 400 }
      );
    }

    const leader = body.leader;
    if (!leader.name || !leader.email || !leader.phone || !leader.branchAndYear || !leader.college) {
      return NextResponse.json(
        { error: 'Please fill in all details for Member #1 (Name, Email, Phone, Branch/Yr, College).' },
        { status: 400 }
      );
    }

    if (!body.payment?.transactionId) {
      return NextResponse.json(
        { error: 'Payment Transaction ID / UTR is required.' },
        { status: 400 }
      );
    }

    const newRegistration: CompetitionRegistration = {
      id: generateRegistrationId(body.competitionId),
      competitionId: body.competitionId,
      competitionName: body.competitionName || body.competitionId,
      teamName: body.teamName.trim(),
      fee: Number(body.fee) || 0,
      leader: {
        name: leader.name.trim(),
        email: leader.email.trim().toLowerCase(),
        phone: leader.phone.trim(),
        branchAndYear: leader.branchAndYear.trim(),
        college: leader.college.trim()
      },
      members: Array.isArray(body.members) ? body.members.map((m: any) => ({
        name: m.name?.trim() || '',
        email: m.email?.trim()?.toLowerCase() || '',
        phone: m.phone?.trim() || '',
        branchAndYear: m.branchAndYear?.trim() || '',
        college: m.college?.trim() || ''
      })) : [],
      payment: {
        method: body.payment.method || 'upi',
        transactionId: body.payment.transactionId.trim(),
        screenshotUrl: body.payment.screenshotUrl || undefined,
        amount: Number(body.payment.amount) || Number(body.fee) || 0
      },
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    const saved = await saveRegistration(newRegistration);

    return NextResponse.json({
      success: true,
      message: 'Registration successful!',
      registration: saved
    }, { status: 201 });

  } catch (error: any) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process registration' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const found = getRegistrationById(id);
      if (!found) {
        return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
      }
      return NextResponse.json({ registration: found });
    }

    const all = getAllRegistrations();
    return NextResponse.json({
      totalCount: all.length,
      competitions: {
        hackathon: all.filter(r => r.competitionId === 'hackathon').length,
        ideathon: all.filter(r => r.competitionId === 'ideathon').length,
        'reel-making': all.filter(r => r.competitionId === 'reel-making').length,
        'science-exhibition': all.filter(r => r.competitionId === 'science-exhibition').length
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
