import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from "./context/CartContext"

const inter = Inter({
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`
          ${inter.className}
          min-h-screen
          flex flex-col
          bg-slate-950
          text-zinc-100
          antialiased
        `}
      >
        <CartProvider>

          {/* CONTAINER GLOBAL */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>

        </CartProvider>
      </body>
    </html>
  )
}