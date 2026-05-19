import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Admin user
  const hashedPw = await bcrypt.hash('admin123', 12)
  await prisma.adminUser.upsert({
    where: { email: 'admin@miras.com' },
    update: {},
    create: { email: 'admin@miras.com', password: hashedPw, name: 'Miras Admin' },
  })

  // Products — clear and re-seed for idempotency
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.product.deleteMany()

  await prisma.product.createMany({
    data: [
      {
        name: 'Khamak Garden Dress',
        subtitle: 'Hazargi Embroidery',
        price: 285,
        badge: 'new',
        color: '#3A4A2C',
        category: 'khamak',
        stockQty: 8,
        imageUrl: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Silk Evening Kurta',
        subtitle: 'Hand-Stitched',
        price: 340,
        originalPrice: 420,
        badge: 'handstitched',
        color: '#4A3A2C',
        category: 'dress',
        stockQty: 5,
        imageUrl: 'https://images.unsplash.com/photo-1614251056798-0a63eda2bb25?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Heritage Shawl',
        subtitle: 'Wool & Silk Blend',
        price: 195,
        color: '#2C3A4A',
        category: 'accessories',
        stockQty: 15,
        imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Embroidered Blouse',
        subtitle: 'Khamak Pattern',
        price: 220,
        badge: 'new',
        color: '#4A2C3A',
        category: 'embroidered',
        stockQty: 10,
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Floral Khamak Set',
        subtitle: 'Two-Piece Ensemble',
        price: 380,
        color: '#3C4A3A',
        category: 'khamak',
        stockQty: 4,
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Midnight Garden Dress',
        subtitle: 'Silk Embroidery',
        price: 310,
        badge: 'handstitched',
        color: '#2A3C3A',
        category: 'dress',
        stockQty: 6,
        imageUrl: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Tribal Scarf',
        subtitle: 'Hand-Woven Wool',
        price: 145,
        color: '#4A4A2C',
        category: 'accessories',
        stockQty: 20,
        imageUrl: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Royal Khamak Abaya',
        subtitle: 'Full Embroidery',
        price: 450,
        originalPrice: 520,
        color: '#3A2C4A',
        category: 'khamak',
        stockQty: 3,
        imageUrl: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=600&q=80',
      },
    ],
  })

  // Collections
  await prisma.collection.deleteMany()
  await prisma.collection.createMany({
    data: [
      { name: 'Khamak Heritage', tag: 'Featured Collection', color: '#3A4A2C', sortOrder: 0, imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80' },
      { name: 'Evening Grace',   tag: 'New Arrival',         color: '#2C3A1E', sortOrder: 1, imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=800&q=80' },
      { name: 'Desert Bloom',    tag: 'Spring 2025',         color: '#4A3A2C', sortOrder: 2, imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80' },
      { name: 'Mountain Spirit', tag: 'Limited Edition',     color: '#2C3040', sortOrder: 3, imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80' },
      { name: 'Silk Gardens',    tag: 'Bestseller',          color: '#3C2C40', sortOrder: 4, imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80' },
    ],
  })

  console.log('✓ Seeded: 1 admin, 8 products, 5 collections')
  console.log('  Admin login: admin@miras.com / admin123')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
