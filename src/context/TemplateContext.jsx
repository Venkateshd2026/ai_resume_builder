import { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY_TEMPLATE = 'resumeBuilderTemplate';
const STORAGE_KEY_COLOR = 'resumeBuilderColor';
const TEMPLATES = ['Classic', 'Modern', 'Minimal'];

const COLOR_THEMES = {
  Teal: 'hsl(168, 60%, 40%)',
  Navy: 'hsl(220, 60%, 35%)',
  Burgundy: 'hsl(345, 60%, 35%)',
  Forest: 'hsl(150, 50%, 30%)',
  Charcoal: 'hsl(0, 0%, 25%)',
};

function loadTemplate() {
  try {
    const v = localStorage.getItem(STORAGE_KEY_TEMPLATE);
    return TEMPLATES.includes(v) ? v : 'Classic';
  } catch {
    return 'Classic';
  }
}

function loadColor() {
  try {
    const v = localStorage.getItem(STORAGE_KEY_COLOR);
    return v && COLOR_THEMES[v] ? v : 'Teal';
  } catch {
    return 'Teal';
  }
}

function saveStored(template, color) {
  try {
    localStorage.setItem(STORAGE_KEY_TEMPLATE, template);
    localStorage.setItem(STORAGE_KEY_COLOR, color);
  } catch (_) {}
}

const TemplateContext = createContext(null);

export function TemplateProvider({ children }) {
  const [template, setTemplate] = useState(loadTemplate);
  const [color, setColor] = useState(loadColor);

  useEffect(() => {
    saveStored(template, color);
  }, [template, color]);

  const accentHsl = COLOR_THEMES[color] || COLOR_THEMES.Teal;

  return (
    <TemplateContext.Provider
      value={{
        template,
        setTemplate,
        color,
        setColor,
        templates: TEMPLATES,
        colorThemes: Object.keys(COLOR_THEMES),
        accentHsl,
        colorThemeValues: COLOR_THEMES,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const ctx = useContext(TemplateContext);
  if (!ctx) throw new Error('useTemplate must be used within TemplateProvider');
  return ctx;
}
