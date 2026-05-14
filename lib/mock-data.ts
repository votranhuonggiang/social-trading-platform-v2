export type TopView = 'strategy' | 'social' | 'profile';
export type StrategyTab = 'potential' | 'following' | 'copied';
export type StrategyMode = 'manage-strategy' | 'manage-universe';
export type TradeTab = 'mine' | 'copy';
export type SocialFeedTab = 'news' | 'strategies';
export type TraderTab = 'positions' | 'trades' | 'copiers';
export type ProfileTab = 'post' | 'portfolio';

export interface StrategyMetric {
  label: string;
  value: string;
  tone?: 'positive' | 'negative' | 'neutral';
}

export interface StrategyPosition {
  symbol: string;
  sector: string;
  weight: string;
  roi: string;
}

export interface StrategyTransaction {
  date: string;
  symbol: string;
  action: string;
  price: string;
  volume: string;
  pnl: string;
}

export interface StrategyRecord {
  id: string;
  name: string;
  author: string;
  handle: string;
  avatar: string;
  universe: string;
  frequency: string;
  style: string;
  status: string;
  thesis: string;
  description: string;
  roi30d: string;
  ytd: string;
  pnl: string;
  sharpe: string;
  drawdown: string;
  aum: string;
  copiers: number;
  risk: string;
  aiScore: number;
  lastRebalance: string;
  profitSplit: string;
  leverage: string;
  tags: string[];
  overviewMetrics: StrategyMetric[];
  monthlyReturns: Array<{
    year: string;
    months: string[];
    ytd: string;
  }>;
  assetMix: Array<{
    label: string;
    value: string;
    tone: string;
  }>;
  positions: StrategyPosition[];
  transactions: StrategyTransaction[];
}

export interface SocialPost {
  id: string;
  author: string;
  role: string;
  handle: string;
  avatar: string;
  time: string;
  content: string;
  strategyId: string;
  likes: number;
  comments: number;
  reposts: number;
  roi: string;
  drawdown: string;
  copiers: string;
}

export interface TraderProfile {
  id: string;
  displayName: string;
  handle: string;
  avatar: string;
  strategyName: string;
  universe: string;
  bio: string;
  verified: boolean;
  rating: string;
  dailyTrades: number;
  activeCopiers: string;
  totalCopiers: number;
  closedPortfolios: number;
  leverage: string;
  roi: string;
  pnl: string;
  sharpe: string;
  maxDrawdown: string;
  winRate: string;
  aum: string;
  profitShare: string;
  marginBalance: string;
  minimumCopy: string;
  stats: StrategyMetric[];
  assetMix: Array<{ label: string; allocation: string; tone: string }>;
  positions: Array<{
    symbol: string;
    side: 'Long' | 'Short';
    entry: string;
    mark: string;
    pnl: string;
    exposure: string;
  }>;
  trades: Array<{
    date: string;
    symbol: string;
    action: string;
    price: string;
    quantity: string;
    result: string;
  }>;
  transfers: Array<{
    date: string;
    type: string;
    amount: string;
    note: string;
  }>;
  copiers: Array<{
    name: string;
    joined: string;
    allocation: string;
    status: string;
  }>;
}

export const copyTradeTotalInvestmentVnd = 180_000_000;
export const selfTradeTotalInvestmentVnd = 286_000_000;

export const strategySummaryCards = [
  {
    label: 'TỔNG VỐN ĐẦU TƯ',
    value: `${copyTradeTotalInvestmentVnd.toLocaleString('vi-VN')} VND`,
    caption: '+4.8% tháng này',
    tone: 'positive' as const,
  },
  {
    label: 'CHIẾN LƯỢC ĐANG COPY',
    value: '04',
    caption: '2 chiến lược mới được thêm',
    tone: 'neutral' as const,
  },
  {
    label: 'LỢI NHUẬN (PNL)',
    value: '+31.600.000 VND',
    caption: '3 chiến lược đang có lãi',
    tone: 'positive' as const,
  },
  {
    label: 'RỦI RO TRUNG BÌNH',
    value: 'Thấp (2/5)',
    caption: 'An toàn cho tăng trưởng dài hạn',
    tone: 'neutral' as const,
  },
];

