import { useResume } from '../context/ResumeContext';
import { useTemplate } from '../context/TemplateContext';
import { getSkillsForDisplay } from '../lib/skillsHelpers';

const SKILL_LABELS = { technical: 'Technical Skills', soft: 'Soft Skills', tools: 'Tools & Technologies' };

export default function ResumePreview({ compact = false }) {
  const { resume } = useResume();
  const { template, accentHsl } = useTemplate();
  const { personal, summary, education, experience, projects, skills, links } = resume;

  const skillsGroups = getSkillsForDisplay(resume);
  const hasAnySkills = skillsGroups.technical.length || skillsGroups.soft.length || skillsGroups.tools.length;
  const hasLinks = (links.github || '').trim() || (links.linkedin || '').trim();

  const pillStyle = {
    display: 'inline-block',
    padding: '2px 8px',
    fontSize: 12,
    background: 'rgba(17,17,17,0.08)',
    borderRadius: 4,
    margin: '2px 4px 2px 0',
  };

  const contactLine = [personal.email, personal.phone, personal.location].filter(Boolean).join(' · ') || 'Email · Phone · Location';

  // Classic: single-column, serif, horizontal rules
  if (template === 'Classic') {
    const sectionStyle = { marginBottom: 'var(--kn-space-3)' };
    const headingStyle = {
      fontSize: 12,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: 8,
      fontFamily: 'var(--kn-font-serif)',
      color: accentHsl,
    };
    const hrStyle = { border: 'none', borderTop: `1px solid ${accentHsl}`, margin: 'var(--kn-space-2) 0' };

    return (
      <div
        className="resume-preview-classic"
        style={{
          fontFamily: 'var(--kn-font-serif)',
          color: '#111',
          padding: compact ? 'var(--kn-space-3)' : 'var(--kn-space-4)',
          maxWidth: 600,
          margin: '0 auto',
          overflow: 'visible',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        <div style={sectionStyle}>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 var(--kn-space-1)', fontFamily: 'var(--kn-font-serif)', color: accentHsl }}>
            {personal.name || 'Your Name'}
          </h1>
          <div style={{ fontSize: 14, opacity: 0.9 }}>{contactLine}</div>
        </div>
        <hr style={hrStyle} />
        {summary && (
          <>
            <section style={sectionStyle}>
              <h2 style={headingStyle}>Summary</h2>
              <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>{summary}</p>
            </section>
            <hr style={hrStyle} />
          </>
        )}
        {education.length > 0 && (
          <>
            <section style={sectionStyle}>
              <h2 style={headingStyle}>Education</h2>
              {education.map((e, i) => (
                <div key={i} className="resume-print-entry" style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 600 }}>{e.school || 'School'}</div>
                  <div style={{ fontSize: 13 }}>{e.degree} {e.year && `· ${e.year}`}</div>
                </div>
              ))}
            </section>
            <hr style={hrStyle} />
          </>
        )}
        {experience.length > 0 && (
          <>
            <section style={sectionStyle}>
              <h2 style={headingStyle}>Experience</h2>
              {experience.map((e, i) => (
                <div key={i} className="resume-print-entry" style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 600 }}>{e.role || 'Role'}</div>
                  <div style={{ fontSize: 13 }}>{e.company} {e.dates && `· ${e.dates}`}</div>
                  {e.description && <p style={{ fontSize: 13, margin: '4px 0 0', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{e.description}</p>}
                </div>
              ))}
            </section>
            <hr style={hrStyle} />
          </>
        )}
        {projects.length > 0 && (
          <>
            <section style={sectionStyle}>
              <h2 style={headingStyle}>Projects</h2>
              {projects.map((p, i) => (
                <div key={i} className="resume-print-entry" style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600 }}>{p.title || 'Project'}</span>
                    {(p.liveUrl || p.githubUrl) && (
                      <span style={{ fontSize: 12, opacity: 0.8 }}>
                        {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', marginRight: 8 }}>🔗 Live</a>}
                        {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>⌘ GitHub</a>}
                      </span>
                    )}
                  </div>
                  {p.description && <p style={{ fontSize: 13, margin: '4px 0 0', lineHeight: 1.5 }}>{p.description}</p>}
                  {(p.techStack || []).length > 0 && (
                    <div style={{ marginTop: 6 }}>{(p.techStack || []).map((tech, j) => (<span key={j} style={pillStyle}>{tech}</span>))}</div>
                  )}
                </div>
              ))}
            </section>
            <hr style={hrStyle} />
          </>
        )}
        {hasAnySkills && (
          <>
            <section style={sectionStyle}>
              <h2 style={headingStyle}>Skills</h2>
              {['technical', 'soft', 'tools'].map((key) => {
                const items = skillsGroups[key] || [];
                if (items.length === 0) return null;
                return (
                  <div key={key} style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, opacity: 0.8 }}>{SKILL_LABELS[key]}</div>
                    <div>{items.map((s, j) => (<span key={j} style={pillStyle}>{s}</span>))}</div>
                  </div>
                );
              })}
            </section>
            <hr style={hrStyle} />
          </>
        )}
        {hasLinks && (
          <section>
            <h2 style={headingStyle}>Links</h2>
            <div style={{ fontSize: 13 }}>{links.github && <div>GitHub: {links.github}</div>}{links.linkedin && <div>LinkedIn: {links.linkedin}</div>}</div>
          </section>
        )}
      </div>
    );
  }

  // Modern: two-column, colored left sidebar
  if (template === 'Modern') {
    const sidebarStyle = {
      background: accentHsl,
      color: 'rgba(255,255,255,0.95)',
      padding: 'var(--kn-space-4)',
      minWidth: 140,
      fontSize: 13,
    };
    const mainStyle = { flex: 1, padding: 'var(--kn-space-4)', minWidth: 0 };
    const headingStyle = { fontSize: 12, fontWeight: 600, marginBottom: 8, color: accentHsl, fontFamily: 'var(--kn-font-sans)' };

    return (
      <div
        className="resume-preview-modern"
        style={{
          display: 'flex',
          fontFamily: 'var(--kn-font-sans)',
          color: '#111',
          minHeight: 200,
          overflow: 'visible',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        <aside style={sidebarStyle}>
          <div style={{ marginBottom: 'var(--kn-space-3)' }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{personal.name || 'Your Name'}</div>
            <div style={{ fontSize: 12, opacity: 0.9 }}>{contactLine}</div>
          </div>
          {hasAnySkills && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Skills</div>
              {['technical', 'soft', 'tools'].map((key) => {
                const items = skillsGroups[key] || [];
                if (items.length === 0) return null;
                return <div key={key} style={{ marginBottom: 6 }}>{items.map((s, j) => (<span key={j} style={{ ...pillStyle, background: 'rgba(255,255,255,0.2)', marginRight: 4, marginBottom: 4, display: 'inline-block' }}>{s}</span>))}</div>;
              })}
            </div>
          )}
          {hasLinks && (
            <div style={{ marginTop: 'var(--kn-space-3)', fontSize: 12 }}>
              {links.github && <div>GitHub</div>}{links.linkedin && <div>LinkedIn</div>}
            </div>
          )}
        </aside>
        <main style={mainStyle}>
          {summary && (
            <section style={{ marginBottom: 'var(--kn-space-4)' }}>
              <h2 style={headingStyle}>Summary</h2>
              <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>{summary}</p>
            </section>
          )}
          {education.length > 0 && (
            <section style={{ marginBottom: 'var(--kn-space-4)' }}>
              <h2 style={headingStyle}>Education</h2>
              {education.map((e, i) => (
                <div key={i} className="resume-print-entry" style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 600 }}>{e.school || 'School'}</div>
                  <div style={{ fontSize: 13 }}>{e.degree} {e.year && `· ${e.year}`}</div>
                </div>
              ))}
            </section>
          )}
          {experience.length > 0 && (
            <section style={{ marginBottom: 'var(--kn-space-4)' }}>
              <h2 style={headingStyle}>Experience</h2>
              {experience.map((e, i) => (
                <div key={i} className="resume-print-entry" style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 600 }}>{e.role || 'Role'}</div>
                  <div style={{ fontSize: 13 }}>{e.company} {e.dates && `· ${e.dates}`}</div>
                  {e.description && <p style={{ fontSize: 13, margin: '4px 0 0', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{e.description}</p>}
                </div>
              ))}
            </section>
          )}
          {projects.length > 0 && (
            <section>
              <h2 style={headingStyle}>Projects</h2>
              {projects.map((p, i) => (
                <div key={i} className="resume-print-entry" style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600 }}>{p.title || 'Project'}</span>
                    {(p.liveUrl || p.githubUrl) && (
                      <span style={{ fontSize: 12, opacity: 0.8 }}>
                        {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', marginRight: 8 }}>🔗 Live</a>}
                        {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>⌘ GitHub</a>}
                      </span>
                    )}
                  </div>
                  {p.description && <p style={{ fontSize: 13, margin: '4px 0 0', lineHeight: 1.5 }}>{p.description}</p>}
                  {(p.techStack || []).length > 0 && <div style={{ marginTop: 6 }}>{(p.techStack || []).map((tech, j) => (<span key={j} style={pillStyle}>{tech}</span>))}</div>}
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    );
  }

  // Minimal: single-column, sans-serif, generous whitespace, no rules
  const sectionStyle = { marginBottom: 'var(--kn-space-5)' };
  const headingStyle = {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.02em',
    marginBottom: 12,
    fontFamily: 'var(--kn-font-sans)',
    color: accentHsl,
  };

  return (
    <div
      className="resume-preview-minimal"
      style={{
        fontFamily: 'var(--kn-font-sans)',
        color: '#111',
        padding: compact ? 'var(--kn-space-4)' : 'var(--kn-space-5)',
        maxWidth: 600,
        margin: '0 auto',
        overflow: 'visible',
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
      }}
    >
      <div style={sectionStyle}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 var(--kn-space-2)', fontFamily: 'var(--kn-font-sans)', color: accentHsl }}>
          {personal.name || 'Your Name'}
        </h1>
        <div style={{ fontSize: 14, opacity: 0.85 }}>{contactLine}</div>
      </div>
      {summary && (
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Summary</h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>{summary}</p>
        </section>
      )}
      {education.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Education</h2>
          {education.map((e, i) => (
            <div key={i} className="resume-print-entry" style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 600 }}>{e.school || 'School'}</div>
              <div style={{ fontSize: 13 }}>{e.degree} {e.year && `· ${e.year}`}</div>
            </div>
          ))}
        </section>
      )}
      {experience.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Experience</h2>
          {experience.map((e, i) => (
            <div key={i} className="resume-print-entry" style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 600 }}>{e.role || 'Role'}</div>
              <div style={{ fontSize: 13 }}>{e.company} {e.dates && `· ${e.dates}`}</div>
              {e.description && <p style={{ fontSize: 13, margin: '4px 0 0', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{e.description}</p>}
            </div>
          ))}
        </section>
      )}
      {projects.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Projects</h2>
          {projects.map((p, i) => (
            <div key={i} className="resume-print-entry" style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 600 }}>{p.title || 'Project'}</span>
                {(p.liveUrl || p.githubUrl) && (
                  <span style={{ fontSize: 12, opacity: 0.8 }}>
                    {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', marginRight: 8 }}>🔗 Live</a>}
                    {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>⌘ GitHub</a>}
                  </span>
                )}
              </div>
              {p.description && <p style={{ fontSize: 13, margin: '4px 0 0', lineHeight: 1.6 }}>{p.description}</p>}
              {(p.techStack || []).length > 0 && <div style={{ marginTop: 6 }}>{(p.techStack || []).map((tech, j) => (<span key={j} style={pillStyle}>{tech}</span>))}</div>}
            </div>
          ))}
        </section>
      )}
      {hasAnySkills && (
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Skills</h2>
          {['technical', 'soft', 'tools'].map((key) => {
            const items = skillsGroups[key] || [];
            if (items.length === 0) return null;
            return (
              <div key={key} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', marginBottom: 6, opacity: 0.8 }}>{SKILL_LABELS[key]}</div>
                <div>{items.map((s, j) => (<span key={j} style={pillStyle}>{s}</span>))}</div>
              </div>
            );
          })}
        </section>
      )}
      {hasLinks && (
        <section>
          <h2 style={headingStyle}>Links</h2>
          <div style={{ fontSize: 13 }}>{links.github && <div>GitHub: {links.github}</div>}{links.linkedin && <div>LinkedIn: {links.linkedin}</div>}</div>
        </section>
      )}
    </div>
  );
}
