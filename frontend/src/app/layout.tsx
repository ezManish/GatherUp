export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{fontFamily:'Inter, system-ui, Arial', margin:0}}>
        <div style={{padding:'12px', background:'#111', color:'#fff'}}>SynapHack Platform</div>
        <main style={{padding:'16px'}}>{children}</main>
      </body>
    </html>
  );
}