export const aiStrategies: StrategyRecord[] = [
  {
    id: '1',
    name: 'Weekly_Fundamental',
    author: 'Nguyễn Minh Đức',
    handle: '@weekly_fundamental',
    avatar: 'NM',
    universe: 'VN100',
    frequency: 'Weekly',
    style: 'Fundamental Rotation',
    status: 'Đang hoạt động',
    thesis:
      'Ưu tiên doanh nghiệp tăng trưởng lợi nhuận bền vững, ROE cao và chất lượng dòng tiền tốt.',
    description:
      "Chiến lược 'Weekly_Fundamental' sàng lọc doanh nghiệp dựa trên tăng trưởng lợi nhuận, biên lợi nhuận và ROE, sau đó xoay vòng theo chất lượng dòng tiền và xác nhận xu hướng.",
    roi30d: '+18.4%',
    ytd: '111.76%',
    pnl: '85.420.000 VND',
    sharpe: '4.46',
    drawdown: '6.82%',
    aum: '2.260.000.000 VND',
    copiers: 715,
    risk: 'Thấp',
    aiScore: 96,
    lastRebalance: '08:45, 12/05/2026',
    profitSplit: '10.00%',
    leverage: 'Ký quỹ 10x đến 20x',
    tags: ['VN100', 'VND', 'High Conviction', 'Copied'],
    overviewMetrics: [
      { label: 'ROI (30D)', value: '+18.4%', tone: 'positive' },
      { label: 'MDD', value: '6.82%', tone: 'negative' },
      { label: 'Copiers', value: '715', tone: 'neutral' },
      { label: 'AUM', value: '2.26B VND', tone: 'neutral' },
    ],
    monthlyReturns: [
      {
        year: '2024',
        months: ['2.4%', '-1.2%', '5.1%', '1.8%', '0.5%', '-0.3%', '-', '-', '-', '-', '-', '-'],
        ytd: '8.3%',
      },
      {
        year: '2023',
        months: ['8.2%', '2.1%', '-3.4%', '4.5%', '-1.8%', '3.2%', '5.6%', '-2.1%', '0.8%', '-0.5%', '7.1%', '1.2%'],
        ytd: '24.9%',
      },
    ],
    assetMix: [
      { label: 'Công nghệ', value: '42%', tone: 'bg-sky-500' },
      { label: 'Ngân hàng', value: '31%', tone: 'bg-emerald-500' },
      { label: 'Bán lẻ', value: '17%', tone: 'bg-amber-400' },
      { label: 'Tiền mặt', value: '10%', tone: 'bg-slate-400' },
    ],
    positions: [
      { symbol: 'FPT', sector: 'Công nghệ', weight: '18%', roi: '+14.8%' },
      { symbol: 'VCB', sector: 'Ngân hàng', weight: '14%', roi: '+9.2%' },
      { symbol: 'ACB', sector: 'Ngân hàng', weight: '11%', roi: '+7.4%' },
      { symbol: 'MWG', sector: 'Bán lẻ', weight: '9%', roi: '+6.3%' },
    ],
    transactions: [
      { date: '12/05/2026', symbol: 'VCB', action: 'Tăng tỷ trọng', price: '92,400', volume: '4,500', pnl: '+2.6%' },
      { date: '10/05/2026', symbol: 'FPT', action: 'Mua mới', price: '126,500', volume: '3,200', pnl: '+4.2%' },
      { date: '08/05/2026', symbol: 'HPG', action: 'Giảm tỷ trọng', price: '31,800', volume: '5,000', pnl: '-0.4%' },
    ],
  },
  {
    id: '2',
    name: 'Momentum_VN30',
    author: 'Lê Anh Quân',
    handle: '@delta_pulse',
    avatar: 'LQ',
    universe: 'VN100',
    frequency: 'Daily',
    style: 'Momentum',
    status: 'Theo dõi',
    thesis:
      'Khai thác xung lực ngắn hạn trong nhóm vốn hóa lớn khi thanh khoản và breadth đồng thuận.',
    description:
      'Chiến lược tập trung vào dòng tiền ngắn hạn của VN30, kết hợp relative strength, breakout volume và kỷ luật stop-loss chặt.',
    roi30d: '+12.1%',
    ytd: '68.40%',
    pnl: '41.180.000 VND',
    sharpe: '3.28',
    drawdown: '8.14%',
    aum: '1.180.000.000 VND',
    copiers: 421,
    risk: 'Trung bình',
    aiScore: 92,
    lastRebalance: '09:10, 12/05/2026',
    profitSplit: '8.00%',
    leverage: 'Ký quỹ 8x đến 12x',
    tags: ['VN100', 'VND', 'Momentum', 'Liquid'],
    overviewMetrics: [
      { label: 'ROI (30D)', value: '+12.1%', tone: 'positive' },
      { label: 'MDD', value: '8.14%', tone: 'negative' },
      { label: 'Copiers', value: '421', tone: 'neutral' },
      { label: 'AUM', value: '1.18B VND', tone: 'neutral' },
    ],
    monthlyReturns: [
      {
        year: '2024',
        months: ['1.8%', '2.2%', '-1.4%', '3.0%', '2.8%', '1.4%', '-', '-', '-', '-', '-', '-'],
        ytd: '9.8%',
      },
      {
        year: '2023',
        months: ['5.6%', '-2.5%', '4.8%', '2.4%', '-1.9%', '6.1%', '2.0%', '-0.8%', '1.6%', '3.2%', '4.5%', '1.1%'],
        ytd: '27.1%',
      },
    ],
    assetMix: [
      { label: 'Công nghệ', value: '28%', tone: 'bg-sky-500' },
      { label: 'Chứng khoán', value: '22%', tone: 'bg-fuchsia-500' },
      { label: 'Ngân hàng', value: '21%', tone: 'bg-emerald-500' },
      { label: 'Tiền mặt', value: '29%', tone: 'bg-slate-400' },
    ],
    positions: [
      { symbol: 'SSI', sector: 'Chứng khoán', weight: '16%', roi: '+11.2%' },
      { symbol: 'FPT', sector: 'Công nghệ', weight: '12%', roi: '+8.4%' },
      { symbol: 'VCI', sector: 'Chứng khoán', weight: '10%', roi: '+5.7%' },
      { symbol: 'MBB', sector: 'Ngân hàng', weight: '9%', roi: '+3.9%' },
    ],
    transactions: [
      { date: '12/05/2026', symbol: 'SSI', action: 'Breakout buy', price: '35,650', volume: '8,000', pnl: '+3.1%' },
      { date: '12/05/2026', symbol: 'VCI', action: 'Thêm vị thế', price: '42,100', volume: '2,400', pnl: '+1.8%' },
      { date: '09/05/2026', symbol: 'MWG', action: 'Chốt lời', price: '64,300', volume: '1,500', pnl: '+5.5%' },
    ],
  },
  {
    id: '3',
    name: 'Quality_Dividend',
    author: 'Trần Hải Nam',
    handle: '@saigon_yield',
    avatar: 'TN',
    universe: 'VN100',
    frequency: 'Bi-weekly',
    style: 'Dividend Quality',
    status: 'Đã copy',
    thesis:
      'Kết hợp cổ tức, tăng trưởng EPS và kỷ luật drawdown để giữ danh mục ổn định trong chu kỳ nhiễu.',
    description:
      'Chiến lược phòng thủ thiên về cổ tức và doanh nghiệp có dòng tiền tốt, giúp cân bằng equity curve khi thị trường biến động.',
    roi30d: '+7.6%',
    ytd: '53.12%',
    pnl: '27.900.000 VND',
    sharpe: '2.85',
    drawdown: '5.30%',
    aum: '860.000.000 VND',
    copiers: 284,
    risk: 'Thấp',
    aiScore: 89,
    lastRebalance: '14:00, 11/05/2026',
    profitSplit: '6.50%',
    leverage: 'Ký quỹ 5x đến 8x',
    tags: ['VN100', 'VND', 'Quality', 'Defensive'],
    overviewMetrics: [
      { label: 'ROI (30D)', value: '+7.6%', tone: 'positive' },
      { label: 'MDD', value: '5.30%', tone: 'negative' },
      { label: 'Copiers', value: '284', tone: 'neutral' },
      { label: 'AUM', value: '860M VND', tone: 'neutral' },
    ],
    monthlyReturns: [
      {
        year: '2024',
        months: ['1.2%', '0.6%', '1.0%', '0.8%', '1.4%', '0.9%', '-', '-', '-', '-', '-', '-'],
        ytd: '5.9%',
      },
      {
        year: '2023',
        months: ['3.4%', '1.5%', '-0.8%', '2.1%', '0.9%', '1.8%', '2.2%', '-0.3%', '1.1%', '0.7%', '2.9%', '0.5%'],
        ytd: '16.0%',
      },
    ],
    assetMix: [
      { label: 'Điện nước', value: '24%', tone: 'bg-cyan-500' },
      { label: 'Ngân hàng', value: '23%', tone: 'bg-emerald-500' },
      { label: 'Cảng biển', value: '20%', tone: 'bg-violet-500' },
      { label: 'Tiền mặt', value: '33%', tone: 'bg-slate-400' },
    ],
    positions: [
      { symbol: 'REE', sector: 'Điện nước', weight: '14%', roi: '+5.9%' },
      { symbol: 'VCB', sector: 'Ngân hàng', weight: '12%', roi: '+4.1%' },
      { symbol: 'GMD', sector: 'Cảng biển', weight: '10%', roi: '+3.6%' },
      { symbol: 'ACB', sector: 'Ngân hàng', weight: '11%', roi: '+3.2%' },
    ],
    transactions: [
      { date: '11/05/2026', symbol: 'REE', action: 'Tái cân bằng', price: '69,400', volume: '1,800', pnl: '+1.2%' },
      { date: '08/05/2026', symbol: 'GMD', action: 'Mua mới', price: '78,300', volume: '1,200', pnl: '+2.4%' },
      { date: '02/05/2026', symbol: 'ACB', action: 'Tăng tỷ trọng', price: '26,400', volume: '4,000', pnl: '+0.9%' },
    ],
  },
];

