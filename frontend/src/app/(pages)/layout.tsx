import React from 'react';

import Header from '@/components/Header';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="bg-gray-100 min-h-screen">{children}</main>
    </>
  );
}
