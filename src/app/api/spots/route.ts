import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const zone = searchParams.get('zone') || '';
    const filter = searchParams.get('filter') || ''; // 'verified', 'fast_wifi', 'quiet', 'abundant_outlets'

    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { address: { contains: search } },
        { zone: { contains: search } },
      ];
    }

    if (category && category !== 'All') {
      whereClause.category = category;
    }

    if (zone && zone !== 'All') {
      whereClause.zone = zone;
    }

    if (filter === 'verified') {
      whereClause.isVerified = true;
    } else if (filter === 'fast_wifi') {
      whereClause.wifiRating = 'Fast';
    } else if (filter === 'quiet') {
      whereClause.noiseLevel = 'Quiet';
    } else if (filter === 'abundant_outlets') {
      whereClause.outlets = 'Abundant';
    }

    const spots = await prisma.spot.findMany({
      where: whereClause,
      include: {
        reports: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        reviews: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
      orderBy: { overallScore: 'desc' },
    });

    return NextResponse.json(spots);
  } catch (error: any) {
    console.error('Error fetching spots:', error);
    return NextResponse.json({ error: 'Failed to fetch spots' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, address, zone, lat, lng, isVerified, verifiedPerk, wifiRating, noiseLevel, outlets, imageUrl } = body;

    if (!name || !category || !address || !zone || lat === undefined || lng === undefined) {
      return NextResponse.json({ error: 'Faltan campos requeridos para registrar el espacio' }, { status: 400 });
    }

    const newSpot = await prisma.spot.create({
      data: {
        name,
        category,
        address,
        zone,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        isVerified: Boolean(isVerified),
        verifiedPerk: verifiedPerk || null,
        wifiRating: wifiRating || 'Fast',
        noiseLevel: noiseLevel || 'Moderate',
        outlets: outlets || 'Abundant',
        occupancy: 'Low',
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&auto=format&fit=crop',
      },
    });

    return NextResponse.json(newSpot, { status: 201 });
  } catch (error: any) {
    console.error('Error creating spot:', error);
    return NextResponse.json({ error: 'Failed to create spot' }, { status: 500 });
  }
}
