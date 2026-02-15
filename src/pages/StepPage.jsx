import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RBLayout from '../components/RBLayout';
import BuildPanel from '../components/BuildPanel';
import { canAccessStep, isStepComplete } from '../lib/rbStorage';

const STEP_CONFIG = {
  '01-problem': { headline: 'Define the problem', subtext: 'Describe what the AI Resume Builder solves and for whom.', placeholder: 'Problem statement and user pain points...' },
  '02-market': { headline: 'Market and opportunity', subtext: 'Size the market and identify key competitors.', placeholder: 'Market size, competitors, differentiation...' },
  '03-architecture': { headline: 'System architecture', subtext: 'Outline high-level architecture and tech choices.', placeholder: 'Architecture overview, tech stack...' },
  '04-hld': { headline: 'High-level design', subtext: 'Define major components and data flow.', placeholder: 'HLD components, data flow, APIs...' },
  '05-lld': { headline: 'Low-level design', subtext: 'Detail implementation of core modules.', placeholder: 'LLD for key modules...' },
  '06-build': { headline: 'Build', subtext: 'Implement the solution in Lovable.', placeholder: 'Implementation prompts and specs...' },
  '07-test': { headline: 'Test', subtext: 'Verify functionality and quality.', placeholder: 'Test scenarios and acceptance criteria...' },
  '08-ship': { headline: 'Ship', subtext: 'Deploy and finalize the product.', placeholder: 'Deployment and launch checklist...' },
};

const STEP_ORDER = [
  '01-problem', '02-market', '03-architecture', '04-hld', '05-lld', '06-build', '07-test', '08-ship',
];

export default function StepPage() {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const [, forceUpdate] = useState(0);

  const config = STEP_CONFIG[stepId];
  if (!config) {
    navigate('/01-problem', { replace: true });
    return null;
  }

  const idx = STEP_ORDER.indexOf(stepId);
  const stepNum = idx + 1;
  const canAccess = canAccessStep(stepNum);
  const hasArtifact = isStepComplete(stepNum);

  if (!canAccess) {
    navigate(`/${STEP_ORDER[stepNum - 2]}`, { replace: true });
    return null;
  }

  const prevStep = idx > 0 ? STEP_ORDER[idx - 1] : null;
  const nextStep = idx < STEP_ORDER.length - 1 ? STEP_ORDER[idx + 1] : null;

  return (
    <RBLayout headline={config.headline} subtext={config.subtext} stepNum={stepNum}>
      <div className="kn-workspace">
        <div className="kn-card">
          <h3 className="kn-h3">Workspace</h3>
          <p className="kn-text-block">
            Primary content for this step. Artifact gating: Next is disabled until you upload an artifact (via Build panel).
          </p>
          {hasArtifact && (
            <p style={{ marginTop: 16, fontSize: 14, color: 'var(--kn-success)' }}>
              ✓ Artifact recorded for Step {stepNum}.
            </p>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
          <div>
            {prevStep && (
              <Link to={`/${prevStep}`} className="kn-btn kn-btn--secondary">
                ← Previous
              </Link>
            )}
          </div>
          <div>
            {nextStep ? (
              <Link
                to={hasArtifact ? `/${nextStep}` : '#'}
                className={`kn-btn ${hasArtifact ? 'kn-btn--primary' : 'kn-btn--secondary'}`}
                style={!hasArtifact ? { opacity: 0.6, pointerEvents: 'none', cursor: 'not-allowed' } : {}}
                onClick={(e) => !hasArtifact && e.preventDefault()}
              >
                Next →
              </Link>
            ) : (
              <Link
                to={hasArtifact ? '/proof' : '#'}
                className={`kn-btn ${hasArtifact ? 'kn-btn--primary' : 'kn-btn--secondary'}`}
                style={!hasArtifact ? { opacity: 0.6, pointerEvents: 'none', cursor: 'not-allowed' } : {}}
                onClick={(e) => !hasArtifact && e.preventDefault()}
              >
                Go to Proof →
              </Link>
            )}
          </div>
        </div>
      </div>
      <BuildPanel stepNum={stepNum} placeholderText={config.placeholder} onArtifactSaved={() => forceUpdate(n => n + 1)} />
    </RBLayout>
  );
}
