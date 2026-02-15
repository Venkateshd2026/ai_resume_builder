/**
 * Proof & Final Submission — rb_final_submission
 */

const STORAGE_KEY = 'rb_final_submission';
const STEP_COUNT = 8;

const STEP_LABELS = [
  '01 — Problem',
  '02 — Market',
  '03 — Architecture',
  '04 — HLD',
  '05 — LLD',
  '06 — Build',
  '07 — Test',
  '08 — Ship',
];

const DEFAULT = () => ({
  lovableUrl: '',
  githubUrl: '',
  deployedUrl: '',
  stepsCompleted: Array(STEP_COUNT).fill(false),
});

export function isValidUrl(value) {
  if (typeof value !== 'string') return false;
  const t = value.trim();
  return t && (t.startsWith('http://') || t.startsWith('https://'));
}

export function getProof() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT();
    const p = JSON.parse(raw);
    const steps = Array.isArray(p.stepsCompleted)
      ? p.stepsCompleted.slice(0, STEP_COUNT).map(Boolean)
      : Array(STEP_COUNT).fill(false);
    while (steps.length < STEP_COUNT) steps.push(false);
    return {
      lovableUrl: typeof p.lovableUrl === 'string' ? p.lovableUrl : '',
      githubUrl: typeof p.githubUrl === 'string' ? p.githubUrl : '',
      deployedUrl: typeof p.deployedUrl === 'string' ? p.deployedUrl : '',
      stepsCompleted: steps,
    };
  } catch {
    return DEFAULT();
  }
}

export function setProof(updates) {
  const cur = getProof();
  const next = { ...cur };
  if (updates.lovableUrl !== undefined) next.lovableUrl = String(updates.lovableUrl ?? '').trim();
  if (updates.githubUrl !== undefined) next.githubUrl = String(updates.githubUrl ?? '').trim();
  if (updates.deployedUrl !== undefined) next.deployedUrl = String(updates.deployedUrl ?? '').trim();
  if (Array.isArray(updates.stepsCompleted)) {
    next.stepsCompleted = updates.stepsCompleted.slice(0, STEP_COUNT).map(Boolean);
    while (next.stepsCompleted.length < STEP_COUNT) next.stepsCompleted.push(false);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function saveProof(fullProof) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fullProof));
  } catch (_) {}
}

export function setStepCompleted(index, completed) {
  const cur = getProof();
  const steps = [...cur.stepsCompleted];
  if (index >= 0 && index < STEP_COUNT) steps[index] = Boolean(completed);
  setProof({ stepsCompleted: steps });
}

export function allStepsComplete() {
  const p = getProof();
  return p.stepsCompleted.length >= STEP_COUNT && p.stepsCompleted.every(Boolean);
}

export function allLinksValid() {
  const p = getProof();
  return isValidUrl(p.lovableUrl) && isValidUrl(p.githubUrl) && isValidUrl(p.deployedUrl);
}

export function getFinalSubmissionText(proofOverride) {
  const p = proofOverride ?? getProof();
  const lovable = (p?.lovableUrl ?? '').trim() || '(not set)';
  const github = (p?.githubUrl ?? '').trim() || '(not set)';
  const deployed = (p?.deployedUrl ?? '').trim() || '(not set)';
  return `------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${lovable}
GitHub Repository: ${github}
Live Deployment: ${deployed}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------`;
}

export { STEP_COUNT, STEP_LABELS };
