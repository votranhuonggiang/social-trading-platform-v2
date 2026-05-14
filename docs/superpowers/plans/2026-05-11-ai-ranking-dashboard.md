# AI Ranking Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Duplicate the UI design of the Vercel portfolio mockup (AI Ranking page) into a new interactive Next.js application using Tailwind CSS.

**Architecture:** Next.js App Router. We will use `app/platform/layout.tsx` for persistent Sidebar and Top Navigation, and URL Search Params (`?tab=overview`) to manage tab state in `app/platform/ai-ranking/[id]/page.tsx`.

**Tech Stack:** Next.js, React, Tailwind CSS, TypeScript.

---

### Task 1: Scaffold Next.js Application

**Files:**
- Create: `package.json`, `app/layout.tsx`, `app/page.tsx`, `tailwind.config.ts`, etc.

- [ ] **Step 1: Run create-next-app**

Run: `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm --yes`
(Note: Since the directory is not completely empty, you may need to run this in a temporary folder and copy the files over, or ensure it forces creation).

- [ ] **Step 2: Verify installation**

Run: `npm run build`
Expected: PASS with successful Next.js build output.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "chore: scaffold Next.js application with Tailwind CSS"
```

---

### Task 2: Setup Mock Data

**Files:**
- Create: `lib/mock-data.ts`

- [ ] **Step 1: Write the mock data implementation**

```typescript
// lib/mock-data.ts
export interface Metric {
  label: string;
  value: string;
  trend: 'positive' | 'negative' | 'neutral';
  statusColor: 'green' | 'red' | 'gray';
}

export interface Portfolio {
  id: string;
  name: string;
  tags: string[];
  metrics: Metric[];
  strategyInfo: Record<string, string>;
}

export const mockPortfolio: Portfolio = {
  id: "1",
  name: "MOMENTUM VN30",
  tags: ["VN30", "Monthly", "Hot", "New"],
  metrics: [
    { label: "YTD Return", value: "+14.20%", trend: "positive", statusColor: "green" },
    { label: "Max Drawdown", value: "-9.10%", trend: "negative", statusColor: "red" },
    { label: "Sharpe Ratio", value: "1.25", trend: "positive", statusColor: "green" }
  ],
  strategyInfo: {
    "Asset Class": "Equities",
    "Region": "Vietnam",
    "Rebalancing": "Monthly",
    "Target Benchmark": "VN30 Index"
  }
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: PASS with no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/mock-data.ts
git commit -m "feat: add mock portfolio data"
```

---

### Task 3: Implement Layout Components

**Files:**
- Create: `components/Sidebar.tsx`
- Create: `components/TopNav.tsx`
- Create: `app/platform/layout.tsx`

- [ ] **Step 1: Create Sidebar Component**

```tsx
// components/Sidebar.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside className={`bg-gray-50 border-r border-gray-200 transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'} min-h-screen flex flex-col`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        {isExpanded && <span className="font-bold text-lg text-gray-800">MiQuant</span>}
        <button onClick={() => setIsExpanded(!isExpanded)} className="p-1 hover:bg-gray-200 rounded">
          {isExpanded ? '<<' : '>>'}
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/platform" className="block px-2 py-2 rounded hover:bg-gray-200 text-gray-700">Platform</Link>
        <Link href="/platform/ai-ranking/1" className="block px-2 py-2 rounded hover:bg-gray-200 text-gray-700 font-semibold bg-gray-200">AI Ranking</Link>
        <Link href="/research" className="block px-2 py-2 rounded hover:bg-gray-200 text-gray-700">Research</Link>
      </nav>
      {isExpanded && (
        <div className="p-4 border-t border-gray-200">
          <button className="w-full bg-blue-600 text-white rounded py-2 font-medium">Upgrade to Pro</button>
        </div>
      )}
    </aside>
  );
}
```

- [ ] **Step 2: Create TopNav Component**

```tsx
// components/TopNav.tsx
"use client";

import Link from 'next/link';

