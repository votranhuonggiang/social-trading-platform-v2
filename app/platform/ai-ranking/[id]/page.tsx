import { TraderProfileView } from '@/components/PlatformViews';
import type { TraderTab } from '@/lib/mock-data';

function pickTraderTab(value?: string): TraderTab {
  if (value === 'trades' || value === 'copiers' || value === 'positions') {
    return value;
  }
  return 'positions';
}

export default async function AIRankingDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const [{ id }, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const tab = pickTraderTab(resolvedSearchParams.tab);

  return <TraderProfileView id={id} tab={tab} />;
}
