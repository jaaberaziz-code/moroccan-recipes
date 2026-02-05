import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Chaimae's Moroccan Recipes | وصفات شيماء</title>
        <meta name="description" content="Authentic Moroccan recipes with a modern editorial twist. From Tagine to Couscous, discover the flavors of Morocco." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}