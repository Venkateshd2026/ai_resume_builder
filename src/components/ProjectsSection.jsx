import { useState, useCallback } from 'react';
import { useResume } from '../context/ResumeContext';
import BulletGuidanceHint from './BulletGuidanceHint';

const DESC_MAX = 200;

function TagInput({ items, onAdd, onRemove, placeholder }) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const v = value.trim();
      if (v) {
        onAdd(v);
        setValue('');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--kn-space-1)', marginTop: 4 }}>
      {items.map((s, i) => (
        <span
          key={i}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '2px 6px',
            fontSize: 12,
            background: 'rgba(17,17,17,0.06)',
            borderRadius: 4,
          }}
        >
          {s}
          <button
            type="button"
            onClick={() => onRemove(i)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontSize: 12,
              lineHeight: 1,
              opacity: 0.7,
            }}
            aria-label="Remove"
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        className="kn-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ width: 100, minWidth: 60, padding: '2px 6px', fontSize: 12 }}
      />
    </div>
  );
}

export default function ProjectsSection() {
  const { resume, updateProjects, addProject, removeProject } = useResume();
  const [openIndex, setOpenIndex] = useState(0);

  const addTechToProject = useCallback((projIndex, tech) => {
    const p = resume.projects[projIndex];
    if (!p) return;
    const list = [...(p.techStack || [])];
    if (list.includes(tech)) return;
    updateProjects(projIndex, { ...p, techStack: [...list, tech] });
  }, [resume.projects, updateProjects]);

  const removeTechFromProject = useCallback((projIndex, techIndex) => {
    const p = resume.projects[projIndex];
    if (!p) return;
    const list = [...(p.techStack || [])];
    list.splice(techIndex, 1);
    updateProjects(projIndex, { ...p, techStack: list });
  }, [resume.projects, updateProjects]);

  return (
    <div className="kn-card" style={{ marginBottom: 'var(--kn-space-2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--kn-space-2)' }}>
        <h3 className="kn-h3" style={{ margin: 0 }}>Projects</h3>
        <button type="button" className="kn-btn kn-btn--secondary" onClick={addProject}>
          Add Project
        </button>
      </div>
      {resume.projects.map((p, i) => {
        const isOpen = openIndex === i;
        const title = (p.title || '').trim() || `Project ${i + 1}`;
        const descLen = (p.description || '').length;
        return (
          <div
            key={i}
            style={{
              marginBottom: 'var(--kn-space-2)',
              border: '1px solid var(--kn-border)',
              borderRadius: 'var(--kn-radius)',
              overflow: 'hidden',
            }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--kn-space-2)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 14,
                fontWeight: 500,
                textAlign: 'left',
              }}
            >
              {title}
              <span style={{ opacity: 0.6 }}>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div style={{ padding: '0 var(--kn-space-2) var(--kn-space-2)' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                  <button
                    type="button"
                    className="kn-btn kn-btn--secondary"
                    style={{ padding: '4px 8px', fontSize: 12 }}
                    onClick={() => {
                      removeProject(i);
                      setOpenIndex(null);
                    }}
                  >
                    Delete
                  </button>
                </div>
                <input
                  className="kn-input"
                  placeholder="Project Title"
                  value={p.title}
                  onChange={(e) => updateProjects(i, { ...p, title: e.target.value })}
                  style={{ marginBottom: 8 }}
                />
                <div style={{ marginBottom: 8 }}>
                  <textarea
                    className="kn-input"
                    rows={3}
                    placeholder="Description (max 200 chars)"
                    value={p.description}
                    onChange={(e) => updateProjects(i, { ...p, description: e.target.value.slice(0, DESC_MAX) })}
                    style={{ resize: 'vertical' }}
                  />
                  <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>
                    {descLen}/{DESC_MAX}
                  </div>
                  <BulletGuidanceHint text={p.description} />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 4 }}>Tech Stack</div>
                  <TagInput
                    items={p.techStack || []}
                    onAdd={(s) => addTechToProject(i, s)}
                    onRemove={(idx) => removeTechFromProject(i, idx)}
                    placeholder="Add tech"
                  />
                </div>
                <input
                  className="kn-input"
                  placeholder="Live URL (optional)"
                  value={p.liveUrl || ''}
                  onChange={(e) => updateProjects(i, { ...p, liveUrl: e.target.value })}
                  style={{ marginBottom: 8 }}
                />
                <input
                  className="kn-input"
                  placeholder="GitHub URL (optional)"
                  value={p.githubUrl || ''}
                  onChange={(e) => updateProjects(i, { ...p, githubUrl: e.target.value })}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
