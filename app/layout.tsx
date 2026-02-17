import './globals.css';
import { Nav } from '@/components/Nav';
import { ClientBoot } from '@/components/ClientBoot';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="max-w-3xl mx-auto p-4 space-y-4">
        <ClientBoot />
        <h1 className="text-2xl font-bold">Big Six Structure Trainer (PWA)</h1>
        <Nav />
        {children}
      </body>
    </html>
  );
}
