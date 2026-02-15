/**
 * Export utilities — plain text, validation
 */

import { getSkillsForDisplay } from './skillsHelpers';

export function getResumeAsPlainText(resume) {
  const { personal, summary, education, experience, projects, skills, links } = resume || {};
  const lines = [];

  lines.push('Name');
  lines.push(personal?.name?.trim() || '');
  lines.push('');
  lines.push('Contact');
  const contact = [personal?.email, personal?.phone, personal?.location].filter(Boolean).join(' | ');
  lines.push(contact || '');
  lines.push('');

  if (summary?.trim()) {
    lines.push('Summary');
    lines.push(summary.trim());
    lines.push('');
  }

  if (education?.length) {
    lines.push('Education');
    education.forEach((e) => {
      if (e.school?.trim()) lines.push(`  ${e.school}${e.degree?.trim() ? ` — ${e.degree}` : ''}${e.year?.trim() ? ` (${e.year})` : ''}`);
    });
    lines.push('');
  }

  if (experience?.length) {
    lines.push('Experience');
    experience.forEach((e) => {
      const role = e.role?.trim();
      const company = e.company?.trim();
      if (role || company) {
        lines.push(`  ${role || 'Role'}${company ? ` at ${company}` : ''}${e.dates?.trim() ? ` — ${e.dates}` : ''}`);
        if (e.description?.trim()) lines.push(`  ${e.description.trim().replace(/\n/g, '\n  ')}`);
      }
    });
    lines.push('');
  }

  if (projects?.length) {
    lines.push('Projects');
    projects.forEach((p) => {
      if (p.title?.trim()) {
        lines.push(`  ${p.title}`);
        if (p.description?.trim()) lines.push(`  ${p.description.trim().replace(/\n/g, '\n  ')}`);
        if ((p.techStack || []).length) lines.push(`  Tech: ${p.techStack.join(', ')}`);
      }
    });
    lines.push('');
  }

  const skillsGroups = getSkillsForDisplay(resume);
  const allSkills = [
    ...(skillsGroups.technical || []),
    ...(skillsGroups.soft || []),
    ...(skillsGroups.tools || []),
  ];
  if (allSkills.length) {
    lines.push('Skills');
    lines.push(allSkills.join(', '));
    lines.push('');
  }

  const hasLinks = (links?.github?.trim()) || (links?.linkedin?.trim());
  if (hasLinks) {
    lines.push('Links');
    if (links?.github?.trim()) lines.push(`  GitHub: ${links.github.trim()}`);
    if (links?.linkedin?.trim()) lines.push(`  LinkedIn: ${links.linkedin.trim()}`);
  }

  return lines.join('\n').trim();
}

/**
 * Returns { warn: boolean, message: string } if resume may look incomplete.
 * Does NOT block export.
 */
export function getExportValidation(resume) {
  const name = (resume?.personal?.name || '').trim();
  const hasProject = (resume?.projects || []).length > 0;
  const hasExperience = (resume?.experience || []).length > 0;

  if (!name || (!hasProject && !hasExperience)) {
    return { warn: true, message: 'Your resume may look incomplete.' };
  }
  return { warn: false, message: '' };
}
