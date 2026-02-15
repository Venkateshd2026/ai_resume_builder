import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';

export default function HomePage() {
  return (
    <AppLayout>
      <section className="kn-context-header" style={{ paddingTop: 'var(--kn-space-5)' }}>
        <h1 className="kn-context-header__headline" style={{ maxWidth: 'var(--kn-measure)' }}>
          Build a Resume That Gets Read.
        </h1>
        <p className="kn-context-header__subtext" style={{ marginBottom: 'var(--kn-space-4)' }}>
          Create a clean, structured resume with premium typography. No clutter. No noise.
        </p>
        <Link to="/builder" className="kn-btn kn-btn--primary">
          Start Building
        </Link>
      </section>
    </AppLayout>
  );
}
