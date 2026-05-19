import ProductForm from '@/components/admin/ProductForm'

export default function NewProduct() {
  return (
    <div>
      <h1 className="font-serif text-[2rem] mb-2" style={{ color: '#3A4A2C' }}>Add Product</h1>
      <p className="font-sans text-[0.78rem] mb-8" style={{ color: '#5A5A5A' }}>Create a new product listing.</p>
      <div className="bg-white p-8" style={{ border: '1px solid rgba(75,94,58,0.1)' }}>
        <ProductForm />
      </div>
    </div>
  )
}
