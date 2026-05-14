"use client";

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function TopNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentView = pathname.startsWith('/platform/ai-ranking')
    ? 'strategy'
    : searchParams.get('view') || 'strategy';
  const strategyTab = searchParams.get('strategyTab') || 'potential';
  const feedTab = searchParams.get('feedTab') || 'news';
  const profileTab = searchParams.get('profileTab') || 'post';

  const tabs = [
    { id: 'strategy', href: `/platform?view=strategy&strategyTab=${strategyTab}`, label: 'Strategy' },
    { id: 'social', href: `/platform?view=social&feedTab=${feedTab}`, label: 'Social Feed' },
    { id: 'profile', href: `/platform?view=profile&profileTab=${profileTab}`, label: 'Profile' },
  ];

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-[var(--outline-variant)] bg-[var(--surface-bright)] px-6">
      <div className="flex h-full items-center justify-between gap-6">
        <nav className="flex h-full items-center gap-8">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={cx(
                'relative flex h-full items-center pb-0.5 text-[12px] font-bold uppercase tracking-[0.08em] transition-colors',
                currentView === tab.id ? 'font-semibold text-[var(--success-ink)]' : 'text-[var(--muted)] hover:text-[var(--success-ink)]',
              )}
            >
              {tab.label}
              {currentView === tab.id ? (
                <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-t-full bg-[var(--success-ink)]" />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-4 py-2 md:flex md:w-64">
            <span className="text-sm text-[var(--muted)]">⌕</span>
            <span className="text-sm text-[var(--muted)]">Search strategy or users...</span>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-[rgba(145,247,142,0.35)] px-3 py-1.5 text-[var(--success-ink)] lg:flex">
            <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.08em]">Market Open</span>
          </div>
          <button className="rounded-lg bg-[var(--success-ink)] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-white">
            Create Post
          </button>
          <button className="text-lg text-[var(--muted)]">◔</button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container)] text-sm font-semibold text-[var(--muted)]">
            AC
          </div>
        </div>
      </div>
    </header>
  );
}
