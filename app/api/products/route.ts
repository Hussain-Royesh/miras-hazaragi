import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')

  const products = await prisma.product.findMany({
    where: {
      inStock: true,
      ...(category && category !== 'all' ? { category } : {}),
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(products)
}
