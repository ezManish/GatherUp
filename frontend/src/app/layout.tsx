import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Inter, system-ui, Arial', margin: 0 }}>
        <div style={{ padding: '12px', background: '#111', color: '#fff' }}>SynapHack Platform</div>
        <main style={{ padding: '16px' }}>{children}</main>
      </body>
    </html>
  );
}
