import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { spotId, noiseLevel, wifiRating, outlets, occupancy, comment } = body;

    if (!spotId || !noiseLevel || !wifiRating || !outlets || !occupancy) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos en el reporte' }, { status: 400 });
    }

    // Create report
    const newReport = await prisma.report.create({
      data: {
        spotId,
        noiseLevel,
        wifiRating,
        outlets,
        occupancy,
        comment: comment || null,
      },
    });

    // Update current live state of the spot
    await prisma.spot.update({
      where: { id: spotId },
      data: {
        noiseLevel,
        wifiRating,
        outlets,
        occupancy,
      },
    });

    return NextResponse.json(newReport, { status: 201 });
  } catch (error: any) {
    console.error('Error submitting report:', error);
    return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
  }
}
