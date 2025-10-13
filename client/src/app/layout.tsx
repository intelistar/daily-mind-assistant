import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { Provider } from '@/components/ui/provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Web panel',
  description: 'Web panel for users and admins',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
