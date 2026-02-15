/**
 * RB (AI Resume Builder) — Artifact & proof storage
 * Artifacts: rb_step_1_artifact through rb_step_8_artifact
 * Proof: rb_final_submission
 */

const STEP_COUNT = 8;
const ARTIFACT_PREFIX = 'rb_step_';
const ARTIFACT_SUFFIX = '_artifact';
const PROOF_KEY = 'rb_final_submission';

export function getArtifactKey(stepNum) {
  if (stepNum < 1 || stepNum > STEP_COUNT) return null;
  return `${ARTIFACT_PREFIX}${stepNum}${ARTIFACT_SUFFIX}`;
}

/**
 * @param {number} stepNum 1–8
 * @returns {string} Stored artifact value (URL, file ref, or text)
 */
export function getArtifact(stepNum) {
  const key = getArtifactKey(stepNum);
  if (!key) return '';
  try {
    const raw = localStorage.getItem(key);
    return typeof raw === 'string' ? raw.trim() : '';
  } catch {
    return '';
  }
}

/**
 * @param {number} stepNum 1–8
 * @param {string} value
 */
export function setArtifact(stepNum, value) {
  const key = getArtifactKey(stepNum);
  if (!key) return;
  try {
    localStorage.setItem(key, String(value ?? '').trim());
  } catch (_) {}
}

/**
 * Step N is complete when artifact for step N is non-empty.
 * @param {number} stepNum 1–8
 * @returns {boolean}
 */
export function isStepComplete(stepNum) {
  return getArtifact(stepNum).length > 0;
}

/**
 * Can access step N only if step N-1 is complete (and step 1 always allowed).
 */
export function canAccessStep(stepNum) {
  if (stepNum < 1 || stepNum > STEP_COUNT) return false;
  if (stepNum === 1) return true;
  return isStepComplete(stepNum - 1);
}

/**
 * All 8 steps have artifacts.
 */
export function allStepsComplete() {
  for (let i = 1; i <= STEP_COUNT; i++) {
    if (!isStepComplete(i)) return false;
  }
  return true;
}

// ——— Proof (final submission) ——— //

const DEFAULT_PROOF = () => ({
  lovableUrl: '',
  githubUrl: '',
  deployedUrl: '',
  stepsCompleted: Array(STEP_COUNT).fill(false),
});

export function isValidUrl(value) {
  if (typeof value !== 'string') return false;
  const t = value.trim();
  if (!t) return false;
  return t.startsWith('http://') || t.startsWith('https://');
}

export function getProof() {
  try {
    const raw = localStorage.getItem(PROOF_KEY);
    if (!raw) return DEFAULT_PROOF();
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
    return DEFAULT_PROOF();
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
  localStorage.setItem(PROOF_KEY, JSON.stringify(next));
}

export function setProofStepCompleted(index, completed) {
  const cur = getProof();
  const steps = [...cur.stepsCompleted];
  if (index >= 0 && index < STEP_COUNT) steps[index] = Boolean(completed);
  setProof({ stepsCompleted: steps });
}

export function getFinalSubmissionText() {
  const p = getProof();
  const lovable = p.lovableUrl.trim() || '(not set)';
  const github = p.githubUrl.trim() || '(not set)';
  const deployed = p.deployedUrl.trim() || '(not set)';
  return `------------------------------------------
AI Resume Builder — Build Track — Final Submission

Lovable Project: ${lovable}
GitHub Repository: ${github}
Live Deployment: ${deployed}

Step completion: ${p.stepsCompleted.filter(Boolean).length} / 8
------------------------------------------`;
}

export { STEP_COUNT };
