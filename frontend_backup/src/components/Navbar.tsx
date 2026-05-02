import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="section-base glass-panel" style={{ 
      margin: '1rem', 
      padding: '0.75rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'sticky',
      top: '1rem',
      zIndex: 100
    }}>
      <div className="display-font" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
        BRAINSPARK<span style={{ color: 'var(--secondary)' }}>.AI</span>
      </div>
      
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: 'var(--label-sm)', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}>Home</Link>
        <Link href="/dashboard" style={{ fontSize: 'var(--label-sm)', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}>Dashboard</Link>
        <Link href="/features" style={{ fontSize: 'var(--label-sm)', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}>Features</Link>
        <button className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: 'var(--label-sm)' }}>
          GET STARTED
        </button>
      </div>
    </nav>
  );
}
