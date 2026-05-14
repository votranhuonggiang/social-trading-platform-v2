# AI Ranking Dashboard - Design Specification
Date: 2026-05-11

## Overview
Duplicate the UI design of the Vercel portfolio mockup (AI Ranking page) into a new interactive Next.js application using Tailwind CSS. The focus is on creating a responsive, interactive frontend layout using modern Next.js App Router patterns.

## Architecture
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Routing Strategy:** 
  - `app/layout.tsx`: Root application shell.
  - `app/platform/layout.tsx`: Contains the persistent Collapsible Sidebar and Top Navigation.
  - `app/platform/ai-ranking/[id]/page.tsx`: The primary entity page (e.g., MOMENTUM VN30).
  - Tabs ("Overview", "Strategy Results", "Portfolio Allocation") will be managed via URL Search Params (`?tab=overview`) to keep the UI state in sync with the URL without requiring deep nested folders for simple view toggles.

## Components Breakdown

### Layout Components
- **`Sidebar`**: Client component managing the expanded/collapsed state. Includes main navigation links, a secondary "Nền tảng" (Platform) menu, and a "Pro" upgrade call-to-action.
- **`TopNav`**: Client component containing a search bar, utility links (Tasks, Charts), and breadcrumbs.

### Entity Components
- **`EntityHeader`**: Displays the portfolio name ("MOMENTUM VN30"), status badges (VN30, Monthly), and the primary "Invest" CTA.
- **`MetricsGrid`**: A container for rendering key statistics.
- **`MetricCard`**: A reusable stateless component.
  - Props: `label` (string), `value` (string/number), `trend` (positive/negative/neutral), `statusColor` (green/red/gray).
- **`TabNavigation`**: Renders the tab links. Reads the current `?tab=` query parameter to determine the active state.
- **`PerformanceChart`**: A placeholder component for the cumulative profit chart. Will use a mock UI representation for this iteration.
- **`InfoList`**: Renders the "Strategy Information" key-value metadata block.

## Data Flow & State Management
- **Mock Data Layer:** A `lib/mock-data.ts` file will be created to house the mock JSON structures for the portfolio details, metrics, and strategy information.
- **Client vs. Server:** 
  - Layouts and generic page structures will be Server Components by default.
  - Interactive elements (`Sidebar`, `TopNav` search, `TabNavigation`) will be decorated with `"use client"`.

## Error Handling & Edge Cases
- If an invalid tab is passed in the URL, the page will default to rendering the "Overview" content.
- Missing data fields in the mock data will gracefully fallback to "N/A" or hide the respective component to prevent crashes.

## Testing Strategy
- Manual visual verification of layout responsiveness across Desktop and Mobile viewports.
- Click-testing the sidebar toggle and tab navigation to ensure URL updates and content switches correctly.