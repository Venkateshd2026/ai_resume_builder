import { useTemplate } from '../context/TemplateContext';

function ThumbnailClassic({ accent, active }) {
  return (
    <div
      style={{
        width: 120,
        height: 90,
        background: '#fff',
        border: active ? '2px solid hsl(220, 80%, 50%)' : '1px solid rgba(0,0,0,0.15)',
        borderRadius: 4,
        padding: 8,
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 600, fontFamily: 'Georgia, serif', marginBottom: 4 }}>Name</div>
      <div style={{ height: 1, background: accent, marginBottom: 6 }} />
      <div style={{ fontSize: 8, color: 'rgba(0,0,0,0.6)', marginBottom: 4 }}>Summary</div>
      <div style={{ height: 1, background: accent, marginBottom: 6 }} />
      <div style={{ fontSize: 8, color: 'rgba(0,0,0,0.6)' }}>Experience</div>
      {active && (
        <span style={{ position: 'absolute', top: 4, right: 4, fontSize: 12, color: 'hsl(220, 80%, 50%)' }}>✓</span>
      )}
    </div>
  );
}

function ThumbnailModern({ accent, active }) {
  return (
    <div
      style={{
        width: 120,
        height: 90,
        display: 'flex',
        border: active ? '2px solid hsl(220, 80%, 50%)' : '1px solid rgba(0,0,0,0.15)',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: 36, background: accent, padding: 6 }}>
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.9)', marginBottom: 4 }}>Contact</div>
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.9)' }}>Skills</div>
      </div>
      <div style={{ flex: 1, background: '#fff', padding: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 600, marginBottom: 4 }}>Name</div>
        <div style={{ fontSize: 8, color: 'rgba(0,0,0,0.6)' }}>Summary</div>
        <div style={{ fontSize: 8, color: 'rgba(0,0,0,0.6)' }}>Experience</div>
      </div>
      {active && (
        <span style={{ position: 'absolute', top: 4, right: 4, fontSize: 12, color: 'hsl(220, 80%, 50%)', zIndex: 1 }}>✓</span>
      )}
    </div>
  );
}

function ThumbnailMinimal({ accent, active }) {
  return (
    <div
      style={{
        width: 120,
        height: 90,
        background: '#fff',
        border: active ? '2px solid hsl(220, 80%, 50%)' : '1px solid rgba(0,0,0,0.15)',
        borderRadius: 4,
        padding: 12,
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 600, fontFamily: 'system-ui', marginBottom: 12 }}>Name</div>
      <div style={{ fontSize: 8, color: 'rgba(0,0,0,0.5)', marginBottom: 12 }}>Summary</div>
      <div style={{ fontSize: 8, color: 'rgba(0,0,0,0.5)' }}>Experience</div>
      {active && (
        <span style={{ position: 'absolute', top: 4, right: 4, fontSize: 12, color: 'hsl(220, 80%, 50%)' }}>✓</span>
      )}
    </div>
  );
}

export default function TemplatePicker() {
  const { template, setTemplate, accentHsl } = useTemplate();

  const thumbnails = {
    Classic: <ThumbnailClassic accent={accentHsl} active={template === 'Classic'} />,
    Modern: <ThumbnailModern accent={accentHsl} active={template === 'Modern'} />,
    Minimal: <ThumbnailMinimal accent={accentHsl} active={template === 'Minimal'} />,
  };

  return (
    <div style={{ marginBottom: 'var(--kn-space-3)' }}>
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Template</div>
      <div style={{ display: 'flex', gap: 'var(--kn-space-2)' }}>
        {['Classic', 'Modern', 'Minimal'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTemplate(t)}
            style={{
              padding: 0,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
            }}
            title={t}
          >
            {thumbnails[t]}
            <div style={{ fontSize: 11, marginTop: 4, textAlign: 'center' }}>{t}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
