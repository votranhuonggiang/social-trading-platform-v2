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