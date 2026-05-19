import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Toaster } from 'sonner'
import './globals.css'

const cobol = localFont({
  src: [
    {
      path: '../../public/assets/font/Cobol W00 Light copy.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/assets/font/Cobol W00 Medium copy.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/assets/font/Cobol W00 Bold copy.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
  display: 'swap',
})

const funnelDisplay = localFont({
  src: '../../public/assets/font/FunnelDisplay-VariableFont_wght copy.ttf',
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tsuin.AI — Cognitive AI Twin',
  description:
    'Clone the way you think. Your memory fades. Your AI Twin doesn\'t.',
  openGraph: {
    title: 'Tsuin.AI — Cognitive AI Twin',
    description: 'Clone the way you think.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111010',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cobol.variable} ${funnelDisplay.variable}`}>
      <body className="bg-[#1a1b26] font-mono antialiased flex justify-center">
        <div className="w-full max-w-[475px] relative overflow-x-hidden bg-[#1a1b26]">
        {children}
        </div>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#1a1918',
              border: '1px solid #2a2826',
              color: '#d8d4cc',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
            },
          }}
        />
      </body>
    </html>
  )
}
