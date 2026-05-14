import Link from 'next/link';
import {
  aiStrategies,
  buyerStatisticSummaries,
  getStrategyById,
  getTraderProfile,
  marketLeaders,
  socialPosts,
  strategySummaryCards,
  strategyUniverseNotes,
  selfTradeTotalInvestmentVnd,
  traderProfiles,
  type ProfileTab,
  type SocialFeedTab,
  type StrategyMode,
  type StrategyRecord,
  type StrategyTab,
  type TradeTab,
  type TopView,
  type TraderTab,
  type TraderProfile,
  userProfile,
} from '@/lib/mock-data';

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function buildPlatformHref({
  view,
  strategyTab,
  strategyMode,
  tradeTab,
  feedTab,
  profileTab,
  strategyDetail,
  copiedStrategyDetail,
  copyStrategy,
  traderPopup,
  buyerStats,
  followingStrategies,
  statusSwitch,
  statusValue,
  statusApplied,
  filter,
}: {
  view: TopView;
  strategyTab?: StrategyTab;
  strategyMode?: StrategyMode;
  tradeTab?: TradeTab;
  feedTab?: SocialFeedTab;
  profileTab?: ProfileTab;
  strategyDetail?: string | null;
  copiedStrategyDetail?: string | null;
  copyStrategy?: string | null;
  traderPopup?: string | null;
  buyerStats?: string | null;
  followingStrategies?: string | null;
  statusSwitch?: string | null;
  statusValue?: string | null;
  statusApplied?: string | null;
  filter?: boolean;
}) {
  const params = new URLSearchParams();
  params.set('view', view);

  if (view === 'strategy') {
    params.set('strategyTab', strategyTab ?? 'potential');
    params.set('strategyMode', strategyMode ?? 'manage-strategy');
    if ((strategyTab ?? 'potential') === 'copied') {
      params.set('tradeTab', tradeTab ?? 'copy');
    }
  }

  if (view === 'social') {
    params.set('feedTab', feedTab ?? 'news');
  }

  if (view === 'profile') {
    params.set('profileTab', profileTab ?? 'post');
  }

  if (strategyDetail) {
    params.set('strategyDetail', strategyDetail);
  }

  if (copiedStrategyDetail) {
    params.set('copiedStrategyDetail', copiedStrategyDetail);
  }

  if (copyStrategy) {
    params.set('copyStrategy', copyStrategy);
  }

  if (traderPopup) {
    params.set('traderPopup', traderPopup);
  }

  if (buyerStats) {
    params.set('buyerStats', buyerStats);
  }

  if (followingStrategies) {
    params.set('followingStrategies', followingStrategies);
  }

  if (statusSwitch) {
    params.set('statusSwitch', statusSwitch);
  }

  if (statusValue) {
    params.set('statusValue', statusValue);
  }

  if (statusApplied) {
    params.set('statusApplied', statusApplied);
  }

  if (filter) {
    params.set('filter', 'open');
  }

  return `/platform?${params.toString()}`;
}

function buildDetailHref(id: string, tab: TraderTab = 'positions') {
  return `/platform/ai-ranking/${id}?tab=${tab}`;
}

function toneClass(value?: string) {
  if (!value) return 'text-[var(--muted)]';
  if (value.startsWith('+')) return 'text-[var(--success)]';
  if (value.startsWith('-')) return 'text-[var(--danger)]';
  return 'text-[var(--ink)]';
}

function Avatar({ label }: { label: string }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-container)] text-sm font-semibold text-[var(--ink)]">
      {label}
    </div>
  );
}

function SurfaceCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        'rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-card)] shadow-[0_4px_20px_rgba(0,0,0,0.05)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
      {children}
    </p>
  );
}

function InlineTabs({
  items,
  active,
  withBorder = true,
  className,
}: {
  items: Array<{ id: string; href: string; label: string }>;
  active: string;
  withBorder?: boolean;
  className?: string;
}) {
  return (
    <div className={cx('flex flex-wrap gap-6', withBorder && 'border-b border-[var(--outline-variant)]', className)}>
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cx(
            'relative pb-3 text-[15px] font-medium transition-colors',
            active === item.id ? 'text-[var(--success-ink)]' : 'text-[var(--muted)] hover:text-[var(--ink)]',
          )}
        >
          {item.label}
          {active === item.id ? (
            <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-[var(--success-ink)]" />
          ) : null}
        </Link>
      ))}
    </div>
  );
}

function MiniSparkline({ tone = 'green' }: { tone?: 'green' | 'blue' }) {
  const stroke = tone === 'green' ? '#4caf50' : '#0f766e';
  const fill = tone === 'green' ? 'rgba(76,175,80,0.14)' : 'rgba(15,118,110,0.12)';

  return (
    <svg className="h-12 w-full" viewBox="0 0 160 48" preserveAspectRatio="none">
      <path
        d="M0 40 C 16 36, 26 20, 40 24 S 66 34, 78 20 S 110 4, 130 10 S 148 16, 160 8"
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
      />
      <path
        d="M0 48 L0 40 C 16 36, 26 20, 40 24 S 66 34, 78 20 S 110 4, 130 10 S 148 16, 160 8 L160 48 Z"
        fill={fill}
      />
    </svg>
  );
}

function AllocationBars({ strategy }: { strategy: StrategyRecord }) {
  return (
    <div className="space-y-3">
      {strategy.assetMix.map((item) => (
        <div key={item.label} className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--ink)]">{item.label}</span>
            <span className="font-mono text-[var(--muted)]">{item.value}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-container-low)]">
            <div className={cx('h-full rounded-full', item.tone)} style={{ width: item.value }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function StrategyOverviewCards({ cards = strategySummaryCards }: { cards?: typeof strategySummaryCards }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <SurfaceCard key={card.label} className="min-h-[188px] p-6">
          <Label>{card.label}</Label>
          {card.label === 'RỦI RO TRUNG BÌNH' ? (
            <>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#d1d5db]">
                  <div className="h-full w-[42%] rounded-full bg-[var(--success)]" />
                </div>
                <span className="text-[15px] font-semibold text-[var(--ink)]">{card.value}</span>
              </div>
              <p className="mt-5 text-[14px] italic leading-6 text-[var(--muted)]">{card.caption}</p>
            </>
          ) : (
            <>
              <p
                className={cx(
                  'mt-5 text-[24px] font-semibold tracking-[-0.02em]',
                  card.tone === 'positive' ? 'text-[var(--success)]' : 'text-[var(--ink)]',
                )}
              >
                {card.label === 'TỔNG VỐN ĐẦU TƯ' || card.label === 'LỢI NHUẬN (PNL)'
                  ? card.value.replace(' VND', '')
                  : card.value}
              </p>
              {card.label === 'TỔNG VỐN ĐẦU TƯ' || card.label === 'LỢI NHUẬN (PNL)' ? (
                <p className="mt-2 text-[14px] text-[var(--ink)]">VND</p>
              ) : null}
              <p className={cx('mt-5 text-[14px]', card.tone === 'positive' ? 'text-[var(--success)]' : 'text-[var(--muted)]')}>
                {card.caption}
              </p>
            </>
          )}
        </SurfaceCard>
      ))}
    </div>
  );
}

const copiedStrategyRows = [
  {
    id: '1',
    strategy: 'Vietnam Growth Alpha',
    trader: '@LeHoangNam',
    manager: 'Le Minh Hai',
    avatar: 'VA',
    startedCopy: '12/10/2024',
    invested: '70,000,000',
    pnlPct: '+8.2%',
    pnlValue: '+5,740,000 VND',
    currentCapital: '75,740,000',
    tickers: ['HPG', 'VCB', 'FPT'],
    status: 'HOẠT ĐỘNG',
    action: 'Điều chỉnh',
  },
  {
    id: '2',
    strategy: 'Dòng Tiền Thông Minh',
    trader: '@NgoQuangMinh',
    manager: 'Ngô Quang Minh',
    avatar: 'DT',
    startedCopy: '04/11/2024',
    invested: '50,000,000',
    pnlPct: '+6.1%',
    pnlValue: '+3,050,000 VND',
    currentCapital: '53,050,000',
    tickers: ['MWG', 'VIC'],
    status: 'HOẠT ĐỘNG',
    action: 'Điều chỉnh',
  },
  {
    id: '3',
    strategy: 'An tâm Hưu trí',
    trader: '@TranThuHang',
    manager: 'Trần Thu Hằng',
    avatar: 'AT',
    startedCopy: '19/09/2024',
    invested: '35,000,000',
    pnlPct: '+5.1%',
    pnlValue: '+1,785,000 VND',
    currentCapital: '36,785,000',
    tickers: ['VNM', 'GAS'],
    status: 'HOẠT ĐỘNG',
    action: 'Điều chỉnh',
  },
  {
    id: '4',
    strategy: 'Lướt sóng BĐS',
    trader: '@NguyenVanA',
    manager: 'Nguyễn Văn A',
    avatar: 'LS',
    startedCopy: '28/03/2025',
    invested: '25,000,000',
    pnlPct: '-1.6%',
    pnlValue: '-400,000 VND',
    currentCapital: '24,600,000',
    tickers: ['DXG', 'NVL'],
    status: 'TẠM DỪNG',
    action: 'Tái kích hoạt',
  },
];

type CopiedStrategyRow = (typeof copiedStrategyRows)[number];

const copiedStrategyTrades: Record<
  string,
  Array<{
    symbol: string;
    side: string;
    quantity: string;
    price: string;
    executionTime: string;
    copiedAt: string;
  }>
> = {
  '1': [
    { symbol: 'HPG', side: 'MUA', quantity: '5,000', price: '28,500', executionTime: '10:45 12/10', copiedAt: '10:45 12/10' },
    { symbol: 'VCB', side: 'BÁN', quantity: '2,000', price: '92,000', executionTime: '14:20 11/10', copiedAt: '14:20 11/10' },
    { symbol: 'FPT', side: 'MUA', quantity: '1,500', price: '115,000', executionTime: '09:15 10/10', copiedAt: '09:15 10/10' },
    { symbol: 'SSI', side: 'BÁN', quantity: '10,000', price: '34,200', executionTime: '13:30 09/10', copiedAt: '13:30 09/10' },
    { symbol: 'MWG', side: 'MUA', quantity: '3,000', price: '48,500', executionTime: '11:00 08/10', copiedAt: '11:00 08/10' },
  ],
  '2': [
    { symbol: 'MWG', side: 'MUA', quantity: '4,000', price: '62,400', executionTime: '10:05 03/11', copiedAt: '10:05 03/11' },
    { symbol: 'VIC', side: 'MUA', quantity: '1,800', price: '46,200', executionTime: '14:10 01/11', copiedAt: '14:10 01/11' },
    { symbol: 'VHM', side: 'BÁN', quantity: '1,200', price: '39,800', executionTime: '09:40 30/10', copiedAt: '09:40 30/10' },
  ],
  '3': [
    { symbol: 'VNM', side: 'MUA', quantity: '2,400', price: '69,500', executionTime: '09:20 18/09', copiedAt: '09:20 18/09' },
    { symbol: 'GAS', side: 'MUA', quantity: '1,000', price: '78,000', executionTime: '13:35 16/09', copiedAt: '13:35 16/09' },
  ],
  '4': [
    { symbol: 'DXG', side: 'MUA', quantity: '6,000', price: '18,400', executionTime: '10:50 27/03', copiedAt: '10:50 27/03' },
    { symbol: 'NVL', side: 'BÁN', quantity: '3,500', price: '14,800', executionTime: '14:15 25/03', copiedAt: '14:15 25/03' },
  ],
};

const copiedRiskMetrics: Record<
  string,
  Array<{
    label: string;
    value: string;
    badge?: string;
    badgeTone?: 'danger' | 'success';
  }>
> = {
  '1': [
    { label: 'Sụt giảm tối đa (MDD)', value: '12.4%', badge: 'Cao', badgeTone: 'danger' },
    { label: 'Sharpe Ratio', value: '1.85', badge: 'Tốt', badgeTone: 'success' },
    { label: 'Biến động (vs VNIndex)', value: '0.92 Beta' },
  ],
  '2': [
    { label: 'Sụt giảm tối đa (MDD)', value: '8.6%', badge: 'Vừa', badgeTone: 'success' },
    { label: 'Sharpe Ratio', value: '1.42', badge: 'Ổn định', badgeTone: 'success' },
    { label: 'Biến động (vs VNIndex)', value: '0.81 Beta' },
  ],
  '3': [
    { label: 'Sụt giảm tối đa (MDD)', value: '5.1%', badge: 'Thấp', badgeTone: 'success' },
    { label: 'Sharpe Ratio', value: '1.18', badge: 'Ổn định', badgeTone: 'success' },
    { label: 'Biến động (vs VNIndex)', value: '0.68 Beta' },
  ],
  '4': [
    { label: 'Sụt giảm tối đa (MDD)', value: '17.9%', badge: 'Cao', badgeTone: 'danger' },
    { label: 'Sharpe Ratio', value: '0.94', badge: 'Biến động', badgeTone: 'danger' },
    { label: 'Biến động (vs VNIndex)', value: '1.14 Beta' },
  ],
};

const copiedAllocations: Record<string, Array<{ label: string; weight: string; tone: string }>> = {
  '1': [
    { label: 'FPT (40%)', weight: '40%', tone: '#1a1c1e' },
    { label: 'HPG (25%)', weight: '25%', tone: '#006e1c' },
    { label: 'Tiền mặt (20%)', weight: '20%', tone: '#c5c6ca' },
    { label: 'VCB (15%)', weight: '15%', tone: '#0088e2' },
  ],
  '2': [
    { label: 'MWG (35%)', weight: '35%', tone: '#1a1c1e' },
    { label: 'VIC (30%)', weight: '30%', tone: '#006e1c' },
    { label: 'VHM (20%)', weight: '20%', tone: '#c5c6ca' },
    { label: 'Tiền mặt (15%)', weight: '15%', tone: '#0088e2' },
  ],
  '3': [
    { label: 'VNM (45%)', weight: '45%', tone: '#1a1c1e' },
    { label: 'GAS (25%)', weight: '25%', tone: '#006e1c' },
    { label: 'Tiền mặt (20%)', weight: '20%', tone: '#c5c6ca' },
    { label: 'Bảo hiểm (10%)', weight: '10%', tone: '#0088e2' },
  ],
  '4': [
    { label: 'DXG (42%)', weight: '42%', tone: '#1a1c1e' },
    { label: 'NVL (28%)', weight: '28%', tone: '#006e1c' },
    { label: 'KDH (18%)', weight: '18%', tone: '#c5c6ca' },
    { label: 'Tiền mặt (12%)', weight: '12%', tone: '#0088e2' },
  ],
};

const potentialStocks = [
  {
    symbol: 'MSN',
    price: '80.200',
    change: '-0.99%',
    flow: '-490,8 Tỷ',
    foreign: '983,2 Tỷ',
    technical: 'Tích cực',
    sentiment: 'Tích cực',
    included: 'Nằm trong 2 chiến lược',
  },
  {
    symbol: 'VRE',
    price: '35.900',
    change: '-1.64%',
    flow: '483,5 Tỷ',
    foreign: '494,2 Tỷ',
    technical: 'Tích cực',
    sentiment: 'Tích cực',
    included: 'Nằm trong 1 chiến lược',
  },
  {
    symbol: 'MWG',
    price: '84.600',
    change: '-1.63%',
    flow: '-80,5 Tỷ',
    foreign: '606,9 Tỷ',
    technical: 'Trung tính',
    sentiment: 'Tích cực',
    included: 'Nằm trong 2 chiến lược',
  },
  {
    symbol: 'DCL',
    price: '38.100',
    change: '-0.52%',
    flow: '6 Tỷ',
    foreign: '0',
    technical: 'Tích cực',
    sentiment: 'Tích cực',
    included: 'Nằm trong 1 chiến lược',
  },
  {
    symbol: 'FIT',
    price: '4.250',
    change: '-0.23%',
    flow: '-2 Tỷ',
    foreign: '0',
    technical: 'Tích cực',
    sentiment: 'Tích cực',
    included: 'Nằm trong 1 chiến lược',
  },
];

const followingRows = [
  {
    name: 'VNDiamond Growth Master',
    author: '@TrinhVinhFinance',
    ytd: '+28.50%',
    aum: '420 tỷ VND',
    followers: '850 người theo dõi',
    tickers: ['FPT', 'MWG', 'PNJ'],
    risk: 'Thấp',
  },
  {
    name: 'VN30 Alpha Hunter',
    author: '@HanoiTrader_X',
    ytd: '+15.20%',
    aum: '125 tỷ VND',
    followers: '320 người theo dõi',
    tickers: ['TCB', 'MBB'],
    risk: 'Vừa',
  },
];

const strategyVisibility: Record<string, { label: 'Public' | 'Private'; locked?: boolean }> = {
  '1': { label: 'Public' },
  '2': { label: 'Public' },
  '3': { label: 'Private', locked: true },
};

const traderPopupMetrics: Record<
  string,
  Array<{
    label: string;
    value: string;
    tone?: 'positive' | 'negative';
  }>
> = {
  '1': [
    { label: 'Followers', value: '12.4K' },
    { label: 'Copy Traders', value: '1,240' },
    { label: 'Win Rate', value: '68.2%', tone: 'positive' },
    { label: 'Avg PnL', value: '+15.2%', tone: 'positive' },
    { label: 'Monthly P&L', value: '+42,019.12', tone: 'positive' },
    { label: 'Total Return', value: '+85.4%', tone: 'positive' },
    { label: 'Max Drawdown', value: '-12.4%', tone: 'negative' },
    { label: 'Risk Score', value: '4.2/10' },
    { label: 'Frequency', value: 'High' },
  ],
  '2': [
    { label: 'Followers', value: '8.9K' },
    { label: 'Copy Traders', value: '865' },
    { label: 'Win Rate', value: '63.5%', tone: 'positive' },
    { label: 'Avg PnL', value: '+12.7%', tone: 'positive' },
    { label: 'Monthly P&L', value: '+28,440.55', tone: 'positive' },
    { label: 'Total Return', value: '+61.8%', tone: 'positive' },
    { label: 'Max Drawdown', value: '-15.1%', tone: 'negative' },
    { label: 'Risk Score', value: '5.1/10' },
    { label: 'Frequency', value: 'High' },
  ],
  '3': [
    { label: 'Followers', value: '5.1K' },
    { label: 'Copy Traders', value: '442' },
    { label: 'Win Rate', value: '61.1%', tone: 'positive' },
    { label: 'Avg PnL', value: '+9.4%', tone: 'positive' },
    { label: 'Monthly P&L', value: '+16,882.10', tone: 'positive' },
    { label: 'Total Return', value: '+38.2%', tone: 'positive' },
    { label: 'Max Drawdown', value: '-8.6%', tone: 'negative' },
    { label: 'Risk Score', value: '3.6/10' },
    { label: 'Frequency', value: 'Medium' },
  ],
};

const traderPopupStrategies: Record<
  string,
  Array<{
    strategyId?: string;
    name: string;
    ytd: string;
    annual: string;
    monthly: string;
    sharpe: string;
    holdings: string;
    status: 'public-selling' | 'public-free' | 'private';
  }>
