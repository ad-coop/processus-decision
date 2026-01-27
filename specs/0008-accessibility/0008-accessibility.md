# Accessibility

## Goal

Reach WCAG 2.2 Level AA compliance for all pages and components.

## Current State

The application has a solid foundation with semantic HTML, ARIA attributes, and keyboard navigation. Key gaps exist in focus management, color contrast verification, and language configuration.

---

## WCAG 2.2 Level AA Criteria

### 1. Perceivable

#### 1.1 Text Alternatives (Level A)

| Criterion              | Requirement                                 | Status    | Action                               |
| ---------------------- | ------------------------------------------- | --------- | ------------------------------------ |
| 1.1.1 Non-text Content | All images must have appropriate `alt` text | ⚠️ Review | Audit logo and any decorative images |

#### 1.2 Time-based Media (Level A/AA)

Not applicable - no audio/video content in this application.

#### 1.3 Adaptable (Level A)

| Criterion                     | Requirement                                   | Status     | Action                                         |
| ----------------------------- | --------------------------------------------- | ---------- | ---------------------------------------------- |
| 1.3.1 Info and Relationships  | Structure conveyed through markup             | ✅ Partial | Uses `<dl>`, `<ol>`, headings correctly        |
| 1.3.2 Meaningful Sequence     | Reading order matches visual order            | ✅ OK      | CSS doesn't reorder content                    |
| 1.3.3 Sensory Characteristics | Instructions don't rely solely on shape/color | ⚠️ Review  | Star rating uses color - ensure text backup    |
| 1.3.4 Orientation             | Content works in portrait and landscape       | ✅ OK      | Responsive design                              |
| 1.3.5 Identify Input Purpose  | Input purposes can be determined              | ⚠️ Review  | Add `autocomplete` attributes where applicable |

#### 1.4 Distinguishable (Level A/AA)

| Criterion                     | Requirement                            | Status    | Action                                      |
| ----------------------------- | -------------------------------------- | --------- | ------------------------------------------- |
| 1.4.1 Use of Color            | Color not sole means of conveying info | ⚠️ Review | Star rating: verify non-color indicators    |
| 1.4.2 Audio Control           | No auto-playing audio                  | ✅ N/A    | No audio                                    |
| 1.4.3 Contrast (Minimum)      | 4.5:1 for normal text, 3:1 for large   | ❌ Audit  | Verify `#00a9a2` on white backgrounds       |
| 1.4.4 Resize Text             | Text resizable to 200% without loss    | ⚠️ Test   | Test with browser zoom                      |
| 1.4.5 Images of Text          | Use real text, not images              | ✅ OK     | No text images used                         |
| 1.4.10 Reflow                 | Content reflows at 320px width         | ⚠️ Test   | Test mobile breakpoints                     |
| 1.4.11 Non-text Contrast      | 3:1 for UI components and graphics     | ❌ Audit  | Verify star outlines, buttons, form borders |
| 1.4.12 Text Spacing           | Supports user text spacing adjustments | ⚠️ Test   | Test with custom CSS                        |
| 1.4.13 Content on Hover/Focus | Dismissible, hoverable, persistent     | ✅ N/A    | No tooltip/hover content                    |

### 2. Operable

#### 2.1 Keyboard Accessible (Level A)

| Criterion                     | Requirement                                | Status     | Action                                |
| ----------------------------- | ------------------------------------------ | ---------- | ------------------------------------- |
| 2.1.1 Keyboard                | All functionality via keyboard             | ✅ Partial | StarRating has keyboard support       |
| 2.1.2 No Keyboard Trap        | Keyboard focus can always escape           | ⚠️ Review  | Verify modal doesn't trap permanently |
| 2.1.4 Character Key Shortcuts | Single character shortcuts can be disabled | ✅ N/A     | No single-key shortcuts               |

#### 2.2 Enough Time (Level A)

