web application/stitch/projects/16694675428423879998/screens/76ae1af61b984c60ab5688d6ec8315ee

# Project Brief: TradeCore Platform Upgrade (AI Ranking & Social Trading)

## 1. Project Objective

Transform the TradeCore platform into an institutional-grade social trading hub. The primary focus is upgrading the "AI Ranking" module to provide a seamless, data-rich experience that transitions users from broad market discovery to deep quantitative strategy analysis and personal portfolio management.

## 2. Core Modules & Functionality

### A. Strategy Discovery Hub (AI Ranking)

The central nerve center for finding top-performing assets and strategies.

- **Potential Stocks (Default)**: A high-density grid view showing technical sentiment and price action for top Vietnam stocks (VN100).
- **Following & Copied Tabs**: Dedicated sub-navigation for users to manage their active and monitored strategies.
- **Strategy Visibility Labels**: In `Chiến lược của tôi`, the strategy list must show whether each strategy is `Public` or `Private` in a dedicated column beside status.
- **Copied Strategy Position Modal**: Clicking a strategy inside the copied-strategies table opens a dedicated copied-position popup with capital tracking, PNL, trade history, risk metrics, portfolio allocation, and copy-management actions.
- **Visual Reference**: {{DATA:SCREEN:SCREEN_126}}, {{DATA:SCREEN:SCREEN_160}}

### B. Social Feed (Engagement Hub)

Integrating real-time market sentiment with strategy performance.

- **News Feed**: A curated list of market updates and user-generated analyses.
- **Trader Quick Profile Popup**: Clicking any trader identity inside the News feed opens an in-context trader popup with follower/following, win rate, avg PNL, monthly P&L, performance trend, and managed strategies with visibility state.
- **Strategies List**: A filterable catalog of lead traders, ranked by ROI, PNL, and AUM.
- **Advanced Filtering**: Modal-based filtering across metrics like MDD, Copy Traders, and Sharpe Ratio.
- **Leaderboards**: Side-rail widgets for "Best Performance" and "Top Copy Trading" to drive social proof.
- **Visual Reference**: {{DATA:SCREEN:SCREEN_152}}, {{DATA:SCREEN:SCREEN_104}}, {{DATA:SCREEN:SCREEN_147}}

### C. Technical Strategy Analysis

High-fidelity views for quantitative due diligence.

- **Strategy Detail Pop-up**: A comprehensive 65/35 split view featuring:
  - Cumulative Profit & Monthly ROI Heatmaps.
  - Strategy Volatility vs. Market Index.
  - Interactive Asset Allocation and Strategy Summaries.
- **Copied Strategy Detail Pop-up**: A separate modal for already-copied strategies featuring:
  - Invested capital, current capital, and copy PNL.
  - Recent order history tied to the copied position.
  - Risk metric cards (MDD, Sharpe, Beta/Volatility).
  - Portfolio allocation donut and capital-management actions such as stop copy, adjust capital, and top-up.
- **Trader Profiles**: Deep-dive pages showing historical order logs, transfer history, and social copier lists.
- **Visual Reference**: {{DATA:SCREEN:SCREEN_137}}, {{DATA:SCREEN:SCREEN_116}}, {{DATA:SCREEN:SCREEN_105}}

### D. User Management (Profile)

The user's personal command center for tracking impact and sharing insights.

- **Portfolio Tab**: Visualizes the user's personal equity growth and active strategy copies.
- **Dual Capital Model**: The shell and profile experience must distinguish between:
  - `Credit Account`: available idle capital.
  - `Investment Account`: capital already allocated into copied or managed strategies.
- **Following Strategies Modal**: The `Following Strategies` block must expose a `View All` action that opens a dedicated modal with search/filter and a `More Detail` CTA routing to `Strategy > Chiến lược đã copy`.
- **Buyer Statistics Popup**: In `Danh sách các chiến lược`, strategy rows with `Selling` status must open a buyer-statistics popup showing subscriber metrics and buyer-level performance rows.
- **Post Tab**: A personal feed of the user's social contributions.
- **Visual Reference**: {{DATA:SCREEN:SCREEN_35}}, {{DATA:SCREEN:SCREEN_166}}

## 3. Design Specifications

### Visual Identity: ProTrade Social

- **Aesthetic**: Professional, quantitative, transparent.
- **Color System**: Light theme with a primary brand accent of `#1a1c1e`. High-contrast typography for data density.
- **Shape System**: Consistent 8px corner roundness on all cards, inputs, and primary action buttons.
- **Typography**: Inter (Sans-serif) scaled for readability in complex financial tables.
- **Design System Reference**: {{DATA:DESIGN_SYSTEM:DESIGN_SYSTEM_3}}

### Localization & Context

- **Market Focus**: Vietnam Stock Market (Universe: VN100).
- **Currency**: Vietnamese Dong (VND).
- **Language**: English for functional navigation tabs; Vietnamese for strategy content, market descriptions, and technical summaries.

## 4. Primary User Journeys

1. **Discovery**: AI Ranking (Strategy Hub) → Social Feed (News) → Filter Strategies.
2. **Social Review**: Social Feed (News) → Click trader identity → Open trader quick-profile popup → Inspect managed strategies.
3. **Analysis**: Click Strategy Card → Open Detail Pop-up (Technical Review) → View Trader Profile (History Review).
4. **Execution**: Click "Copy" → Localized Modal Configuration → Invest.
5. **Copied Position Review**: Strategy > Copied → Click copied strategy row → Open copied-position popup → Adjust capital / top up / stop copy.
6. **Monitoring**: Navigate to Profile → Review `Credit Account` vs `Investment Account` → Track Equity Growth impact from the new copy.
7. **Buyer Review**: Profile > Portfolio → Danh sách các chiến lược → Click a `Selling` strategy row → Open buyer-statistics popup.
8. **Following Review**: Profile > Portfolio → Following Strategies → `View All` modal → `More Detail` routes into `Strategy > Chiến lược đã copy`.

---

*Created: May 2024*
*Status: Finalized Requirements for AI Ranking V2*
