/**
 * Top 3 Improvements — improvement guidance
 */

import { getSkillsCount } from './skillsHelpers';

function wordCount(str) {
  if (!str || typeof str !== 'string') return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function hasMeasurableImpact(resume) {
  const bullets = [
    ...(resume.experience || []).map((e) => (e.description || '').trim()),
    ...(resume.projects || []).map((p) => (p.description || '').trim()),
  ];
  return bullets.some((t) => /\d|%|k\b|K\b|m\b|M\b|X\b|x\b|\+/.test(t));
}

export function getTop3Improvements(resume) {
  const out = [];
  const skillsCount = getSkillsCount(resume);

  if ((resume.projects || []).length < 2) {
    out.push('Add at least 2 projects.');
  }
  if (!hasMeasurableImpact(resume) && ((resume.experience || []).length > 0 || (resume.projects || []).length > 0)) {
    out.push('Add measurable impact (numbers) in bullets.');
  }
  if (wordCount(resume.summary) < 40 && (resume.summary || '').trim()) {
    out.push('Expand your summary (target 40+ words).');
  }
  if (skillsCount > 0 && skillsCount < 8) {
    out.push('Add more skills (target 8+).');
  }
  if ((resume.experience || []).length === 0) {
    out.push('Add internship or project work as experience.');
  }

  return out.slice(0, 3);
}
