import { AIRankingHub } from '@/components/PlatformViews';
import type { ProfileTab, SocialFeedTab, StrategyMode, StrategyTab, TopView, TradeTab } from '@/lib/mock-data';

function pickView(value?: string): TopView {
  if (value === 'strategy' || value === 'profile' || value === 'social') {
    return value;
  }
  return 'strategy';
}

function pickStrategyTab(value?: string): StrategyTab {
  if (value === 'following' || value === 'copied' || value === 'potential') {
    return value;
  }
  return 'potential';
}

function pickStrategyMode(value?: string): StrategyMode {
  if (value === 'manage-universe' || value === 'manage-strategy') {
    return value;
  }
  return 'manage-strategy';
}

function pickTradeTab(value?: string): TradeTab {
  return value === 'mine' ? 'mine' : 'copy';
}

function pickFeedTab(value?: string): SocialFeedTab {
  return value === 'strategies' ? 'strategies' : 'news';
}

function pickProfileTab(value?: string): ProfileTab {
  return value === 'portfolio' ? 'portfolio' : 'post';
}

export default async function PlatformPage({
  searchParams,
}: {
  searchParams: Promise<{
    view?: string;
    strategyTab?: string;
    strategyMode?: string;
    tradeTab?: string;
    feedTab?: string;
    profileTab?: string;
    strategyDetail?: string;
    copiedStrategyDetail?: string;
    copyStrategy?: string;
    traderPopup?: string;
    buyerStats?: string;
    followingStrategies?: string;
    statusSwitch?: string;
    statusValue?: string;
    statusApplied?: string;
    filter?: string;
  }>;
}) {
  const resolved = await searchParams;
  const view = pickView(resolved.view);
  const strategyTab = pickStrategyTab(resolved.strategyTab);
  const strategyMode = pickStrategyMode(resolved.strategyMode);
  const tradeTab = pickTradeTab(resolved.tradeTab);
  const feedTab = pickFeedTab(resolved.feedTab);
  const profileTab = pickProfileTab(resolved.profileTab);

  return (
    <AIRankingHub
      view={view}
      strategyTab={strategyTab}
      strategyMode={strategyMode}
      tradeTab={tradeTab}
      feedTab={feedTab}
      profileTab={profileTab}
      strategyDetail={resolved.strategyDetail}
      copiedStrategyDetail={resolved.copiedStrategyDetail}
      copyStrategy={resolved.copyStrategy}
      traderPopup={resolved.traderPopup}
      buyerStats={resolved.buyerStats}
      followingStrategies={resolved.followingStrategies}
      statusSwitch={resolved.statusSwitch}
      statusValue={resolved.statusValue}
      statusApplied={resolved.statusApplied}
      filterOpen={resolved.filter === 'open'}
    />
  );
}
