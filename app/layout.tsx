import './globals.css';
import { Playfair_Display, Noto_Sans_Arabic } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata = {
  title: 'Chaimae\'s Moroccan Recipes | وصفات شيماء المغربية',
  description: 'Discover authentic Moroccan recipes with beautiful images. From traditional Tagine to Couscous, Harira, and delicious desserts.',
  keywords: 'Moroccan recipes, Tagine, Couscous, Harira, Moroccan food, Moroccan cuisine',
  authors: [{ name: 'Chaimae' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'وصفات شيماء',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#E07A5F',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${notoArabic.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((reg) => console.log('SW registered:', reg.scope))
                    .catch((err) => console.log('SW registration failed:', err));
                });
              }
            `,
          }}
        />
      </head>
      <body className="antialiased font-sans touch-manipulation">
        {children}
      </body>
    </html>
  );
}
