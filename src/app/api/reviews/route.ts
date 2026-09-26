import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { spotId, userName, rating, comment } = body;

    if (!spotId || !userName || !rating || !comment) {
      return NextResponse.json({ error: 'Todos los campos son requeridos para publicar una reseña' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        spotId,
        userName,
        rating: Number(rating),
        comment,
      },
    });

    // Recalculate average overall score for the spot
    const allReviews = await prisma.review.findMany({
      where: { spotId },
      select: { rating: true },
    });

    const total = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgScore = Number((total / allReviews.length).toFixed(1));

    await prisma.spot.update({
      where: { id: spotId },
      data: { overallScore: avgScore },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    console.error('Error adding review:', error);
    return NextResponse.json({ error: 'Failed to add review' }, { status: 500 });
  }
}