export const strategyUniverseNotes = [
  'Universe mặc định: VN100',
  'Định giá và PNL hiển thị thống nhất theo VND',
  'Row density được tối ưu cho desktop terminal',
];

export const marketLeaders = [
  { label: 'FPT', metric: 'AI score 92', move: '+2.4%' },
  { label: 'VCB', metric: 'AUM dẫn đầu', move: '+1.1%' },
  { label: 'MWG', metric: 'Momentum mạnh', move: '+3.2%' },
  { label: 'ACB', metric: 'Quality buy', move: '+0.8%' },
];

export const socialPosts: SocialPost[] = [
  {
    id: 'social-1',
    author: 'Mai Anh Research',
    role: 'Lead strategist',
    handle: '@mai_macro',
    avatar: 'MA',
    time: '2 giờ trước',
    content:
      'Dòng tiền nội vẫn duy trì ở công nghệ và bán lẻ. Tôi vừa nâng FPT và MWG trong Weekly_Fundamental vì EPS revision quý gần nhất tiếp tục tích cực.',
    strategyId: '1',
    likes: 142,
    comments: 28,
    reposts: 9,
    roi: '+18.4%',
    drawdown: '6.8%',
    copiers: '715',
  },
  {
    id: 'social-2',
    author: 'Quang Tran',
    role: 'Portfolio manager',
    handle: '@quang_delta',
    avatar: 'QT',
    time: '4 giờ trước',
    content:
      'VN100 giữ nền giá khá tốt. Với Momentum_VN30, tôi tiếp tục ưu tiên các mã có breakout volume rõ và breadth sector đồng thuận, nhưng stop phải siết chặt.',
    strategyId: '2',
    likes: 98,
    comments: 17,
    reposts: 14,
    roi: '+12.1%',
    drawdown: '8.1%',
    copiers: '421',
  },
  {
    id: 'social-3',
    author: 'Lan Chi',
    role: 'Dividend desk',
    handle: '@yield_lab',
    avatar: 'LC',
    time: '7 giờ trước',
    content:
      'Quality_Dividend vẫn giữ vai trò neo phòng thủ. Tôi giảm tỷ trọng cổ phiếu biến động cao và giữ tiền cho nhóm có ROE ổn định và cổ tức tiền mặt đều.',
    strategyId: '3',
    likes: 76,
    comments: 13,
    reposts: 4,
    roi: '+7.6%',
    drawdown: '5.3%',
    copiers: '284',
  },
];

