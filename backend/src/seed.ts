import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1. Seed Admin User
  const email = 'admin@naturefresh.com';
  const password = 'admin2123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: {
      email,
      password: hashedPassword,
      name: 'Senior Admin',
    },
  });

  console.log('Admin user verified:', user.email);

  // 2. Clear existing products
  await prisma.product.deleteMany({});

  // 3. Seed Real Seafood Products with 3 images each
  const products = [
    {
      name: 'Yellowfin Tuna (Thunnus albacares)',
      description: 'Premium export-grade Yellowfin Tuna, sustainably caught and flash-frozen to maintain sashimi quality. Known for its deep red color and firm texture, our tuna is a favorite for high-end seafood distributors.',
      category: 'Fish',
      images: [
        'https://images.unsplash.com/photo-1599058917233-33230f252601?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1534604973900-c41ab4c5d4b0?auto=format&fit=crop&q=80&w=800'
      ],
      status: 'In Stock'
    },
    {
      name: 'Black Tiger Shrimp (Penaeus monodon)',
      description: 'Large, succulent Black Tiger Shrimp, perfect for grilling or fine dining. Sustainably farmed and processed for global export under strict cold-chain management.',
      category: 'Shrimp',
      images: [
        'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1559740038-0382379377cd?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1565694202881-44951167193a?auto=format&fit=crop&q=80&w=800'
      ],
      status: 'In Stock'
    },
    {
      name: 'Blue Swimmer Crab',
      description: 'Sweet, tender meat from the best Blue Swimmer Crabs. Cleaned and prepared under strict hygiene standards for international markets. Ideal for retail and hospitality.',
      category: 'Other',
      images: [
        'https://images.unsplash.com/photo-1551462147-37885acc3c41?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1626200419199-341af157ce3e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1550951053-48e02d442017?auto=format&fit=crop&q=80&w=800'
      ],
      status: 'In Stock'
    },
    {
      name: 'Spanish Mackerel (King Fish)',
      description: 'Firm-textured and rich in flavor, our Spanish Mackerel is a favorite in international markets for its versatility and taste. Perfect for steaks or whole fish distribution.',
      category: 'Fish',
      images: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1534604973900-c41ab4c5d4b0?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1599058917233-33230f252601?auto=format&fit=crop&q=80&w=800'
      ],
      status: 'In Stock'
    },
    {
      name: 'Premium Cuttlefish',
      description: 'Tender and flavorful Cuttlefish, ideal for gourmet seafood dishes. Processed under strict HACCP standards for maximum freshness and texture integrity.',
      category: 'Other',
      images: [
        'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1626645272637-8339c92cc548?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1501595091296-3a970af26428?auto=format&fit=crop&q=80&w=800'
      ],
      status: 'In Stock'
    },
    {
      name: 'Red Snapper',
      description: 'Freshly caught Red Snapper with a mild, sweet flavor. High in protein and perfect for premium retail or restaurant supply. Hand-picked for uniform size and quality.',
      category: 'Fish',
      images: [
        'https://images.unsplash.com/photo-1534604973900-c41ab4c5d4b0?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1599058917233-33230f252601?auto=format&fit=crop&q=80&w=800'
      ],
      status: 'In Stock'
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Seeded 6 real seafood products with 3 images each successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
