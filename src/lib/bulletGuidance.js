/**
 * Bullet structure guidance — action verb + measurable impact
 */

const ACTION_VERBS = [
  'built', 'developed', 'designed', 'implemented', 'led', 'improved',
  'created', 'optimized', 'automated',
];

function hasActionVerb(line) {
  const first = (line || '').trim().toLowerCase().split(/\s+/)[0];
  if (!first) return false;
  const stem = first.replace(/ed$|ing$/, '');
  return ACTION_VERBS.some((v) => first === v || stem === v.replace(/ed$|ing$/, ''));
}

function hasNumericIndicator(line) {
  if (!line || typeof line !== 'string') return false;
  return /\d|%|k\b|K\b|m\b|M\b|X\b|x\b|\+/.test(line);
}

export function getBulletGuidance(text) {
  if (!text || typeof text !== 'string') return { actionVerb: false, measurable: false };
  const lines = text.split(/\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return { actionVerb: false, measurable: false };

  const needsActionVerb = lines.some((l) => !hasActionVerb(l));
  const needsMeasurable = lines.some((l) => !hasNumericIndicator(l));

  return { actionVerb: needsActionVerb, measurable: needsMeasurable };
}
