---
name: accessibility-testing
description: "Use when doing accessibility testing of a web app against WCAG 2.2 AA — axe-core scans with @axe-core/playwright and in Vitest component tests, Playwright keyboard and ARIA snapshot tests, Lighthouse CI accessibility budgets, manual keyboard, zoom/reflow and screen reader checks with VoiceOver and NVDA, and writing an accessibility test report mapped to success criteria."
license: MIT
---

# Accessibility Testing

Makes the agent prove accessibility instead of assuming it: automated axe scans on every key
page and state in CI, scripted keyboard tests for interactive widgets, and a short manual pass
with real assistive technology for what automation cannot judge — reported against WCAG 2.2 AA.

## When to Use This Skill
- Adding accessibility checks to CI (Playwright, Vitest, Lighthouse CI)
- Auditing a site or feature against WCAG 2.2 AA before launch or for compliance (EAA, ADA, public sector)
- Regression-testing modals, menus, comboboxes and forms after changes
- Running a manual screen reader and keyboard pass and writing up findings
- Triage of an existing pile of axe or Lighthouse violations

How to build accessible components (semantic HTML, ARIA patterns, contrast) is in `accessibility`.
Per-story checks in Storybook: `storybook`. Form-specific design: `form-ux`. Test runners: `playwright-e2e`, `vitest-testing`.

## Test Layers
| Layer | Tool | Catches | Misses |
|---|---|---|---|
| Lint | `eslint-plugin-jsx-a11y` (React) | Missing alt, invalid ARIA attrs in JSX | Anything runtime |
| Component | axe-core in Vitest / Storybook a11y addon | Names, roles, ARIA misuse per state | Page context, real focus flow |
| Page / E2E | `@axe-core/playwright` + keyboard scripts | Landmarks, contrast, duplicate ids, focus management | Meaning, quality of alt text and labels |
| Budget | Lighthouse CI accessibility category | Regressions in a score | Most WCAG criteria |
| Manual | Keyboard, VoiceOver, NVDA, zoom | Reading order, announcements, usability | — |

Automated rules cover only part of WCAG; a clean axe run means "no detectable failures", never "accessible".

## Workflow
1. Define scope: key templates and flows (home, search, sign-in, checkout, account) and their states (empty, error, open menu, dialog).
2. Add an axe Playwright test per page and per interactive state, filtered to WCAG A/AA tags.
3. Add keyboard tests for each custom widget (dialog, menu, tabs, combobox) following WAI-ARIA APG patterns.
4. Run axe in component tests for design-system components.
5. Do the manual pass below once per release or major feature; log findings with success criteria.
6. Fail CI on new violations; track pre-existing ones in a list with owners, not in `disableRules`.

## Playwright: axe Scans and Keyboard Tests
```ts
// tests/a11y.spec.ts — npm i -D @axe-core/playwright
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const WCAG_AA = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function expectNoViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).withTags(WCAG_AA).exclude('#third-party-chat').analyze();
  const report = violations.map((v) => `${v.id} [${v.impact}] ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`).join('\n');
  expect(violations, report).toEqual([]);
}

for (const path of ['/', '/pricing/', '/login/']) {
  test(`no WCAG 2.2 AA violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    await expectNoViolations(page);
  });
}

test('login error state is accessible and announced', async ({ page }) => {
  await page.goto('/login/');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByLabel('Email')).toHaveAttribute('aria-invalid', 'true');
  await expectNoViolations(page);
});

test('dialog moves focus in, traps it, and restores it', async ({ page }) => {
  await page.goto('/projects/');
  const opener = page.getByRole('button', { name: 'New project' });
  await opener.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'New project' });
  await expect(dialog.getByRole('textbox', { name: 'Name' })).toBeFocused();
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test('header exposes the expected accessibility tree', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('banner')).toMatchAriaSnapshot(`
    - banner:
      - link "Acme home"
      - navigation "Main":
        - link "Pricing"
        - link "Docs"
  `);
});
```
Emulate preferences in the same suite: `await page.emulateMedia({ reducedMotion: 'reduce', forcedColors: 'active' })`
and re-run the scan; check that content and focus indicators remain visible.

## Component Tests (Vitest)
```tsx
// src/components/Combobox.a11y.test.tsx — npm i -D axe-core
import axe from 'axe-core';
import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Combobox } from './Combobox';

