import { Link, useLocation } from 'react-router-dom';
import { useProof } from '../context/ProofContext';

const navItems = [
  { to: '/builder', label: 'Builder' },
  { to: '/preview', label: 'Preview' },
  { to: '/proof', label: 'Proof' },
];

export default function AppLayout({ children }) {
  const location = useLocation();
  const { shipped } = useProof();

  return (
    <div className="kn-layout">
      <header className="kn-top-bar">
        <Link to="/" className="kn-top-bar__project" style={{ textDecoration: 'none', color: 'inherit' }}>
          AI Resume Builder
        </Link>
        <nav style={{ display: 'flex', gap: 'var(--kn-space-3)' }}>
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                fontSize: 'var(--kn-text-size-sm)',
                fontWeight: location.pathname.endsWith(to) ? 600 : 400,
                color: 'var(--kn-text)',
                textDecoration: 'none',
                opacity: location.pathname === to ? 1 : 0.85,
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <span
          className="kn-top-bar__status"
          style={{
            opacity: 0.9,
            ...(shipped ? { color: 'var(--kn-success)', borderColor: 'var(--kn-success)' } : {}),
          }}
        >
          {shipped ? 'Shipped' : 'In Progress'}
        </span>
      </header>
      <main style={{ flex: 1, padding: 'var(--kn-space-4)' }}>
        {children}
      </main>
    </div>
  );
}
