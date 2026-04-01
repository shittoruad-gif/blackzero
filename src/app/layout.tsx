import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';

export const metadata: Metadata = {
  title: 'BlackZero — 経営支援ダッシュボード',
  description: '経営支援ダッシュボード',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
