import { Suspense } from 'react';
import Sidebar from '@/components/Sidebar';
import TopNav from '@/components/TopNav';

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-transparent">
      <Suspense fallback={<div className="hidden h-screen w-64 shrink-0 xl:block" />}>
        <Sidebar />
      </Suspense>
      <div className="flex min-w-0 flex-1 flex-col">
        <Suspense
          fallback={
            <div className="sticky top-0 z-20 h-16 border-b border-[var(--outline-variant)] bg-[var(--surface-bright)]" />
          }
        >
          <TopNav />
        </Suspense>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
