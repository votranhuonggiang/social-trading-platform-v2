
web application/stitch/projects/16694675428423879998/screens/40ee0b6598644a20bb61993fa89a127c

# Product Requirements Document (PRD): AI Ranking Upgrade

## Project Overview

Upgrade the "AI Ranking" module to provide a comprehensive, multi-dimensional view for users, integrating Strategy discovery, Social Feeds, and detailed analysis through Trader Profiles.

## 1. User Flows

### Flow A: Strategy Discovery (Default Entry)

1. **Entry Point**: User clicks "AI Ranking" in the sidebar.
2. **Strategy Hub**: Defaults to the "Strategy" view, showing "Cổ phiếu tiềm năng" (Potential Stocks).
   - *Reference*: {{DATA:SCREEN:SCREEN_126}}
3. **Following View**: User clicks the "Chiến lược đang theo dõi" tab.
   - *Reference*: {{DATA:SCREEN:SCREEN_121}}
4. **Copied Strategies**: User clicks the "Chiến lược đã copy" tab.
   - *Reference*: {{DATA:SCREEN:SCREEN_159}}
5. **Copied Strategy Detail**: User clicks a specific strategy name inside the "Chi tiết các chiến lược đã sao chép" block to open a dedicated copied-strategy popup.
   - *Behavior*: This modal is separate from the generic strategy detail popup and focuses on the user's copied position.
   - *Reference*: `stitch_strategy_social_hub (1)/stitch_strategy_social_hub/Chi_tiết_chiến_lược_đã_sao_chép_Popup`

### Flow B: Social Engagement (Social Feed)

1. **Entry Point**: User clicks "Social Feed" in the top navigation.
2. **News Feed**: Defaults to the market news and user posts.
   - *Reference*: {{DATA:SCREEN:SCREEN_181}}
3. **Trader Quick Profile**: User clicks any trader identity in the News feed to open an in-context trader profile popup.
   - *Behavior*: The popup stays on top of the News feed and shows follower/following metrics, win rate, avg PNL, monthly P&L, performance chart, and managed strategies with Public/Private visibility.
   - *Reference*: `stitch_strategy_social_hub (1)/stitch_strategy_social_hub/user_profile_popup`
4. **Leaderboard/Strategies**: User clicks the "Strategies" tab within Social Feed to see top performers.
   - *Reference*: {{DATA:SCREEN:SCREEN_147}}
5. **Filtering**: User clicks the "Filter" button in the Strategies tab to open the advanced filter settings.
   - *Reference*: {{DATA:SCREEN:SCREEN_103}}

### Flow C: Detailed Analysis (Pop-up & Profiles)

1. **Action**: User clicks on any specific strategy card or row.
2. **Strategy Detail Pop-up**: A comprehensive 65/35 split view showing cumulative profit, monthly ROI, volatility, and transaction history.
   - *Reference*: {{DATA:SCREEN:SCREEN_136}}
3. **Copied Strategy Pop-up**: When the interaction originates from the copied-strategies table, the system must open a copied-position detail popup showing invested capital, realized/unrealized PNL, current capital, trade history, risk metrics, portfolio allocation, and copy-management actions.
   - *Reference*: `stitch_strategy_social_hub (1)/stitch_strategy_social_hub/Chi_tiết_chiến_lược_đã_sao_chép_Popup`
4. **Trader Profile**: Detailed view of the trader's historical performance, transfers, and copier list.
   - *Reference*: {{DATA:SCREEN:SCREEN_155}}

### Flow D: Personal Portfolio (User Profile)

1. **Entry Point**: User clicks "Profile" in the top navigation.
2. **User Activity (Post)**: Defaults to showing the user's social contributions and analysis.
   - *Reference*: {{DATA:SCREEN:SCREEN_64}}
3. **Portfolio View**: User clicks the "Portfolio" tab to track their equity growth and active strategy copies.
   - *Reference*: {{DATA:SCREEN:SCREEN_35}}
4. **Account Summary Sidebar**: The persistent left rail shows two capital buckets for the trader:
   - `Credit Account`: idle capital available for funding strategies.
   - `Investment Account`: capital already allocated to active strategies.
   - *Behavior*: `Credit Account = tiền dư`, while `Investment Account` represents the capital distributed into strategies.
   - *Reference*: `stitch_strategy_social_hub (1)/stitch_strategy_social_hub/user_profile_updated_activity_following`
5. **Buyer Statistics Popup**: Inside `Profile > Portfolio > Danh sách các chiến lược`, clicking a strategy name with `Trạng thái = Selling` opens a buyer-statistics popup for that strategy.
   - *Behavior*: The popup focuses on subscriber count, copied volume, total profit, AUM, and buyer-level performance rows.
   - *Reference*: `stitch_strategy_social_hub (1)/stitch_strategy_social_hub/user_profile_buyer_statistic_popup`
6. **Following Strategies Popup**: Inside `Profile > Portfolio > Following Strategies`, clicking `View All` opens a dedicated full-list modal.
   - *Behavior*: The modal supports search/filter, and clicking `More Detail` routes the user to `Strategy > Chiến lược đã copy`.
   - *Reference*: `stitch_strategy_social_hub (1)/stitch_strategy_social_hub/user_profile_following trategies_popup`

## 2. Functional Requirements

- **Nested Navigation**: Support for top-level module switching (Strategy, Social Feed, Profile) with localized sub-tabs.
- **Data Persistence**: Maintain "VN100" universe context and VND currency localization.
- **Interactive Modals**: Detailed technical data must be presented in unified-scroll pop-ups.
- **Copied Strategy Drilldown**: Rows in "Chi tiết các chiến lược đã sao chép" must open a dedicated position-management popup with its own header, capital summary, trade history, risk cards, allocation donut, and capital-management CTAs.
- **Trader Quick Profile Popup**: Clicking trader identity blocks in `Social Feed > News` must open a compact profile popup with performance metrics, trend chart, and a managed-strategies table.
- **Strategy Visibility Metadata**: In `Strategy > Chiến lược của tôi`, the strategy list table must expose a visibility column adjacent to status, distinguishing `Public` and `Private` strategies.
- **Dual Account Sidebar Summary**: The global left sidebar must expose both `Credit Account` and `Investment Account`, plus their localized VND totals, matching the Profile experience.
- **Portfolio Strategy Status Drilldown**: In `Profile > Portfolio > Danh sách các chiến lược`, any row with `Selling` status must open a buyer-statistics popup rather than a generic strategy detail popup.
- **Following Strategies Expansion Flow**: `Profile > Portfolio > Following Strategies` must support `View All` to open a dedicated modal and a secondary `More Detail` CTA that routes to the copied-strategy dashboard.

## 3. Design Constraints

- **Design System**: ProTrade Social ({{DATA:DESIGN_SYSTEM:DESIGN_SYSTEM_3}}).
- **Styling**: 8px corner roundness, professional light theme, and high-density quantitative charts.
- **Language**: English navigation labels with Vietnamese content and strategy descriptions.
