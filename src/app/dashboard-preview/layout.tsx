import DashboardSidebar from '@/components/dashboard/DashboardSidebar'

// Unauthenticated preview of the signed-in dashboard, for reviewing the UI
// before a real Supabase project is wired up. Not linked from the app and
// not covered by the auth middleware — deliberately separate from
// /dashboard so it never weakens the real auth gate.
export default function DashboardPreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-3 text-sm text-amber-800">
          <strong>Preview mode</strong> — sample data, no real auth or Supabase calls. See{' '}
          <a href="/dashboard" className="underline">
            /dashboard
          </a>{' '}
          for the real, auth-gated version.
        </div>
        <div className="flex flex-col gap-8 md:flex-row">
          <DashboardSidebar basePath="/dashboard-preview" />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  )
}
