import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nature Fresh Foods | Premium Seafood Exporters',
  description: 'Delivering high-quality seafood products globally with trust and reliability. Sustainable sourcing, global standards.',
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
