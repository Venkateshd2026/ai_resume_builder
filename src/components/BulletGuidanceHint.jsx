import { getBulletGuidance } from '../lib/bulletGuidance';

export default function BulletGuidanceHint({ text }) {
  const { actionVerb, measurable } = getBulletGuidance(text);
  if (!actionVerb && !measurable) return null;

  return (
    <p
      style={{
        fontSize: 12,
        margin: '4px 0 0',
        opacity: 0.8,
        color: 'var(--kn-text)',
        lineHeight: 1.4,
      }}
    >
      {actionVerb && (
        <span>Start with a strong action verb.</span>
      )}
      {actionVerb && measurable && ' '}
      {measurable && (
        <span>Add measurable impact (numbers).</span>
      )}
    </p>
  );
}