export const marketNews = [
  {
    title: 'VN100 duy trì đà tăng với thanh khoản cải thiện',
    body: 'Nhóm ngân hàng và công nghệ tiếp tục là trụ đỡ chính, trong khi cổ phiếu midcap luân phiên giữ nhịp tăng vừa phải.',
    time: '08:45',
  },
  {
    title: 'Khối nội quay lại dẫn dắt sau 3 phiên tích lũy',
    body: 'Breadth lan tỏa tốt hơn, giúp chiến lược momentum và quality đều có thêm tín hiệu xác nhận xu hướng.',
    time: '10:15',
  },
];

const baseCreditAccountVnd = 500_000_000;

export const buyerStatisticSummaries = {
  'portfolio-1': {
    strategyName: 'Weekly_Fundamental',
    subtitle: 'Detailed breakdown of strategy subscribers',
    totalBuyers: 5,
    totalVolume: '45.2B',
    totalProfitValue: 8_625_000,
    totalProfitLabel: '8.625.000 VND',
    aum: '36.2M',
    buyers: [
      { name: 'user_8492***', avatar: 'U', joined: '2023-10-24', amount: '150,000,000', roi: '+12.4%', tone: 'positive' as const },
      { name: 'user_1102***', avatar: 'A', joined: '2023-10-22', amount: '45,500,000', roi: '+8.1%', tone: 'positive' as const },
      { name: 'user_9931***', avatar: 'T', joined: '2023-10-18', amount: '210,000,000', roi: '-2.3%', tone: 'negative' as const },
      { name: 'user_4412***', avatar: 'M', joined: '2023-10-15', amount: '12,000,000', roi: '+15.7%', tone: 'positive' as const },
      { name: 'user_7720***', avatar: 'K', joined: '2023-10-10', amount: '85,000,000', roi: '+5.2%', tone: 'positive' as const },
    ],
  },
} as const;

