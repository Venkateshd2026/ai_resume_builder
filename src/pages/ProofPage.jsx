import { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import { useProof } from '../context/ProofContext';
import { STEP_LABELS } from '../lib/proofStorage';
import { CHECKLIST_LABELS } from '../lib/checklistStorage';
import { isValidUrl, getFinalSubmissionText } from '../lib/proofStorage';

export default function ProofPage() {
  const { proof, setProof, setStepCompleted, checklist, setChecklistItem, shipped } = useProof();
  const [copied, setCopied] = useState(false);
  const [touched, setTouched] = useState({ lovable: false, github: false, deployed: false });

  const handleLinkChange = (field, value) => {
    setProof({ [field]: value });
  };

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const handleCopyFinal = async () => {
    try {
      await navigator.clipboard.writeText(getFinalSubmissionText(proof));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (_) {}
  };

  const lovableValid = isValidUrl(proof.lovableUrl);
  const githubValid = isValidUrl(proof.githubUrl);
  const deployedValid = isValidUrl(proof.deployedUrl);
  const showLovableError = touched.lovable && proof.lovableUrl && !lovableValid;
  const showGithubError = touched.github && proof.githubUrl && !githubValid;
  const showDeployedError = touched.deployed && proof.deployedUrl && !deployedValid;

  const allStepsDone = proof.stepsCompleted.every(Boolean);
  const allChecklistDone = checklist.every(Boolean);
  const allLinksDone = lovableValid && githubValid && deployedValid;

  return (
    <AppLayout>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        {shipped && (
          <div
            className="kn-card"
            style={{
              marginBottom: 'var(--kn-space-4)',
              padding: 'var(--kn-space-4)',
              background: 'rgba(74, 93, 74, 0.08)',
              borderColor: 'var(--kn-success)',
            }}
          >
            <p style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
              Project 3 Shipped Successfully.
            </p>
          </div>
        )}

        <section className="kn-context-header" style={{ paddingTop: 0 }}>
          <h1 className="kn-context-header__headline">Proof & Submission</h1>
          <p className="kn-context-header__subtext">
            Mark all steps complete, pass the checklist, and provide artifact links to reach Shipped status.
          </p>
        </section>

        {/* A) Step Completion Overview */}
        <div className="kn-card" style={{ marginBottom: 'var(--kn-space-3)' }}>
          <h3 className="kn-h3" style={{ marginBottom: 'var(--kn-space-2)' }}>Step Completion Overview</h3>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {STEP_LABELS.map((label, i) => (
              <li key={i} style={{ marginBottom: 8 }}>
                <label className="kn-checkbox" style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={proof.stepsCompleted[i] ?? false}
                    onChange={(e) => setStepCompleted(i, e.target.checked)}
                  />
                  <span>{label}</span>
                  <span style={{ fontSize: 12, opacity: 0.7 }}>
                    {proof.stepsCompleted[i] ? '✓' : '○'}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* 10 Checklist Tests */}
        <div className="kn-card" style={{ marginBottom: 'var(--kn-space-3)' }}>
          <h3 className="kn-h3" style={{ marginBottom: 'var(--kn-space-2)' }}>Test Checklist (10 items)</h3>
          <p style={{ fontSize: 14, marginBottom: 16, opacity: 0.9 }}>
            All 10 tests must pass to reach Shipped status.
          </p>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {CHECKLIST_LABELS.map((label, i) => (
              <li key={i} style={{ marginBottom: 8 }}>
                <label className="kn-checkbox" style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={checklist[i] ?? false}
                    onChange={(e) => setChecklistItem(i, e.target.checked)}
                  />
                  <span>{label}</span>
                  <span style={{ fontSize: 12, opacity: 0.7 }}>
                    {checklist[i] ? '✓' : '○'}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* B) Artifact Collection */}
        <div className="kn-card" style={{ marginBottom: 'var(--kn-space-3)' }}>
          <h3 className="kn-h3" style={{ marginBottom: 'var(--kn-space-2)' }}>Artifact Collection</h3>
          <p style={{ fontSize: 14, marginBottom: 16, opacity: 0.9 }}>
            Required to mark Shipped. Valid URLs (http:// or https://).
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label htmlFor="lovable" style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                Lovable Project Link
              </label>
              <input
                id="lovable"
                type="url"
                className="kn-input"
                value={proof.lovableUrl}
                onChange={(e) => handleLinkChange('lovableUrl', e.target.value)}
                onBlur={() => handleBlur('lovable')}
                placeholder="https://..."
                style={showLovableError ? { borderColor: 'var(--kn-warning)' } : {}}
              />
              {showLovableError && (
                <p style={{ fontSize: 12, color: 'var(--kn-warning)', marginTop: 4 }}>Enter a valid URL.</p>
              )}
            </div>
            <div>
              <label htmlFor="github" style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                GitHub Repository Link
              </label>
              <input
                id="github"
                type="url"
                className="kn-input"
                value={proof.githubUrl}
                onChange={(e) => handleLinkChange('githubUrl', e.target.value)}
                onBlur={() => handleBlur('github')}
                placeholder="https://github.com/..."
                style={showGithubError ? { borderColor: 'var(--kn-warning)' } : {}}
              />
              {showGithubError && (
                <p style={{ fontSize: 12, color: 'var(--kn-warning)', marginTop: 4 }}>Enter a valid URL.</p>
              )}
            </div>
            <div>
              <label htmlFor="deployed" style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                Deployed URL
              </label>
              <input
                id="deployed"
                type="url"
                className="kn-input"
                value={proof.deployedUrl}
                onChange={(e) => handleLinkChange('deployedUrl', e.target.value)}
                onBlur={() => handleBlur('deployed')}
                placeholder="https://..."
                style={showDeployedError ? { borderColor: 'var(--kn-warning)' } : {}}
              />
              {showDeployedError && (
                <p style={{ fontSize: 12, color: 'var(--kn-warning)', marginTop: 4 }}>Enter a valid URL.</p>
              )}
            </div>
          </div>
        </div>

        {/* Final Submission Export */}
        <div className="kn-card" style={{ marginBottom: 'var(--kn-space-3)' }}>
          <h3 className="kn-h3" style={{ marginBottom: 'var(--kn-space-2)' }}>Final Submission Export</h3>
          <p style={{ fontSize: 14, marginBottom: 16, opacity: 0.9 }}>
            Copy the formatted block to submit or share.
          </p>
          <button
            type="button"
            className={`kn-btn ${copied ? 'kn-btn--secondary' : 'kn-btn--primary'}`}
            onClick={handleCopyFinal}
          >
            {copied ? 'Copied' : 'Copy Final Submission'}
          </button>
        </div>

        {/* Status summary */}
        <div style={{ fontSize: 13, opacity: 0.8 }}>
          {allStepsDone && allChecklistDone && allLinksDone ? (
            <span style={{ color: 'var(--kn-success)' }}>All criteria met. Status: Shipped.</span>
          ) : (
            <span>
              {!allStepsDone && 'Complete all 8 steps. '}
              {!allChecklistDone && 'Pass all 10 checklist tests. '}
              {!allLinksDone && 'Provide valid Lovable, GitHub, and Deployed URLs.'}
            </span>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
