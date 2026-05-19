import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProductForm from '@/components/admin/ProductForm'

export default async function EditProduct({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } })
  if (!product) notFound()

  return (
    <div>
      <h1 className="font-serif text-[2rem] mb-2" style={{ color: '#3A4A2C' }}>Edit Product</h1>
      <p className="font-sans text-[0.78rem] mb-8" style={{ color: '#5A5A5A' }}>{product.name}</p>
      <div className="bg-white p-8" style={{ border: '1px solid rgba(75,94,58,0.1)' }}>
        <ProductForm initial={{ ...product, originalPrice: product.originalPrice ?? undefined, badge: product.badge ?? undefined, imageUrl: product.imageUrl ?? undefined }} />
      </div>
    </div>
  )
}