| Criterion               | Requirement                          | Status | Action         |
| ----------------------- | ------------------------------------ | ------ | -------------- |
| 2.2.1 Timing Adjustable | No time limits or user can adjust    | ✅ N/A | No time limits |
| 2.2.2 Pause, Stop, Hide | Moving/blinking content controllable | ✅ N/A | No animations  |

#### 2.3 Seizures and Physical Reactions (Level A)

| Criterion           | Requirement                        | Status | Action              |
| ------------------- | ---------------------------------- | ------ | ------------------- |
| 2.3.1 Three Flashes | No content flashes >3 times/second | ✅ OK  | No flashing content |

#### 2.4 Navigable (Level A/AA)

| Criterion                           | Requirement                          | Status     | Action                         |
| ----------------------------------- | ------------------------------------ | ---------- | ------------------------------ |
| 2.4.1 Bypass Blocks                 | Skip to main content mechanism       | ❌ Missing | Add skip link                  |
| 2.4.2 Page Titled                   | Descriptive page titles              | ⚠️ Review  | Verify `<title>` on each route |
| 2.4.3 Focus Order                   | Logical tab order                    | ⚠️ Test    | Test complete tab sequence     |
| 2.4.4 Link Purpose (In Context)     | Link purpose clear from text/context | ⚠️ Review  | External links need context    |
| 2.4.5 Multiple Ways                 | Multiple ways to find pages          | ✅ Partial | Navigation + direct links      |
| 2.4.6 Headings and Labels           | Descriptive headings and labels      | ⚠️ Review  | Audit heading hierarchy        |
| 2.4.7 Focus Visible                 | Keyboard focus indicator visible     | ✅ OK      | `:focus-visible` styles exist  |
| 2.4.11 Focus Not Obscured (Minimum) | Focused element not fully hidden     | ⚠️ Test    | Test with sticky headers       |

#### 2.5 Input Modalities (Level A/AA)

| Criterion                   | Requirement                            | Status    | Action                   |
| --------------------------- | -------------------------------------- | --------- | ------------------------ |
| 2.5.1 Pointer Gestures      | Single pointer alternative available   | ✅ OK     | No multi-touch required  |
| 2.5.2 Pointer Cancellation  | Down-event doesn't trigger action      | ✅ OK     | Uses click events        |
| 2.5.3 Label in Name         | Accessible name contains visible label | ⚠️ Review | Audit button/link labels |
| 2.5.4 Motion Actuation      | Motion alternatives exist              | ✅ N/A    | No motion input          |
| 2.5.7 Dragging Movements    | Single pointer alternative for drag    | ✅ N/A    | No drag operations       |
| 2.5.8 Target Size (Minimum) | 24×24px minimum                        | ✅ OK     | 44×44px targets used     |

### 3. Understandable

#### 3.1 Readable (Level A/AA)

| Criterion               | Requirement                             | Status    | Action                    |
| ----------------------- | --------------------------------------- | --------- | ------------------------- |
| 3.1.1 Language of Page  | `lang` attribute on `<html>`            | ❌ Fix    | Change from `en` to `fr`  |
| 3.1.2 Language of Parts | `lang` on content in different language | ⚠️ Review | Mark English terms if any |

#### 3.2 Predictable (Level A/AA)

| Criterion                       | Requirement                           | Status    | Action                    |
| ------------------------------- | ------------------------------------- | --------- | ------------------------- |
| 3.2.1 On Focus                  | No context change on focus alone      | ✅ OK     | No auto-submission        |
| 3.2.2 On Input                  | No unexpected context change on input | ✅ OK     | Form requires submit      |
| 3.2.3 Consistent Navigation     | Navigation consistent across pages    | ✅ OK     | Same header/footer        |
| 3.2.4 Consistent Identification | Same function = same label            | ⚠️ Review | Audit repeated components |

#### 3.3 Input Assistance (Level A/AA)

