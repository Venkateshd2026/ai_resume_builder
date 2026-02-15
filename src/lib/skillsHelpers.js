/**
 * Skills helpers — supports both legacy (string) and new (categorized) format
 */

export function getSkillsCount(resume) {
  const s = resume?.skills;
  if (!s) return 0;
  if (typeof s === 'string') {
    return (s || '').split(',').map((x) => x.trim()).filter(Boolean).length;
  }
  const tech = Array.isArray(s.technical) ? s.technical : [];
  const soft = Array.isArray(s.soft) ? s.soft : [];
  const tools = Array.isArray(s.tools) ? s.tools : [];
  return tech.length + soft.length + tools.length;
}

export function getSkillsForDisplay(resume) {
  const s = resume?.skills;
  if (!s) return { technical: [], soft: [], tools: [] };
  if (typeof s === 'string') {
    const list = (s || '').split(',').map((x) => x.trim()).filter(Boolean);
    return { technical: list, soft: [], tools: [] };
  }
  return {
    technical: Array.isArray(s.technical) ? s.technical : [],
    soft: Array.isArray(s.soft) ? s.soft : [],
    tools: Array.isArray(s.tools) ? s.tools : [],
  };
}

export const SUGGESTED_SKILLS = {
  technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'],
  soft: ['Team Leadership', 'Problem Solving'],
  tools: ['Git', 'Docker', 'AWS'],
};
