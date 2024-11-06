import './globals.css';
import type { Metadata } from 'next';
import { Poppins, Reenie_Beanie } from 'next/font/google';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

const poppins = Poppins({ 
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

const reenieBeanie = Reenie_Beanie({ 
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-reenie'
});

export const metadata: Metadata = {
  title: 'For Bias - Share Your Message Through Song',
  description: 'Express your untold message through the song',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${reenieBeanie.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}