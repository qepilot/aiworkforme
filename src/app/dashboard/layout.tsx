import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // The proxy already redirects unauthenticated visitors away from
  // /dashboard/*, but the layout re-verifies the session itself rather than
  // relying on the proxy as the only line of defense.
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/sign-in?next=/dashboard')
  }

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row">
        <DashboardSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  )
}
