import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import { Manrope } from 'next/font/google'

const coluna = localFont({
  src: './fonts/Coluna.otf',
  variable: '--font-coluna',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'Uttarakhand Gold Cup – Official Cricket Tournament',
  description:
    'Official Uttarakhand Gold Cup 42nd Edition website. Fixtures, teams, schedules, standings and live updates.',
  icons: {
    icon: '/images/optimized/FinalLogo.png',
    apple: '/images/optimized/FinalLogo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${coluna.variable} ${manrope.variable} is-loading`}>
        <div className="globalGlow" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}