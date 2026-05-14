"use client";

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { userProfile } from '@/lib/mock-data';

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeView = pathname.startsWith('/platform/ai-ranking')
    ? 'strategy'
    : searchParams.get('view') || 'strategy';

  const primaryLinks = [
    { label: 'Platform', icon: '▦', href: '/platform?view=strategy&strategyTab=potential', active: true },
    { label: 'Agent', icon: '◌', href: '#' },
    { label: 'Research', icon: '◫', href: '#' },
    { label: 'Stocks', icon: '↗', href: '#' },
    { label: 'Market', icon: '≈', href: '#' },
  ];

  const aiLinks = [
    { id: 'strategy', label: 'Strategy Ideas', href: '/platform?view=strategy&strategyTab=potential' },
    { id: 'social', label: 'Social Feed', href: '/platform?view=social&feedTab=news' },
    { id: 'profile', label: 'Profile', href: '/platform?view=profile&profileTab=post' },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-[var(--outline-variant)] bg-[var(--surface-card)] px-4 py-4 xl:flex xl:flex-col">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)] text-xl font-bold text-white">
          ◈
        </div>
        <div>
          <h1 className="text-lg font-semibold text-[var(--ink)]">TradeCore</h1>
          <p className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">Pro Terminal</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {primaryLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cx(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition-colors',
              item.active
                ? 'bg-[var(--surface-container-low)] text-[var(--ink)]'
                : 'text-[var(--muted)] hover:bg-[var(--surface-container-low)] hover:text-[var(--ink)]',
            )}
          >
            <span className="w-5 text-center text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}

        <div className="pt-4">
          <div className="flex items-center gap-3 px-3 py-2 text-[13px] font-semibold text-[var(--ink)]">
            <span className="w-5 text-center text-base">✦</span>
            <span>AI Ranking</span>
          </div>
          <div className="ml-4 mt-1 border-l border-[var(--outline-variant)] pl-4">
            {aiLinks.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cx(
                  'block rounded-lg px-3 py-2 text-[13px] transition-colors',
                  activeView === item.id
                    ? 'bg-[rgba(145,247,142,0.35)] font-medium text-[var(--success-ink)]'
                    : 'text-[var(--muted)] hover:bg-[var(--surface-container-low)] hover:text-[var(--ink)]',
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="mt-auto border-t border-[var(--outline-variant)] pt-4">
        <div className="mb-4 rounded-xl bg-[var(--surface-container-low)] p-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">Credit Account</p>
            <p className="mt-1 text-[13px] font-semibold text-[var(--ink)]">{userProfile.creditAccount}</p>
          </div>
          <div className="mt-3 border-t border-[rgba(197,198,202,0.45)] pt-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">Investment Account</p>
            <p className="mt-1 text-[13px] font-semibold text-[var(--ink)]">{userProfile.investmentAccount}</p>
          </div>
        </div>
        <div className="space-y-1">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-[var(--muted)] transition-colors hover:bg-[var(--surface-container-low)] hover:text-[var(--ink)]">
            <span className="w-5 text-center">⚙</span>
            <span>Settings</span>
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-[var(--muted)] transition-colors hover:bg-[var(--surface-container-low)] hover:text-[var(--ink)]">
            <span className="w-5 text-center">?</span>
            <span>Support</span>
          </button>
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-[var(--surface-container)] px-3 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-semibold text-[var(--ink)]">
            G
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-[var(--ink)]">Giang Intern</p>
            <p className="inline-block rounded bg-[rgba(76,175,80,0.14)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--success-ink)]">
              Advanced
            </p>
          </div>
          <span className="ml-auto text-sm text-[var(--muted)]">⋯</span>
        </div>
      </div>
    </aside>
  );
}
