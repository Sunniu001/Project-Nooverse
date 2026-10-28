import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#03070c',
        color: '#f5fafd',
        fontFamily: 'monospace',
      }}
    >
      <h2 style={{ fontSize: '24px', letterSpacing: '4px', marginBottom: '16px' }}>
        404 // SECTOR NOT FOUND
      </h2>
      <Link
        href="/"
        style={{
          color: '#38bdf8',
          textDecoration: 'none',
          border: '1px solid #38bdf8',
          padding: '8px 16px',
        }}
      >
        RETURN TO NOOVERSE
      </Link>
    </div>
  );
}
