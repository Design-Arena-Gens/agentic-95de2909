import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HealthRide - Healthcare On Demand',
  description: 'Book healthcare providers instantly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