| Criterion                                 | Requirement                         | Status     | Action                 |
| ----------------------------------------- | ----------------------------------- | ---------- | ---------------------- |
| 3.3.1 Error Identification                | Errors identified in text           | ✅ Partial | Error message exists   |
| 3.3.2 Labels or Instructions              | Labels provided for inputs          | ✅ OK      | Labels exist           |
| 3.3.3 Error Suggestion                    | Suggestions for correction          | ⚠️ Review  | Improve error messages |
| 3.3.4 Error Prevention (Legal/Financial)  | Reversible/confirmable submissions  | ✅ N/A     | Not applicable         |
| 3.3.7 Redundant Entry                     | Don't require re-entering same info | ✅ OK      | Single-page form       |
| 3.3.8 Accessible Authentication (Minimum) | No cognitive function test for auth | ✅ N/A     | No authentication      |

### 4. Robust

#### 4.1 Compatible (Level A/AA)

| Criterion               | Requirement                               | Status     | Action                         |
| ----------------------- | ----------------------------------------- | ---------- | ------------------------------ |
| 4.1.2 Name, Role, Value | Custom controls have accessible name/role | ✅ Partial | StarRating has `role="slider"` |
| 4.1.3 Status Messages   | Status messages announced to AT           | ⚠️ Review  | Verify `aria-live` works       |

---

## Implementation Checklist

### High Priority (Blocking AA Compliance)

- [ ] **Fix HTML language**: Change `lang="en"` to `lang="fr"` in `index.html`
- [ ] **Add skip link**: "Skip to main content" at top of page
- [ ] **Color contrast audit**: Verify all color combinations meet 4.5:1
  - `#00a9a2` (teal) on white: **3.03:1** ❌ Fails - needs darker alternative
  - `#333` on white: **12.63:1** ✅ Pass
  - Audit all button states, links, and UI borders
- [ ] **Focus trap for modal**: Implement focus trap in Modal component
- [ ] **Focus restoration**: Return focus to trigger when modal closes
- [ ] **Form error association**: Link error messages with `aria-describedby`

### Medium Priority (Improve UX)

- [ ] **Logo alt text**: Provide meaningful alt or mark as decorative with `role="img"`
- [ ] **External link indicators**: Add visual + text indication for links opening new windows
- [ ] **Heading hierarchy audit**: Ensure single `<h1>`, logical `<h2>`/`<h3>` structure
- [ ] **Page titles**: Set descriptive `<title>` for each route
- [ ] **Star rating non-color indicator**: Add pattern/shape in addition to fill color

### Testing Requirements

- [ ] **Automated testing**: Add `jest-axe` or `@axe-core/react` to test suite
- [ ] **Keyboard testing**: Tab through all pages, verify all interactions work
- [ ] **Screen reader testing**: Test with VoiceOver (macOS) or NVDA (Windows)
- [ ] **Zoom testing**: Verify 200% and 400% zoom work correctly
- [ ] **Mobile testing**: Test with touch and screen reader on iOS/Android

---

## Color Palette Recommendations

Current colors that need adjustment for AA compliance:

| Color        | Current   | Issue                | Recommended                              |
| ------------ | --------- | -------------------- | ---------------------------------------- |
| Primary teal | `#00a9a2` | 3.03:1 on white      | `#007a75` (4.58:1) or `#006b66` (5.42:1) |
| Link color   | `#00a9a2` | Same issue           | Use primary adjustment                   |
| Star filled  | `#00a9a2` | Non-text contrast OK | Keep for graphics                        |

---

## Testing Tools

- **Browser DevTools**: Lighthouse accessibility audit
- **axe DevTools**: Browser extension for detailed WCAG testing
- **WAVE**: Web accessibility evaluation tool
- **Colour Contrast Analyser**: Desktop app for precise contrast checking
- **VoiceOver** (macOS): Built-in screen reader
- **NVDA** (Windows): Free screen reader

---

## References

- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/?levels=a%2Caa)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
