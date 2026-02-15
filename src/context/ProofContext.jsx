import { createContext, useContext, useState, useEffect } from 'react';
import * as proofStore from '../lib/proofStorage';
import * as checklistStore from '../lib/checklistStorage';

const ProofContext = createContext(null);

export function ProofProvider({ children }) {
  const [proof, setProofState] = useState(() => proofStore.getProof());
  const [checklist, setChecklistState] = useState(() => checklistStore.getChecklistState());

  const refresh = () => {
    setProofState(proofStore.getProof());
    setChecklistState(checklistStore.getChecklistState());
  };

  useEffect(() => {
    proofStore.saveProof(proof);
  }, [proof]);

  useEffect(() => {
    localStorage.setItem('rb_checklist_tests', JSON.stringify(checklist));
  }, [checklist]);

  const setProof = (updates) => setProofState((p) => ({ ...p, ...updates }));
  const setStepCompleted = (index, completed) => {
    setProofState((p) => {
      const steps = [...p.stepsCompleted];
      if (index >= 0 && index < proofStore.STEP_COUNT) steps[index] = Boolean(completed);
      return { ...p, stepsCompleted: steps };
    });
  };
  const setChecklistItem = (index, completed) => {
    setChecklistState((c) => {
      const next = [...c];
      if (index >= 0 && index < checklistStore.CHECKLIST_COUNT) next[index] = Boolean(completed);
      return next;
    });
  };

  const shipped =
    proof.stepsCompleted.every(Boolean) &&
    checklist.every(Boolean) &&
    proofStore.isValidUrl(proof.lovableUrl) &&
    proofStore.isValidUrl(proof.githubUrl) &&
    proofStore.isValidUrl(proof.deployedUrl);

  return (
    <ProofContext.Provider
      value={{
        proof,
        setProof,
        setStepCompleted,
        checklist,
        setChecklistItem,
        shipped,
        refresh,
      }}
    >
      {children}
    </ProofContext.Provider>
  );
}

export function useProof() {
  const ctx = useContext(ProofContext);
  if (!ctx) throw new Error('useProof must be used within ProofProvider');
  return ctx;
}
