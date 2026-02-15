import { useState, useEffect } from 'react';
import { getArtifact, setArtifact } from '../lib/rbStorage';

const LOVABLE_URL = 'https://lovable.dev';

export default function BuildPanel({ stepNum, placeholderText = 'Paste prompt or spec here to copy into Lovable.', onArtifactSaved }) {
  const [value, setValue] = useState(() => getArtifact(stepNum) || '');
  useEffect(() => {
    setValue(getArtifact(stepNum) || '');
  }, [stepNum]);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  const saveAndNotify = (v) => {
    setArtifact(stepNum, v);
    onArtifactSaved?.();
  };

  const handleItWorked = () => saveAndNotify(value.trim() || 'completed');
  const handleError = () => saveAndNotify(value.trim() || 'error_logged');
  const handleScreenshot = () => saveAndNotify(value.trim() || 'screenshot_added');

  const handleBuildLovable = () => {
    window.open(LOVABLE_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="kn-panel">
      <p style={{ fontSize: 14, margin: '0 0 16px' }}>
        Copy the content below into Lovable. Build, then mark your result.
      </p>
      <div className="kn-prompt-box">
        <textarea
          className="kn-input"
          rows={6}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholderText}
          style={{ fontFamily: 'ui-monospace, monospace', resize: 'vertical', minHeight: 120 }}
        />
        <div className="kn-prompt-box__actions">
          <button type="button" className="kn-btn kn-btn--secondary" onClick={handleCopy}>
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button type="button" className="kn-btn kn-btn--primary" onClick={handleBuildLovable}>
            Build in Lovable
          </button>
          <button type="button" className="kn-btn kn-btn--secondary" onClick={handleItWorked}>
            It Worked
          </button>
          <button type="button" className="kn-btn kn-btn--secondary" onClick={handleError}>
            Error
          </button>
          <button type="button" className="kn-btn kn-btn--secondary" onClick={handleScreenshot}>
            Add Screenshot
          </button>
        </div>
      </div>
      <p style={{ fontSize: 12, margin: 0, opacity: 0.8 }}>
        Upload an artifact (link or confirmation) to unlock Next. No skipping steps.
      </p>
    </div>
  );
}
