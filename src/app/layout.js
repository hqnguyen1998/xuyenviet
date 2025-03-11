import './globals.css';
import { ThemeProvider } from 'next-themes';

export const metadata = {
  title: 'Next.js MongoDB CRUD',
  description: 'User Management System with Next.js and MongoDB',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class' defaultTheme='system'>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
