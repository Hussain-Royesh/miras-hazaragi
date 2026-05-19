import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [totalOrders, ordersToday, revenueData, productCount, customerCount, subscriberCount, lowStock, recentOrders] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { createdAt: { gte: today } } }),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.product.count(),
      prisma.customer.count(),
      prisma.newsletterSubscriber.count(),
      prisma.product.findMany({ where: { stockQty: { lte: 5 }, inStock: true }, select: { id: true, name: true, stockQty: true } }),
      prisma.order.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        include: { items: { select: { name: true, quantity: true } } },
      }),
    ])

  return NextResponse.json({
    totalOrders,
    ordersToday,
    totalRevenue: revenueData._sum.total ?? 0,
    productCount,
    customerCount,
    subscriberCount,
    lowStock,
    recentOrders,
  })
}
