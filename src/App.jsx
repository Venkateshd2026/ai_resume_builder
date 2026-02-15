import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import { TemplateProvider } from './context/TemplateContext';
import { ProofProvider } from './context/ProofContext';
import HomePage from './pages/HomePage';
import BuilderPage from './pages/BuilderPage';
import PreviewPage from './pages/PreviewPage';
import ProofPage from './pages/ProofPage';

export default function App() {
  return (
    <ResumeProvider>
      <TemplateProvider>
        <ProofProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/proof" element={<ProofPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
        </ProofProvider>
      </TemplateProvider>
    </ResumeProvider>
  );
}