test('Combobox has no detectable violations when open', async () => {
  const { container, getByRole } = render(<Combobox label="Country" options={['France', 'India', 'United Kingdom']} />);
  getByRole('combobox', { name: 'Country' }).focus();
  const results = await axe.run(container, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
    rules: { 'color-contrast': { enabled: false } }, // jsdom has no layout; check contrast in browser tests
  });
  expect(results.violations).toEqual([]);
});
```
In Vitest browser mode (real Chromium) keep `color-contrast` enabled.

## Lighthouse CI Budget
```json
{
  "ci": {
    "collect": { "startServerCommand": "npm run preview", "url": ["http://localhost:4173/", "http://localhost:4173/pricing/"] },
    "assert": { "assertions": { "categories:accessibility": ["error", { "minScore": 0.95 }] } }
  }
}
```
Save as `lighthouserc.json` and run `npx @lhci/cli autorun`. For a one-off run:
`npx lighthouse http://localhost:4173/ --only-categories=accessibility --output=html --output-path=./a11y.html`.
The Lighthouse score uses axe rules; treat it as a regression alarm, not a conformance result.

## Manual Pass (30–60 minutes per flow)
- **Keyboard only**: Tab/Shift+Tab reach every control in visual order; focus is always visible and not hidden behind sticky headers (2.4.11); Enter/Space activate; Escape closes; arrow keys work inside tabs, menus and radio groups; a skip link reaches main content.
- **Zoom and reflow**: 200% text zoom (1.4.4) and 400% browser zoom at 1280 px width (= 320 CSS px, 1.4.10) without loss of content or two-way scrolling; apply text-spacing overrides (1.4.12).
- **VoiceOver (macOS)**: Cmd+F5 to start; VO = Control+Option; VO+Right Arrow reads next; VO+U opens the rotor for headings, links, landmarks and form controls.
- **NVDA (Windows, with Chrome or Firefox)**: H headings, D landmarks, F form fields, K links, NVDA+F7 elements list; NVDA+Space toggles browse/focus mode.
- **Mobile**: VoiceOver on iOS and TalkBack on Android — swipe through a flow, double-tap to activate; check 24×24 px minimum targets (2.5.8) and that drag actions have a single-pointer alternative (2.5.7).
- **Content**: alt text conveys purpose, link text makes sense out of context, errors are announced, status messages use live regions (4.1.3).

## Rules
- Scan every important state, not just page load: open menus, dialogs, validation errors, empty and loading states.
- Filter axe to WCAG A/AA tags for pass/fail; review `incomplete` results manually.
- Never silence a rule globally to get green; scope exclusions to third-party regions and log them.
- Query by role and accessible name in tests (`getByRole`) so tests fail when semantics break.
- Record each finding with WCAG success criterion, level, location, steps, actual vs expected, and user impact.
- Re-test fixes with the same assistive technology that found the issue.

## Common Mistakes
- **Scanning before content renders**: wait for a role or text (`await expect(...).toBeVisible()`) before `analyze()`.
- **Trusting jsdom contrast results**: jsdom cannot compute colours; run contrast checks in a real browser.
- **Treating Lighthouse 100 as compliant**: it covers a small subset of criteria; do the manual pass.
- **Testing one screen reader only**: VoiceOver + Safari and NVDA + Chrome/Firefox behave differently; cover the pairs your users have.
- **Fixing symptoms with ARIA**: `aria-label` on a `div` "button" still lacks keyboard support; use a `<button>`.
- **One giant baseline of ignored violations**: new issues hide among old ones; track and burn them down.

## Verify
- `npx playwright test tests/a11y.spec.ts` passes in CI on every pull request.
- Introduce a known failure (remove a label) locally: the axe test must fail with the rule id and selector.
- Lighthouse CI report uploaded for key URLs with the accessibility assertion passing.
- Manual pass checklist completed for each key flow, with findings mapped to WCAG 2.2 criteria and owners.
