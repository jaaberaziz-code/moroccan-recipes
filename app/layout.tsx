import './globals.css';
import { Noto_Sans_Arabic } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'وصفات شيماء | Chaimae\'s Moroccan Recipes',
  description: 'اكتشف وصفات مغربية أصيلة مع صور رائعة. من الطاجين التقليدي إلى الكسكس، الحريرة، والحلويات اللذيذة.',
  keywords: 'وصفات مغربية, طاجين, كسكس, حريرة, أكل مغربي, مطبخ مغربي',
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
    <html lang="ar" dir="rtl" className={`${notoArabic.variable}`}>
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
      <body className="antialiased font-arabic touch-manipulation">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
