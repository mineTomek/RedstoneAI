import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Redstonery',
  description: 'Redstone simulator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className='scroll-smooth bg-white dark:bg-gray-950 text-black dark:text-white'
    >
      <body className={inter.className}>{children}</body>
    </html>
  )
}
