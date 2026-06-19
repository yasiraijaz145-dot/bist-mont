import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Reservations',
  description: 'Reserve your table at Bistro Montréal. Available Monday through Sunday from 5 PM.',
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}