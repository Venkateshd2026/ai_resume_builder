# AI Resume Builder — Proof & Submission Verification

## Shipped Status Rule

Status badge shows **"Shipped"** ONLY when ALL are true:
- All 8 steps marked completed
- All 10 checklist tests passed
- All 3 proof links valid (Lovable, GitHub, Deployed)

Otherwise: **"In Progress"**

---

## Verification Steps

### 1. Proof Page Loads
- [ ] Go to `/proof`.
- [ ] Confirm sections: Step Completion Overview, Test Checklist, Artifact Collection, Final Submission Export.

### 2. Step Completion (8 steps)
- [ ] Check all 8 steps (01–Problem through 08–Ship).
- [ ] Toggle checkboxes. Refresh page. Checkboxes persist.
- [ ] Status remains "In Progress" until all 8 checked.

### 3. Test Checklist (10 items)
- [ ] Check all 10 checklist items.
- [ ] Refresh. Checklist state persists (localStorage `rb_checklist_tests`).
- [ ] Status remains "In Progress" until all 10 checked.

### 4. Artifact Collection — URL Validation
- [ ] Enter invalid URL (e.g., "abc"). Blur field. Error: "Enter a valid URL."
- [ ] Enter valid URL (https://example.com). Error clears.
- [ ] All 3 links required: Lovable, GitHub, Deployed.
- [ ] Data persists in localStorage `rb_final_submission`.

### 5. Copy Final Submission
- [ ] Click "Copy Final Submission".
- [ ] Paste elsewhere. Confirm format:
  ```
  ------------------------------------------
  AI Resume Builder — Final Submission

  Lovable Project: {link}
  GitHub Repository: {link}
  Live Deployment: {link}

  Core Capabilities:
  - Structured resume builder
  ...
  ------------------------------------------
  ```

### 6. Shipped Logic
- [ ] With steps + checklist + links incomplete → Status: "In Progress".
- [ ] Complete all 8 steps → still "In Progress" (need checklist + links).
- [ ] Complete all 10 checklist → still "In Progress" (need links).
- [ ] Add all 3 valid links → still "In Progress" (need steps + checklist).
- [ ] Complete ALL: 8 steps ✓, 10 checklist ✓, 3 links ✓ → Status: "Shipped".

### 7. Completion Message
- [ ] When Shipped: "Project 3 Shipped Successfully." appears at top of Proof page.
- [ ] Calm, no confetti or flashy animations.

### 8. Checklist Lock
- [ ] Status cannot be "Shipped" without meeting all criteria.
- [ ] No bypass.