> = {
  '1': [
    { strategyId: '1', name: 'Weekly_Fundamental', ytd: '+24.5%', annual: '+32.1%', monthly: '+4.5%', sharpe: '4.46', holdings: 'FPT, VCB, HPG', status: 'public-selling' },
    { strategyId: '2', name: 'Momentum_VN30', ytd: '+8.2%', annual: '+15.8%', monthly: '+1.2%', sharpe: '3.28', holdings: 'MWG, TCB, MBB', status: 'public-free' },
    { name: 'Quantum_Arbitrage_v2', ytd: '--', annual: '+42.5%', monthly: '+5.1%', sharpe: '--', holdings: 'Khóa riêng', status: 'private' },
  ],
  '2': [
    { strategyId: '2', name: 'Momentum_VN30', ytd: '+17.4%', annual: '+24.8%', monthly: '+3.4%', sharpe: '3.28', holdings: 'MWG, TCB, MBB', status: 'public-selling' },
    { strategyId: '1', name: 'Weekly_Fundamental', ytd: '+11.2%', annual: '+18.6%', monthly: '+2.1%', sharpe: '4.46', holdings: 'SSI, HCM, VCI', status: 'public-free' },
  ],
  '3': [
    { strategyId: '3', name: 'Quality_Dividend', ytd: '+9.1%', annual: '+14.2%', monthly: '+1.4%', sharpe: '2.85', holdings: 'VNM, REE, GAS', status: 'public-selling' },
    { name: 'Income_Stability_Private', ytd: '--', annual: '+19.4%', monthly: '+2.6%', sharpe: '--', holdings: 'Khóa riêng', status: 'private' },
  ],
};

const copiedProfitLossStats: Record<
  string,
  Array<{
    title: string;
    rows: Array<{ label: string; value: string; tone: 'positive' | 'negative' }>;
  }>
> = {
  '1': [
    {
      title: 'CP lãi nhiều nhất',
      rows: [
        { label: 'HSG', value: '+15.4%', tone: 'positive' },
        { label: 'HPG', value: '+12.8%', tone: 'positive' },
        { label: 'FPT', value: '+10.5%', tone: 'positive' },
      ],
    },
    {
      title: 'CP lỗ nhiều nhất',
      rows: [
        { label: 'SHB', value: '-8.2%', tone: 'negative' },
        { label: 'HDG', value: '-5.4%', tone: 'negative' },
        { label: 'VIC', value: '-3.1%', tone: 'negative' },
      ],
    },
    {
      title: 'Ngành lãi nhiều nhất',
      rows: [
        { label: 'Tài nguyên Cơ bản', value: '+14.2%', tone: 'positive' },
        { label: 'Công nghệ Thông tin', value: '+11.5%', tone: 'positive' },
      ],
    },
    {
      title: 'Ngành lỗ nhiều nhất',
      rows: [
        { label: 'Ngân hàng', value: '-6.8%', tone: 'negative' },
        { label: 'Bất động sản', value: '-4.2%', tone: 'negative' },
      ],
    },
  ],
};

const selfTradingSummaryCards = [
  { label: 'TỔNG VỐN TỰ GIAO DỊCH', value: `${selfTradeTotalInvestmentVnd.toLocaleString('vi-VN')} VND`, caption: '+3.9% tháng này', tone: 'positive' as const },
  { label: 'CHIẾN LƯỢC ĐANG CHẠY', value: '03', caption: '1 chiến lược đang tạm dừng', tone: 'neutral' as const },
  { label: 'LỢI NHUẬN (PNL)', value: '+24.860.000 VND', caption: '2 chiến lược vượt benchmark', tone: 'positive' as const },
  { label: 'RỦI RO TRUNG BÌNH', value: 'Thấp (2/5)', caption: 'Kiểm soát bằng phân bổ vốn', tone: 'neutral' as const },
];

const selfTradingRows = [
  {
    id: 'self-1',
    strategy: 'Weekly_Fundamental',
    account: 'Tài khoản chính',
    capital: '118,000,000',
    pnlPct: '+7.8%',
    pnlValue: '+9,204,000 VND',
    tickers: ['HPG', 'FPT', 'VCB'],
    status: 'ĐANG CHẠY',
    action: 'Điều chỉnh vốn',
  },
  {
    id: 'self-2',
    strategy: 'Momentum_Tech',
    account: 'Tài khoản tăng trưởng',
    capital: '92,000,000',
    pnlPct: '+5.6%',
    pnlValue: '+5,152,000 VND',
    tickers: ['MWG', 'SSI'],
    status: 'ĐANG CHẠY',
    action: 'Điều chỉnh vốn',
  },
  {
    id: 'self-3',
    strategy: 'Alpha_Growth',
    account: 'Tài khoản dự phòng',
    capital: '76,000,000',
    pnlPct: '-1.3%',
    pnlValue: '-988,000 VND',
    tickers: ['TCB', 'ACB'],
    status: 'TẠM DỪNG',
    action: 'Khởi động lại',
  },
];

type StrategyVisibilityStatus = 'public_paid' | 'public_free' | 'private';

function mapDisplayStatusToVisibilityStatus(status: string): StrategyVisibilityStatus {
  if (status === 'Selling') return 'public_paid';
  if (status === 'Private') return 'private';
  return 'public_free';
}

function mapVisibilityStatusToDisplay(status: StrategyVisibilityStatus): string {
  if (status === 'public_paid') return 'Selling';
  if (status === 'private') return 'Private';
  return 'Public';
}

