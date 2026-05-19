import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SessionProvider from '@/components/admin/SessionProvider'
import Sidebar from '@/components/admin/Sidebar'

export const metadata: Metadata = { title: 'Miras Admin' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen" style={{ background: '#F5F4F0', fontFamily: 'var(--font-jost), sans-serif' }}>
        <Sidebar />
        <main className="flex-1 ml-64 p-8 min-h-screen">
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}
