/**
 * 10-item Test Checklist — required for Shipped status
 */

const STORAGE_KEY = 'rb_checklist_tests';
const CHECKLIST_COUNT = 10;

const CHECKLIST_LABELS = [
  'All form sections save to localStorage',
  'Live preview updates in real-time',
  'Template switching preserves data',
  'Color theme persists after refresh',
  'ATS score calculates correctly',
  'Score updates live on edit',
  'Export buttons work',
  'Empty states handled gracefully',
  'Mobile responsive layout works',
  'No console errors on any page',
];

export function getChecklistState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return Array(CHECKLIST_COUNT).fill(false);
    const arr = JSON.parse(raw);
    return Array.from({ length: CHECKLIST_COUNT }, (_, i) => Boolean(arr[i]));
  } catch {
    return Array(CHECKLIST_COUNT).fill(false);
  }
}

export function setChecklistItem(index, completed) {
  const state = getChecklistState();
  if (index >= 0 && index < CHECKLIST_COUNT) state[index] = Boolean(completed);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function isChecklistComplete() {
  const state = getChecklistState();
  return state.length >= CHECKLIST_COUNT && state.every(Boolean);
}

export { CHECKLIST_COUNT, CHECKLIST_LABELS };
