import { NextRequest, NextResponse } from 'next/server';
import { getRegistrationById } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return new NextResponse('Missing registration ID', { status: 400 });
    }

    const reg = await getRegistrationById(id);
    if (!reg || !reg.payment?.screenshotUrl) {
      return new NextResponse('Receipt image not found for this registration', { status: 404 });
    }

    const dataUrl = reg.payment.screenshotUrl;
    // Expected format: data:image/jpeg;base64,... or data:image/png;base64,...
    const matches = dataUrl.match(/^data:([A-Za-z0-9\-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return new NextResponse('Invalid receipt image data', { status: 500 });
    }

    const contentType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
        'Content-Disposition': `inline; filename="receipt-${id}.jpg"`
      }
    });
  } catch (err: any) {
    return new NextResponse('Failed to retrieve receipt: ' + err.message, { status: 500 });
  }
}
