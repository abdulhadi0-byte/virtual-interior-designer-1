import './globals.css'; import { Cormorant_Garamond, Manrope } from 'next/font/google';
const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600'], variable: '--f-display' });
const body = Manrope({ subsets: ['latin'], variable: '--f-body' });
export const metadata = { title: 'Virtual Interior Designer', description: 'Virtual and room interior design, planned with AI.' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={`${display.variable} ${body.variable}`}>{children}</body></html>;
}
