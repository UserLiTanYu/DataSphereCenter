# DataSphereCenter

中文名：**数境中枢**

DataSphereCenter 是一个面向数据可视化大屏场景的 Vue 前端项目。项目当前支持 **Mock 动态数据演示**，后续也可以通过环境变量切换到真实 API 轮询模式，页面组件无需改动。

## 技术栈

- Vue 3
- Vite
- TypeScript
- Pinia
- Vue Router
- ECharts
- Axios
- Vitest
- Playwright
- ESLint
- Prettier
- Stylelint

## 核心能力

- 科技驾驶舱风格大屏界面
- 指标卡、趋势图、分类占比、区域排行、实时告警、资源使用率
- Mock/API 双模式数据源
- Mock 模式下数据自动变化
- API 模式下支持定时轮询真实接口
- 自动刷新、暂停/继续刷新、最后更新时间展示
- 单元测试、端到端测试和代码质量检查

## 目录结构

```text
src/
├─ app/                 # 应用初始化、路由、插件注册
├─ assets/              # 图片、字体等静态资源
├─ components/          # 通用组件
├─ layouts/             # 大屏布局组件
├─ views/               # 页面视图
├─ charts/              # ECharts 图表组件
├─ services/            # 数据服务层
├─ mock/                # Mock 数据和动态数据生成器
├─ stores/              # Pinia 状态管理
├─ types/               # TypeScript 类型定义
├─ utils/               # 工具函数和日志工具
├─ hooks/               # Vue 组合式函数
├─ config/              # 全局配置
├─ styles/              # 全局样式
└─ tests/               # 单元测试和端到端测试
```

## 本地启动

```bash
npm install
npm run dev
```

默认访问地址：

```text
http://127.0.0.1:5173
```

## 常用命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 类型检查并构建项目
npm run type-check   # TypeScript 类型检查
npm run lint         # 运行 ESLint 和 Stylelint
npm run format       # 使用 Prettier 格式化代码
npm run test         # 运行单元测试和端到端测试
npm run test:unit    # 运行 Vitest 单元测试
npm run test:e2e     # 运行 Playwright 端到端测试
```

## Mock/API 切换

项目通过统一数据服务层隔离页面和数据来源：

```text
页面组件 -> stores/services -> dataProvider -> mockProvider 或 apiProvider
```

默认使用动态 Mock：

```env
VITE_DATA_SOURCE=mock
```

切换真实 API：

```env
VITE_DATA_SOURCE=api
VITE_API_BASE_URL=/api
```

真实接口需要提供：

```text
GET /dashboard
```

返回结构请参考 [src/types/dashboard.ts](src/types/dashboard.ts)。

## 动态数据说明

Mock 模式下，`src/mock/dashboard.generator.ts` 会生成平滑变化的数据：

- 今日访问量持续增长
- 活跃用户数上下波动
- 数据接入量缓慢增长
- 告警数量动态变化
- 趋势图持续更新最新时间点
- 分类占比、区域排行、资源使用率轻微波动
- 实时告警列表随机新增或更新状态

自动刷新逻辑由 Pinia store 管理：

- `refreshDashboard()`：刷新大屏数据
- `startAutoRefresh()`：开始定时刷新
- `stopAutoRefresh()`：停止定时刷新
- `toggleAutoRefresh()`：暂停或继续刷新
- `lastUpdated`：最后更新时间
- `refreshing`：刷新状态

默认刷新间隔为 3 秒。

## 测试说明

- `Vitest` 用于单元测试，覆盖格式化工具和动态 Mock 数据生成器。
- `Playwright` 用于端到端测试，验证首页标题和核心指标可见。

## 代码质量

- `ESLint` 检查 TypeScript 和 Vue 代码。
- `Stylelint` 检查 CSS 和 Vue 样式。
- `Prettier` 统一格式。
- `vue-tsc` 做类型检查。

## 开源协议

本项目使用 MIT License，详见 [LICENSE](LICENSE)。

