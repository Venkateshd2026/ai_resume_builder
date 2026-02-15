# AI Resume Builder — Test Checklist

## ATS Score Rules (Deterministic)

| Rule | Points |
|------|--------|
| Name provided | +10 |
| Email provided | +10 |
| Summary > 50 chars | +10 |
| At least 1 experience with bullets | +15 |
| At least 1 education entry | +10 |
| At least 5 skills | +10 |
| At least 1 project | +10 |
| Phone provided | +5 |
| LinkedIn provided | +5 |
| GitHub provided | +5 |
| Summary contains action verbs | +10 |
| **Max** | **100** |

Action verbs: built, led, designed, improved, created, optimized, automated, developed, implemented, managed, delivered.

---

## Score Bands (on /preview)

| Score | Color | Label |
|-------|-------|-------|
| 0–40 | Red | Needs Work |
| 41–70 | Amber | Getting There |
| 71–100 | Green | Strong Resume |

---

## Test Checklist (10 items)

### 1. All form sections save to localStorage
- [ ] Go to `/builder`. Fill Personal Info, Summary, Education, Experience, Projects, Skills, Links.
- [ ] Refresh page (F5). All fields still filled.
- [ ] Verify localStorage key `resumeBuilderData` contains the data.

### 2. Live preview updates in real-time
- [ ] On `/builder`, type in any field.
- [ ] Live Preview (right panel) updates immediately.
- [ ] Add/remove education, experience, projects, skills — preview reflects changes.

### 3. Template switching preserves data
- [ ] Fill some resume data on `/builder`.
- [ ] Switch between Classic, Modern, Minimal.
- [ ] Confirm content stays the same; only layout/typography changes.
- [ ] Switch on `/preview` — same behavior.

### 4. Color theme persists after refresh
- [ ] Select a color (e.g., Navy or Burgundy).
- [ ] Refresh page. Selected color still applied.
- [ ] Verify localStorage key `resumeBuilderColor`.

### 5. ATS score calculates correctly
- [ ] Start with empty resume. Score = 0.
- [ ] Add name → +10. Add email → +10. Add summary > 50 chars → +10.
- [ ] Add 1 experience with bullets → +15. Add 1 education → +10.
- [ ] Add 5 skills → +10. Add 1 project → +10.
- [ ] Add phone → +5. Add LinkedIn → +5. Add GitHub → +5.
- [ ] Add action verb to summary (e.g., "Built") → +10.
- [ ] Confirm score caps at 100.

### 6. Score updates live on edit
- [ ] On `/builder`, watch ATS score meter as you edit.
- [ ] On `/preview`, watch circular score as you edit (open Builder in another tab or split view).
- [ ] Add/remove fields — score updates immediately.

### 7. Export buttons work
- [ ] **Print / Save as PDF:** Click → print dialog opens. Toast: "PDF export ready! Check your downloads."
- [ ] **Copy Resume as Text:** Click → button shows "Copied". Paste elsewhere → plain text format.

### 8. Empty states handled gracefully
- [ ] Empty form: Preview shows placeholders ("Your Name", "Email · Phone · Location").
- [ ] Empty sections hidden in preview (no Summary, Education, etc. when empty).
- [ ] No errors when all fields are empty.

### 9. Mobile responsive layout works
- [ ] Resize browser to mobile width (~375px).
- [ ] Builder: form and preview stack or scroll. No horizontal overflow.
- [ ] Preview: template picker, color picker, score, resume readable.
- [ ] Buttons and inputs remain usable.

### 10. No console errors on any page
- [ ] Open DevTools Console. Visit `/`, `/builder`, `/preview`, `/proof`.
- [ ] Perform: template switch, color change, form edit, export.
- [ ] Confirm no red errors in console.

---

## Quick Verification

```bash
cd KodNest-Design-System/rb
npm run dev
```

Then test: `http://localhost:5173/rb/` (or configured base URL).