const totalSellingCreditVnd = Object.values(buyerStatisticSummaries).reduce(
  (sum, item) => sum + item.totalProfitValue,
  0,
);

export const userProfile = {
  name: 'Alex Chen',
  handle: '@alextrades_alpha',
  bio:
    'Nhà giao dịch định lượng chuyên về chiến lược tăng trưởng kỹ thuật. Quản lý 4.2 tỷ VND AUM, tập trung minh bạch hiệu suất và phát triển cộng đồng copy-trading.',
  followers: '12.4K',
  following: '482',
  winRate: '68.2%',
  creditAccount: `${(baseCreditAccountVnd + totalSellingCreditVnd).toLocaleString('vi-VN')} VND`,
  investmentAccount: `${(copyTradeTotalInvestmentVnd + selfTradeTotalInvestmentVnd).toLocaleString('vi-VN')} VND`,
  netLiquidValue: `${(copyTradeTotalInvestmentVnd + selfTradeTotalInvestmentVnd).toLocaleString('vi-VN')} VND`,
  monthlyPnl: '+42.019.120 VND',
  followingStrategies: [
    { id: '1', name: 'VND Index Momentum', allocation: '12 Tỷ VND', pnl: '+18.4%', trader: 'Alex Mercer' },
    { id: '2', name: 'Growth Rotation Pro', allocation: '45 Tỷ VND', pnl: '+12.1%', trader: 'Sarah Jenkins' },
  ],
  activeStrategies: [
    {
      id: 'portfolio-1',
      universe: '3 sàn vốn...',
      name: 'Weekly_Fundamental',
      frequency: 'Hàng tuần',
      profit: '55.3%',
      ytd: '3.7%',
      sharpe: '1.73',
      volatility: '25.5%',
      credit: buyerStatisticSummaries['portfolio-1'].totalProfitLabel,
      status: 'Selling',
    },
    {
      id: 'portfolio-2',
      universe: '3 sàn vốn...',
      name: 'Momentum_Tech',
      frequency: 'Hàng tuần',
      profit: '+12.1%',
      ytd: '-6.8%',
      sharpe: '1.28',
      volatility: '29.3%',
      credit: '-',
      status: 'Public',
    },
    {
      id: 'portfolio-3',
      universe: 'VN100',
      name: 'Alpha_Growth',
      frequency: 'Hàng tuần',
      profit: '24.1%',
      ytd: '12.8%',
      sharpe: '1.92',
      volatility: '18.4%',
      credit: '-',
      status: 'Public',
    },
  ],
  copiedStrategies: [
    { name: 'Weekly_Fundamental', invested: '420.000.000 VND', pnl: '+61.200.000 VND', status: 'Đang chạy' },
    { name: 'Momentum_VN30', invested: '280.000.000 VND', pnl: '+32.540.000 VND', status: 'Theo dõi sát' },
    { name: 'Quality_Dividend', invested: '225.000.000 VND', pnl: '+18.830.000 VND', status: 'Phòng thủ' },
  ],
  recentActivities: [
    ['BUY', 'HPG', 'Weekly_Fundamental', '120 Shares', 'PENDING', 'Oct 24, 2024'],
    ['SELL', 'VCB', 'Momentum_Tech', '50 Shares', '+2.480.000 VND', 'Oct 23, 2024'],
    ['BUY', 'FPT', 'VND Index Momentum', '200 Shares', '-1.120.000 VND', 'Oct 22, 2024'],
  ],
  posts: [
    {
      id: 'profile-post-1',
      title: 'Tăng tỷ trọng FPT sau khi tín hiệu breakout được xác nhận',
      body: 'Giữ nguyên bối cảnh VN100 và ưu tiên nhóm có EPS revision tích cực trong 2 quý gần nhất. Thanh khoản vẫn là điều kiện bắt buộc trước khi mở full size.',
      stats: '198 likes • 31 comments',
    },
    {
      id: 'profile-post-2',
      title: 'Checklist kiểm soát drawdown cho desk copy-trading',
      body: 'Khi equity curve đi ngang, giảm exposure trước khi tìm alpha mới. Đừng tăng đòn bẩy chỉ để bù lại lợi nhuận đã mất trong những phiên thị trường thiếu breadth.',
      stats: '126 likes • 18 comments',
    },
  ],
};

