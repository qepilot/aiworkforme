import { signOut } from '@/app/actions/auth'

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="rounded-full border border-border px-4 py-2.5 text-sm font-medium text-text transition-colors hover:text-ink"
      >
        Sign out
      </button>
    </form>
  )
}
