import { NextRequest, NextResponse } from 'next/server';
import { saveRegistration, getAllRegistrations, getRegistrationById } from '@/lib/storage';
import { generateRegistrationId } from '@/lib/utils';
import { Registration } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Required fields check
    if (!body.leaderName || !body.leaderEmail || !body.collegeOrCompany) {
      return NextResponse.json(
        { error: 'Missing required fields: Name, Email, and Organization/College are required.' },
        { status: 400 }
      );
    }

    if (body.registrationType === 'team' && !body.teamName) {
      return NextResponse.json(
        { error: 'Team name is required for team registrations.' },
        { status: 400 }
      );
    }

    const newRegistration: Registration = {
      id: generateRegistrationId(),
      registrationType: body.registrationType || 'solo',
      teamName: body.teamName || undefined,
      leaderName: body.leaderName.trim(),
      leaderEmail: body.leaderEmail.trim().toLowerCase(),
      leaderPhone: body.leaderPhone?.trim() || '',
      collegeOrCompany: body.collegeOrCompany.trim(),
      graduationYear: body.graduationYear || '2026',
      experienceLevel: body.experienceLevel || 'intermediate',
      primaryTrack: body.primaryTrack || 'ai-agents',
      skills: Array.isArray(body.skills) ? body.skills : [],
      githubUrl: body.githubUrl?.trim() || undefined,
      linkedinUrl: body.linkedinUrl?.trim() || undefined,
      portfolioUrl: body.portfolioUrl?.trim() || undefined,
      projectPitch: body.projectPitch?.trim() || undefined,
      members: Array.isArray(body.members) ? body.members : [],
      tshirtSize: body.tshirtSize || 'L',
      dietaryRestrictions: body.dietaryRestrictions || 'None',
      agreedToTerms: Boolean(body.agreedToTerms),
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
      recentCount: all.length
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
