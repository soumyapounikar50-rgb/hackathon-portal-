import { NextRequest, NextResponse } from 'next/server';
import { getAllRegistrations, updateRegistrationStatus } from '@/lib/storage';
import { convertRegistrationsToCSV } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const ADMIN_PASSKEY = process.env.ADMIN_SECRET || 'admin123';

function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader === `Bearer ${ADMIN_PASSKEY}`) {
    return true;
  }
  const { searchParams } = new URL(req.url);
  if (searchParams.get('key') === ADMIN_PASSKEY) {
    return true;
  }
  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized: Invalid Admin Secret' }, { status: 401 });
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
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    return NextResponse.json({ success: true, message: 'Status updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
