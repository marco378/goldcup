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
  title: 'Gold Cup',
  description: 'Gold Cup 42nd Edition',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${coluna.variable} ${manrope.variable} is-loading`}>
        {children}
      </body>
    </html>
  )
}