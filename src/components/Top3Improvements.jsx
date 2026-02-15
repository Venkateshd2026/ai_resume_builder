import { useMemo } from 'react';
import { useResume } from '../context/ResumeContext';
import { getTop3Improvements } from '../lib/topImprovements';

export default function Top3Improvements() {
  const { resume } = useResume();
  const items = useMemo(() => getTop3Improvements(resume), [resume]);

  if (items.length === 0) return null;

  return (
    <div
      className="kn-card"
      style={{
        marginBottom: 'var(--kn-space-3)',
        padding: 'var(--kn-space-3)',
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--kn-space-2)', opacity: 0.9 }}>
        Top 3 Improvements
      </div>
      <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.6, opacity: 0.9 }}>
        {items.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
