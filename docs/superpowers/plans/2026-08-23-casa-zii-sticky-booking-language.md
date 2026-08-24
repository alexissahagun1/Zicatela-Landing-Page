# Casa Zii Sticky Booking Bar and Language Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive bottom reservation strip, remove Prensa from the main menu, and make the language switcher show the language it will activate.

**Architecture:** A new client-side `StickyBookingBar` reads `LanguageContext`, hides on `/booking`, and is mounted once in the root layout. `NavigationBar` keeps the existing language state and receives only presentation changes: alternate-language labels/flags and no Prensa links.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, existing `LanguageContext`.

---

### Task 1: Add the global sticky reservation strip

**Files:**
- Create: `app/components/StickyBookingBar.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/components/Footer.tsx`

- [ ] **Step 1: Add the focused bar component**

Create `StickyBookingBar.tsx` as a client component with this behavior:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";

const copy = {
  es: {
    who: "QUIÉN",
    whoValue: "2 adultos · 1 habitación",
    promo: "PROMOCIÓN",
    promoValue: "Código",
    action: "RESERVAR",
    label: "Reservar una estancia en Casa Zii",
  },
  en: {
    who: "WHO",
    whoValue: "2 adults · 1 room",
    promo: "PROMOTION",
    promoValue: "Code",
    action: "BOOK NOW",
    label: "Book a stay at Casa Zii",
  },
} as const;

export default function StickyBookingBar() {
  const pathname = usePathname();
  const { language } = useLanguage();

  if (pathname === "/booking") return null;

  const t = copy[language];

  return (
    <aside
      aria-label={t.label}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:px-6"
    >
      <div className="pointer-events-auto mx-auto grid max-w-[760px] grid-cols-[1fr_auto] overflow-hidden border border-[#E4E4E4] bg-white/95 shadow-[0_-10px_35px_rgba(0,0,0,0.12)] backdrop-blur-sm md:grid-cols-[1fr_1fr_auto]">
        <Link href="/booking" className="flex min-w-0 items-center px-4 py-3 text-left hover:bg-[#FAFAFA] md:px-6 md:py-4">
          <span className="min-w-0">
            <span className="block font-['Courier_Prime'] text-[10px] tracking-[0.12em] text-[#8A8A8A]">{t.who}</span>
            <span className="block truncate font-['Courier_Prime'] text-[13px] text-[#222] md:text-[15px]">{t.whoValue}</span>
          </span>
        </Link>
        <Link href="/booking" className="hidden min-w-0 items-center border-l border-[#E4E4E4] px-6 py-4 text-left hover:bg-[#FAFAFA] md:flex">
          <span className="min-w-0">
            <span className="block font-['Courier_Prime'] text-[10px] tracking-[0.12em] text-[#8A8A8A]">{t.promo}</span>
            <span className="block truncate font-['Courier_Prime'] text-[15px] text-[#222]">{t.promoValue}</span>
          </span>
        </Link>
        <Link href="/booking" className="flex items-center justify-center bg-[#222] px-5 py-3 font-['Courier_Prime'] text-[12px] tracking-[0.08em] text-white transition-colors hover:bg-[#A04E39] md:min-w-[150px] md:px-7 md:py-4 md:text-[14px]">
          {t.action}
        </Link>
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Mount it once in the root layout**

Import `StickyBookingBar` in `app/layout.tsx` and render it as a child of `LanguageProvider`, after `{children}`. This makes the bar available to every route while allowing it to read the active language and pathname.

- [ ] **Step 3: Reserve footer space for the fixed control**

Change the footer padding class from `py-20` to `pb-32 pt-20 md:pb-36 md:pt-20` so the last footer content cannot sit underneath the fixed bar.

- [ ] **Step 4: Run the focused static checks**

Run:

```bash
npx tsc --noEmit
git diff --check
```

Expected: both commands exit 0.

### Task 2: Correct language-switch presentation and remove Prensa from navigation

**Files:**
- Modify: `app/components/NavigationBar.tsx`

- [ ] **Step 1: Define the destination language labels**

Replace the active-language `language` copy with destination-language copy: Spanish state uses `English`; English state uses `Español`. Use the English flag when `language === "es"` and the Mexico flag otherwise. Add an action label (`Cambiar a inglés` / `Cambiar a español`) for `aria-label` and `title`.

- [ ] **Step 2: Update desktop and mobile controls**

Apply the same destination-language flag, text, `aria-label`, and `title` to both duplicated language buttons. The visible Spanish state must render `English`, and the visible English state must render `Español`.

- [ ] **Step 3: Remove Prensa links from both menu layouts**

Delete the desktop `Link href="/prensa"` block and the mobile `Link href="/prensa"` block. Do not modify the Prensa page or footer in this task.

- [ ] **Step 4: Verify the source-level invariants**

Run:

```bash
rg -n 'href="/prensa"|currentNavText\.press|language: "(English|Español)"|Flag_of_Mexico|english-logo' app/components/NavigationBar.tsx
```

Expected: no `/prensa` navigation links remain; both alternate-language assets remain referenced; the visible language strings are destination-language strings.

### Task 3: Verify responsive behavior and route interactions

**Files:**
- Test manually in browser: `/homepage`, `/casa-palmas`, `/booking`

- [ ] **Step 1: Check desktop homepage**

Open `http://127.0.0.1:3000/homepage` at a desktop viewport. Confirm the bottom strip is visible, shows guest/promotion/CTA content, remains fixed after scrolling, and its CTA navigates to `/booking`.

- [ ] **Step 2: Check language labels and menu**

At desktop, confirm Spanish starts with `English` and the English flag. Click it once and confirm the site changes to English and the button becomes `Español` with the Mexico flag. Confirm neither desktop nor mobile menu contains Prensa.

- [ ] **Step 3: Check mobile layout**

At a 390px-wide viewport, confirm the strip stays within the viewport, shows the guest summary and CTA without horizontal overflow, and the mobile language button uses the same destination-language rule.

- [ ] **Step 4: Check booking route exclusion**

Open `/booking` and confirm the full booking search is present while the compact sticky strip is absent.

### Task 4: Run final project verification

**Files:**
- No source changes.

- [ ] **Step 1: Run the production build**

Run `npm run build`.

Expected: exit 0 with all App Router pages generated successfully.

- [ ] **Step 2: Re-run whitespace verification**

Run `git diff --check`.

Expected: no output and exit 0.

- [ ] **Step 3: Review the final diff**

Run `git diff -- app/layout.tsx app/components/StickyBookingBar.tsx app/components/NavigationBar.tsx app/components/Footer.tsx` and confirm the diff contains only the approved sticky bar, navigation, language, and footer-spacing changes.
