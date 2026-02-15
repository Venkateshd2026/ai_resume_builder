import { useResume } from '../context/ResumeContext';
import AppLayout from '../components/AppLayout';
import ResumePreview from '../components/ResumePreview';
import AtsScoreMeter from '../components/AtsScoreMeter';
import Top3Improvements from '../components/Top3Improvements';
import TemplatePicker from '../components/TemplatePicker';
import ColorThemePicker from '../components/ColorThemePicker';
import BulletGuidanceHint from '../components/BulletGuidanceHint';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';

function FormSection({ title, children }) {
  return (
    <div className="kn-card" style={{ marginBottom: 'var(--kn-space-2)' }}>
      <h3 className="kn-h3" style={{ marginBottom: 'var(--kn-space-2)' }}>{title}</h3>
      {children}
    </div>
  );
}

export default function BuilderPage() {
  const {
    resume,
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
    updateLinks,
    loadSampleData,
  } = useResume();

  return (
    <AppLayout>
      <div style={{ display: 'flex', gap: 'var(--kn-space-4)', maxWidth: 1200, margin: '0 auto', flexWrap: 'wrap' }}>
        {/* Left: Form */}
        <div style={{ flex: '0 1 50%', minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--kn-space-3)' }}>
            <h1 className="kn-h2" style={{ margin: 0 }}>Builder</h1>
            <button type="button" className="kn-btn kn-btn--secondary" onClick={loadSampleData}>
              Load Sample Data
            </button>
          </div>

          <FormSection title="Personal Info">
            <div style={{ display: 'grid', gap: 'var(--kn-space-2)' }}>
              <input
                className="kn-input"
                placeholder="Full name"
                value={resume.personal.name}
                onChange={(e) => updatePersonal('name', e.target.value)}
              />
              <input
                className="kn-input"
                type="email"
                placeholder="Email"
                value={resume.personal.email}
                onChange={(e) => updatePersonal('email', e.target.value)}
              />
              <input
                className="kn-input"
                placeholder="Phone"
                value={resume.personal.phone}
                onChange={(e) => updatePersonal('phone', e.target.value)}
              />
              <input
                className="kn-input"
                placeholder="Location"
                value={resume.personal.location}
                onChange={(e) => updatePersonal('location', e.target.value)}
              />
            </div>
          </FormSection>

          <FormSection title="Summary">
            <textarea
              className="kn-input"
              rows={4}
              placeholder="Professional summary"
              value={resume.summary}
              onChange={(e) => updateSummary(e.target.value)}
              style={{ resize: 'vertical' }}
            />
          </FormSection>

          <FormSection title="Education">
            {resume.education.map((e, i) => (
              <div key={i} style={{ marginBottom: 'var(--kn-space-2)', padding: 'var(--kn-space-2)', border: '1px solid var(--kn-border)', borderRadius: 'var(--kn-radius)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>Entry {i + 1}</span>
                  <button type="button" className="kn-btn kn-btn--secondary" style={{ padding: '4px 8px' }} onClick={() => removeEducation(i)}>Remove</button>
                </div>
                <input className="kn-input" placeholder="School" value={e.school} onChange={(ev) => updateEducation(i, { ...e, school: ev.target.value })} style={{ marginBottom: 8 }} />
                <input className="kn-input" placeholder="Degree" value={e.degree} onChange={(ev) => updateEducation(i, { ...e, degree: ev.target.value })} style={{ marginBottom: 8 }} />
                <input className="kn-input" placeholder="Year" value={e.year} onChange={(ev) => updateEducation(i, { ...e, year: ev.target.value })} />
              </div>
            ))}
            <button type="button" className="kn-btn kn-btn--secondary" onClick={addEducation}>+ Add Education</button>
          </FormSection>

          <FormSection title="Experience">
            {resume.experience.map((e, i) => (
              <div key={i} style={{ marginBottom: 'var(--kn-space-2)', padding: 'var(--kn-space-2)', border: '1px solid var(--kn-border)', borderRadius: 'var(--kn-radius)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>Entry {i + 1}</span>
                  <button type="button" className="kn-btn kn-btn--secondary" style={{ padding: '4px 8px' }} onClick={() => removeExperience(i)}>Remove</button>
                </div>
                <input className="kn-input" placeholder="Company" value={e.company} onChange={(ev) => updateExperience(i, { ...e, company: ev.target.value })} style={{ marginBottom: 8 }} />
                <input className="kn-input" placeholder="Role" value={e.role} onChange={(ev) => updateExperience(i, { ...e, role: ev.target.value })} style={{ marginBottom: 8 }} />
                <input className="kn-input" placeholder="Dates" value={e.dates} onChange={(ev) => updateExperience(i, { ...e, dates: ev.target.value })} style={{ marginBottom: 8 }} />
                <textarea className="kn-input" rows={2} placeholder="Description (one bullet per line)" value={e.description} onChange={(ev) => updateExperience(i, { ...e, description: ev.target.value })} style={{ resize: 'vertical' }} />
                <BulletGuidanceHint text={e.description} />
              </div>
            ))}
            <button type="button" className="kn-btn kn-btn--secondary" onClick={addExperience}>+ Add Experience</button>
          </FormSection>

          <ProjectsSection />

          <SkillsSection />

          <FormSection title="Links">
            <input
              className="kn-input"
              placeholder="GitHub URL"
              value={resume.links.github}
              onChange={(e) => updateLinks('github', e.target.value)}
              style={{ marginBottom: 8 }}
            />
            <input
              className="kn-input"
              placeholder="LinkedIn URL"
              value={resume.links.linkedin}
              onChange={(e) => updateLinks('linkedin', e.target.value)}
            />
          </FormSection>
        </div>

        {/* Right: ATS score + Top 3 Improvements + Template + Live preview */}
        <aside style={{ flex: '1 1 320px', minWidth: 280, position: 'sticky', top: 'var(--kn-space-4)', alignSelf: 'flex-start' }}>
          <AtsScoreMeter />
          <Top3Improvements />
          <div className="kn-card" style={{ border: '1px solid var(--kn-border)', minHeight: 400 }}>
            <h3 className="kn-h3" style={{ marginBottom: 'var(--kn-space-2)' }}>Live Preview</h3>
            <TemplatePicker />
            <ColorThemePicker />
            <div style={{ background: '#fff', color: '#111', borderRadius: 4, overflow: 'hidden' }}>
              <ResumePreview compact />
            </div>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
