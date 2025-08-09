export const metadata = { title: 'Proto', description: 'Mobile prototype' };

/**
 * Root layout wraps all pages and applies consistent HTML semantics and viewport meta. It also constrains
 * the content width for a mobile friendly design.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body
        style={{
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif',
          margin: 0
        }}
      >
        <div
          style={{
            maxWidth: 480,
            margin: '0 auto',
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}