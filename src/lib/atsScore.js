/**
 * ATS Score Calculator — Deterministic, no AI
 * Score 0–100 based on resume completeness.
 */

import { getSkillsCount } from './skillsHelpers';

const ACTION_VERBS = [
  'built', 'led', 'designed', 'improved', 'created', 'optimized',
  'automated', 'developed', 'implemented', 'managed', 'delivered',
];

function summaryHasActionVerbs(summary) {
  if (!summary || typeof summary !== 'string') return false;
  const lower = summary.toLowerCase();
  return ACTION_VERBS.some((v) => {
    const re = new RegExp(`\\b${v}\\b`);
    return re.test(lower);
  });
}

function hasExperienceWithBullets(resume) {
  const exp = resume.experience || [];
  return exp.some((e) => (e.description || '').trim().length > 0);
}

export function computeAtsScore(resume) {
  let score = 0;

  if ((resume.personal?.name || '').trim()) score += 10;
  if ((resume.personal?.email || '').trim()) score += 10;
  if ((resume.summary || '').trim().length > 50) score += 10;

  if (hasExperienceWithBullets(resume)) score += 15;
  if ((resume.education || []).length >= 1) score += 10;

  const skillsCount = getSkillsCount(resume);
  if (skillsCount >= 5) score += 10;

  if ((resume.projects || []).length >= 1) score += 10;

  if ((resume.personal?.phone || '').trim()) score += 5;
  const links = resume.links || {};
  if ((links.linkedin || '').trim()) score += 5;
  if ((links.github || '').trim()) score += 5;

  if (summaryHasActionVerbs(resume.summary)) score += 10;

  return Math.min(100, score);
}

export function getAtsSuggestions(resume) {
  const suggestions = [];

  if (!(resume.personal?.name || '').trim())
    suggestions.push({ text: 'Add your name', points: 10 });
  if (!(resume.personal?.email || '').trim())
    suggestions.push({ text: 'Add your email', points: 10 });
  if ((resume.summary || '').trim().length <= 50 && (resume.summary || '').trim())
    suggestions.push({ text: 'Add a professional summary (50+ chars)', points: 10 });
  if (!(resume.summary || '').trim())
    suggestions.push({ text: 'Add a professional summary', points: 10 });
  if (!hasExperienceWithBullets(resume) && (resume.experience || []).length > 0)
    suggestions.push({ text: 'Add bullet points to experience', points: 15 });
  if (!hasExperienceWithBullets(resume) && (resume.experience || []).length === 0)
    suggestions.push({ text: 'Add at least 1 experience entry with bullets', points: 15 });
  if ((resume.education || []).length < 1)
    suggestions.push({ text: 'Add at least 1 education entry', points: 10 });
  if (getSkillsCount(resume) < 5)
    suggestions.push({ text: 'Add at least 5 skills', points: 10 });
  if ((resume.projects || []).length < 1)
    suggestions.push({ text: 'Add at least 1 project', points: 10 });
  if (!(resume.personal?.phone || '').trim())
    suggestions.push({ text: 'Add your phone number', points: 5 });
  if (!(resume.links?.linkedin || '').trim())
    suggestions.push({ text: 'Add LinkedIn link', points: 5 });
  if (!(resume.links?.github || '').trim())
    suggestions.push({ text: 'Add GitHub link', points: 5 });
  if ((resume.summary || '').trim() && !summaryHasActionVerbs(resume.summary))
    suggestions.push({ text: 'Use action verbs in summary (built, led, designed, etc.)', points: 10 });

  return suggestions;
}

export function getScoreLabel(score) {
  if (score <= 40) return 'Needs Work';
  if (score <= 70) return 'Getting There';
  return 'Strong Resume';
}

export function getScoreColor(score) {
  if (score <= 40) return 'hsl(0, 65%, 45%)';   // Red
  if (score <= 70) return 'hsl(38, 92%, 45%)';  // Amber
  return 'hsl(142, 50%, 38%)';                   // Green
}
