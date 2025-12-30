import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Studio Associato Giuliano Lello Coco - Consulenza Fiscale Catania',
  description: 'Studio Associato di consulenza fiscale a Catania',
  icons: {
    icon: 'https://i.im.ge/2025/12/28/ByjLSF.ChatGPT-Image-27-dic-2025-20-18-27.png',
    apple: 'https://i.im.ge/2025/12/28/ByjLSF.ChatGPT-Image-27-dic-2025-20-18-27.png',
    shortcut: 'https://i.im.ge/2025/12/28/ByjLSF.ChatGPT-Image-27-dic-2025-20-18-27.png',
  },
};

// Force dynamic rendering for all pages
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body>
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