export const traderProfiles: Record<string, TraderProfile> = {
  '1': {
    id: '1',
    displayName: 'Nguyễn Minh Đức',
    handle: '@weekly_fundamental',
    avatar: 'NM',
    strategyName: 'Weekly_Fundamental',
    universe: 'VN100',
    bio:
      "Quản lý chiến lược 'Weekly_Fundamental' với trọng tâm là tăng trưởng lợi nhuận, chất lượng dòng tiền và xác nhận xu hướng ở nhóm dẫn dắt VN100.",
    verified: true,
    rating: '4.8',
    dailyTrades: 141,
    activeCopiers: '178/200',
    totalCopiers: 715,
    closedPortfolios: 3,
    leverage: 'Ký quỹ 10x đến 20x',
    roi: '111.76%',
    pnl: '85.420.000 VND',
    sharpe: '4.46',
    maxDrawdown: '6.82%',
    winRate: '62.34%',
    aum: '2.260.000.000 VND',
    profitShare: '10.00%',
    marginBalance: '1.812.000.000 VND',
    minimumCopy: '250.000 VND',
    stats: [
      { label: 'AUM', value: '2.26B VND' },
      { label: 'Win Rate', value: '62.34%', tone: 'positive' },
      { label: 'Sharpe', value: '4.46', tone: 'positive' },
      { label: 'MDD', value: '6.82%', tone: 'negative' },
    ],
    assetMix: [
      { label: 'Công nghệ', allocation: '42%', tone: 'bg-sky-500' },
      { label: 'Ngân hàng', allocation: '31%', tone: 'bg-emerald-500' },
      { label: 'Bán lẻ', allocation: '17%', tone: 'bg-amber-400' },
      { label: 'Tiền mặt', allocation: '10%', tone: 'bg-slate-400' },
    ],
    positions: [
      { symbol: 'FPT', side: 'Long', entry: '126,500', mark: '131,800', pnl: '+4.18%', exposure: '18%' },
      { symbol: 'VCB', side: 'Long', entry: '89,700', mark: '92,400', pnl: '+3.01%', exposure: '14%' },
      { symbol: 'ACB', side: 'Long', entry: '25,950', mark: '26,600', pnl: '+2.50%', exposure: '11%' },
      { symbol: 'MWG', side: 'Long', entry: '61,200', mark: '64,300', pnl: '+5.07%', exposure: '9%' },
    ],
    trades: [
      { date: '12/05/2026', symbol: 'VCB', action: 'Tăng tỷ trọng', price: '92,400', quantity: '4,500', result: '+2.6%' },
      { date: '10/05/2026', symbol: 'FPT', action: 'Mua mới', price: '126,500', quantity: '3,200', result: '+4.2%' },
      { date: '08/05/2026', symbol: 'HPG', action: 'Giảm tỷ trọng', price: '31,800', quantity: '5,000', result: '-0.4%' },
    ],
    transfers: [
      { date: '11/05/2026', type: 'Nạp thêm ký quỹ', amount: '+120.000.000 VND', note: 'Tăng room cho nhóm ngân hàng' },
      { date: '03/05/2026', type: 'Rút tiền', amount: '-40.000.000 VND', note: 'Khóa bớt lợi nhuận tháng' },
    ],
    copiers: [
      { name: 'Tran Hoang', joined: '03/2026', allocation: '65.000.000 VND', status: 'Đang copy' },
      { name: 'Linh Vu', joined: '12/2025', allocation: '110.000.000 VND', status: 'Tăng vốn' },
      { name: 'Bao Nguyen', joined: '10/2025', allocation: '52.000.000 VND', status: 'Ổn định' },
    ],
  },
  '2': {
    id: '2',
    displayName: 'Lê Anh Quân',
    handle: '@delta_pulse',
    avatar: 'LQ',
    strategyName: 'Momentum_VN30',
    universe: 'VN100',
    bio:
      'Lead trader của Momentum_VN30, chuyên khai thác breakout volume và relative strength ở nhóm vốn hóa lớn với thời gian nắm giữ ngắn.',
    verified: true,
    rating: '4.7',
    dailyTrades: 89,
    activeCopiers: '104/200',
    totalCopiers: 421,
    closedPortfolios: 5,
    leverage: 'Ký quỹ 8x đến 12x',
    roi: '68.40%',
    pnl: '41.180.000 VND',
    sharpe: '3.28',
    maxDrawdown: '8.14%',
    winRate: '58.20%',
    aum: '1.180.000.000 VND',
    profitShare: '8.00%',
    marginBalance: '930.000.000 VND',
    minimumCopy: '200.000 VND',
    stats: [
      { label: 'AUM', value: '1.18B VND' },
      { label: 'Win Rate', value: '58.20%', tone: 'positive' },
      { label: 'Sharpe', value: '3.28', tone: 'positive' },
      { label: 'MDD', value: '8.14%', tone: 'negative' },
    ],
    assetMix: [
      { label: 'Chứng khoán', allocation: '22%', tone: 'bg-fuchsia-500' },
      { label: 'Công nghệ', allocation: '28%', tone: 'bg-sky-500' },
      { label: 'Ngân hàng', allocation: '21%', tone: 'bg-emerald-500' },
      { label: 'Tiền mặt', allocation: '29%', tone: 'bg-slate-400' },
    ],
    positions: [
      { symbol: 'SSI', side: 'Long', entry: '34,600', mark: '35,650', pnl: '+3.03%', exposure: '16%' },
      { symbol: 'VCI', side: 'Long', entry: '41,350', mark: '42,100', pnl: '+1.81%', exposure: '10%' },
      { symbol: 'FPT', side: 'Long', entry: '124,900', mark: '131,800', pnl: '+5.52%', exposure: '12%' },
    ],
    trades: [
      { date: '12/05/2026', symbol: 'SSI', action: 'Breakout buy', price: '35,650', quantity: '8,000', result: '+3.1%' },
      { date: '12/05/2026', symbol: 'VCI', action: 'Thêm vị thế', price: '42,100', quantity: '2,400', result: '+1.8%' },
      { date: '09/05/2026', symbol: 'MWG', action: 'Chốt lời', price: '64,300', quantity: '1,500', result: '+5.5%' },
    ],
    transfers: [
      { date: '09/05/2026', type: 'Nạp thêm ký quỹ', amount: '+60.000.000 VND', note: 'Mở thêm vị thế momentum' },
      { date: '28/04/2026', type: 'Rút tiền', amount: '-25.000.000 VND', note: 'Giảm leverage cuối tuần' },
    ],
    copiers: [
      { name: 'Gia Pham', joined: '01/2026', allocation: '80.000.000 VND', status: 'Đang copy' },
      { name: 'Trung Kien', joined: '11/2025', allocation: '45.000.000 VND', status: 'Thử nghiệm' },
      { name: 'Ha Nguyen', joined: '02/2026', allocation: '70.000.000 VND', status: 'Tăng vốn' },
    ],
  },
  '3': {
    id: '3',
    displayName: 'Trần Hải Nam',
    handle: '@saigon_yield',
    avatar: 'TN',
    strategyName: 'Quality_Dividend',
    universe: 'VN100',
    bio:
      'Tập trung cổ tức, ROE và chất lượng lợi nhuận để giữ danh mục ổn định trong các giai đoạn thị trường biến động mạnh.',
    verified: false,
    rating: '4.6',
    dailyTrades: 38,
    activeCopiers: '72/150',
    totalCopiers: 284,
    closedPortfolios: 2,
    leverage: 'Ký quỹ 5x đến 8x',
    roi: '53.12%',
    pnl: '27.900.000 VND',
    sharpe: '2.85',
    maxDrawdown: '5.30%',
    winRate: '64.10%',
    aum: '860.000.000 VND',
    profitShare: '6.50%',
    marginBalance: '702.000.000 VND',
    minimumCopy: '150.000 VND',
    stats: [
      { label: 'AUM', value: '860M VND' },
      { label: 'Win Rate', value: '64.10%', tone: 'positive' },
      { label: 'Sharpe', value: '2.85', tone: 'positive' },
      { label: 'MDD', value: '5.30%', tone: 'negative' },
    ],
    assetMix: [
      { label: 'Điện nước', allocation: '24%', tone: 'bg-cyan-500' },
      { label: 'Ngân hàng', allocation: '23%', tone: 'bg-emerald-500' },
      { label: 'Cảng biển', allocation: '20%', tone: 'bg-violet-500' },
      { label: 'Tiền mặt', allocation: '33%', tone: 'bg-slate-400' },
    ],
    positions: [
      { symbol: 'REE', side: 'Long', entry: '67,800', mark: '69,400', pnl: '+2.36%', exposure: '14%' },
      { symbol: 'GMD', side: 'Long', entry: '76,500', mark: '78,300', pnl: '+2.35%', exposure: '10%' },
      { symbol: 'VCB', side: 'Long', entry: '90,600', mark: '92,400', pnl: '+1.99%', exposure: '12%' },
    ],
    trades: [
      { date: '11/05/2026', symbol: 'REE', action: 'Tái cân bằng', price: '69,400', quantity: '1,800', result: '+1.2%' },
      { date: '08/05/2026', symbol: 'GMD', action: 'Mua mới', price: '78,300', quantity: '1,200', result: '+2.4%' },
      { date: '02/05/2026', symbol: 'ACB', action: 'Tăng tỷ trọng', price: '26,400', quantity: '4,000', result: '+0.9%' },
    ],
    transfers: [
      { date: '05/05/2026', type: 'Nạp thêm ký quỹ', amount: '+30.000.000 VND', note: 'Tăng vị thế phòng thủ' },
      { date: '21/04/2026', type: 'Rút tiền', amount: '-18.000.000 VND', note: 'Cân đối tiền mặt' },
    ],
    copiers: [
      { name: 'Thanh Le', joined: '02/2026', allocation: '38.000.000 VND', status: 'Ổn định' },
      { name: 'Minh Chau', joined: '12/2025', allocation: '55.000.000 VND', status: 'Đang copy' },
      { name: 'Dat Pham', joined: '03/2026', allocation: '22.000.000 VND', status: 'Mới tham gia' },
    ],
  },
};

export function getStrategyById(id?: string) {
  return aiStrategies.find((strategy) => strategy.id === id) ?? aiStrategies[0];
}

export function getTraderProfile(id?: string) {
  return traderProfiles[id ?? ''] ?? traderProfiles['1'];
}
