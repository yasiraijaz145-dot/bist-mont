import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Track Order',
  description: 'Track your Bistro Montréal pickup order in real time.',
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }