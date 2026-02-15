# AI Resume Builder — Verification Steps

## 1. Persistence After Refresh

1. Go to `/builder`.
2. Fill in Personal Info (name, email, phone, location).
3. Add a Summary (e.g., 50 words).
4. Add 1 Education entry with school, degree, year.
5. Add 1 Experience entry with company, role, dates, description.
6. Add 2 Projects with title and description.
7. Add 8+ skills (comma-separated).
8. Add GitHub and/or LinkedIn URL.
9. **Refresh the page (F5 or Ctrl+R).**
10. **Confirm:** All fields are still filled. Form and Live Preview show the same data.

**Expected:** Data persists. localStorage key = `resumeBuilderData`.

---

## 2. Score Changes Live While Editing

1. Go to `/builder` with empty or minimal data.
2. Note the ATS Readiness Score (e.g., 0/100 or low).
3. Type a summary of 40–120 words → score should increase by +15.
4. Add 1 Experience entry → score +10.
5. Add 2 Projects → score +10.
6. Add 8+ skills (comma-separated) → score +10.
7. Add GitHub or LinkedIn URL → score +10.
8. Add a number to an experience/project bullet (e.g., "2M+ users", "10%") → score +15.
9. Add Education with school, degree, year all filled → score +10.

**Expected:** Score updates immediately as you edit. Max 100.

---

## 3. Suggestions (3 max)

1. Start with empty form or Load Sample Data.
2. If score is &lt; 100, up to 3 suggestions appear under the score.
3. Fix each suggested item and confirm the suggestion disappears.
4. Suggestions should include items like:
   - "Write a stronger summary (40–120 words)."
   - "Add at least 2 projects."
   - "Add measurable impact (numbers) in bullets."
   - "Add more skills (target 8+)."
   - "Add at least 1 experience entry."
   - "Add GitHub or LinkedIn link."
   - "Complete education fields (school, degree, year)."

**Expected:** Maximum 3 suggestions at a time. Suggestions update live.

---

## 4. Live Preview — Empty Sections Hidden

1. Go to `/builder` with empty form.
2. **Confirm:** Preview shows only "Your Name" and placeholder contact line.
3. Add Summary only → Summary section appears; others stay hidden.
4. Add Education → Education section appears.
5. Add Experience → Experience section appears.
6. Add Projects → Projects section appears.
7. Add Skills → Skills section appears.
8. Add Links → Links section appears.

**Expected:** Only non-empty sections show. Section headers: Summary, Education, Experience, Projects, Skills, Links.

---

## 5. ATS Score Breakdown (Deterministic)

| Criteria | Points |
|----------|--------|
| Summary 40–120 words | +15 |
| At least 2 projects | +10 |
| At least 1 experience | +10 |
| Skills ≥ 8 items | +10 |
| GitHub or LinkedIn link | +10 |
| Measurable impact (numbers in bullets) | +15 |
| Education complete (school, degree, year) | +10 |
| **Cap** | **100** |

---

## 6. Template Tabs

1. Go to `/builder` or `/preview`.
2. **Confirm:** Template tabs (Classic, Modern, Minimal) appear.
3. Click **Modern** → layout styling changes (sans-serif, different spacing).
4. Click **Minimal** → layout styling changes (tighter, more whitespace).
5. Click **Classic** → returns to classic layout.
6. **Refresh the page** → selected template persists.

**Expected:** Templates switch layout only. Content unchanged. localStorage key = `resumeBuilderTemplate`. Score unchanged.

---

## 7. Bullet Structure Guidance

1. Go to `/builder` → Experience or Projects.
2. Add a description bullet that does NOT start with an action verb (e.g., "Worked on the dashboard").
3. **Confirm:** Subtle suggestion appears: "Start with a strong action verb."
4. Add a bullet with no numbers (e.g., "Built a feature").
5. **Confirm:** Suggestion appears: "Add measurable impact (numbers)."
6. Change to "Built feature used by 10k+ users" → suggestions disappear.
7. **Confirm:** User input is never blocked.

**Expected:** Guidance appears contextually. Action verbs: Built, Developed, Designed, Implemented, Led, Improved, Created, Optimized, Automated.

---

## 8. Top 3 Improvements

1. Go to `/builder` with incomplete resume.
2. **Confirm:** "Top 3 Improvements" panel appears under ATS Score.
3. Logic-based suggestions:
   - &lt;2 projects → "Add at least 2 projects."
   - No numbers in bullets → "Add measurable impact (numbers) in bullets."
   - Summary &lt;40 words → "Expand your summary (target 40+ words)."
   - Skills &lt;8 → "Add more skills (target 8+)."
   - No experience → "Add internship or project work as experience."
4. Fix items → suggestions disappear. Max 3 shown.

**Expected:** Top 3 Improvements updates live. Does not affect ATS score logic.

---

## Quick Checklist

- [ ] Data persists after refresh (localStorage `resumeBuilderData`)
- [ ] Score updates live while editing
- [ ] Up to 3 suggestions shown and update live
- [ ] Empty sections hidden in preview
- [ ] Routes unchanged: `/`, `/builder`, `/preview`, `/proof`
- [ ] Templates switch layout; persist in localStorage
- [ ] Bullet guidance appears contextually; does not block input
- [ ] Top 3 Improvements shows under ATS Score; max 3 items

---

## 9. Export Options

1. Go to `/preview`.
2. **Print / Save as PDF:**
   - Click "Print / Save as PDF" → browser print dialog opens.
   - Confirm: Only resume content prints. No top bar, buttons, or template tabs.
   - White background, black text, no colored accents.
   - Use "Save as PDF" in print dialog to export PDF.
3. **Copy Resume as Text:**
   - Click "Copy Resume as Text" → button shows "Copied".
   - Paste elsewhere (e.g., Notepad) → plain text format:
     - Name, Contact, Summary, Education, Experience, Projects, Skills, Links.

**Expected:** PDF print renders resume only. Plain-text copy works. No heavy libraries.

---

## 10. Validation Warning (Non-Blocking)

1. Go to `/preview` with empty name OR no projects and no experience.
2. **Confirm:** Calm warning appears: "Your resume may look incomplete."
3. **Confirm:** Export buttons remain clickable. Export is NOT blocked.
4. Add name and at least one project/experience → warning disappears.

**Expected:** Warning only. Export always allowed.

---

## 11. Layout Precision

- No section overlaps (consistent spacing scale 8/16/24/40/64px).
- No text overflow (long words wrap).
- Page breaks avoid splitting project/experience bullets across pages.
