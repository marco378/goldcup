import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gold Cup: 42nd Edition',
  description: 'Where Legends Once Played',
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
