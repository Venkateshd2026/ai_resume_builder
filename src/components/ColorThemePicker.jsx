import { useTemplate } from '../context/TemplateContext';

export default function ColorThemePicker() {
  const { color, setColor, colorThemes, colorThemeValues } = useTemplate();

  return (
    <div style={{ marginBottom: 'var(--kn-space-3)' }}>
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Color Theme</div>
      <div style={{ display: 'flex', gap: 'var(--kn-space-2)', flexWrap: 'wrap' }}>
        {colorThemes.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            title={c}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: colorThemeValues[c],
              border: color === c ? '2px solid hsl(220, 80%, 50%)' : '2px solid transparent',
              cursor: 'pointer',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
