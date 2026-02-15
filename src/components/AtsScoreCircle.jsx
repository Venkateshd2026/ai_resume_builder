import { useMemo } from 'react';
import { useResume } from '../context/ResumeContext';
import { computeAtsScore, getAtsSuggestions, getScoreLabel, getScoreColor } from '../lib/atsScore';

const RADIUS = 50;
const STROKE = 8;

export default function AtsScoreCircle() {
  const { resume } = useResume();
  const { score, label, color, suggestions } = useMemo(() => {
    const s = computeAtsScore(resume);
    const sug = getAtsSuggestions(resume);
    return {
      score: s,
      label: getScoreLabel(s),
      color: getScoreColor(s),
      suggestions: sug,
    };
  }, [resume]);

  const circumference = 2 * Math.PI * RADIUS;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div
      className="kn-card no-print"
      style={{
        marginBottom: 'var(--kn-space-3)',
        padding: 'var(--kn-space-3)',
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--kn-space-2)', opacity: 0.9 }}>
        ATS Resume Score
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kn-space-4)', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <svg width={120} height={120} viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              stroke="rgba(17,17,17,0.08)"
              strokeWidth={STROKE}
            />
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              stroke={color}
              strokeWidth={STROKE}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 180ms ease-in-out' }}
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            {score}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color }}>{label}</div>
          <div style={{ fontSize: 13, opacity: 0.8 }}>out of 100</div>
        </div>
      </div>
      {suggestions.length > 0 && (
        <div style={{ marginTop: 'var(--kn-space-3)', paddingTop: 'var(--kn-space-2)', borderTop: '1px solid var(--kn-border)' }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Improvements</div>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.7, opacity: 0.9 }}>
            {suggestions.map((s, i) => (
              <li key={i}>
                {typeof s === 'string' ? s : `${s.text} (+${s.points} points)`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
