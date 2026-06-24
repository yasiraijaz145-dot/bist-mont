import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Bistro Montréal. Questions, private dining, catering — we respond within the day.',
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }