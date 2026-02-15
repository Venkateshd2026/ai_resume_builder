import { Link, useLocation } from 'react-router-dom';
import { isStepComplete, allStepsComplete } from '../lib/rbStorage';

const STEP_ROUTES = [
  { path: '01-problem', label: 'Problem', stepNum: 1 },
  { path: '02-market', label: 'Market', stepNum: 2 },
  { path: '03-architecture', label: 'Architecture', stepNum: 3 },
  { path: '04-hld', label: 'HLD', stepNum: 4 },
  { path: '05-lld', label: 'LLD', stepNum: 5 },
  { path: '06-build', label: 'Build', stepNum: 6 },
  { path: '07-test', label: 'Test', stepNum: 7 },
  { path: '08-ship', label: 'Ship', stepNum: 8 },
];

function getStepFromPath(pathname) {
  const m = pathname.match(/\/(\d{2})-[\w-]+$/);
  if (m) return parseInt(m[1], 10);
  return 1;
}

function getStatusBadge() {
  if (allStepsComplete()) return 'Shipped';
  return 'In Progress';
}

export default function RBLayout({ children, headline, subtext, stepNum, progressLabel, showProofFooter = true }) {
  const location = useLocation();
  const currentStep = stepNum ?? getStepFromPath(location.pathname);
  const status = getStatusBadge();
  const progressText = progressLabel ?? `Step ${currentStep} of 8`;

  return (
    <div className="kn-layout">
      <header className="kn-top-bar">
        <Link to="/01-problem" className="kn-top-bar__project" style={{ textDecoration: 'none', color: 'inherit' }}>
          AI Resume Builder
        </Link>
        <span className="kn-top-bar__progress">
          Project 3 — {progressText}
        </span>
        <span className="kn-top-bar__status">{status}</span>
      </header>

      <section className="kn-context-header">
        <h1 className="kn-context-header__headline">{headline}</h1>
        <p className="kn-context-header__subtext">{subtext}</p>
      </section>

      <main className="kn-main">
        {children}
      </main>

      {showProofFooter && (
        <footer className="kn-proof-footer">
          <ul className="kn-proof-footer__list">
            {STEP_ROUTES.map(({ path, label, stepNum: s }) => (
              <li key={path} className="kn-proof-footer__item">
                <label className="kn-checkbox">
                  <input type="checkbox" checked={isStepComplete(s)} readOnly />
                  Step {s}: {label}
                </label>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </div>
  );
}
