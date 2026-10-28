import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'PROJECT NOOVERSE | Sci-Fi Exoplanetary Portal Initiative',
  description:
    'Sector 3 (Earth, 2070). Experience the dawn of the O-Gate Void Ring anomaly and Arya One Spire through an interactive real-time tactical HUD interface.',
  keywords: [
    'Project Nooverse',
    'Sci-Fi',
    'HUD Overlay',
    'Cyberpunk',
    'Portal Ring',
    'Sector 3',
    'Interactive Landing Page',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#03070b" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
