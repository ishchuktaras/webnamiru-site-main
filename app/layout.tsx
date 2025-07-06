// app/layout.tsx

import React from 'react';

// Tento layout je jen základní obálka pro HTML a BODY tagy.
// Vše ostatní se přesouvá do nového layoutu.
export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <body>{children}</body>
    </html>
  );
}