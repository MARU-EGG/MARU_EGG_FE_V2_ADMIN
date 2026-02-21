import './globals.css';
import QueryProvider from '@/components/providers/query-provider';
import { ToastProvider } from '@/components/toast';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MARU-EGG Admin',
  description: 'MARU-EGG Admin Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <ToastProvider />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
