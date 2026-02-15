import { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'resumeBuilderData';

const defaultSkills = { technical: [], soft: [], tools: [] };
const defaultResume = {
  personal: { name: '', email: '', phone: '', location: '' },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: defaultSkills,
  links: { github: '', linkedin: '' },
};

function normEducation(arr) {
  return (arr || []).map((e) => ({
    school: (e && e.school) || '',
    degree: (e && e.degree) || '',
    year: (e && e.year) || '',
  }));
}
function normExperience(arr) {
  return (arr || []).map((e) => ({
    company: (e && e.company) || '',
    role: (e && e.role) || '',
    dates: (e && e.dates) || '',
    description: (e && e.description) || '',
  }));
}
function normProject(p) {
  if (!p) return { title: '', description: '', techStack: [], liveUrl: '', githubUrl: '' };
  return {
    title: (p.title ?? '').toString(),
    description: (p.description ?? '').toString().slice(0, 200),
    techStack: Array.isArray(p.techStack) ? p.techStack : [],
    liveUrl: (p.liveUrl ?? p.link ?? '').toString(),
    githubUrl: (p.githubUrl ?? '').toString(),
  };
}
function normProjects(arr) {
  return (arr || []).map(normProject);
}
function normSkills(s) {
  if (!s) return defaultSkills;
  if (typeof s === 'string') {
    const list = s.split(',').map((x) => x.trim()).filter(Boolean);
    return { technical: list, soft: [], tools: [] };
  }
  return {
    technical: Array.isArray(s.technical) ? s.technical : [],
    soft: Array.isArray(s.soft) ? s.soft : [],
    tools: Array.isArray(s.tools) ? s.tools : [],
  };
}

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultResume;
    const parsed = JSON.parse(raw);
    return {
      personal: { ...defaultResume.personal, ...(parsed.personal || {}) },
      summary: typeof parsed.summary === 'string' ? parsed.summary : '',
      education: normEducation(parsed.education),
      experience: normExperience(parsed.experience),
      projects: normProjects(parsed.projects),
      skills: normSkills(parsed.skills),
      links: { ...defaultResume.links, ...(parsed.links || {}) },
    };
  } catch {
    return defaultResume;
  }
}

function saveStored(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {}
}

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(loadStored);

  useEffect(() => {
    saveStored(resume);
  }, [resume]);

  const updatePersonal = (field, value) =>
    setResume((r) => ({ ...r, personal: { ...r.personal, [field]: value } }));
  const updateSummary = (value) => setResume((r) => ({ ...r, summary: value }));
  const updateEducation = (index, entry) => {
    const next = [...resume.education];
    next[index] = entry;
    setResume((r) => ({ ...r, education: next }));
  };
  const addEducation = () =>
    setResume((r) => ({
      ...r,
      education: [...r.education, { school: '', degree: '', year: '' }],
    }));
  const removeEducation = (index) =>
    setResume((r) => ({
      ...r,
      education: r.education.filter((_, i) => i !== index),
    }));

  const updateExperience = (index, entry) => {
    const next = [...resume.experience];
    next[index] = entry;
    setResume((r) => ({ ...r, experience: next }));
  };
  const addExperience = () =>
    setResume((r) => ({
      ...r,
      experience: [...r.experience, { company: '', role: '', dates: '', description: '' }],
    }));
  const removeExperience = (index) =>
    setResume((r) => ({
      ...r,
      experience: r.experience.filter((_, i) => i !== index),
    }));

  const updateProjects = (index, entry) => {
    const next = [...resume.projects];
    next[index] = normProject(entry);
    setResume((r) => ({ ...r, projects: next }));
  };
  const addProject = () =>
    setResume((r) => ({
      ...r,
      projects: [...r.projects, { title: '', description: '', techStack: [], liveUrl: '', githubUrl: '' }],
    }));
  const removeProject = (index) =>
    setResume((r) => ({
      ...r,
      projects: r.projects.filter((_, i) => i !== index),
    }));

  const updateSkillsCategory = (category, items) =>
    setResume((r) => ({
      ...r,
      skills: { ...r.skills, [category]: Array.isArray(items) ? items : [] },
    }));
  const addSkillToCategory = (category, skill) => {
    const trimmed = (skill || '').trim();
    if (!trimmed) return;
    setResume((r) => {
      const list = [...(r.skills[category] || [])];
      if (list.includes(trimmed)) return r;
      return { ...r, skills: { ...r.skills, [category]: [...list, trimmed] } };
    });
  };
  const removeSkillFromCategory = (category, index) =>
    setResume((r) => {
      const list = [...(r.skills[category] || [])];
      list.splice(index, 1);
      return { ...r, skills: { ...r.skills, [category]: list } };
    });
  const suggestSkills = () => {
    setResume((r) => {
      const { technical, soft, tools } = r.skills;
      const merge = (existing, suggested) => {
        const set = new Set([...existing]);
        suggested.forEach((s) => set.add(s));
        return [...set];
      };
      return {
        ...r,
        skills: {
          technical: merge(technical, ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL']),
          soft: merge(soft, ['Team Leadership', 'Problem Solving']),
          tools: merge(tools, ['Git', 'Docker', 'AWS']),
        },
      };
    });
  };

  const updateLinks = (field, value) =>
    setResume((r) => ({ ...r, links: { ...r.links, [field]: value } }));

  const loadSampleData = () => {
    setResume({
      personal: {
        name: 'Alex Chen',
        email: 'alex.chen@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
      },
      summary:
        'Software engineer with 4+ years of experience building web applications. Passionate about clean code and user experience.',
      education: [
        { school: 'Stanford University', degree: 'B.S. Computer Science', year: '2018' },
      ],
      experience: [
        {
          company: 'Tech Corp',
          role: 'Senior Software Engineer',
          dates: '2020 – Present',
          description: 'Led frontend architecture. Shipped features used by 2M+ users.',
        },
      ],
      projects: [
        {
          title: 'Open Source CLI Tool',
          description: 'Developer productivity tool with 10k+ downloads.',
          techStack: ['Node.js', 'TypeScript'],
          liveUrl: '',
          githubUrl: 'https://github.com/example/cli',
        },
        {
          title: 'Dashboard Widgets',
          description: 'Reusable chart components used across 5 product teams.',
          techStack: ['React', 'D3.js'],
          liveUrl: '',
          githubUrl: '',
        },
      ],
      skills: {
        technical: ['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'REST APIs'],
        soft: ['Team Leadership', 'Problem Solving'],
        tools: ['Git', 'AWS'],
      },
      links: {
        github: 'https://github.com/alexchen',
        linkedin: 'https://linkedin.com/in/alexchen',
      },
    });
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        updatePersonal,
        updateSummary,
        updateEducation,
        addEducation,
        removeEducation,
        updateExperience,
        addExperience,
        removeExperience,
        updateProjects,
        addProject,
        removeProject,
        updateSkillsCategory,
        addSkillToCategory,
        removeSkillFromCategory,
        suggestSkills,
        updateLinks,
        loadSampleData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
}
