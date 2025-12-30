import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';

// Optimized font loading with Next.js
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Studio Associato Giuliano Lello Coco - Consulenza Fiscale Catania',
  description: 'Studio Associato di consulenza fiscale a Catania',
  icons: {
    icon: 'https://i.im.ge/2025/12/28/ByjLSF.ChatGPT-Image-27-dic-2025-20-18-27.png',
    apple: 'https://i.im.ge/2025/12/28/ByjLSF.ChatGPT-Image-27-dic-2025-20-18-27.png',
    shortcut: 'https://i.im.ge/2025/12/28/ByjLSF.ChatGPT-Image-27-dic-2025-20-18-27.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        {children}
        {/* @ts-ignore */}
        <elevenlabs-convai agent-id="agent_6501kdehcr3cehsbxmv5ak7hhdrd"></elevenlabs-convai>
        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