function StrategyIdeasTable({
  strategies,
  view,
  strategyTab,
}: {
  strategies: StrategyRecord[];
  view: TopView;
  strategyTab: StrategyTab;
}) {
  return (
    <SurfaceCard className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--outline-variant)] px-5 py-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--ink)]">
            {strategyTab === 'potential'
              ? 'Danh sách cổ phiếu và chiến lược tiềm năng'
              : strategyTab === 'following'
                ? 'Danh sách các chiến lược đang theo dõi'
                : 'Chi tiết các chiến lược đã sao chép'}
          </h3>
          <p className="mt-1 text-sm text-[var(--muted)]">VN100 universe • VND localization • live ranking</p>
        </div>
        <div className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-3 py-2 text-sm text-[var(--muted)]">
          Tháng 05, 2026
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-[var(--surface-container-low)]">
            <tr className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
              <th className="px-5 py-3.5">Tên chiến lược / tác giả</th>
              <th className="px-5 py-3.5">Hiệu suất (YTD)</th>
              <th className="px-5 py-3.5">Sharpe</th>
              <th className="px-5 py-3.5">AUM</th>
              <th className="px-5 py-3.5">Copiers</th>
              <th className="px-5 py-3.5">MDD</th>
              <th className="px-5 py-3.5 text-right">Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {strategies.map((strategy, index) => (
              <tr
                key={strategy.id}
                className={cx(
                  'border-t border-[var(--outline-variant)] transition-colors hover:bg-[var(--surface-container-low)]',
                  index % 2 === 1 && 'bg-[rgba(239,244,255,0.45)]',
                )}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar label={strategy.avatar} />
                    <div>
                      <p className="font-semibold text-[var(--ink)]">{strategy.name}</p>
                      <p className="text-sm text-[var(--muted)]">
                        {strategy.author} • {strategy.style}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 font-mono text-[var(--success)]">{strategy.ytd}</td>
                <td className="px-5 py-3.5 font-mono text-[var(--ink)]">{strategy.sharpe}</td>
                <td className="px-5 py-3.5 font-mono text-[var(--ink)]">{strategy.aum}</td>
                <td className="px-5 py-3.5 font-mono text-[var(--ink)]">{strategy.copiers}</td>
                <td className="px-5 py-3.5 font-mono text-[var(--danger)]">{strategy.drawdown}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={buildPlatformHref({
                        view,
                        strategyTab,
                        strategyDetail: strategy.id,
                      })}
                      className="rounded-lg border border-[var(--outline-variant)] px-3 py-2 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface-container-low)]"
                    >
                      Xem
                    </Link>
                    <Link
                      href={buildDetailHref(strategy.id)}
                      className="rounded-lg bg-[var(--success-ink)] px-3 py-2 text-sm font-semibold text-white hover:opacity-90"
                    >
                      Trader
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SurfaceCard>
  );
}

function CopiedStrategyTable() {
  return (
    <SurfaceCard className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--outline-variant)] px-6 py-5">
        <h3 className="text-[18px] font-semibold text-[var(--ink)]">Chi tiết các chiến lược đã sao chép</h3>
        <div className="flex gap-3 text-[var(--muted)]">
          <button className="rounded-lg border border-[var(--outline-variant)] px-3 py-2.5 text-sm">↓</button>
          <button className="rounded-lg border border-[var(--outline-variant)] px-3 py-2.5 text-sm">↕</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-[rgba(229,238,255,0.7)]">
            <tr className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
              <th className="px-6 py-4">Chiến lược & trader</th>
              <th className="px-6 py-4">Tiền vốn (VND)</th>
              <th className="px-6 py-4">Hiệu suất (PNL)</th>
              <th className="px-6 py-4">Mã cổ phiếu chính</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {copiedStrategyRows.map((row) => (
              <tr key={row.strategy} className="border-t border-[var(--outline-variant)] transition-colors hover:bg-[var(--surface-container-low)]">
                <td className="px-6 py-4">
                  <Link
                    href={buildPlatformHref({ view: 'strategy', strategyTab: 'copied', copiedStrategyDetail: row.id })}
                    className="flex items-center gap-3 rounded-lg transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container)] text-xs font-semibold text-[var(--primary)]">
                      {row.avatar}
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-[var(--ink)] hover:text-[var(--primary)]">{row.strategy}</p>
                      <p className="mt-0.5 text-[13px] text-[var(--muted)]">bởi {row.trader}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 font-mono text-[14px] text-[var(--ink)]">{row.invested}</td>
                <td className="px-6 py-4">
                  <p className="font-mono text-[15px] font-semibold text-[var(--success)]">{row.pnlPct}</p>
                  <p className="mt-0.5 text-[13px] text-[var(--success)]">{row.pnlValue}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {row.tickers.map((ticker) => (
                      <span key={ticker} className="rounded-md bg-[var(--surface-container)] px-2.5 py-1 text-[11px] font-semibold text-[var(--ink)]">
                        {ticker}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cx(
                      'inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.08em]',
                      row.status === 'HOẠT ĐỘNG' ? 'bg-[rgba(76,175,80,0.22)] text-[var(--success-ink)]' : 'bg-[var(--surface-container)] text-[var(--muted)]',
                    )}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={buildPlatformHref({ view: 'strategy', strategyTab: 'copied', copiedStrategyDetail: row.id })}
                    className="text-[14px] font-semibold text-[var(--success-ink)] hover:underline"
                  >
                    {row.action}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SurfaceCard>
  );
}

function CopiedPerformanceSection() {
  const summaryTrades = copiedStrategyTrades['1'].concat(copiedStrategyTrades['2']).slice(0, 4);
  const timeline = [
    { label: 'Thg 8', x: '0%', y: '84%' },
    { label: 'Thg 9', x: '38%', y: '56%' },
    { label: 'Thg 10', x: '72%', y: '34%' },
    { label: 'Now', x: '100%', y: '12%' },
  ];

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
      <SurfaceCard className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--outline-variant)] px-6 py-5">
          <div>
            <h3 className="text-[18px] font-semibold text-[var(--ink)]">Hiệu suất danh mục (PNL)</h3>
            <p className="mt-1 text-[13px] text-[var(--muted)]">Lợi nhuận tích lũy theo thời gian</p>
          </div>
          <div className="flex gap-1 rounded-lg bg-[var(--surface-container-low)] p-1">
            {['1W', '1M', '3M', 'YTD', 'ALL'].map((item) => (
              <button
                key={item}
                className={cx(
                  'rounded-md px-3 py-1.5 text-[11px] font-bold',
                  item === '3M'
                    ? 'bg-[var(--surface-card)] text-[var(--primary)] shadow-sm'
                    : 'text-[var(--muted)] hover:bg-[var(--surface-container)]',
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="relative px-6 pb-6 pt-5">
          <div className="flex h-[252px]">
            <div className="mr-4 flex w-10 flex-col justify-between pb-8 text-[10px] font-medium text-[var(--muted)]">
              <span>+30%</span>
              <span>+20%</span>
              <span>+10%</span>
              <span>0%</span>
            </div>
            <div className="relative flex-1 border-b border-l border-[var(--outline-variant)]">
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="border-t border-[var(--outline-variant)]/40" />
                ))}
              </div>
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="copiedPnlGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#006e1c" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#006e1c" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,84 C12,82 20,72 28,64 S48,58 58,42 S78,34 100,12 L100,100 L0,100 Z"
                  fill="url(#copiedPnlGradient)"
                />
                <path
                  d="M0,84 C12,82 20,72 28,64 S48,58 58,42 S78,34 100,12"
                  fill="none"
                  stroke="#006e1c"
                  strokeWidth="2.2"
                />
              </svg>
              <div className="absolute left-[72%] top-[34%] -translate-x-1/2 -translate-y-full rounded bg-[var(--inverse-surface)] px-2 py-1 text-[11px] font-bold text-[var(--inverse-on-surface)] shadow-lg">
                +18.5%
                <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-[var(--inverse-surface)]" />
              </div>
              <div className="absolute left-[72%] top-[34%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--success-ink)] bg-white shadow-sm" />
              <div className="absolute inset-x-0 bottom-0 translate-y-7 px-3">
                <div className="flex justify-between text-[10px] font-medium text-[var(--muted)]">
                  {timeline.map((point) => (
                    <span key={point.label}>{point.label === 'Now' ? 'Thg 10' : point.label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SurfaceCard>

      <SurfaceCard className="flex max-h-[340px] flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--outline-variant)] px-6 py-5">
          <h3 className="text-[18px] font-semibold text-[var(--ink)]">Tóm tắt lịch sử giao dịch</h3>
          <button className="text-[13px] font-semibold text-[var(--success-ink)] hover:underline">Xem thêm</button>
        </div>
        <div className="space-y-3 overflow-y-auto px-5 py-5">
          {summaryTrades.map((trade) => (
            <div
              key={`${trade.symbol}-${trade.executionTime}`}
              className="flex items-center justify-between rounded-lg border border-[var(--outline-variant)] bg-[var(--surface)] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cx(
                    'flex h-10 w-10 items-center justify-center rounded text-[11px] font-bold',
                    trade.side === 'MUA'
                      ? 'bg-[rgba(145,247,142,0.34)] text-[var(--success-ink)]'
                      : 'bg-[var(--error-container)] text-[var(--on-error-container)]',
                  )}
                >
                  {trade.side}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[var(--ink)]">{trade.symbol}</p>
                  <p className="mt-0.5 text-[11px] text-[var(--muted)]">{trade.executionTime}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-[13px] font-semibold text-[var(--ink)]">{trade.quantity}</p>
                <p className="mt-0.5 text-[11px] text-[var(--muted)]">Khớp giá {trade.price}</p>
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  );
}

function CopiedAllocationChart() {
  const allocationRows = [
    { label: 'Vietnam Growth Alpha', ratio: 0.39, amount: '70.000.000 VND', tone: '#111827' },
    { label: 'Dòng Tiền Thông Minh', ratio: 0.28, amount: '50.000.000 VND', tone: '#006e1c' },
    { label: 'An tâm Hưu trí', ratio: 0.19, amount: '35.000.000 VND', tone: '#2563eb' },
    { label: 'Lướt sóng BĐS', ratio: 0.14, amount: '25.000.000 VND', tone: '#94a3b8' },
  ];

  return (
    <SurfaceCard className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--outline-variant)] px-6 py-5">
        <h3 className="text-[18px] font-semibold text-[var(--ink)]">Phân bổ danh mục Copy</h3>
        <div className="flex gap-2">
          <button className="rounded-md bg-[var(--success-ink)] px-3 py-2 text-[12px] font-semibold text-white">Vốn đầu tư</button>
          <button className="rounded-md bg-[var(--surface-container)] px-3 py-2 text-[12px] text-[var(--muted)]">Tỷ trọng</button>
        </div>
      </div>
      <div className="px-6 py-5">
        <div className="rounded-xl border border-[var(--outline-variant)] bg-[var(--surface)] p-4">
          <div className="mb-4 h-3 overflow-hidden rounded-full bg-[var(--surface-container-low)]">
            <div className="flex h-full w-full">
              {allocationRows.map((item) => (
                <div key={item.label} style={{ width: `${item.ratio * 100}%`, backgroundColor: item.tone }} />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {allocationRows.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.tone }} />
                  <span className="truncate text-[13px] font-medium text-[var(--ink)]">{item.label}</span>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[13px] font-semibold text-[var(--ink)]">{Math.round(item.ratio * 100)}%</p>
                  <p className="text-[11px] text-[var(--muted)]">{item.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}

function SelfTradingTable() {
  return (
    <SurfaceCard className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--outline-variant)] px-6 py-5">
        <h3 className="text-[18px] font-semibold text-[var(--ink)]">Chi tiết các chiến lược tự giao dịch</h3>
        <div className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-3 py-2 text-sm text-[var(--muted)]">
          Tự quản lý vốn
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-[rgba(229,238,255,0.7)]">
            <tr className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
              <th className="px-6 py-4">Chiến lược & tài khoản</th>
              <th className="px-6 py-4">Vốn phân bổ (VND)</th>
              <th className="px-6 py-4">Hiệu suất (PNL)</th>
              <th className="px-6 py-4">Mã cổ phiếu chính</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {selfTradingRows.map((row) => (
              <tr key={row.id} className="border-t border-[var(--outline-variant)] transition-colors hover:bg-[var(--surface-container-low)]">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-[15px] font-semibold text-[var(--ink)]">{row.strategy}</p>
                    <p className="mt-0.5 text-[13px] text-[var(--muted)]">{row.account}</p>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-[14px] text-[var(--ink)]">{row.capital}</td>
                <td className="px-6 py-4">
                  <p className={cx('font-mono text-[15px] font-semibold', toneClass(row.pnlPct))}>{row.pnlPct}</p>
                  <p className={cx('mt-0.5 text-[13px]', toneClass(row.pnlValue))}>{row.pnlValue}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {row.tickers.map((ticker) => (
                      <span key={ticker} className="rounded-md bg-[var(--surface-container)] px-2.5 py-1 text-[11px] font-semibold text-[var(--ink)]">
                        {ticker}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cx(
                      'inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.08em]',
                      row.status === 'ĐANG CHẠY' ? 'bg-[rgba(76,175,80,0.22)] text-[var(--success-ink)]' : 'bg-[var(--surface-container)] text-[var(--muted)]',
                    )}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[14px] font-semibold text-[var(--success-ink)] hover:underline">{row.action}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SurfaceCard>
  );
}

function SelfTradingPerformanceSection() {
  const summaryTrades = [
    ['MUA', 'FPT', 'Weekly_Fundamental', '3,200 cp', '+2,840,000 VND'],
    ['BÁN', 'HPG', 'Weekly_Fundamental', '4,100 cp', '+1,120,000 VND'],
    ['MUA', 'SSI', 'Momentum_Tech', '2,800 cp', '+980,000 VND'],
    ['BÁN', 'TCB', 'Alpha_Growth', '1,600 cp', '-420,000 VND'],
  ];

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
      <SurfaceCard className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--outline-variant)] px-6 py-5">
          <div>
            <h3 className="text-[18px] font-semibold text-[var(--ink)]">Hiệu suất danh mục tự giao dịch</h3>
            <p className="mt-1 text-[13px] text-[var(--muted)]">Lợi nhuận tích lũy từ các chiến lược do bạn tự vận hành</p>
          </div>
          <div className="flex gap-1 rounded-lg bg-[var(--surface-container-low)] p-1">
            {['1W', '1M', '3M', 'YTD', 'ALL'].map((item) => (
              <button key={item} className={cx('rounded-md px-3 py-1.5 text-[11px] font-bold', item === '3M' ? 'bg-[var(--surface-card)] text-[var(--primary)] shadow-sm' : 'text-[var(--muted)]')}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="px-6 py-5">
          <div className="relative h-64 overflow-hidden rounded-xl border border-[var(--outline-variant)] bg-[linear-gradient(180deg,rgba(219,234,254,0.25),rgba(255,255,255,0.95)),linear-gradient(90deg,rgba(197,198,202,0.35)_1px,transparent_1px),linear-gradient(180deg,rgba(197,198,202,0.25)_1px,transparent_1px)] bg-[size:auto,20%_100%,100%_25%]">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,82 Q12,78 24,62 T48,42 T72,28 T100,18" fill="none" stroke="#006e1c" strokeWidth="2.5" />
            </svg>
          </div>
        </div>
      </SurfaceCard>

      <SurfaceCard className="overflow-hidden">
        <div className="border-b border-[var(--outline-variant)] px-6 py-5">
          <h3 className="text-[18px] font-semibold text-[var(--ink)]">Tóm tắt lịch sử giao dịch</h3>
        </div>
        <div className="space-y-3 px-6 py-5">
          {summaryTrades.map((trade) => (
            <div key={trade.join('-')} className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-3">
              <div className="flex items-center justify-between">
                <span className={cx('text-[11px] font-bold uppercase tracking-[0.08em]', trade[0] === 'BÁN' ? 'text-[var(--danger)]' : 'text-[var(--success)]')}>
                  {trade[0]}
                </span>
                <span className={cx('font-mono text-[12px] font-semibold', toneClass(trade[4]))}>{trade[4]}</span>
              </div>
              <p className="mt-2 text-[13px] font-semibold text-[var(--ink)]">{trade[1]} • {trade[2]}</p>
              <p className="mt-1 text-[12px] text-[var(--muted)]">{trade[3]}</p>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  );
}

function SelfTradingAllocationChart() {
  const allocationRows = [
    { label: 'Weekly_Fundamental', ratio: 0.41, amount: '118.000.000 VND', tone: '#111827' },
    { label: 'Momentum_Tech', ratio: 0.32, amount: '92.000.000 VND', tone: '#006e1c' },
    { label: 'Alpha_Growth', ratio: 0.27, amount: '76.000.000 VND', tone: '#2563eb' },
  ];

  return (
    <SurfaceCard className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--outline-variant)] px-6 py-5">
        <h3 className="text-[18px] font-semibold text-[var(--ink)]">Phân bổ danh mục tự giao dịch</h3>
        <div className="flex gap-2">
          <button className="rounded-md bg-[var(--success-ink)] px-3 py-2 text-[12px] font-semibold text-white">Vốn đầu tư</button>
          <button className="rounded-md bg-[var(--surface-container)] px-3 py-2 text-[12px] text-[var(--muted)]">Tỷ trọng</button>
        </div>
      </div>
      <div className="px-6 py-5">
        <div className="rounded-xl border border-[var(--outline-variant)] bg-[var(--surface)] p-4">
          <div className="mb-4 h-3 overflow-hidden rounded-full bg-[var(--surface-container-low)]">
            <div className="flex h-full w-full">
              {allocationRows.map((item) => (
                <div key={item.label} style={{ width: `${item.ratio * 100}%`, backgroundColor: item.tone }} />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {allocationRows.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.tone }} />
                  <span className="truncate text-[13px] font-medium text-[var(--ink)]">{item.label}</span>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[13px] font-semibold text-[var(--ink)]">{Math.round(item.ratio * 100)}%</p>
                  <p className="text-[11px] text-[var(--muted)]">{item.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}

function PotentialStocksGrid() {
  return (
    <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-5">
      {potentialStocks.map((stock) => (
        <div key={stock.symbol} className="rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-card)] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h3 className="text-[14px] font-semibold text-[var(--ink)]">{stock.symbol}</h3>
              <p className="text-[10px] text-[var(--muted)]">Giá hôm nay</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[14px] text-[var(--ink)]">{stock.price}</p>
              <p className="text-[10px] font-bold text-[var(--danger)]">{stock.change}</p>
            </div>
          </div>
          <div className="space-y-1.5 border-t border-[var(--outline-variant)] pt-2 text-[11px]">
            <div className="flex justify-between gap-3">
              <span className="text-[var(--muted)]">Dòng tiền (1M)</span>
              <span className={stock.flow.startsWith('-') ? 'font-semibold text-[var(--danger)]' : 'font-semibold text-[var(--success)]'}>{stock.flow}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[var(--muted)]">Khối ngoại (1M)</span>
              <span className="font-semibold text-[var(--success)]">{stock.foreign}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[var(--muted)]">Kỹ thuật</span>
              <span className={stock.technical === 'Trung tính' ? 'font-bold text-[#2563eb]' : 'font-bold text-[var(--success)]'}>{stock.technical}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[var(--muted)]">Sentiment</span>
              <span className="font-bold text-[var(--success)]">{stock.sentiment}</span>
            </div>
          </div>
          <button className="mt-3 w-full rounded-lg bg-[var(--surface-container)] px-3 py-1.5 text-[10px] font-bold text-[var(--success-ink)]">
            {stock.included}
          </button>
        </div>
      ))}
    </div>
  );
}

function PotentialStrategiesTable() {
  return (
    <SurfaceCard className="overflow-hidden">
      <div className="border-b border-[var(--outline-variant)] px-4 py-3">
        <h3 className="text-[15px] font-semibold text-[var(--ink)]">Danh sách các chiến lược</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-[var(--surface-container-low)]">
            <tr className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
              <th className="px-4 py-2.5">Universe</th>
              <th className="px-4 py-2.5">Chiến lược</th>
              <th className="px-4 py-2.5">Tần suất</th>
              <th className="px-4 py-2.5">Ngày tạo</th>
              <th className="px-4 py-2.5 text-right">Lợi nhuận</th>
              <th className="px-4 py-2.5 text-right">YTD</th>
              <th className="px-4 py-2.5 text-right">Sharpe</th>
              <th className="px-4 py-2.5 text-right">Độ biến động</th>
              <th className="px-4 py-2.5">Trạng thái</th>
              <th className="px-4 py-2.5">Hiển thị</th>
              <th className="px-4 py-2.5"></th>
            </tr>
          </thead>
          <tbody>
            {aiStrategies.map((strategy) => (
              <tr key={strategy.id} className="border-t border-[var(--outline-variant)] hover:bg-[var(--surface-container-low)]">
                <td className="px-4 py-2.5">
                  <span className="rounded bg-[var(--surface-container)] px-2 py-1 text-[10px] font-medium text-[var(--ink)]">
                    {strategy.id === '3' ? 'VN100' : '3 sàn vốn...'}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-[12px] font-semibold text-[var(--ink)]">{strategy.name}</td>
                <td className="px-4 py-2.5 text-[11px] text-[var(--ink)]">{strategy.frequency}</td>
                <td className="px-4 py-2.5 font-mono text-[11px] text-[var(--ink)]">21/04/2026</td>
                <td className="px-4 py-2.5 text-right font-mono text-[11px] font-bold text-[var(--success)]">{strategy.roi30d}</td>
                <td className="px-4 py-2.5 text-right font-mono text-[11px] font-bold text-[var(--success)]">{strategy.ytd}</td>
                <td className="px-4 py-2.5 text-right font-mono text-[11px] font-bold text-[var(--ink)]">{strategy.sharpe}</td>
                <td className="px-4 py-2.5 text-right font-mono text-[11px] font-bold text-[var(--danger)]">{strategy.drawdown}</td>
                <td className="px-4 py-2.5">
                  <span className="rounded-full bg-[rgba(145,247,142,0.3)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--success-ink)]">
                    Hoàn tất
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  {strategyVisibility[strategy.id]?.label === 'Private' ? (
                    <span className="inline-flex items-center gap-1 rounded border border-[var(--outline-variant)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                      <span className="text-[11px]">🔒</span>
                      <span>Private</span>
                    </span>
                  ) : (
                    <span className="inline-flex rounded bg-[var(--surface-container)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                      Public
                    </span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-right text-[11px] text-[var(--muted)]">📌 ⤴ ⌫</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SurfaceCard>
  );
}

function FollowingStrategiesTable() {
  return (
    <SurfaceCard className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--outline-variant)] px-4 py-3">
        <h3 className="text-[15px] font-semibold text-[var(--ink)]">Danh sách các chiến lược đang theo dõi</h3>
        <button className="rounded-lg border border-[var(--outline-variant)] p-1.5 text-[12px] text-[var(--muted)]">≣</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--outline-variant)] bg-[var(--surface-container-low)] text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
              <th className="px-4 py-3">Tên chiến lược / tác giả</th>
              <th className="px-4 py-3">Hiệu suất (YTD)</th>
              <th className="px-4 py-3">Vốn ủy thác (AUM)</th>
              <th className="px-4 py-3">Mã CK chính</th>
              <th className="px-4 py-3">Rủi ro</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--outline-variant)]">
            {followingRows.map((row, index) => (
              <tr key={row.name} className="group transition-colors hover:bg-[var(--surface-container-low)]">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className={cx('flex h-8 w-8 items-center justify-center rounded-lg text-[12px]', index === 0 ? 'bg-[rgba(145,247,142,0.45)] text-[var(--success-ink)]' : 'bg-[var(--surface-container)] text-[var(--primary)]')}>
                      ↗
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-[var(--ink)]">{row.name}</p>
                      <p className="text-[10px] text-[var(--muted)]">
                        Bởi: {row.author} {index === 0 ? <span className="ml-1 font-bold text-[var(--success)]">PRO</span> : null}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[var(--success)]">{row.ytd}</span>
                    <div className="mt-1 h-1 w-18 overflow-hidden rounded-full bg-[var(--surface-container)]">
                      <div className="h-full bg-[var(--success)]" style={{ width: index === 0 ? '75%' : '45%' }} />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <p className="font-mono text-[11px] text-[var(--ink)]">{row.aum}</p>
                  <p className="text-[9px] uppercase text-[var(--muted)]">{row.followers}</p>
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex gap-1">
                    {row.tickers.map((ticker) => (
                      <span key={ticker} className="rounded border border-[var(--outline-variant)] bg-[var(--surface-container)] px-2 py-0.5 text-[9px] font-bold text-[var(--ink)]">
                        {ticker}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <span className={cx('rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em]', index === 0 ? 'bg-[rgba(145,247,142,0.35)] text-[var(--success-ink)]' : 'bg-[rgba(250,204,21,0.25)] text-[#a16207]')}>
                    {row.risk}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <button className="rounded-lg bg-[var(--success)] px-3 py-1.5 text-[10px] font-semibold text-white">Sao chép</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center border-t border-[var(--outline-variant)] bg-[var(--surface-card)] px-4 py-2.5">
        <button className="text-[11px] font-semibold text-[var(--success)] hover:underline">Xem thêm 8 chiến lược khác</button>
      </div>
    </SurfaceCard>
  );
}

const strategyCopyStats = [
  ['26.8tr', 'Tổng tiền sao chép', '₫'],
  ['503 ngày', 'Thời gian sao chép', '◷'],
  ['-47,872.0tr', 'Lãi/Lỗ NĐT sao chép', '⇅'],
  ['-8.1%/Tháng', 'Lãi/Lỗ ròng (Tháng)', '%'],
  ['95.3%', 'Tỷ lệ thắng', '↗'],
  ['0.2%', 'Chênh lệch giá khớp', '≈'],
] as const;

const strategyPnlStats = {
  winners: {
    title: 'CP lãi nhiều nhất',
    rows: [
      ['HSG', '+0.8%'],
      ['HPG', '+0.4%'],
      ['FPT', '+0.1%'],
    ],
    sectorTitle: 'Ngành lãi nhiều nhất',
    sectors: [
      ['Tài nguyên Cơ bản', '+1.2%'],
      ['Công nghệ Thông tin', '+0.1%'],
    ],
  },
  losers: {
    title: 'CP lỗ nhiều nhất',
    rows: [
      ['SHB', '-2.3%'],
      ['HDG', '-1.4%'],
    ],
    sectorTitle: 'Ngành lỗ nhiều nhất',
    sectors: [
      ['Ngân hàng', '-2.3%'],
      ['Bất động sản', '-1.4%'],
    ],
  },
} as const;

const socialTopPerformers = [
  ['Elena Rostova', 'Chiến lược VN30', '+24.5%'],
  ['Linh Lê', 'Tăng trưởng Alpha', '+18.2%'],
  ['Trần Văn Nam', 'Cổ tức Bền vững', '+12.8%'],
] as const;

const socialTopCopiers = [
  ['Nguyễn Hoàng Nam', '1.240 Người sao chép', '105 Tỷ VND AUM'],
  ['Phạm Gia Hân', '980 Người sao chép', '86 Tỷ VND AUM'],
  ['Vũ Minh Khang', '745 Người sao chép', '61 Tỷ VND AUM'],
] as const;

const socialTopCopyPnl = [
  ['Quang Huy', '420 Người sao chép', '+15.4%'],
  ['Minh Châu', '315 Người sao chép', '+12.8%'],
  ['Anh Tuấn', '290 Người sao chép', '+10.2%'],
] as const;

function StrategyGrid({
  strategies,
  view,
  strategyTab,
}: {
  strategies: StrategyRecord[];
  view: TopView;
  strategyTab: StrategyTab;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_360px]">
      <div className="grid gap-4 lg:grid-cols-2">
        {strategies.map((strategy) => (
          <SurfaceCard key={strategy.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Avatar label={strategy.avatar} />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                    {strategy.universe} • {strategy.frequency}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-[var(--ink)]">{strategy.name}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {strategy.author} • {strategy.style}
                  </p>
                </div>
              </div>
              <div className="rounded-xl bg-[var(--surface-container-low)] px-3 py-2 text-right">
                <Label>AI score</Label>
                <p className="mt-1 text-2xl font-semibold text-[var(--ink)]">{strategy.aiScore}</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-[var(--ink)]">{strategy.thesis}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {strategy.overviewMetrics.map((metric) => (
                <div key={metric.label} className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-3">
                  <Label>{metric.label}</Label>
                  <p className={cx('mt-2 font-mono text-lg', toneClass(metric.value))}>{metric.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-3 pt-3">
              <div className="flex items-center justify-between">
                <Label>Equity curve</Label>
                <span className="text-sm text-[var(--muted)]">Live</span>
              </div>
              <MiniSparkline tone="green" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {strategy.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--surface-container)] px-3 py-1 text-xs font-semibold text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--outline-variant)] pt-4">
              <Link
                href={buildPlatformHref({ view, strategyTab, strategyDetail: strategy.id })}
                className="rounded-lg border border-[var(--outline-variant)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface-container-low)]"
              >
                View details
              </Link>
              <div className="flex items-center gap-2">
                <Link
                  href={buildPlatformHref({
                    view,
                    strategyTab,
                    strategyDetail: strategy.id,
                    copyStrategy: strategy.id,
                  })}
                  className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                  Copy strategy
                </Link>
                <Link
                  href={buildDetailHref(strategy.id)}
                  className="rounded-lg border border-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary)] hover:bg-[var(--surface-container-low)]"
                >
                  Trader profile
                </Link>
              </div>
            </div>
          </SurfaceCard>
        ))}
      </div>

      <div className="space-y-4">
        <SurfaceCard className="p-5">
          <Label>Context lock</Label>
          <h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">Vận hành theo thị trường Việt Nam</h3>
          <div className="mt-4 space-y-3">
            {strategyUniverseNotes.map((note) => (
              <div key={note} className="rounded-lg bg-[var(--surface-container-low)] px-4 py-3 text-sm text-[var(--ink)]">
                {note}
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-5">
          <Label>Best performance</Label>
          <div className="mt-4 space-y-3">
            {marketLeaders.map((leader, index) => (
              <div
                key={leader.label}
                className="flex items-center justify-between rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-[var(--muted)]">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-[var(--ink)]">{leader.label}</p>
                    <p className="text-xs text-[var(--muted)]">{leader.metric}</p>
                  </div>
                </div>
                <span className="font-mono text-sm text-[var(--success)]">{leader.move}</span>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}

function StrategyView({
  strategyTab,
  strategyMode,
  tradeTab,
  strategyDetail,
}: {
  strategyTab: StrategyTab;
  strategyMode: StrategyMode;
  tradeTab: TradeTab;
  strategyDetail?: string | null;
}) {
  const tabs = [
    {
      id: 'potential',
      label: 'Chiến lược của tôi',
      href: buildPlatformHref({ view: 'strategy', strategyTab: 'potential', strategyMode, strategyDetail }),
    },
    {
      id: 'following',
      label: 'Chiến lược đang theo dõi',
      href: buildPlatformHref({ view: 'strategy', strategyTab: 'following', strategyMode, strategyDetail }),
    },
    {
      id: 'copied',
      label: 'Giao dịch',
      href: buildPlatformHref({ view: 'strategy', strategyTab: 'copied', strategyMode, strategyDetail, tradeTab }),
    },
  ];

  const manageTabs = [
    {
      id: 'manage-strategy',
      label: 'Quản lý chiến lược',
      href: buildPlatformHref({ view: 'strategy', strategyTab: 'potential', strategyMode: 'manage-strategy', strategyDetail }),
    },
    {
      id: 'manage-universe',
      label: 'Quản lý universe',
      href: buildPlatformHref({ view: 'strategy', strategyTab: 'potential', strategyMode: 'manage-universe', strategyDetail }),
    },
  ];

  const tradeTabs = [
    {
      id: 'mine',
      label: 'Của tôi',
      href: buildPlatformHref({ view: 'strategy', strategyTab: 'copied', strategyMode, strategyDetail, tradeTab: 'mine' }),
    },
    {
      id: 'copy',
      label: 'Copy Trade',
      href: buildPlatformHref({ view: 'strategy', strategyTab: 'copied', strategyMode, strategyDetail, tradeTab: 'copy' }),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--outline-variant)]">
        <InlineTabs items={tabs} active={strategyTab} withBorder={false} />
        {strategyTab === 'potential' ? (
          <InlineTabs items={manageTabs} active={strategyMode} withBorder={false} className="ml-auto gap-5" />
        ) : strategyTab === 'copied' ? (
          <InlineTabs items={tradeTabs} active={tradeTab} withBorder={false} className="ml-auto gap-5" />
        ) : null}
      </div>
      {strategyTab === 'potential' ? (
        <>
          <SurfaceCard className="p-4">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-[var(--ink)]">Cổ phiếu tiềm năng</h2>
                <p className="mt-1 text-[12px] text-[var(--muted)]">Theo các chiến lược của bạn</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 xl:flex-row xl:items-center">
              <div className="flex w-full items-center gap-3 xl:max-w-xs">
                <div className="flex flex-1 items-center gap-2.5 rounded-lg border border-[var(--outline-variant)] bg-white px-3 py-2">
                  <span className="text-[12px] text-[var(--muted)]">⌕</span>
                  <span className="text-[12px] text-[var(--muted)]">Tìm kiếm chiến lược...</span>
                </div>
              </div>
              <div className="flex items-center gap-3 xl:ml-auto">
                <div className="flex overflow-hidden rounded-lg border border-[var(--outline-variant)]">
                  <button className="bg-[var(--primary)] px-2.5 py-1.5 text-[12px] text-white">≣</button>
                  <button className="bg-white px-2.5 py-1.5 text-[12px] text-[var(--muted)]">⊞</button>
                </div>
                <button className="rounded-lg bg-[var(--primary)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                  Tạo chiến lược
                </button>
              </div>
            </div>
          </SurfaceCard>
          <PotentialStocksGrid />
          <PotentialStrategiesTable />
        </>
      ) : strategyTab === 'copied' ? (
        <>
          {tradeTab === 'mine' ? (
            <>
              <StrategyOverviewCards cards={selfTradingSummaryCards} />
              <SelfTradingPerformanceSection />
              <SelfTradingTable />
              <SelfTradingAllocationChart />
            </>
          ) : (
            <>
              <StrategyOverviewCards />
              <CopiedPerformanceSection />
              <CopiedStrategyTable />
              <CopiedAllocationChart />
            </>
          )}
        </>
      ) : strategyTab === 'following' ? (
        <FollowingStrategiesTable />
      ) : (
        <>
          <StrategyGrid strategies={aiStrategies} view="strategy" strategyTab={strategyTab} />
          <StrategyIdeasTable strategies={aiStrategies} view="strategy" strategyTab={strategyTab} />
        </>
      )}
    </div>
  );
}

function TraderQuickProfileModal({
  profile,
  closeHref,
  openStrategyDetailHref,
}: {
  profile: TraderProfile;
  closeHref: string;
  openStrategyDetailHref: (strategyId: string) => string;
}) {
  const metrics = traderPopupMetrics[profile.id] ?? traderPopupMetrics['1'];
  const managedStrategies = traderPopupStrategies[profile.id] ?? traderPopupStrategies['1'];
  const tradeHistoryRows = [
    ['FPT', 'Mua', '5,000', '95,000', '10:45 15/05'],
    ['VCB', 'Bán', '2,500', '89,500', '09:15 15/05'],
    ['HPG', 'Mua', '10,000', '28,400', '14:20 14/05'],
  ];
  const pnlStats = {
    winners: [
      ['HSG', '+0.8%'],
      ['HPG', '+0.4%'],
      ['FPT', '+0.3%'],
    ],
    losers: [
      ['SHB', '-0.3%'],
      ['VIC', '-0.5%'],
      ['NVL', '-0.7%'],
    ],
  };

  return (
    <div className="fixed inset-0 z-[64] flex items-center justify-center bg-[rgba(0,1,1,0.16)] p-4 backdrop-blur-sm">
      <div className="flex max-h-[921px] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-card)] shadow-[0_16px_56px_rgba(0,0,0,0.16)]">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--outline-variant)] bg-[var(--surface-bright)] px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--surface-container-highest)] bg-[radial-gradient(circle_at_top,#6b7280,#111827_58%,#0b0f12)] text-[20px] font-semibold text-white">
              {profile.avatar}
            </div>
            <div>
              <h2 className="flex items-center gap-2 text-[18px] font-semibold text-[var(--ink)]">
                <span>{profile.displayName}</span>
                {profile.verified ? <span className="text-[16px] text-[var(--success)]">✓</span> : null}
              </h2>
              <p className="mt-0.5 text-[13px] text-[var(--muted)]">{profile.handle}</p>
              <p className="mt-2 max-w-md text-[13px] text-[var(--muted)]">{profile.bio}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded bg-[var(--success-ink)] px-4 py-2 text-[13px] font-medium text-white hover:opacity-90">Follow</button>
            <Link
              href={closeHref}
              className="rounded p-2 text-[var(--muted)] transition-colors hover:bg-[var(--surface-container)] hover:text-[var(--ink)]"
            >
              ✕
            </Link>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-[var(--surface)] px-6 py-6">
          <div className="grid grid-cols-3 gap-4 rounded-lg border border-[rgba(197,198,202,0.3)] bg-[rgba(239,244,255,0.55)] px-4 py-4 md:grid-cols-5">
              {metrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className={cx(
                    'flex min-w-0 flex-col',
                    index > 0 && 'border-l border-[rgba(197,198,202,0.3)] pl-4',
                  )}
                >
                  <Label>{metric.label}</Label>
                  <p
                    className={cx(
                      'mt-1.5 text-[18px] font-semibold',
                      metric.tone === 'positive'
                        ? 'text-[var(--success)]'
                        : metric.tone === 'negative'
                          ? 'text-[var(--danger)]'
                          : 'text-[var(--ink)]',
                    )}
                  >
                    {metric.value}
                  </p>
                </div>
              ))}
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-[18px] font-semibold text-[var(--ink)]">Performance</h3>
            <div className="relative h-48 overflow-hidden rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-card)] p-4">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(76,175,80,0.1)] to-transparent" />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,80 Q20,60 40,70 T80,30 T100,20" fill="none" stroke="#4CAF50" strokeWidth="2" />
              </svg>
              <div className="relative z-10 flex h-full items-end justify-between text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-[18px] font-semibold text-[var(--ink)]">Managed Strategies</h3>
            <div className="overflow-hidden rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-card)]">
              <table className="min-w-full text-left">
                <thead className="border-b border-[var(--outline-variant)] bg-[var(--surface-container-low)]">
                  <tr className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                    <th className="px-4 py-3">Strategy Name</th>
                    <th className="px-4 py-3">YTD Return</th>
                    <th className="px-4 py-3">Annual Return</th>
                    <th className="px-4 py-3">Monthly Return</th>
                    <th className="px-4 py-3">Sharpe</th>
                    <th className="px-4 py-3">Top Holdings</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {managedStrategies.map((strategy, index) => (
                    <tr
                      key={`${strategy.name}-${index}`}
                      className={cx(
                        'border-t border-[var(--outline-variant)] transition-colors hover:bg-[var(--surface-container-low)]',
                        index === 0 && 'border-t-0',
                      )}
                    >
                      <td className={cx('px-4 py-3 text-[13px] font-medium', strategy.status === 'private' ? 'text-[var(--muted)]' : 'text-[var(--ink)]')}>
                        {strategy.status === 'private' || !strategy.strategyId ? (
                          strategy.name
                        ) : (
                          <Link href={openStrategyDetailHref(strategy.strategyId)} className="hover:text-[var(--primary)] hover:underline">
                            {strategy.name}
                          </Link>
                        )}
                      </td>
                      <td className={cx('px-4 py-3 font-mono text-[13px]', strategy.ytd === '--' ? 'text-[var(--muted)]' : 'text-[var(--success)]')}>
                        {strategy.ytd}
                      </td>
                      <td className="px-4 py-3 font-mono text-[13px] text-[var(--success)]">{strategy.annual}</td>
                      <td className="px-4 py-3 font-mono text-[13px] text-[var(--success)]">{strategy.monthly}</td>
                      <td className={cx('px-4 py-3 font-mono text-[13px]', strategy.sharpe === '--' ? 'text-[var(--muted)]' : 'text-[var(--ink)]')}>
                        {strategy.sharpe}
                      </td>
                      <td className="px-4 py-3 text-[13px] text-[var(--muted)]">
                        {strategy.status === 'private' ? <span className="text-[14px]">🔒</span> : strategy.holdings}
                      </td>
                      <td className="px-4 py-3">
                        {strategy.status === 'private' ? (
                          <span className="inline-flex items-center gap-1 rounded border border-[var(--outline-variant)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                            <span className="text-[11px]">🔒</span>
                            <span>Private</span>
                          </span>
                        ) : strategy.status === 'public-selling' ? (
                          <span className="inline-flex rounded bg-[rgba(37,99,235,0.14)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#1d4ed8]">
                            Public - Selling
                          </span>
                        ) : (
                          <span className="inline-flex rounded bg-[rgba(76,175,80,0.16)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--success-ink)]">
                            Public - Free
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-[18px] font-semibold text-[var(--ink)]">Lịch sử giao dịch</h3>
            <div className="overflow-hidden rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-card)]">
              <table className="min-w-full text-left">
                <thead className="border-b border-[var(--outline-variant)] bg-[var(--surface-container-low)]">
                  <tr className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                    <th className="px-4 py-3">Mã</th>
                    <th className="px-4 py-3">Loại</th>
                    <th className="px-4 py-3">Khối lượng</th>
                    <th className="px-4 py-3">Giá (VND)</th>
                    <th className="px-4 py-3">Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeHistoryRows.map((row, index) => (
                    <tr
                      key={row.join('-')}
                      className={cx('border-t border-[var(--outline-variant)] transition-colors hover:bg-[var(--surface-container-low)]', index === 0 && 'border-t-0')}
                    >
                      <td className="px-4 py-3 text-[13px] font-semibold text-[var(--ink)]">{row[0]}</td>
                      <td className={cx('px-4 py-3 text-[13px]', row[1] === 'Mua' ? 'text-[var(--success)]' : 'text-[var(--danger)]')}>{row[1]}</td>
                      <td className="px-4 py-3 font-mono text-[13px] text-[var(--ink)]">{row[2]}</td>
                      <td className="px-4 py-3 font-mono text-[13px] text-[var(--ink)]">{row[3]}</td>
                      <td className="px-4 py-3 text-[13px] text-[var(--muted)]">{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-card)] p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[14px] font-bold uppercase tracking-[0.06em] text-[var(--ink)]">Thống kê lãi lỗ</h3>
              <button className="rounded border border-[var(--outline-variant)] px-2 py-1 text-[12px] text-[var(--ink)]">Tháng 04/2026 ▾</button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 rounded bg-[var(--surface-container-low)] px-2 py-1 text-[12px] font-semibold text-[var(--ink)]">CP lãi nhiều nhất</p>
                <div className="space-y-1">
                  {pnlStats.winners.map((item) => (
                    <div key={item[0]} className="flex items-center justify-between text-[13px]">
                      <span className="font-semibold text-[var(--ink)]">{item[0]}</span>
                      <span className="font-mono text-[var(--success)]">{item[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 rounded bg-[var(--surface-container-low)] px-2 py-1 text-[12px] font-semibold text-[var(--ink)]">CP lỗ nhiều nhất</p>
                <div className="space-y-1">
                  {pnlStats.losers.map((item) => (
                    <div key={item[0]} className="flex items-center justify-between text-[13px]">
                      <span className="font-semibold text-[var(--ink)]">{item[0]}</span>
                      <span className="font-mono text-[var(--danger)]">{item[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialNewsView() {
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.72fr)_320px]">
      <div className="space-y-4">
        {socialPosts.map((post, index) => {
          const strategy = getStrategyById(post.strategyId);
          return (
            <SurfaceCard key={post.id} className="p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Link
                    href={buildPlatformHref({ view: 'social', feedTab: 'news', traderPopup: post.strategyId })}
                    className="flex items-center gap-3 rounded-lg transition-colors hover:bg-[var(--surface-container-low)]"
                  >
                    <div className={cx('flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-semibold', index === 0 ? 'bg-[rgba(189,240,148,0.55)] text-[var(--success-ink)]' : 'bg-[var(--surface-container)] text-[var(--primary)]')}>
                      {post.avatar}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[13px] font-semibold text-[var(--ink)]">{post.author}</h3>
                        <span className="rounded-full bg-[var(--surface-container)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--success-ink)]">
                          {post.role}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-[var(--muted)]">
                        {post.handle} • {post.time}
                      </p>
                    </div>
                  </Link>
                </div>
                <span className="text-[18px] text-[var(--muted)]">⋯</span>
              </div>

              <p className="mt-4 text-[13px] leading-7 text-[var(--ink)]">{post.content}</p>

              <div className="mt-4 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[12px] font-semibold text-[var(--ink)]">{strategy.name}</p>
                    <Link
                      href={buildPlatformHref({ view: 'social', feedTab: 'news', traderPopup: post.strategyId })}
                      className="mt-1 inline-block text-[11px] text-[var(--muted)] hover:text-[var(--ink)]"
                    >
                      {strategy.author}
                    </Link>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[14px] font-semibold text-[var(--success)]">{post.roi}</p>
                    <p className="text-[10px] text-[var(--muted)]">ROI 30D</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">Drawdown</p>
                    <p className="mt-1 font-mono text-[12px] font-semibold text-[var(--danger)]">{post.drawdown}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">Copiers</p>
                    <p className="mt-1 font-mono text-[12px] font-semibold text-[var(--ink)]">{post.copiers}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">Universe</p>
                    <p className="mt-1 text-[12px] font-semibold text-[var(--ink)]">{strategy.universe}</p>
                  </div>
                </div>
                <div className="mt-4 border-t border-[var(--outline-variant)] pt-3">
                  <Link
                    href={buildPlatformHref({ view: 'social', feedTab: 'news', strategyDetail: post.strategyId })}
                    className="text-[12px] font-bold text-[var(--primary)] hover:underline"
                  >
                    Xem chi tiết phân tích AI
                  </Link>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[12px] text-[var(--muted)]">
                <div className="flex gap-5">
                  <span>Like {post.likes}</span>
                  <span>Comment {post.comments}</span>
                  <span>Share {post.reposts}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={buildDetailHref(post.strategyId)}
                    className="rounded-lg border border-[var(--outline-variant)] px-3 py-1.5 text-[11px] font-medium text-[var(--ink)] hover:bg-[var(--surface-container-low)]"
                  >
                    Trader
                  </Link>
                  <Link
                    href={buildPlatformHref({
                      view: 'social',
                      feedTab: 'news',
                      strategyDetail: post.strategyId,
                      copyStrategy: post.strategyId,
                    })}
                    className="rounded-lg bg-[var(--primary)] px-3 py-1.5 text-[11px] font-semibold text-white hover:opacity-90"
                  >
                    Copy
                  </Link>
                </div>
              </div>
            </SurfaceCard>
          );
        })}
      </div>

      <div className="space-y-4">
        <SurfaceCard className="p-4">
          <div className="border-b border-[var(--outline-variant)] px-0 pb-3">
            <h3 className="text-[14px] font-semibold text-[var(--ink)]">Hiệu suất Tốt nhất</h3>
          </div>
          <div className="mt-2 space-y-1">
            {socialTopPerformers.map(([name, strategy, value], index) => (
              <div key={name} className="flex cursor-pointer items-center justify-between rounded px-2 py-2 transition-colors hover:bg-[var(--surface-container-high)]">
                <div className="flex items-center gap-3">
                  <span className="w-4 text-center text-[12px] font-bold text-[var(--primary)]">{index + 1}</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-container)] text-[10px] font-semibold text-[var(--ink)]">
                    {name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-[var(--ink)]">{name}</div>
                    <div className="text-[10px] uppercase text-[var(--muted)]">{strategy}</div>
                  </div>
                </div>
                <span className="font-mono text-[11px] font-bold text-[var(--success)]">{value}</span>
              </div>
            ))}
            <button className="w-full py-2 text-center text-[12px] font-semibold text-[var(--primary)] hover:underline">Xem tất cả chuyên gia</button>
          </div>
        </SurfaceCard>

        <SurfaceCard className="overflow-hidden p-4">
          <div className="border-b border-[var(--outline-variant)] px-0 pb-3">
            <h3 className="text-[14px] font-semibold text-[var(--ink)]">Sao chép Giao dịch</h3>
          </div>
          <div className="mt-2 space-y-1">
            {socialTopCopiers.map(([name, subtitle, value], index) => (
              <div key={name} className="flex cursor-pointer items-center justify-between rounded px-2 py-2 transition-colors hover:bg-[var(--surface-container-high)]">
                <div className="flex items-center gap-3">
                  <span className="w-4 text-center text-[12px] font-bold text-[var(--primary)]">{index + 1}</span>
                  <div>
                    <div className="text-[12px] font-bold text-[var(--ink)]">{name}</div>
                    <div className="text-[10px] text-[var(--muted)]">{subtitle}</div>
                  </div>
                </div>
                <span className="font-mono text-[11px] font-bold text-[var(--primary)]">{value}</span>
              </div>
            ))}
            <button className="w-full py-2 text-center text-[12px] font-semibold text-[var(--primary)] hover:underline">Chiến lược</button>
          </div>
        </SurfaceCard>

        <SurfaceCard className="overflow-hidden p-4">
          <div className="border-b border-[var(--outline-variant)] px-0 pb-3">
            <h3 className="text-[14px] font-semibold text-[var(--ink)]">PNL Trung bình Sao chép</h3>
          </div>
          <div className="mt-2 space-y-1">
            {socialTopCopyPnl.map(([name, subtitle, value], index) => (
              <div key={name} className="flex cursor-pointer items-center justify-between rounded px-2 py-2 transition-colors hover:bg-[var(--surface-container-high)]">
                <div className="flex items-center gap-3">
                  <span className="w-4 text-center text-[12px] font-bold text-[var(--primary)]">{index + 1}</span>
                  <div>
                    <div className="text-[12px] font-bold text-[var(--ink)]">{name}</div>
                    <div className="text-[10px] text-[var(--muted)]">{subtitle}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[rgba(189,240,148,0.45)] px-1.5 py-0.5 text-[9px] font-bold text-[var(--success-ink)]">PNL</span>
                  <span className="font-mono text-[11px] font-bold text-[var(--success)]">{value}</span>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-center text-[12px] font-semibold text-[var(--primary)] hover:underline">Chiến lược</button>
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}

function SocialStrategiesView() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {aiStrategies.concat(aiStrategies).slice(0, 6).map((strategy, index) => {
        const negative = index === 1 || index === 2;
        const full = index === 4;
        const copied = index === 3;
        const sharpeNumeric = Number.parseFloat(strategy.sharpe);
        const isPay = sharpeNumeric >= 2 && !full;
        const seats = full ? '500/500' : index === 1 ? '118/250' : '430/500';
        const priceLabel = isPay ? `${Math.round(sharpeNumeric * 1_000_000).toLocaleString('vi-VN')} ₫` : 'Free access';
        const payHint = isPay ? `Sharpe ${strategy.sharpe} × 1,000,000 VND` : 'Copy available instantly';

        return (
          <SurfaceCard
            key={`${strategy.id}-${index}`}
            className={cx(
              'min-h-[400px] overflow-hidden p-4',
              !isPay && 'border-[rgba(76,175,80,0.35)] shadow-[0_0_0_1px_rgba(76,175,80,0.18)]',
              isPay && 'border-[rgba(245,158,11,0.36)] shadow-[0_0_0_1px_rgba(245,158,11,0.16)]',
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <Link
                href={buildPlatformHref({
                  view: 'social',
                  feedTab: 'strategies',
                  strategyDetail: strategy.id,
                })}
                className="flex min-w-0 items-start gap-3 rounded-lg transition-colors hover:bg-[var(--surface-container-low)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-[11px] font-semibold text-white">
                  {strategy.avatar}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-[14px] font-semibold leading-5 text-[var(--ink)]">{strategy.name.replace('_', ' ')}</h3>
                  <p className="text-[12px] text-[var(--muted)]">{strategy.author}</p>
                  <p className={cx('mt-0.5 font-mono text-[11px]', full ? 'text-[#ef4444]' : 'text-[var(--ink)]')}>⌘ {seats}</p>
                </div>
              </Link>
              <div className="flex items-center gap-2">
                <span
                  className={cx(
                    'rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.06em]',
                    isPay
                      ? 'border border-[rgba(245,211,107,0.9)] bg-[rgba(255,247,214,0.85)] text-[#8a5a00]'
                      : 'border border-[rgba(183,239,182,0.95)] bg-[rgba(233,251,233,0.9)] text-[#087b27]',
                  )}
                >
                  {isPay ? 'Public · Pay' : 'Public · Free'}
                </span>
                <span className={cx('text-xl', index >= 4 ? 'text-[#facc15]' : 'text-[var(--muted)]')}>☆</span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-[1fr_104px] gap-3">
              <div>
                <Label>30D ROI</Label>
                <p className={cx('mt-1.5 text-[23px] font-semibold tracking-[-0.03em]', negative ? 'text-[#ef4444]' : 'text-[var(--success)]')}>
                  {negative ? '-95.22%' : '+1,895.22%'}
                </p>
              </div>
              <div className={cx('rounded-md p-2.5', negative ? 'bg-[rgba(244,67,54,0.12)]' : 'bg-[rgba(76,175,80,0.12)]')}>
                <MiniSparkline tone={negative ? 'blue' : 'green'} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <Label>30D PNL</Label>
                <p className={cx('mt-1 font-mono text-[13px] font-semibold', negative ? 'text-[#ef4444]' : 'text-[var(--success)]')}>{negative ? '-2.140.000 đ' : '+47.380.500 đ'}</p>
              </div>
              <div>
                <Label>Sharpe</Label>
                <p className="mt-1 font-mono text-[13px] font-semibold text-[var(--ink)]">{strategy.sharpe}</p>
              </div>
            </div>

            <div className={cx('mt-4 rounded-xl border p-3', isPay ? 'border-[rgba(245,211,107,0.85)] bg-[linear-gradient(135deg,#fffaf0,#fff2c7)]' : 'border-[rgba(215,227,245,0.95)] bg-[linear-gradient(135deg,#f8fbff,#eef5ff)]')}>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[16px] font-semibold text-[var(--ink)]">{priceLabel}</p>
                  <p className="mt-0.5 text-[11px] text-[var(--muted)]">{isPay ? 'Truy cập trả phí' : 'Truy cập miễn phí'}</p>
                  {isPay ? (
                    <p className="mt-1 text-[10px] text-[#7a5a00]">
                      * Giá = Sharpe × 1.000.000 VND ({payHint.replace('Sharpe ', '')})
                    </p>
                  ) : null}
                </div>
                <span className="text-[11px] font-semibold text-[var(--muted)]">{isPay ? 'Trả phí' : '0 ₫'}</span>
              </div>
            </div>

            {isPay ? (
              <div className="mt-2 rounded-xl border border-dashed border-[rgba(198,177,106,0.95)] bg-[rgba(255,250,225,0.96)] px-3 py-1.5 text-[11px] font-medium text-[#6e5300]">
                🔒 Mua gói này để mở quyền sao chép và toàn bộ lịch sử tín hiệu.
              </div>
            ) : null}

            <div className="mt-auto flex items-end justify-between gap-4 border-t border-[rgba(237,240,245,0.95)] pt-4">
              <div>
                <Label>AUM</Label>
                <p className={cx('mt-1 font-mono text-[13px] font-semibold', isPay ? 'text-[#1f2937]' : 'text-[var(--ink)]')}>9.449.762.500 đ</p>
              </div>
              <Link
                href={buildPlatformHref({
                  view: 'social',
                  feedTab: 'strategies',
                  copyStrategy: !copied && !full ? strategy.id : null,
                })}
                className={cx(
                  'rounded-md px-5 py-2 text-[13px] font-medium',
                  copied
                    ? 'bg-[#e2e8f0] text-[#0f172a]'
                    : full
                      ? 'bg-[#fee2e2] text-[#991b1b]'
                      : isPay
                        ? 'bg-[#2563eb] text-white'
                        : 'bg-[#facc15] text-[#111827]',
                )}
              >
                {copied ? 'Đã sao chép' : full ? 'Đã đầy' : isPay ? 'Mua để copy' : 'Copy'}
              </Link>
            </div>
          </SurfaceCard>
        );
      })}
    </div>
  );
}

function SocialView({ feedTab }: { feedTab: SocialFeedTab }) {
  const tabs = [
    {
      id: 'news',
      label: 'News',
      href: buildPlatformHref({ view: 'social', feedTab: 'news' }),
    },
    {
      id: 'strategies',
      label: 'Strategies',
      href: buildPlatformHref({ view: 'social', feedTab: 'strategies' }),
    },
  ];

  return (
    <div className="space-y-6">
      <InlineTabs items={tabs} active={feedTab} />
      {feedTab === 'strategies' ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-md bg-[var(--surface-container-low)] px-3 py-1.5 font-medium text-[var(--ink)]">30D</span>
            <span className="text-[var(--muted)]">ROI</span>
            <span className="rounded-md bg-[var(--surface-container)] px-3 py-1.5 font-medium text-[var(--ink)]">PNL</span>
            <span className="text-[var(--muted)]">AUM</span>
            <span className="text-[var(--muted)]">Copy Traders</span>
          </div>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative flex-1 xl:max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-[var(--muted)]">⌕</span>
              <div className="w-full rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-10 py-2 text-[12px] text-[var(--muted)]">
                Search by trader name...
              </div>
            </div>
            <div className="flex gap-3 xl:ml-auto">
              <button className="flex items-center gap-2 rounded-full border border-[var(--outline-variant)] px-4 py-2 text-[12px] font-medium text-[var(--muted)] hover:bg-[var(--surface-container)]">
                <span>★</span>
                <span>Favorites</span>
              </button>
              <Link
                href={buildPlatformHref({ view: 'social', feedTab: 'strategies', filter: true })}
                className="flex items-center gap-2 rounded-full border border-[var(--outline-variant)] px-4 py-2 text-[12px] font-medium text-[var(--muted)] hover:bg-[var(--surface-container)]"
              >
                <span>⚲</span>
                <span>Filter</span>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      {feedTab === 'news' ? <SocialNewsView /> : <SocialStrategiesView />}
    </div>
  );
}

function ProfileHeader() {
  return (
    <section className="grid gap-4 xl:grid-cols-12">
      <SurfaceCard className="xl:col-span-8 p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="relative">
            <div className="h-32 w-32 rounded-xl bg-[radial-gradient(circle_at_top,#5b6368,#111827_58%,#0b0f12)]" />
            <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-[12px] text-white">
              ✓
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--ink)]">{userProfile.name}</h2>
                <p className="mt-1 text-[14px] text-[var(--muted)]">{userProfile.handle}</p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-[var(--primary)] px-6 py-2 text-[12px] font-semibold text-[var(--primary)]">
                  Edit Profile
                </button>
                <button className="rounded-lg bg-[var(--surface-container)] px-3 py-2 text-[14px] font-medium text-[var(--muted)]">
                  ⤴
                </button>
              </div>
            </div>
            <p className="mt-4 max-w-3xl text-[14px] leading-7 text-[var(--ink)]">{userProfile.bio}</p>
            <div className="mt-6 flex flex-wrap gap-8">
              <div>
                <Label>Followers</Label>
                <p className="mt-1.5 text-[18px] font-semibold text-[var(--ink)]">{userProfile.followers}</p>
              </div>
              <div>
                <Label>Following</Label>
                <p className="mt-1.5 text-[18px] font-semibold text-[var(--ink)]">{userProfile.following}</p>
              </div>
              <div>
                <Label>Win Rate</Label>
                <p className="mt-1.5 text-[18px] font-semibold text-[var(--success)]">{userProfile.winRate}</p>
              </div>
            </div>
          </div>
        </div>
      </SurfaceCard>

      <div className="grid gap-4 xl:col-span-4">
        <SurfaceCard className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(145,247,142,0.7)] text-[18px] text-[var(--success-ink)]">
            ▣
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">Net Liquid Value</p>
            <p className="mt-1.5 font-mono text-[17px] font-semibold text-[var(--ink)]">{userProfile.netLiquidValue}</p>
          </div>
        </SurfaceCard>
        <SurfaceCard className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-container)] text-[18px] text-[#2563eb]">
            ↗
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">Monthly P&L</p>
            <p className="mt-1.5 font-mono text-[17px] font-semibold text-[var(--success)]">{userProfile.monthlyPnl}</p>
          </div>
        </SurfaceCard>
      </div>
    </section>
  );
}

function ProfilePostView() {
  return (
    <div className="space-y-4">
      {userProfile.posts.map((post, index) => (
        <SurfaceCard key={post.id} className="p-5">
          <div className="flex gap-4 items-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-container)] text-[11px] font-semibold text-[var(--ink)]">
              AC
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-[var(--ink)]">{userProfile.name}</span>
                  <span className="text-[11px] text-[var(--muted)]">{userProfile.handle} • {index === 0 ? '2h' : '5h'}</span>
                </div>
                <span className="text-[18px] text-[var(--muted)]">⋯</span>
              </div>
              <p className="mt-4 text-[13px] leading-7 text-[var(--ink)]">{post.body}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-5 text-[12px] text-[var(--muted)]">
                  <button>♡ 156</button>
                  <button>◻ 24</button>
                  <button>⇄ 12</button>
                </div>
                <button className="text-[12px] text-[var(--muted)]">⤴</button>
              </div>
            </div>
          </div>
        </SurfaceCard>
      ))}
    </div>
  );
}

function ProfilePortfolioView({
  buyerStats,
  followingStrategies,
  statusSwitch,
  statusValue,
  statusApplied,
}: {
  buyerStats?: string | null;
  followingStrategies?: string | null;
  statusSwitch?: string | null;
  statusValue?: string | null;
  statusApplied?: string | null;
}) {
  const [appliedId, appliedStatusRaw] = (statusApplied ?? '').split(':');

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
      <SurfaceCard className="xl:col-span-8 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[15px] font-semibold text-[var(--ink)]">Equity Growth</h3>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 rounded-lg bg-[var(--surface-container)] p-1">
              {['1W', '1M', '3M', 'ALL'].map((label, index) => (
                <button key={label} className={cx('rounded-md px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em]', index === 0 ? 'bg-white text-[var(--ink)] shadow-sm' : 'text-[var(--muted)]')}>
                  {label}
                </button>
              ))}
            </div>
            <div className="flex gap-1 rounded-lg border border-[var(--outline-variant)] bg-white p-1">
              {['Chiến lược của tôi', 'Chiến lược copy'].map((label, index) => (
                <button
                  key={label}
                  className={cx(
                    'rounded-md px-3 py-1 text-[10px] font-bold',
                    index === 0 ? 'bg-[var(--primary)] text-white' : 'text-[var(--muted)] hover:bg-[var(--surface-container-low)]',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="h-64 rounded-lg bg-[var(--surface-container-low)] p-3">
          <div className="relative flex h-full items-end overflow-hidden rounded-lg">
            <svg className="h-full w-full" viewBox="0 0 800 200" preserveAspectRatio="none">
              <path d="M0,180 Q100,160 200,170 T400,120 T600,80 T800,40" fill="none" stroke="#006e1c" strokeWidth="4" />
              <path d="M0,180 Q100,160 200,170 T400,120 T600,80 T800,40 V200 H0 Z" fill="url(#portfolio-gradient)" opacity="0.12" />
              <path d="M0,186 Q100,175 200,178 T400,148 T600,118 T800,95" fill="none" stroke="#2563eb" strokeWidth="2.8" strokeDasharray="8 6" />
              <defs>
                <linearGradient id="portfolio-gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#006e1c" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </SurfaceCard>

      <SurfaceCard className="xl:col-span-4 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-semibold text-[var(--ink)]">Copied Strategies</h3>
          <Link
            href={buildPlatformHref({ view: 'profile', profileTab: 'portfolio', followingStrategies: 'open', buyerStats })}
            className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--primary)]"
          >
            View All
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {userProfile.followingStrategies.map((strategy) => (
            <div key={strategy.id} className="group cursor-pointer rounded-xl border border-[var(--outline-variant)] p-4 transition hover:bg-[var(--surface-container-low)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-[12px] font-bold text-[var(--ink)] transition-colors group-hover:text-[var(--primary)]">{strategy.name}</h4>
                  <span className="text-[10px] uppercase text-[var(--muted)]">AUM: {strategy.allocation}</span>
                </div>
                <span className="font-mono text-[12px] font-bold text-[var(--success)]">{strategy.pnl}</span>
              </div>
              <div className="mt-3 h-8 w-full overflow-hidden rounded-md bg-[rgba(15,23,42,0.04)]">
                <svg className="h-4 w-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                  <path d="M0,35 L20,30 L40,32 L60,10 L80,25 L100,5 L120,20 L140,8 L160,15 L180,5 L200,10" fill="none" stroke="#006e1c" strokeWidth="2" />
                </svg>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] uppercase text-[var(--muted)]">AUM: {strategy.allocation}</span>
                <Link
                  href={buildPlatformHref({ view: 'strategy', strategyTab: 'copied' })}
                  className="text-[10px] font-semibold text-[var(--primary)]"
                >
                  More Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard className="xl:col-span-12 p-5">
        <h3 className="text-[15px] font-semibold text-[var(--ink)]">Recent Activity</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[var(--surface-container-low)]">
                {['Type', 'Asset', 'Strategy', 'Amount', 'Result', 'Date'].map((label) => (
                  <th key={label} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userProfile.recentActivities.map((row) => (
                <tr key={row.join('-')} className="border-t border-[var(--outline-variant)]">
                  <td className={cx('px-4 py-3 text-[12px] font-bold', row[0] === 'SELL' ? 'text-[var(--danger)]' : 'text-[var(--success)]')}>{row[0]}</td>
                  <td className="px-4 py-3 text-[12px] font-semibold text-[var(--ink)]">{row[1]}</td>
                  <td className="px-4 py-3 text-[12px] italic text-[var(--muted)]">{row[2]}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--ink)]">{row[3]}</td>
                  <td className={cx('px-4 py-3 font-mono text-[12px] font-semibold', row[4].startsWith('-') ? 'text-[var(--danger)]' : row[4] === 'PENDING' ? 'text-[var(--success)]' : 'text-[var(--success)]')}>{row[4]}</td>
                  <td className="px-4 py-3 text-right text-[11px] text-[var(--muted)]">{row[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SurfaceCard>

      <SurfaceCard className="xl:col-span-12 p-5">
        <h3 className="mb-4 text-[15px] font-semibold text-[var(--ink)]">Danh sách các chiến lược</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-[var(--outline-variant)] text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                {['Universe', 'Chiến lược', 'Tần suất', 'Lợi nhuận', 'YTD', 'Sharpe', 'Độ biến động', 'Credit', 'Trạng thái', ''].map((label) => (
                  <th key={label} className={cx('px-4 py-4', label === 'Trạng thái' || label === '' ? 'text-center' : label === 'Lợi nhuận' || label === 'YTD' || label === 'Sharpe' || label === 'Độ biến động' || label === 'Credit' ? 'text-right' : 'text-left')}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userProfile.activeStrategies.map((strategy) => {
                const defaultStatus = mapDisplayStatusToVisibilityStatus(strategy.status);
                const appliedStatus =
                  appliedId === strategy.id && (appliedStatusRaw === 'public_paid' || appliedStatusRaw === 'public_free' || appliedStatusRaw === 'private')
                    ? appliedStatusRaw
                    : defaultStatus;
                const displayStatus = mapVisibilityStatusToDisplay(appliedStatus);
                const isSelling = appliedStatus === 'public_paid';
                const rowHref = isSelling
                  ? buildPlatformHref({ view: 'profile', profileTab: 'portfolio', buyerStats: strategy.id, followingStrategies })
                  : null;
                const statusSwitchHref = buildPlatformHref({
                  view: 'profile',
                  profileTab: 'portfolio',
                  buyerStats,
                  followingStrategies,
                  statusSwitch: strategy.id,
                  statusValue: appliedStatus,
                  statusApplied,
                });

                return (
                  <tr key={strategy.id} className="group border-t border-[var(--outline-variant)] hover:bg-[var(--surface-container-low)]">
                    <td className="px-4 py-4">
                      <span className="rounded bg-[var(--surface-container)] px-2 py-1 text-[11px] font-bold text-[var(--ink)]">{strategy.universe}</span>
                    </td>
                    <td className="px-4 py-4 font-bold text-[var(--ink)]">
                      {rowHref ? (
                        <Link href={rowHref} className="hover:text-[var(--primary)]">
                          {strategy.name}
                        </Link>
                      ) : (
                        strategy.name
                      )}
                    </td>
                    <td className="px-4 py-4 text-[12px] text-[var(--ink)]">{strategy.frequency}</td>
                    <td className={cx('px-4 py-4 text-right text-[12px] font-bold', toneClass(strategy.profit))}>{strategy.profit}</td>
                    <td className={cx('px-4 py-4 text-right text-[12px] font-bold', toneClass(strategy.ytd))}>{strategy.ytd}</td>
                    <td className="px-4 py-4 text-right text-[12px] font-bold text-[var(--ink)]">{strategy.sharpe}</td>
                    <td className="px-4 py-4 text-right text-[12px] font-bold text-[var(--danger)]">{strategy.volatility}</td>
                    <td className="px-4 py-4 text-right font-mono text-[12px] font-bold text-[var(--ink)]">{strategy.credit}</td>
                    <td className="px-4 py-4 text-center">
                      <Link
                        href={statusSwitchHref}
                        className={cx(
                          'inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase',
                          appliedStatus === 'public_paid'
                            ? 'bg-orange-100 text-orange-800'
                            : appliedStatus === 'private'
                              ? 'border border-[var(--outline-variant)] bg-white text-[var(--muted)]'
                            : 'bg-[rgba(145,247,142,0.55)] text-[var(--success-ink)]',
                        )}
                      >
                        {displayStatus}
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <span className="text-[18px] text-[var(--muted)]">📌</span>
                        <span className="text-[18px] text-[var(--muted)]">⤴</span>
                        <span className="text-[18px] text-[var(--danger)]">⌫</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SurfaceCard>
    </div>
  );
}

function ProfileView({
  profileTab,
  buyerStats,
  followingStrategies,
  statusSwitch,
  statusValue,
  statusApplied,
}: {
  profileTab: ProfileTab;
  buyerStats?: string | null;
  followingStrategies?: string | null;
  statusSwitch?: string | null;
  statusValue?: string | null;
  statusApplied?: string | null;
}) {
  const tabs = [
    {
      id: 'post',
      label: 'Post',
      href: buildPlatformHref({ view: 'profile', profileTab: 'post' }),
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      href: buildPlatformHref({ view: 'profile', profileTab: 'portfolio' }),
    },
  ];

  return (
    <div className="space-y-6">
      <ProfileHeader />
      <InlineTabs items={tabs} active={profileTab} />
      {profileTab === 'post' ? (
        <ProfilePostView />
      ) : (
        <ProfilePortfolioView
          buyerStats={buyerStats}
          followingStrategies={followingStrategies}
          statusSwitch={statusSwitch}
          statusValue={statusValue}
          statusApplied={statusApplied}
        />
      )}
    </div>
  );
}

function HeatmapCell({ value }: { value: string }) {
  if (value === '-') {
    return <td className="px-2 py-2 text-center text-xs text-[var(--muted)]">-</td>;
  }

  const numeric = Number.parseFloat(value.replace('%', ''));
  const positive = numeric >= 0;
  const strength = Math.min(Math.abs(numeric) / 8, 1);
  const background = positive
    ? `rgba(76, 175, 80, ${0.12 + strength * 0.24})`
    : `rgba(244, 67, 54, ${0.12 + strength * 0.24})`;

  return (
    <td className="px-2 py-2 text-center text-xs font-semibold" style={{ background, color: positive ? '#166534' : '#b91c1c' }}>
      {value}
    </td>
  );
}

function StrategyDetailModal({
  strategy,
  closeHref,
  detailBaseHref,
  traderProfileHref,
  copyHref,
}: {
  strategy: StrategyRecord;
  closeHref: string;
  detailBaseHref: string;
  traderProfileHref: string;
  copyHref: string;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-[rgba(11,28,48,0.45)] p-4 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-h-[900px] w-full max-w-[1460px] flex-col overflow-hidden rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-card)] shadow-2xl">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--outline-variant)] bg-white px-5">
          <div className="flex min-w-0 items-center gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-[17px] font-semibold text-[var(--ink)]">Chi tiết chiến lược: &quot;{strategy.name}&quot;</h3>
              <p className="mt-0.5 text-[11px] text-[var(--muted)]">
                {strategy.author} • {strategy.status} • {strategy.universe}
              </p>
            </div>
            <span className="rounded-full bg-[var(--surface-container)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--success-ink)]">
              {strategy.status}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={detailBaseHref}
              className="rounded-lg border border-[var(--outline-variant)] px-3 py-1.5 text-[12px] font-semibold text-[var(--ink)] hover:bg-[var(--surface-container-low)]"
            >
              Theo dõi
            </Link>
            <Link
              href={copyHref}
              className="rounded-lg bg-[#2563eb] px-4 py-1.5 text-[12px] font-semibold text-white hover:bg-[#1d4ed8]"
            >
              Sao chép chiến lược
            </Link>
            <Link href={closeHref} className="rounded-full p-2 text-[18px] text-[var(--muted)] hover:bg-[var(--surface-container-low)]">
              ×
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-50">
          <div className="flex min-h-full flex-col bg-white lg:flex-row">
            <section className="w-full space-y-4 border-r border-[var(--outline-variant)] p-4 lg:w-[65%]">
              <SurfaceCard className="p-4">
                <Label>Lợi nhuận tích luỹ</Label>
                <div className="mt-4 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-4">
                  <div className="relative h-56 overflow-hidden rounded-lg border border-[var(--outline-variant)] bg-[linear-gradient(180deg,rgba(219,234,254,0.35),rgba(255,255,255,0)),linear-gradient(90deg,rgba(197,198,202,0.5)_1px,transparent_1px),linear-gradient(180deg,rgba(197,198,202,0.45)_1px,transparent_1px)] bg-[size:auto,20%_100%,100%_25%]">
                    <div className="absolute inset-x-4 top-3 flex justify-between text-[10px] text-[var(--muted)]">
                      <span>60%</span>
                      <span>40%</span>
                      <span>20%</span>
                      <span>0%</span>
                    </div>
                    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,76 Q12,70 24,58 T48,34 T72,22 T100,9" fill="none" stroke="#2563eb" strokeWidth="2.5" />
                      <path d="M0,87 Q12,82 24,70 T48,48 T72,36 T100,24" fill="none" stroke="#4caf50" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div className="mt-2.5 flex justify-between text-[11px] text-[var(--muted)]">
                    <span>Tháng 1</span>
                    <span>Tháng 3</span>
                    <span>Tháng 6</span>
                    <span>Tháng 9</span>
                    <span>Tháng 12</span>
                  </div>
                  <div className="mt-3 flex justify-center gap-5 text-[11px] text-[var(--muted)]">
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-5 rounded-full bg-[#2563eb]" />
                      Chiến lược
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-5 rounded-full bg-[#4caf50]" />
                      VN-Index
                    </span>
                  </div>
                </div>
              </SurfaceCard>

              <SurfaceCard className="overflow-hidden p-4">
                <Label>Lợi nhuận theo tháng (%)</Label>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[var(--outline-variant)] text-[var(--muted)]">
                        <th className="px-2 py-3 text-left font-semibold">Năm</th>
                        {['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'YTD'].map((label) => (
                          <th key={label} className="px-2 py-3 font-semibold">
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {strategy.monthlyReturns.map((row) => (
                        <tr key={row.year} className="border-b border-[var(--outline-variant)]">
                          <td className="px-2 py-3 font-semibold text-[var(--ink)]">{row.year}</td>
                          {row.months.map((value, index) => (
                            <HeatmapCell key={`${row.year}-${index}`} value={value} />
                          ))}
                          <td className="px-2 py-3 text-center font-bold text-[var(--success)]">{row.ytd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-4">
                <Label>Phân tích biến động & VaR</Label>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <div className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-3">
                    <p className="text-xs text-[var(--muted)]">Độ lệch chuẩn (Annual)</p>
                    <p className="mt-1.5 text-[16px] font-semibold text-[var(--ink)]">12.4%</p>
                  </div>
                  <div className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-3">
                    <p className="text-xs text-[var(--muted)]">Max Drawdown</p>
                    <p className="mt-1.5 text-[16px] font-semibold text-[var(--danger)]">-15.2%</p>
                  </div>
                  <div className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-3">
                    <p className="text-xs text-[var(--muted)]">VaR (95%, 1 Day)</p>
                    <p className="mt-1.5 text-[16px] font-semibold text-amber-600">-2.1%</p>
                  </div>
                </div>
                <div className="mt-4 h-40 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-3">
                  <div className="relative h-full overflow-hidden rounded-lg border border-[var(--outline-variant)] bg-white">
                    <div className="absolute inset-x-0 top-1/4 border-t border-dashed border-[rgba(244,67,54,0.35)]" />
                    <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-[var(--outline-variant)]" />
                    <div className="absolute inset-x-0 top-3/4 border-t border-dashed border-[var(--outline-variant)]" />
                    {[10, 30, 60, 90, 100, 80, 50, 20, 8].map((height, index) => (
                      <div
                        key={height}
                        className="absolute bottom-0 w-[6%] rounded-t bg-[#60a5fa]"
                        style={{ left: `${10 + index * 10}%`, height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </SurfaceCard>

              <SurfaceCard className="overflow-hidden">
                <div className="border-b border-[var(--outline-variant)] px-4 py-3">
                  <h4 className="text-[15px] font-semibold text-[var(--ink)]">Lịch sử giao dịch</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-[12px]">
                    <thead className="bg-[var(--surface-container-low)] text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                      <tr>
                        <th className="px-4 py-3">Ngày</th>
                        <th className="px-4 py-3">Mã</th>
                        <th className="px-4 py-3">Hành động</th>
                        <th className="px-4 py-3">Giá</th>
                        <th className="px-4 py-3">Khối lượng</th>
                        <th className="px-4 py-3">Kết quả</th>
                      </tr>
                    </thead>
                    <tbody>
                      {strategy.transactions.map((transaction) => (
                        <tr key={`${transaction.date}-${transaction.symbol}`} className="border-t border-[var(--outline-variant)]">
                          <td className="px-4 py-2.5 text-[var(--muted)]">{transaction.date}</td>
                          <td className="px-4 py-2.5 font-mono text-[var(--ink)]">{transaction.symbol}</td>
                          <td className="px-4 py-2.5 text-[var(--ink)]">{transaction.action}</td>
                          <td className="px-4 py-2.5 font-mono text-[var(--ink)]">{transaction.price}</td>
                          <td className="px-4 py-2.5 font-mono text-[var(--ink)]">{transaction.volume}</td>
                          <td className={cx('px-4 py-2.5 font-mono', toneClass(transaction.pnl))}>{transaction.pnl}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-4">
                <div className="flex items-center justify-between">
                  <Label>Thống kê Sao chép</Label>
                  <span className="text-[11px] text-[var(--muted)]">Số lượng sao chép</span>
                </div>
                <div className="mt-4 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4">
                  <div className="flex items-center gap-4 text-[11px] text-[var(--muted)]">
                    <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan-500" />Số người sao chép</span>
                    <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-indigo-500" />Giá trị sao chép</span>
                  </div>
                  <div className="relative mt-4 h-40 overflow-hidden rounded-lg border border-[var(--outline-variant)] bg-white">
                    <div className="absolute inset-x-0 top-1/4 border-t border-dashed border-[var(--outline-variant)]" />
                    <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-[var(--outline-variant)]" />
                    <div className="absolute inset-x-0 top-3/4 border-t border-dashed border-[var(--outline-variant)]" />
                    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,82 Q12,78 24,58 T50,44 T74,28 T100,16" fill="none" stroke="#06b6d4" strokeWidth="2.2" />
                      <path d="M0,90 Q12,88 24,72 T50,56 T74,40 T100,24" fill="none" stroke="#6366f1" strokeWidth="2.2" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {strategyCopyStats.map(([value, label, icon]) => (
                    <div key={label} className="rounded-lg border border-[var(--outline-variant)] bg-white p-3 text-center shadow-sm">
                      <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-[var(--surface-container-low)] text-[12px] text-[var(--primary)]">
                        {icon}
                      </div>
                      <p className="mt-2 text-[14px] font-semibold text-[var(--ink)]">{value}</p>
                      <p className="mt-1 text-[10px] text-[var(--muted)]">{label}</p>
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            </section>

            <aside className="w-full space-y-4 p-4 lg:w-[35%]">
              <SurfaceCard className="p-4">
                <Label>Strategy summary</Label>
                <h4 className="mt-2 text-[20px] font-semibold text-[var(--ink)]">{strategy.name}</h4>
                <p className="mt-2.5 text-[12px] leading-6 text-[var(--muted)]">{strategy.description}</p>
                <div className="mt-4 grid gap-2.5">
                  {strategy.overviewMetrics.map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between rounded-lg bg-[var(--surface-container-low)] px-3 py-2.5">
                      <span className="text-[12px] text-[var(--muted)]">{metric.label}</span>
                      <span className={cx('font-mono text-[12px] font-semibold', toneClass(metric.value))}>{metric.value}</span>
                    </div>
                  ))}
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-4">
                <Label>Asset allocation</Label>
                <div className="mt-3">
                  <AllocationBars strategy={strategy} />
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-4">
                <Label>Danh mục trọng tâm</Label>
                <div className="mt-3 space-y-2.5">
                  {strategy.positions.map((position) => (
                    <div key={position.symbol} className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-3 py-2.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[12px] font-semibold text-[var(--ink)]">{position.symbol}</p>
                          <p className="text-[11px] text-[var(--muted)]">{position.sector}</p>
                        </div>
                        <span className="font-mono text-[12px] text-[var(--ink)]">{position.weight}</span>
                      </div>
                      <p className="mt-1.5 font-mono text-[12px] text-[var(--success)]">{position.roi}</p>
                    </div>
                  ))}
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-4">
                <div className="flex items-center justify-between">
                  <Label>Thống kê lãi lỗ</Label>
                  <button className="rounded border border-[var(--outline-variant)] bg-white px-2 py-1 text-[10px] text-[var(--muted)]">
                    Tháng 04/2026 ▾
                  </button>
                </div>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 border-b border-[var(--outline-variant)] pb-3 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4">
                    <div className="rounded bg-[var(--surface-container-low)] px-2.5 py-2 text-[10px] font-semibold text-[var(--muted)]">
                      {strategyPnlStats.winners.title}
                    </div>
                    {strategyPnlStats.winners.rows.map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between text-[12px]">
                        <span className="font-semibold text-[var(--ink)]">{label}</span>
                        <span className="font-medium text-[var(--success)]">{value}</span>
                      </div>
                    ))}
                    <div className="mt-2 rounded bg-[var(--surface-container-low)] px-2.5 py-2 text-[10px] font-semibold text-[var(--muted)]">
                      {strategyPnlStats.winners.sectorTitle}
                    </div>
                    {strategyPnlStats.winners.sectors.map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between text-[12px]">
                        <span className="text-[var(--ink)]">{label}</span>
                        <span className="font-medium text-[var(--success)]">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="rounded bg-[var(--surface-container-low)] px-2.5 py-2 text-[10px] font-semibold text-[var(--muted)]">
                      {strategyPnlStats.losers.title}
                    </div>
                    {strategyPnlStats.losers.rows.map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between text-[12px]">
                        <span className="font-semibold text-[var(--ink)]">{label}</span>
                        <span className="font-medium text-[var(--danger)]">{value}</span>
                      </div>
                    ))}
                    <div className="mt-2 rounded bg-[var(--surface-container-low)] px-2.5 py-2 text-[10px] font-semibold text-[var(--muted)]">
                      {strategyPnlStats.losers.sectorTitle}
                    </div>
                    {strategyPnlStats.losers.sectors.map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between text-[12px]">
                        <span className="text-[var(--ink)]">{label}</span>
                        <span className="font-medium text-[var(--danger)]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-4">
                <Label>Actions</Label>
                <div className="mt-3 grid gap-2.5">
                  <Link
                    href={traderProfileHref}
                    className="rounded-lg border border-[var(--outline-variant)] px-4 py-2.5 text-center text-[12px] font-semibold text-[var(--ink)] hover:bg-[var(--surface-container-low)]"
                  >
                    View Trader Profile
                  </Link>
                  <Link
                    href={copyHref}
                    className="rounded-lg bg-[#2563eb] px-4 py-2.5 text-center text-[12px] font-semibold text-white hover:bg-[#1d4ed8]"
                  >
                    Copy Strategy
                  </Link>
                </div>
              </SurfaceCard>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function StrategyFilterModal({ closeHref }: { closeHref: string }) {
  const filters = [
    ['ROI', 'Min ROI: 10%'],
    ['PNL', 'Top 20%'],
    ['MDD', 'Max MDD: 5%'],
    ['AUM', 'Min AUM: 2B'],
    ['Copy Traders', '>= 100'],
    ['PNL of Copy Traders', '>= 6%'],
  ];

  return (
    <div className="fixed inset-0 z-[60] bg-[rgba(11,28,48,0.48)] backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-5xl overflow-hidden rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-card)] shadow-2xl">
          <div className="flex items-center justify-between border-b border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-6 py-5">
            <div>
              <h3 className="text-xl font-semibold text-[var(--primary)]">Filter Strategies</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">Narrow down copy-trading opportunities</p>
            </div>
            <Link href={closeHref} className="rounded-full p-2 text-xl text-[var(--muted)] hover:bg-[var(--surface-container-low)]">
              ×
            </Link>
          </div>
          <div className="max-h-[716px] space-y-6 overflow-y-auto p-6">
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">Select metrics to filter</p>
              <div className="flex flex-wrap gap-2">
                {filters.map(([label], index) => (
                  <button
                    key={label}
                    className={cx(
                      'rounded-full px-4 py-2 text-[12px] font-medium',
                      index === 0 || index === 2 || index === 4
                        ? 'border-2 border-[var(--primary)] bg-[rgba(189,240,148,0.4)] text-[var(--ink)]'
                        : 'border border-[var(--outline-variant)] text-[var(--muted)]',
                    )}
                  >
                    {index === 0 || index === 2 || index === 4 ? '● ' : ''}
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-5 border-t border-[var(--outline-variant)] pt-5">
              {filters.map(([label, value], index) => (
                <div key={label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[13px] font-bold text-[var(--primary)]">{value}</label>
                    <span className="text-[11px] font-mono text-[var(--muted)]">
                      {index === 0 ? 'Targeting +25%' : index === 2 ? 'Risk capped' : index === 4 ? 'Active desks' : 'Flexible'}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--surface-container)]">
                    <div
                      className="h-2 rounded-full bg-[var(--primary)]"
                      style={{ width: `${index === 0 ? 22 : index === 2 ? 35 : index === 4 ? 55 : 45}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">
                    <span>0</span>
                    <span>100</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <div className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4">
                <Label>Risk buckets</Label>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Thấp', 'Trung bình', 'Cao', 'Có leverage', 'Không margin'].map((chip) => (
                    <span key={chip} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[var(--ink)]">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
              <SurfaceCard className="p-5">
                <Label>Filter preview</Label>
                <div className="mt-4 space-y-3">
                  {aiStrategies.slice(0, 3).map((strategy) => (
                    <div key={strategy.id} className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4">
                      <p className="font-semibold text-[var(--ink)]">{strategy.name}</p>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-[var(--muted)]">{strategy.author}</span>
                        <span className="font-mono text-[var(--success)]">{strategy.ytd}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            </div>
            <div className="flex gap-3 border-t border-[var(--outline-variant)] pt-5">
              <Link
                href={closeHref}
                className="flex-1 rounded-lg bg-[var(--primary)] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Apply Filters
              </Link>
              <Link
                href={closeHref}
                className="rounded-lg border border-[var(--outline-variant)] px-8 py-3 text-center text-sm font-medium text-[var(--ink)]"
              >
                Reset
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CopyStrategyModal({
  strategy,
  closeHref,
}: {
  strategy: StrategyRecord;
  closeHref: string;
}) {
  const strategySharpe = Number.parseFloat(strategy.sharpe);
  const strategyPrice = Number.isFinite(strategySharpe) ? Math.round(strategySharpe * 1_000_000) : 0;
  const strategyPriceLabel = `${strategyPrice.toLocaleString('vi-VN')} VND`;

  return (
    <div className="fixed inset-0 z-[70] bg-[rgba(11,28,48,0.62)] backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-5xl overflow-hidden rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-card)] shadow-2xl">
          <div className="flex items-center justify-between border-b border-[var(--outline-variant)] bg-white px-6 py-5">
            <div className="flex items-center gap-4">
              <Avatar label={strategy.avatar} />
              <div>
                <h3 className="text-xl font-semibold text-[var(--ink)]">{strategy.name}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {strategy.leverage} • Xem bản gốc
                </p>
              </div>
            </div>
            <Link href={closeHref} className="rounded-full p-2 text-xl text-[var(--muted)] hover:bg-[var(--surface-container-low)]">
              ×
            </Link>
          </div>

          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.85fr]">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Cài đặt chiến lược</Label>
                <div className="flex gap-2 rounded-lg bg-[var(--surface-container)] p-1">
                  <button className="flex-1 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[var(--success-ink)] shadow-sm">
                    Tỷ lệ cố định
                  </button>
                  <button className="flex-1 rounded-lg px-4 py-2 text-sm font-medium text-[var(--muted)]">
                    Số tiền cố định
                  </button>
                </div>
                <p className="text-sm italic text-[var(--muted)]">
                  Lệnh sẽ mở theo tỷ lệ giữa số dư ký quỹ khả dụng của bạn và số dư ký quỹ của lead trader.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Số tiền sao chép</Label>
                  <p className="text-sm text-[var(--muted)]">
                    Khả dụng: <span className="font-semibold text-[var(--ink)]">27.450.000 VND</span>
                  </p>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-4 py-4">
                  <span className="font-mono text-2xl font-semibold text-[var(--ink)]">10.000.000</span>
                  <span className="text-sm font-semibold text-[var(--muted)]">VND • Tối đa</span>
                </div>
              </div>

              <label className="flex items-center gap-3 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-4 py-4">
                <span className="flex h-5 w-5 items-center justify-center rounded border border-[var(--outline)] bg-white text-[var(--success-ink)]">
                  ✓
                </span>
                <span className="font-medium text-[var(--ink)]">Đầu tư tự động</span>
              </label>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label>Tổng cắt lỗ</Label>
                  <span className="rounded-full bg-[rgba(145,247,142,0.35)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--success-ink)]">
                    Được đề xuất
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-4 py-4">
                  <span className="font-mono text-2xl font-semibold text-[var(--ink)]">12</span>
                  <span className="text-sm font-semibold text-[var(--muted)]">% ROE</span>
                </div>
                <p className="text-sm leading-6 text-[var(--muted)]">
                  Khi số dư ký quỹ ước tính đạt ngưỡng cắt lỗ, lệnh thị trường sẽ đóng toàn bộ vị thế để bảo toàn vốn.
                </p>
              </div>

            </div>

            <div className="space-y-4">
              <SurfaceCard className="p-5">
                <Label>7 ngày PNL (VND)</Label>
                <p className="mt-3 text-[34px] font-semibold tracking-[-0.02em] text-[var(--success)]">+8.815.510</p>
                <div className="mt-4 rounded-lg border border-[var(--outline-variant)] bg-white px-4 pt-3">
                  <MiniSparkline tone="green" />
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-5">
                <Label>Thông số chiến lược</Label>
                <div className="mt-4 space-y-3">
                  {strategy.overviewMetrics.map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between rounded-lg bg-[var(--surface-container-low)] px-4 py-3">
                      <span className="text-sm text-[var(--muted)]">{metric.label}</span>
                      <span className={cx('font-mono text-sm font-semibold', toneClass(metric.value))}>{metric.value}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between rounded-lg bg-[var(--surface-container-low)] px-4 py-3">
                    <span className="text-sm text-[var(--muted)]">Giá strategy</span>
                    <span className="font-mono text-sm font-semibold text-[var(--ink)]">{strategyPriceLabel}</span>
                  </div>
                </div>
              </SurfaceCard>

              <div className="grid gap-3">
                <Link
                  href={closeHref}
                  className="rounded-lg bg-[#2563eb] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#1d4ed8]"
                >
                  Xác nhận sao chép
                </Link>
                <Link
                  href={closeHref}
                  className="rounded-lg border border-[var(--outline-variant)] px-4 py-3 text-center text-sm font-medium text-[var(--ink)]"
                >
                  Huỷ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CopiedStrategyDetailModal({
  copiedStrategy,
  closeHref,
}: {
  copiedStrategy: CopiedStrategyRow;
  closeHref: string;
}) {
  const trades = copiedStrategyTrades[copiedStrategy.id] ?? [];
  const riskMetrics = copiedRiskMetrics[copiedStrategy.id] ?? [];
  const allocations = copiedAllocations[copiedStrategy.id] ?? [];
  const profitLossStats = copiedProfitLossStats[copiedStrategy.id] ?? copiedProfitLossStats['1'];
  const profitStockGroup = profitLossStats.find((group) => group.title === 'CP lãi nhiều nhất');
  const lossStockGroup = profitLossStats.find((group) => group.title === 'CP lỗ nhiều nhất');
  const profitSectorGroup = profitLossStats.find((group) => group.title === 'Ngành lãi nhiều nhất');
  const lossSectorGroup = profitLossStats.find((group) => group.title === 'Ngành lỗ nhiều nhất');
  const gradient = allocations.reduce(
    (parts, item) => {
      const value = Number.parseFloat(item.weight);
      const start = parts.offset;
      const end = start + value;
      parts.segments.push(`${item.tone} ${start}% ${end}%`);
      parts.offset = end;
      return parts;
    },
    { offset: 0, segments: [] as string[] },
  );

  return (
    <div className="fixed inset-0 z-[65] bg-[rgba(11,28,48,0.4)] p-4 backdrop-blur-sm">
      <div className="mx-auto flex h-[min(921px,calc(100vh-32px))] w-full max-w-[1480px] flex-col overflow-hidden rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-card)] shadow-2xl">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(145,247,142,0.4)] text-[var(--success-ink)]">
              ↗
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="truncate text-[24px] font-semibold tracking-[-0.01em] text-[var(--primary)]">
                  Chi tiết Chiến lược ({copiedStrategy.strategy})
                </h2>
                <span className="rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container)] px-2 py-0.5 text-[10px] font-medium text-[var(--muted)]">
                  Bắt đầu copy: {copiedStrategy.startedCopy}
                </span>
              </div>
              <p className="mt-0.5 text-[14px] text-[var(--muted)]">
                Quản lý bởi: <span className="font-semibold text-[var(--primary)]">{copiedStrategy.manager}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded-lg bg-[var(--danger)] px-4 py-2 text-[14px] font-medium text-white hover:opacity-90">
              Ngừng Sao chép
            </button>
            <Link href={closeHref} className="rounded-full p-2 text-[var(--muted)] hover:bg-[var(--surface-container-low)]">
              ×
            </Link>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex w-full flex-col gap-6 overflow-y-auto border-r border-[var(--outline-variant)] bg-[var(--surface)] p-6 lg:w-[65%]">
            <section className="shrink-0 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-4 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-[18px] font-semibold text-[var(--primary)]">
                <span className="text-[18px]">◫</span>
                <span>Vốn đầu tư & Hiệu suất</span>
              </h3>
              <div className="mb-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">Đang đầu tư</p>
                  <p className="mt-1 font-mono text-[30px] font-semibold tracking-[-0.02em] text-[var(--primary)]">
                    {copiedStrategy.invested}
                  </p>
                  <p className="text-[14px] text-[var(--muted)]">VND</p>
                </div>
                <div className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">Lợi nhuận (PNL)</p>
                  <p className="mt-1 font-mono text-[30px] font-semibold tracking-[-0.02em] text-[var(--success)]">
                    {copiedStrategy.pnlValue.replace(' VND', '')}
                  </p>
                  <p className="text-[14px] text-[var(--success)]">{copiedStrategy.pnlPct}</p>
                </div>
                <div className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">Vốn hiện tại</p>
                  <p className="mt-1 font-mono text-[30px] font-semibold tracking-[-0.02em] text-[var(--primary)]">
                    {copiedStrategy.currentCapital}
                  </p>
                  <p className="text-[14px] text-[var(--muted)]">VND</p>
                </div>
              </div>
              <div className="relative h-64 overflow-hidden rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container)]">
                <p className="absolute left-1/2 top-8 -translate-x-1/2 text-[14px] text-[var(--muted)]">[Biểu đồ Tăng trưởng ROI]</p>
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,110,28,0.08)] to-transparent" />
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,100 L0,80 Q10,70 20,85 T40,60 T60,75 T80,40 T100,20 L100,100 Z" fill="rgba(0,110,28,0.1)" />
                  <path d="M0,80 Q10,70 20,85 T40,60 T60,75 T80,40 T100,20" fill="none" stroke="#006e1c" strokeWidth="2" />
                </svg>
              </div>
            </section>

            <section className="shrink-0 overflow-hidden rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] shadow-sm">
              <div className="flex items-center justify-between border-b border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4">
                <h3 className="flex items-center gap-2 text-[18px] font-semibold text-[var(--primary)]">
                  <span className="text-[18px]">◷</span>
                  <span>Lịch sử giao dịch</span>
                </h3>
                <div className="flex gap-2">
                  <span className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-highest)] px-3 py-1 text-[14px] text-[var(--primary)]">7 Ngày</span>
                  <span className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface)] px-3 py-1 text-[14px] text-[var(--muted)]">30 Ngày</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[var(--outline-variant)] bg-[var(--surface-container-low)]">
                      {['Mã (Asset)', 'Loại', 'Khối lượng', 'Giá (VND)', 'Thời gian', 'Thời gian mua'].map((label) => (
                        <th key={label} className="px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="font-mono text-[14px]">
                    {trades.map((trade) => (
                      <tr key={`${trade.symbol}-${trade.executionTime}`} className="border-b border-[var(--outline-variant)] hover:bg-[var(--surface-container)]">
                        <td className="px-4 py-2 font-semibold text-[var(--primary)]">{trade.symbol}</td>
                        <td className={cx('px-4 py-2', trade.side === 'MUA' ? 'text-[var(--success)]' : 'text-[var(--danger)]')}>{trade.side}</td>
                        <td className="px-4 py-2 text-right text-[var(--primary)]">{trade.quantity}</td>
                        <td className="px-4 py-2 text-right text-[var(--primary)]">{trade.price}</td>
                        <td className="px-4 py-2 text-right text-[var(--muted)]">{trade.executionTime}</td>
                        <td className="px-4 py-2 text-right text-[var(--muted)]">{trade.copiedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="shrink-0 overflow-hidden rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] shadow-sm">
              <div className="border-b border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4">
                <h3 className="flex items-center gap-2 text-[18px] font-semibold text-[var(--primary)]">
                  <span className="text-[18px]">▤</span>
                  <span>Thống kê lãi lỗ</span>
                </h3>
              </div>
              <div className="flex w-full">
                <div className="w-1/2 border-r border-[var(--outline-variant)]">
                  <div className="border-b border-[var(--outline-variant)] bg-[var(--surface)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--success)]">
                    CP lãi nhiều nhất
                  </div>
                  {profitStockGroup?.rows.map((row) => (
                    <div key={row.label} className="flex justify-between border-b border-[var(--outline-variant)] px-4 py-2 hover:bg-[var(--surface-container)]">
                      <span className="text-[14px] font-semibold text-[var(--primary)]">{row.label}</span>
                      <span className="font-mono text-[14px] text-[var(--success)]">{row.value}</span>
                    </div>
                  ))}
                  <div className="border-b border-[var(--outline-variant)] bg-[var(--surface)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--success)]">
                    Ngành lãi nhiều nhất
                  </div>
                  {profitSectorGroup?.rows.map((row) => (
                    <div key={row.label} className="flex justify-between px-4 py-2 hover:bg-[var(--surface-container)]">
                      <span className="text-[14px] font-semibold text-[var(--primary)]">{row.label}</span>
                      <span className="font-mono text-[14px] text-[var(--success)]">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="w-1/2">
                  <div className="border-b border-[var(--outline-variant)] bg-[var(--surface)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--danger)]">
                    CP lỗ nhiều nhất
                  </div>
                  {lossStockGroup?.rows.map((row) => (
                    <div key={row.label} className="flex justify-between border-b border-[var(--outline-variant)] px-4 py-2 hover:bg-[var(--surface-container)]">
                      <span className="text-[14px] font-semibold text-[var(--primary)]">{row.label}</span>
                      <span className="font-mono text-[14px] text-[var(--danger)]">{row.value}</span>
                    </div>
                  ))}
                  <div className="border-b border-[var(--outline-variant)] bg-[var(--surface)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--danger)]">
                    Ngành lỗ nhiều nhất
                  </div>
                  {lossSectorGroup?.rows.map((row) => (
                    <div key={row.label} className="flex justify-between px-4 py-2 hover:bg-[var(--surface-container)]">
                      <span className="text-[14px] font-semibold text-[var(--primary)]">{row.label}</span>
                      <span className="font-mono text-[14px] text-[var(--danger)]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="flex w-full flex-col gap-6 overflow-y-auto border-l border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-6 lg:w-[35%]">
            <section>
              <h3 className="mb-4 flex items-center gap-2 text-[18px] font-semibold text-[var(--primary)]">
                <span>⚠</span>
                <span>Chỉ số rủi ro</span>
              </h3>
              <div className="flex flex-col gap-2">
                {riskMetrics.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between rounded-lg border border-[var(--outline-variant)] bg-[var(--surface)] p-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">{metric.label}</p>
                      <p className="mt-1 text-[18px] font-semibold text-[var(--primary)]">{metric.value}</p>
                    </div>
                    {metric.badge ? (
                      <div
                        className={cx(
                          'flex h-8 min-w-16 items-center justify-center rounded text-[14px]',
                          metric.badgeTone === 'danger'
                            ? 'bg-[var(--error-container)] text-[var(--on-error-container)]'
                            : 'bg-[rgba(145,247,142,0.45)] text-[var(--success-ink)]',
                        )}
                      >
                        {metric.badge}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>

            <section className="flex flex-1 flex-col">
              <h3 className="mb-4 flex items-center gap-2 text-[18px] font-semibold text-[var(--primary)]">
                <span>◔</span>
                <span>Danh mục Portfolio</span>
              </h3>
              <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-[var(--outline-variant)] bg-[var(--surface)] p-4">
                <div
                  className="relative flex h-48 w-48 items-center justify-center rounded-full"
                  style={{ background: `conic-gradient(${gradient.segments.join(', ')})` }}
                >
                  <div className="absolute flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[var(--surface)] shadow-inner">
                    <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">Tài sản</span>
                    <span className="font-mono text-[18px] font-semibold text-[var(--primary)]">{allocations.length} Mã</span>
                  </div>
                </div>
                <div className="mt-6 grid w-full grid-cols-2 gap-2 text-[14px]">
                  {allocations.map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.tone }} />
                      <span className="font-mono text-[var(--primary)]">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="mt-auto flex gap-4 border-t border-[var(--outline-variant)] pt-4">
              <button className="flex-1 rounded-lg border-2 border-[var(--primary)] py-2 text-[14px] font-semibold text-[var(--primary)] hover:bg-[var(--surface-container)]">
                Sửa vốn
              </button>
              <button className="flex-1 rounded-lg bg-[var(--primary)] py-2 text-[14px] font-semibold text-white hover:opacity-90">
                Nạp thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuyerStatisticsModal({
  strategyId,
  closeHref,
}: {
  strategyId: string;
  closeHref: string;
}) {
  const summary = buyerStatisticSummaries[strategyId as keyof typeof buyerStatisticSummaries] ?? buyerStatisticSummaries['portfolio-1'];
  const totals = [
    { label: 'Total Buyers', value: String(summary.totalBuyers), note: '+12% this week', tone: 'positive' as const },
    { label: 'Total Volume', value: summary.totalVolume, note: '+5.4% this week', tone: 'positive' as const },
    { label: 'Total Profit', value: summary.totalProfitLabel, note: 'Credit from strategy selling', tone: 'positive' as const },
    { label: 'AUM', value: summary.aum, note: 'Stable', tone: 'neutral' as const },
  ];

  return (
    <div className="fixed inset-0 z-[70] bg-[rgba(11,28,48,0.2)] p-4 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-h-[921px] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-card)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--outline-variant)] px-6 py-5">
          <div>
            <h2 className="text-[18px] font-semibold text-[var(--ink)]">Thống kê người mua: {summary.strategyName}</h2>
            <p className="mt-1 text-[13px] text-[var(--muted)]">{summary.subtitle}</p>
          </div>
          <Link href={closeHref} className="rounded-full p-2 text-[18px] text-[var(--muted)] hover:bg-[var(--surface-container)]">
            ×
          </Link>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          <div className="grid gap-4 md:grid-cols-4">
            {totals.map((item) => (
              <div key={item.label} className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-bright)] p-4">
                <Label>{item.label}</Label>
                <p className="mt-2 text-[24px] font-semibold text-[var(--ink)]">{item.value}</p>
                <p className={cx('mt-1 flex items-center gap-1 text-[12px]', item.tone === 'positive' ? 'text-[var(--success)]' : 'text-[var(--muted)]')}>
                  <span>{item.tone === 'positive' ? '↗' : '—'}</span>
                  <span>{item.note}</span>
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[15px] text-[var(--muted)]">⌕</span>
              <input
                className="w-full rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-bright)] py-2 pl-9 pr-3 text-[13px] text-[var(--ink)] outline-none focus:border-[var(--success-ink)]"
                placeholder="Search buyers..."
                type="text"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-bright)]">
            <table className="min-w-full text-left">
              <thead className="border-b border-[var(--outline-variant)] bg-[var(--surface-container-high)]">
                <tr className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                  <th className="px-4 py-4">Buyer Name</th>
                  <th className="px-4 py-4">Copy Date</th>
                  <th className="px-4 py-4 text-right">Amount (VND)</th>
                  <th className="px-4 py-4 text-right">ROI (%)</th>
                </tr>
              </thead>
              <tbody>
                {summary.buyers.map((buyer) => (
                  <tr key={buyer.name} className="border-t border-[var(--outline-variant)] hover:bg-[var(--surface-container-low)]">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-container)] text-[11px] font-bold text-[var(--ink)]">
                          {buyer.avatar}
                        </div>
                        <span className="text-[13px] text-[var(--ink)]">{buyer.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[13px] text-[var(--muted)]">{buyer.joined}</td>
                    <td className="px-4 py-4 text-right font-mono text-[13px] text-[var(--ink)]">{buyer.amount}</td>
                    <td className={cx('px-4 py-4 text-right font-mono text-[13px] font-semibold', buyer.tone === 'positive' ? 'text-[var(--success)]' : 'text-[var(--danger)]')}>
                      {buyer.roi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--outline-variant)] bg-[var(--surface-bright)] px-6 py-4">
          <span className="text-[13px] text-[var(--muted)]">Showing 1 to 5 of 5 entries</span>
          <div className="flex items-center gap-2">
            <button className="h-8 w-8 rounded border border-[var(--outline-variant)] text-[var(--muted)] opacity-50" disabled>
              ‹
            </button>
            <button className="h-8 w-8 rounded border border-[var(--success-ink)] bg-[var(--success-ink)] text-sm font-semibold text-white">
              1
            </button>
            <button className="h-8 w-8 rounded border border-[var(--outline-variant)] text-[var(--muted)] opacity-50" disabled>
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FollowingStrategiesModal({ closeHref }: { closeHref: string }) {
  return (
    <div className="fixed inset-0 z-[70] bg-[rgba(11,28,48,0.2)] p-4 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-h-[921px] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-card)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--outline-variant)] px-6 py-5">
          <div>
            <h2 className="text-[24px] font-semibold text-[var(--ink)]">Following Strategies</h2>
            <p className="mt-1 text-[13px] text-[var(--muted)]">Manage and track the performance of your copied strategies.</p>
          </div>
          <Link href={closeHref} className="rounded-full p-2 text-[18px] text-[var(--muted)] hover:bg-[var(--surface-container)]">
            ×
          </Link>
        </div>

        <div className="flex items-center justify-between gap-4 border-b border-[var(--outline-variant)] bg-[var(--surface)] px-5 py-4">
          <div className="relative w-full max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[15px] text-[var(--muted)]">⌕</span>
            <input
              className="w-full rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-card)] py-2 pl-9 pr-3 text-[13px] text-[var(--ink)] outline-none focus:border-[var(--success-ink)]"
              placeholder="Search strategy by name..."
              type="text"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-card)] px-3 py-2 text-[13px] text-[var(--ink)]">
            <span>⚲</span>
            <span>Filter</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-[var(--surface-card)]">
          <table className="min-w-full text-left">
            <thead className="sticky top-0 z-10 border-b border-[var(--outline-variant)] bg-[var(--surface)]">
              <tr className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                <th className="px-4 py-4">Strategy &amp; Lead</th>
                <th className="px-4 py-4 text-right">1Y Return</th>
                <th className="px-4 py-4 text-right">Monthly PNL</th>
                <th className="px-4 py-4 text-right">AUM (VND)</th>
                <th className="px-4 py-4 text-center">30D Trend</th>
                <th className="px-4 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Tech Alpha Long', 'Alex Mercer', '+24.5%', '+₫15.2M', '₫450.5B', 'positive'],
                ['Growth Momentum', 'Sarah Jenkins', '+18.2%', '-₫2.1M', '₫890.1B', 'mixed'],
                ['Value Yield Plus', 'Marcus Chen', '-4.5%', '-₫8.4M', '₫125.0B', 'negative'],
              ].map((row, index) => (
                <tr key={row[0]} className="group border-t border-[var(--outline-variant)] hover:bg-[var(--surface-container-low)]">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-container)] text-[12px] font-semibold text-[var(--ink)]">
                        {row[1].slice(0, 1)}
                      </div>
                      <div>
                        <div className="text-[16px] font-semibold text-[var(--ink)]">{row[0]}</div>
                        <div className="text-[13px] text-[var(--muted)]">{row[1]}</div>
                      </div>
                    </div>
                  </td>
                  <td className={cx('px-4 py-4 text-right font-mono text-[13px]', row[2].startsWith('-') ? 'text-[var(--danger)]' : 'text-[var(--success)]')}>{row[2]}</td>
                  <td className={cx('px-4 py-4 text-right font-mono text-[13px]', row[3].startsWith('-') ? 'text-[var(--danger)]' : 'text-[var(--success)]')}>{row[3]}</td>
                  <td className="px-4 py-4 text-right font-mono text-[13px] text-[var(--ink)]">{row[4]}</td>
                  <td className="px-4 py-4">
                    <div className="mx-auto flex h-8 max-w-[96px] items-end gap-1 opacity-80">
                      {[16, 24, 18, index === 2 ? 8 : 28, index === 1 ? 12 : 32].map((height) => (
                        <div
                          key={`${row[0]}-${height}`}
                          className={cx('flex-1 rounded-t-sm', index === 2 ? 'bg-[var(--danger)]' : 'bg-[var(--success)]')}
                          style={{ height }}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Link
                      href={buildPlatformHref({ view: 'strategy', strategyTab: 'copied' })}
                      className="rounded-lg p-2 text-[var(--muted)] transition hover:bg-[var(--surface-container)] hover:text-[var(--ink)]"
                    >
                      ›
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StrategyStatusSwitchModal({
  strategyId,
  selectedStatus,
  strategySharpe,
  closeHref,
}: {
  strategyId: string;
  selectedStatus: StrategyVisibilityStatus;
  strategySharpe: string;
  closeHref: string;
}) {
  const sharpeValue = Number.parseFloat(strategySharpe) || 0;
  const publicPaidPrice = `${Math.round(sharpeValue * 1_000_000).toLocaleString('vi-VN')} VND`;
  const options: Array<{ id: StrategyVisibilityStatus; label: string; valueBadge?: string }> = [
    { id: 'public_paid', label: 'Public - Paid', valueBadge: publicPaidPrice },
    { id: 'public_free', label: 'Public - Free' },
    { id: 'private', label: 'Private' },
  ];

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center bg-[rgba(11,28,48,0.24)] p-4 backdrop-blur-sm">
      <div className="w-full max-w-[720px] rounded-2xl border border-[var(--outline-variant)] bg-[var(--surface-card)] p-8 shadow-[0_16px_48px_rgba(0,0,0,0.2)]">
        <div className="mb-6 flex items-start justify-between">
          <h2 className="text-[40px] font-semibold tracking-[-0.02em] text-[var(--ink)]">Update Strategy Status</h2>
          <Link href={closeHref} className="rounded p-1 text-[28px] leading-none text-[var(--muted)] hover:text-[var(--ink)]">
            ×
          </Link>
        </div>

        <div className="space-y-3">
          {options.map((option) => (
            <Link
              key={option.id}
              href={buildPlatformHref({
                view: 'profile',
                profileTab: 'portfolio',
                statusSwitch: strategyId,
                statusValue: option.id,
              })}
              className={cx(
                'flex items-center justify-between rounded-2xl border px-6 py-5 transition-colors',
                selectedStatus === option.id
                  ? 'border-[var(--outline)] bg-[var(--surface-container-low)]'
                  : 'border-[var(--outline-variant)] hover:bg-[var(--surface-container-low)]',
              )}
            >
              <div className="flex items-center gap-5">
                <span className={cx('inline-flex h-9 w-9 items-center justify-center rounded-full border text-[20px]', selectedStatus === option.id ? 'border-[var(--outline)]' : 'border-[var(--outline-variant)]')}>
                  {selectedStatus === option.id ? '✓' : ''}
                </span>
                <span className="text-[18px] font-medium tracking-[-0.02em] text-[var(--ink)]">{option.label}</span>
              </div>
              {option.valueBadge ? (
                <span className="rounded-2xl border border-[rgba(34,168,85,0.55)] bg-[rgba(145,247,142,0.28)] px-4 py-2 font-mono text-[14px] font-semibold text-[var(--success-ink)]">
                  {option.valueBadge}
                </span>
              ) : null}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Link href={closeHref} className="rounded-2xl border border-[var(--outline)] bg-white px-7 py-2.5 text-[16px] font-medium text-[var(--muted)]">
            Cancel
          </Link>
          <Link
            href={buildPlatformHref({
              view: 'profile',
              profileTab: 'portfolio',
              statusApplied: `${strategyId}:${selectedStatus}`,
            })}
            className="rounded-2xl bg-[#2f73c8] px-7 py-2.5 text-[16px] font-medium text-white"
          >
            Save Changes
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AIRankingHub({
  view,
  strategyTab,
  strategyMode,
  tradeTab,
  feedTab,
  profileTab,
  strategyDetail,
  copiedStrategyDetail,
  copyStrategy,
  traderPopup,
  buyerStats,
  followingStrategies,
  statusSwitch,
  statusValue,
  statusApplied,
  filterOpen,
}: {
  view: TopView;
  strategyTab: StrategyTab;
  strategyMode: StrategyMode;
  tradeTab: TradeTab;
  feedTab: SocialFeedTab;
  profileTab: ProfileTab;
  strategyDetail?: string | null;
  copiedStrategyDetail?: string | null;
  copyStrategy?: string | null;
  traderPopup?: string | null;
  buyerStats?: string | null;
  followingStrategies?: string | null;
  statusSwitch?: string | null;
  statusValue?: string | null;
  statusApplied?: string | null;
  filterOpen?: boolean;
}) {
  const selectedStrategy = strategyDetail ? getStrategyById(strategyDetail) : null;
  const selectedCopiedStrategy = copiedStrategyDetail
    ? copiedStrategyRows.find((row) => row.id === copiedStrategyDetail) ?? null
    : null;
  const copyTarget = copyStrategy ? getStrategyById(copyStrategy) : null;
  const selectedTraderPopup = traderPopup ? getTraderProfile(traderPopup) : null;
  const baseHref = buildPlatformHref({
    view,
    strategyTab,
    strategyMode,
    feedTab,
    profileTab,
  });
  const detailBaseHref = buildPlatformHref({
    view,
    strategyTab,
    strategyMode,
    feedTab,
    profileTab,
    strategyDetail: selectedStrategy?.id ?? null,
  });

  return (
    <div className="space-y-6 p-4 md:p-6 xl:p-8">
      {view === 'strategy' ? (
        <StrategyView
          strategyTab={strategyTab}
          strategyMode={strategyMode}
          tradeTab={tradeTab}
          strategyDetail={strategyDetail}
        />
      ) : null}
      {view === 'social' ? <SocialView feedTab={feedTab} /> : null}
      {view === 'profile' ? (
        <ProfileView
          profileTab={profileTab}
          buyerStats={buyerStats}
          followingStrategies={followingStrategies}
          statusSwitch={statusSwitch}
          statusValue={statusValue}
          statusApplied={statusApplied}
        />
      ) : null}

      {selectedStrategy ? (
        <StrategyDetailModal
          strategy={selectedStrategy}
          closeHref={baseHref}
          detailBaseHref={buildDetailHref(selectedStrategy.id)}
          traderProfileHref={buildPlatformHref({
            view: 'social',
            feedTab: 'strategies',
            strategyDetail: selectedStrategy.id,
            traderPopup: selectedStrategy.id,
          })}
          copyHref={buildPlatformHref({
            view,
            strategyTab,
            strategyMode,
            tradeTab,
            feedTab,
            profileTab,
            strategyDetail: selectedStrategy.id,
            copyStrategy: selectedStrategy.id,
          })}
        />
      ) : null}

      {filterOpen && view === 'social' && feedTab === 'strategies' ? (
        <StrategyFilterModal closeHref={baseHref} />
      ) : null}

      {selectedCopiedStrategy && view === 'strategy' && strategyTab === 'copied' ? (
        <CopiedStrategyDetailModal copiedStrategy={selectedCopiedStrategy} closeHref={baseHref} />
      ) : null}

      {selectedTraderPopup && view === 'social' ? (
        <TraderQuickProfileModal
          profile={selectedTraderPopup}
          closeHref={baseHref}
          openStrategyDetailHref={(strategyId) =>
            buildPlatformHref({
              view: 'social',
              feedTab,
              strategyDetail: strategyId,
            })
          }
        />
      ) : null}

      {buyerStats && view === 'profile' && profileTab === 'portfolio' ? (
        <BuyerStatisticsModal strategyId={buyerStats} closeHref={baseHref} />
      ) : null}

      {followingStrategies && view === 'profile' && profileTab === 'portfolio' ? (
        <FollowingStrategiesModal closeHref={baseHref} />
      ) : null}

      {statusSwitch && view === 'profile' && profileTab === 'portfolio' ? (
        <StrategyStatusSwitchModal
          strategyId={statusSwitch}
          selectedStatus={
            statusValue === 'public_paid' || statusValue === 'public_free' || statusValue === 'private'
              ? statusValue
              : 'public_paid'
          }
          strategySharpe={userProfile.activeStrategies.find((item) => item.id === statusSwitch)?.sharpe ?? '1.00'}
          closeHref={baseHref}
        />
      ) : null}

      {copyTarget ? <CopyStrategyModal strategy={copyTarget} closeHref={detailBaseHref} /> : null}
    </div>
  );
}

function TraderSubTabs({ id, active }: { id: string; active: TraderTab }) {
  const tabs = [
    { id: 'positions', label: 'Positions' },
    { id: 'trades', label: 'Orders & Transfers' },
    { id: 'copiers', label: 'Copiers' },
  ] as const;

  return (
    <div className="flex flex-wrap gap-6 border-b border-[var(--outline-variant)]">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={buildDetailHref(id, tab.id)}
          className={cx(
            'relative pb-3 text-[15px] font-medium transition-colors',
            active === tab.id ? 'text-[var(--success-ink)]' : 'text-[var(--muted)] hover:text-[var(--ink)]',
          )}
        >
          {tab.label}
          {active === tab.id ? (
            <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-[var(--success-ink)]" />
          ) : null}
        </Link>
      ))}
    </div>
  );
}

function TraderSummary({ profile }: { profile: TraderProfile }) {
  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_340px]">
      <SurfaceCard className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-[var(--surface-container)] text-3xl font-semibold text-[var(--ink)]">
            {profile.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--ink)]">{profile.displayName}</h2>
                  {profile.verified ? (
                    <span className="rounded-full bg-[var(--surface-container)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--success-ink)]">
                      Verified
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {profile.handle} • {profile.strategyName} • {profile.universe}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={buildPlatformHref({ view: 'strategy', strategyTab: 'potential', strategyDetail: profile.id })}
                  className="rounded-lg border border-[var(--outline-variant)] px-4 py-2 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--surface-container-low)]"
                >
                  View strategy
                </Link>
                <Link
                  href={buildPlatformHref({
                    view: 'strategy',
                    strategyTab: 'potential',
                    strategyDetail: profile.id,
                    copyStrategy: profile.id,
                  })}
                  className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                  Copy
                </Link>
              </div>
            </div>

            <p className="mt-4 max-w-4xl text-[15px] leading-7 text-[var(--ink)]">{profile.bio}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {profile.stats.map((item) => (
                <div key={item.label} className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-4">
                  <Label>{item.label}</Label>
                  <p className={cx('mt-2 font-mono text-lg font-semibold', toneClass(item.value))}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SurfaceCard>

      <div className="grid gap-4">
        <SurfaceCard className="p-5">
          <Label>Copiers</Label>
          <p className="mt-2 text-2xl font-semibold text-[var(--ink)]">{profile.totalCopiers}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Active {profile.activeCopiers}</p>
        </SurfaceCard>
        <SurfaceCard className="p-5">
          <Label>Margin Balance</Label>
          <p className="mt-2 font-mono text-2xl font-semibold text-[var(--ink)]">{profile.marginBalance}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Minimum copy {profile.minimumCopy}</p>
        </SurfaceCard>
      </div>
    </section>
  );
}

function TraderPositionsView({ profile }: { profile: TraderProfile }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_360px]">
      <SurfaceCard className="overflow-hidden">
        <div className="border-b border-[var(--outline-variant)] px-5 py-4">
          <h3 className="text-lg font-semibold text-[var(--ink)]">Open positions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[var(--surface-container-low)] text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
              <tr>
                <th className="px-5 py-4">Symbol</th>
                <th className="px-5 py-4">Side</th>
                <th className="px-5 py-4">Entry</th>
                <th className="px-5 py-4">Mark</th>
                <th className="px-5 py-4">PnL</th>
                <th className="px-5 py-4">Exposure</th>
              </tr>
            </thead>
            <tbody>
              {profile.positions.map((position) => (
                <tr key={position.symbol} className="border-t border-[var(--outline-variant)]">
                  <td className="px-5 py-4 font-mono text-[var(--ink)]">{position.symbol}</td>
                  <td className="px-5 py-4 text-[var(--ink)]">{position.side}</td>
                  <td className="px-5 py-4 font-mono text-[var(--ink)]">{position.entry}</td>
                  <td className="px-5 py-4 font-mono text-[var(--ink)]">{position.mark}</td>
                  <td className={cx('px-5 py-4 font-mono', toneClass(position.pnl))}>{position.pnl}</td>
                  <td className="px-5 py-4 font-mono text-[var(--ink)]">{position.exposure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SurfaceCard>

      <div className="space-y-4">
        <SurfaceCard className="p-5">
          <Label>Asset allocation</Label>
          <div className="mt-4 space-y-3">
            {profile.assetMix.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--ink)]">{item.label}</span>
                  <span className="font-mono text-[var(--muted)]">{item.allocation}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-container-low)]">
                  <div className={cx('h-full rounded-full', item.tone)} style={{ width: item.allocation }} />
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-5">
          <Label>Desk stats</Label>
          <div className="mt-4 space-y-3">
            <div className="rounded-lg bg-[var(--surface-container-low)] px-4 py-3">
              <p className="text-sm text-[var(--muted)]">Daily trades</p>
              <p className="mt-1 text-lg font-semibold text-[var(--ink)]">{profile.dailyTrades}</p>
            </div>
            <div className="rounded-lg bg-[var(--surface-container-low)] px-4 py-3">
              <p className="text-sm text-[var(--muted)]">Closed portfolios</p>
              <p className="mt-1 text-lg font-semibold text-[var(--ink)]">{profile.closedPortfolios}</p>
            </div>
            <div className="rounded-lg bg-[var(--surface-container-low)] px-4 py-3">
              <p className="text-sm text-[var(--muted)]">Profit share</p>
              <p className="mt-1 text-lg font-semibold text-[var(--ink)]">{profile.profitShare}</p>
            </div>
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}

function TraderTradesView({ profile }: { profile: TraderProfile }) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <SurfaceCard className="overflow-hidden">
        <div className="border-b border-[var(--outline-variant)] px-5 py-4">
          <h3 className="text-lg font-semibold text-[var(--ink)]">Order log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[var(--surface-container-low)] text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
              <tr>
                <th className="px-5 py-4">Ngày</th>
                <th className="px-5 py-4">Mã</th>
                <th className="px-5 py-4">Hành động</th>
                <th className="px-5 py-4">Giá</th>
                <th className="px-5 py-4">SL</th>
                <th className="px-5 py-4">KQ</th>
              </tr>
            </thead>
            <tbody>
              {profile.trades.map((trade) => (
                <tr key={`${trade.date}-${trade.symbol}`} className="border-t border-[var(--outline-variant)]">
                  <td className="px-5 py-4 text-[var(--muted)]">{trade.date}</td>
                  <td className="px-5 py-4 font-mono text-[var(--ink)]">{trade.symbol}</td>
                  <td className="px-5 py-4 text-[var(--ink)]">{trade.action}</td>
                  <td className="px-5 py-4 font-mono text-[var(--ink)]">{trade.price}</td>
                  <td className="px-5 py-4 font-mono text-[var(--ink)]">{trade.quantity}</td>
                  <td className={cx('px-5 py-4 font-mono', toneClass(trade.result))}>{trade.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SurfaceCard>

      <SurfaceCard className="overflow-hidden">
        <div className="border-b border-[var(--outline-variant)] px-5 py-4">
          <h3 className="text-lg font-semibold text-[var(--ink)]">Transfer history</h3>
        </div>
        <div className="divide-y divide-[var(--outline-variant)]">
          {profile.transfers.map((transfer) => (
            <div key={`${transfer.date}-${transfer.amount}`} className="px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-[var(--ink)]">{transfer.type}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{transfer.note}</p>
                </div>
                <div className="text-right">
                  <p className={cx('font-mono text-sm font-semibold', toneClass(transfer.amount))}>{transfer.amount}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{transfer.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  );
}

function TraderCopiersView({ profile }: { profile: TraderProfile }) {
  return (
    <SurfaceCard className="overflow-hidden">
      <div className="border-b border-[var(--outline-variant)] px-5 py-4">
        <h3 className="text-lg font-semibold text-[var(--ink)]">Danh sách copier</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--surface-container-low)] text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
            <tr>
              <th className="px-5 py-4">Tên</th>
              <th className="px-5 py-4">Tham gia</th>
              <th className="px-5 py-4">Phân bổ</th>
              <th className="px-5 py-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {profile.copiers.map((copier) => (
              <tr key={`${copier.name}-${copier.joined}`} className="border-t border-[var(--outline-variant)]">
                <td className="px-5 py-4 font-semibold text-[var(--ink)]">{copier.name}</td>
                <td className="px-5 py-4 text-[var(--muted)]">{copier.joined}</td>
                <td className="px-5 py-4 font-mono text-[var(--ink)]">{copier.allocation}</td>
                <td className="px-5 py-4 text-[var(--muted)]">{copier.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SurfaceCard>
  );
}

export function TraderProfileView({ id, tab }: { id: string; tab: TraderTab }) {
  const profile = getTraderProfile(id);

  return (
    <div className="space-y-6 p-4 md:p-6 xl:p-8">
      <TraderSummary profile={profile} />
      <TraderSubTabs id={profile.id} active={tab} />
      {tab === 'positions' ? <TraderPositionsView profile={profile} /> : null}
      {tab === 'trades' ? <TraderTradesView profile={profile} /> : null}
      {tab === 'copiers' ? <TraderCopiersView profile={profile} /> : null}
    </div>
  );
}

export function getTraderProfileIds() {
  return Object.keys(traderProfiles);
}