export default function TopNav() {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-800">← Back</button>
        <div className="text-sm text-gray-500">Platform / AI Ranking</div>
      </div>
      <div className="flex items-center space-x-4">
        <input type="text" placeholder="Search..." className="border border-gray-300 rounded px-3 py-1 text-sm" />
        <Link href="/tasks" className="text-gray-600 hover:text-gray-900 text-sm">Tasks</Link>
        <Link href="/charts" className="text-gray-600 hover:text-gray-900 text-sm">Charts</Link>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Assemble Platform Layout**

```tsx
// app/platform/layout.tsx
import Sidebar from '@/components/Sidebar';
import TopNav from '@/components/TopNav';

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 overflow-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Sidebar.tsx components/TopNav.tsx app/platform/layout.tsx
git commit -m "feat: implement platform layout with Sidebar and TopNav"
```

---

### Task 4: Implement Entity Components

**Files:**
- Create: `components/MetricCard.tsx`
- Create: `components/TabNavigation.tsx`

- [ ] **Step 1: Create MetricCard Component**

```tsx
// components/MetricCard.tsx
import { Metric } from '@/lib/mock-data';

export default function MetricCard({ metric }: { metric: Metric }) {
  const colorClass = metric.statusColor === 'green' ? 'text-green-600' : metric.statusColor === 'red' ? 'text-red-600' : 'text-gray-600';
  
  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="text-sm text-gray-500 mb-1">{metric.label}</div>
      <div className={`text-2xl font-bold ${colorClass}`}>{metric.value}</div>
    </div>
  );
}
```

- [ ] **Step 2: Create TabNavigation Component**

```tsx
// components/TabNavigation.tsx
"use client";

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

export default function TabNavigation() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentTab = searchParams.get('tab') || 'overview';

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'strategy', label: 'Strategy Results' },
    { id: 'allocation', label: 'Portfolio Allocation' }
  ];

  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8">
        {tabs.map(tab => (
          <Link
            key={tab.id}
            href={`${pathname}?tab=${tab.id}`}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              currentTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
```

- [ ] **Step 3: Verify Typechecking**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add components/MetricCard.tsx components/TabNavigation.tsx
git commit -m "feat: implement metric card and tab navigation components"
```

---

### Task 5: Assemble AI Ranking Page

**Files:**
- Create: `app/platform/ai-ranking/[id]/page.tsx`

- [ ] **Step 1: Implement the Main Page Component**

```tsx
// app/platform/ai-ranking/[id]/page.tsx
import { mockPortfolio } from '@/lib/mock-data';
import MetricCard from '@/components/MetricCard';
import TabNavigation from '@/components/TabNavigation';

export default function AIRankingPage({ searchParams }: { searchParams: { tab?: string } }) {
  const tab = searchParams.tab || 'overview';

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Entity Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{mockPortfolio.name}</h1>
          <div className="flex space-x-2">
            {mockPortfolio.tags.map(tag => (
              <span key={tag} className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-600 border border-gray-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition-colors">
          Invest
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {mockPortfolio.metrics.map(metric => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      {/* Tabs */}
      <TabNavigation />

      {/* Tab Content Area */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 min-h-[400px]">
        {tab === 'overview' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Performance over time</h2>
            <div className="w-full h-64 bg-white border border-gray-200 rounded flex items-center justify-center text-gray-400 mb-8">
              [Cumulative Profit Chart Placeholder]
            </div>
            
            <h2 className="text-xl font-bold mb-4">Strategy Information</h2>
            <div className="grid grid-cols-2 gap-4 bg-white p-4 border border-gray-200 rounded">
              {Object.entries(mockPortfolio.strategyInfo).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-sm text-gray-500">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 'strategy' && <div className="text-gray-500">Strategy Results content goes here.</div>}
        {tab === 'allocation' && <div className="text-gray-500">Portfolio Allocation content goes here.</div>}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Start Development Server for Visual Verification**

Run: `npm run dev`
(In another terminal, manually verify `http://localhost:3000/platform/ai-ranking/1` works, tabs update the URL, and sidebar toggles).

- [ ] **Step 3: Commit**

```bash
git add app/platform/ai-ranking/[id]/page.tsx
git commit -m "feat: assemble AI ranking entity page with tabs and metrics"
```
