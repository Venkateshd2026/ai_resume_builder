import { useMemo } from 'react';
import { useResume } from '../context/ResumeContext';
import { computeAtsScore, getAtsSuggestions } from '../lib/atsScore';

export default function AtsScoreMeter() {
  const { resume } = useResume();
  const { score, suggestions } = useMemo(() => {
    const s = computeAtsScore(resume);
    const sug = getAtsSuggestions(resume);
    return { score: s, suggestions: sug };
  }, [resume]);

  return (
    <div
      className="kn-card"
      style={{
        marginBottom: 'var(--kn-space-3)',
        padding: 'var(--kn-space-3)',
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--kn-space-2)', opacity: 0.9 }}>
        ATS Readiness Score
      </div>
      <div
        style={{
          width: '100%',
          height: 8,
          background: 'rgba(17,17,17,0.08)',
          borderRadius: 4,
          overflow: 'hidden',
          marginBottom: 'var(--kn-space-2)',
        }}
      >
        <div
          style={{
            width: `${score}%`,
            height: '100%',
            background: 'var(--kn-accent)',
            borderRadius: 4,
            transition: 'width 180ms ease-in-out',
          }}
        />
      </div>
      <div style={{ fontSize: 24, fontWeight: 600, marginBottom: suggestions.length ? 'var(--kn-space-2)' : 0 }}>
        {score}/100
      </div>
      {suggestions.length > 0 && (
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.6, opacity: 0.9 }}>
          {suggestions.map((s, i) => (
            <li key={i}>
              {typeof s === 'string' ? s : `${s.text} (+${s.points} points)`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
