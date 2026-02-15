import { useState, useCallback } from 'react';
import { useResume } from '../context/ResumeContext';

const CATEGORIES = [
  { key: 'technical', label: 'Technical Skills' },
  { key: 'soft', label: 'Soft Skills' },
  { key: 'tools', label: 'Tools & Technologies' },
];

function TagInput({ items, onAdd, onRemove, placeholder }) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const v = value.trim();
      if (v) {
        onAdd(v);
        setValue('');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--kn-space-1)', marginTop: 8 }}>
      {items.map((s, i) => (
        <span
          key={i}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '4px 8px',
            fontSize: 13,
            background: 'rgba(17,17,17,0.06)',
            borderRadius: 4,
          }}
        >
          {s}
          <button
            type="button"
            onClick={() => onRemove(i)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontSize: 14,
              lineHeight: 1,
              opacity: 0.7,
            }}
            aria-label="Remove"
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        className="kn-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ width: 120, minWidth: 80, padding: '4px 8px', fontSize: 13 }}
      />
    </div>
  );
}

export default function SkillsSection() {
  const { resume, addSkillToCategory, removeSkillFromCategory, suggestSkills } = useResume();
  const [loading, setLoading] = useState(false);

  const handleSuggest = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      suggestSkills();
      setLoading(false);
    }, 1000);
  }, [suggestSkills]);

  return (
    <div className="kn-card" style={{ marginBottom: 'var(--kn-space-2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--kn-space-2)' }}>
        <h3 className="kn-h3" style={{ margin: 0 }}>Skills</h3>
        <button
          type="button"
          className="kn-btn kn-btn--secondary"
          onClick={handleSuggest}
          disabled={loading}
        >
          {loading ? '...' : '✨ Suggest Skills'}
        </button>
      </div>
      {CATEGORIES.map(({ key, label }) => {
        const items = resume.skills?.[key] || [];
        return (
          <div key={key} style={{ marginBottom: 'var(--kn-space-3)' }}>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
              {label} ({items.length})
            </div>
            <TagInput
              items={items}
              onAdd={(s) => addSkillToCategory(key, s)}
              onRemove={(i) => removeSkillFromCategory(key, i)}
              placeholder={`Type and press Enter`}
            />
          </div>
        );
      })}
    </div>
  );
}
