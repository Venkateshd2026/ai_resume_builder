import { useState, useCallback } from 'react';
import { useResume } from '../context/ResumeContext';
import AppLayout from '../components/AppLayout';
import ResumePreview from '../components/ResumePreview';
import TemplatePicker from '../components/TemplatePicker';
import ColorThemePicker from '../components/ColorThemePicker';
import AtsScoreCircle from '../components/AtsScoreCircle';
import { getResumeAsPlainText, getExportValidation } from '../lib/exportResume';

export default function PreviewPage() {
  const { resume } = useResume();
  const [copied, setCopied] = useState(false);
  const [pdfToast, setPdfToast] = useState(false);
  const validation = getExportValidation(resume);

  const handlePrint = useCallback(() => {
    window.print();
    setPdfToast(true);
    setTimeout(() => setPdfToast(false), 3000);
  }, []);

  const handleCopyText = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getResumeAsPlainText(resume));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  }, [resume]);

  return (
    <AppLayout>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="no-print" style={{ marginBottom: 'var(--kn-space-3)' }}>
          <h1 className="kn-h2" style={{ margin: '0 0 var(--kn-space-3)' }}>Preview</h1>
          <AtsScoreCircle />
          <TemplatePicker />
          <ColorThemePicker />
        </div>

        {validation.warn && (
          <div
            className="no-print kn-card"
            style={{
              marginBottom: 'var(--kn-space-3)',
              padding: 'var(--kn-space-2)',
              borderColor: 'var(--kn-warning)',
              background: 'rgba(139, 115, 85, 0.06)',
            }}
          >
            <p style={{ margin: 0, fontSize: 14, opacity: 0.95 }}>{validation.message}</p>
          </div>
        )}

        <div
          className="no-print"
          style={{ display: 'flex', gap: 'var(--kn-space-2)', marginBottom: 'var(--kn-space-3)', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <button type="button" className="kn-btn kn-btn--primary" onClick={handlePrint}>
            Print / Save as PDF
          </button>
          <button type="button" className="kn-btn kn-btn--secondary" onClick={handleCopyText}>
            {copied ? 'Copied' : 'Copy Resume as Text'}
          </button>
          {pdfToast && (
            <span
              style={{
                fontSize: 13,
                padding: '8px 16px',
                background: 'rgba(17,17,17,0.06)',
                borderRadius: 4,
                marginLeft: 8,
              }}
            >
              PDF export ready! Check your downloads.
            </span>
          )}
        </div>

        <div
          id="resume-print-area"
          className="resume-print-area"
          style={{
            background: '#fff',
            color: '#111',
            minHeight: 600,
            padding: 'var(--kn-space-5)',
            border: '1px solid rgba(0,0,0,0.12)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            overflow: 'visible',
          }}
        >
          <ResumePreview />
        </div>
      </div>
    </AppLayout>
  );
}
