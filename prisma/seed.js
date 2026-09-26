const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding WorkSpot database with Santo Domingo remote work locations...');

  await prisma.review.deleteMany();
  await prisma.report.deleteMany();
  await prisma.spot.deleteMany();

  const spots = [
    {
      name: 'WorkSpace SD - Piantini',
      category: 'Coworking',
      address: 'Av. Winston Churchill #102, Piantini',
      city: 'Santo Domingo',
      zone: 'Piantini',
      lat: 18.4712,
      lng: -69.9320,
      isVerified: true,
      verifiedPerk: '☕ Café refill ilimitado y 15% desc. en pases diarios para miembros WorkSpot',
      imageUrl: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&auto=format&fit=crop',
      wifiRating: 'Fast',
      noiseLevel: 'Quiet',
      outlets: 'Abundant',
      occupancy: 'Medium',
      overallScore: 4.9,
      reviews: {
        create: [
          { userName: 'Bryan Rojas', rating: 5, comment: 'Excelente conexión de fibra óptica, tomacorrientes en cada mesa y ambiente muy silencioso.' },
          { userName: 'Carlos M.', rating: 5, comment: 'Ideal para llamadas de trabajo. La comunidad es súper profesional.' }
        ]
      },
      reports: {
        create: [
          { noiseLevel: 'Quiet', wifiRating: 'Fast', outlets: 'Abundant', occupancy: 'Medium', comment: 'Todo fluyendo perfecto hoy en la mañana.' }
        ]
      }
    },
    {
      name: 'Café Conde & Art',
      category: 'Cafe',
      address: 'Calle El Conde #254, Zona Colonial',
      city: 'Santo Domingo',
      zone: 'Zona Colonial',
      lat: 18.4735,
      lng: -69.8850,
      isVerified: false,
      verifiedPerk: null,
      imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop',
      wifiRating: 'Medium',
      noiseLevel: 'Moderate',
      outlets: 'Scarce',
      occupancy: 'High',
      overallScore: 4.2,
      reviews: {
        create: [
          { userName: 'Laura G.', rating: 4, comment: 'Buen café artesanal y vista inspiradora, aunque hay pocos tomacorrientes cerca del patio.' }
        ]
      },
      reports: {
        create: [
          { noiseLevel: 'Moderate', wifiRating: 'Medium', outlets: 'Scarce', occupancy: 'High', comment: 'Lleno a las 3:00 PM, pero el Wi-Fi funciona estable.' }
        ]
      }
    },
    {
      name: 'Biblioteca Nacional Pedro Henríquez Ureña',
      category: 'Library',
      address: 'Av. César Nicolás Penson, Plaza de la Cultura',
      city: 'Santo Domingo',
      zone: 'Zona Universitaria',
      lat: 18.4688,
      lng: -69.9125,
      isVerified: false,
      verifiedPerk: null,
      imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop',
      wifiRating: 'Fast',
      noiseLevel: 'Quiet',
      outlets: 'Abundant',
      occupancy: 'Low',
      overallScore: 4.8,
      reviews: {
        create: [
          { userName: 'Félix A.', rating: 5, comment: 'El mejor lugar si necesitas 100% silencio para codificar o estudiar.' }
        ]
      },
      reports: {
        create: [
          { noiseLevel: 'Quiet', wifiRating: 'Fast', outlets: 'Abundant', occupancy: 'Low', comment: 'Salas de lectura climatizadas y excelente señal.' }
        ]
      }
    },
    {
      name: 'Chez Space Hub',
      category: 'Coworking',
      address: 'Calle Max Henríquez Ureña #29, Naco',
      city: 'Santo Domingo',
      zone: 'Naco',
      lat: 18.4795,
      lng: -69.9380,
      isVerified: true,
      verifiedPerk: '🥐 10% desc. en cafetería y acceso prioritario a salas de reuniones',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop',
      wifiRating: 'Fast',
      noiseLevel: 'Quiet',
      outlets: 'Abundant',
      occupancy: 'Medium',
      overallScore: 4.7,
      reviews: {
        create: [
          { userName: 'Mariana P.', rating: 5, comment: 'Súper acogedor, con cabinas acústicas individuales para Google Meet / Zoom.' }
        ]
      },
      reports: {
        create: [
          { noiseLevel: 'Quiet', wifiRating: 'Fast', outlets: 'Abundant', occupancy: 'Medium', comment: 'Wi-Fi simétrico de 300 Mbps probado.' }
        ]
      }
    },
    {
      name: 'El Huerto Café & Work - Bella Vista',
      category: 'Cafe',
      address: 'Av. Bella Vista #45, Bella Vista',
      city: 'Santo Domingo',
      zone: 'Bella Vista',
      lat: 18.4520,
      lng: -69.9480,
      isVerified: false,
      verifiedPerk: null,
      imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop',
      wifiRating: 'Fast',
      noiseLevel: 'Moderate',
      outlets: 'Abundant',
      occupancy: 'Low',
      overallScore: 4.4,
      reviews: {
        create: [
          { userName: 'David R.', rating: 4, comment: 'Buena iluminación natural, ambiente relajado e internet rápido.' }
        ]
      },
      reports: {
        create: [
          { noiseLevel: 'Moderate', wifiRating: 'Fast', outlets: 'Abundant', occupancy: 'Low', comment: 'Mesas exteriores con sombra y enchufes.' }
        ]
      }
    }
  ];

  for (const spotData of spots) {
    await prisma.spot.create({
      data: spotData,
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
