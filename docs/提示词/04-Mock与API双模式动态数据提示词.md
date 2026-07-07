# Mock 与 API 双模式动态数据提示词

## 使用场景

这份提示词用于让 AI 编程助手在现有 **DataSphereCenter / 数境中枢** 项目基础上，实现“Mock + API 双模式动态数据”能力。

目标是让数据大屏从“静态写死数据”升级为“可自动变化、可演示、后期可接真实接口”的动态数据大屏。

## 完整提示词

```text
你是一名资深数据大屏前端架构师、Vue 工程化专家和实时数据可视化专家。

当前项目是一个已经可以运行的数据可视化大屏项目。

项目英文名：DataSphereCenter
项目中文名：数境中枢

现有技术栈：

1. Vue 3
2. Vite
3. TypeScript
4. Pinia
5. Vue Router
6. ECharts
7. Axios
8. Vitest
9. Playwright
10. ESLint
11. Prettier
12. Stylelint

当前项目已经具备：

1. 科技驾驶舱风格界面
2. Mock 数据
3. services 数据服务层
4. mockProvider 和 apiProvider
5. VITE_DATA_SOURCE=mock/api 数据源切换基础
6. 图表、指标卡、实时告警、资源使用率等模块

目前问题：

页面数据基本是静态写死的，刷新过程中不会持续变化。请你在不破坏现有工程结构的前提下，实现“Mock + API 双模式动态数据”能力。

一、核心目标

请实现以下能力：

1. Mock 模式下，数据可以自动变化。
2. API 模式下，支持定时轮询真实接口。
3. 页面组件不直接关心数据来自 Mock 还是 API。
4. 保留当前 services -> dataProvider -> mockProvider/apiProvider 的架构。
5. 增加数据自动刷新能力。
6. 增加最后更新时间。
7. 增加刷新状态。
8. 可选增加暂停/继续刷新能力。
9. 图表、指标卡、告警、资源使用率都能体现数据变化。
10. 完成后启动项目并自动打开浏览器查看效果。

二、数据源模式要求

继续使用环境变量切换数据来源：

VITE_DATA_SOURCE=mock
VITE_DATA_SOURCE=api

默认使用：

VITE_DATA_SOURCE=mock

数据流必须保持：

页面组件
 -> store / service
 -> dataProvider
 -> mockProvider 或 apiProvider

要求：

1. 页面组件不能直接 import mock 数据。
2. 页面组件不能直接调用 axios。
3. Mock 和 API 必须对外返回相同的数据结构。
4. 后期切换真实 API 时，页面组件无需修改。

三、Mock 动态数据要求

在 mock 模式下，请实现动态数据生成能力。

建议新增或优化以下模块：

1. src/mock/dashboard.mock.ts
2. src/mock/dashboard.generator.ts
3. src/services/providers/mockProvider.ts
4. src/services/dashboardService.ts
5. src/stores/dashboardStore.ts

Mock 数据变化要求：

1. 今日访问量可以持续增长，并带少量随机波动。
2. 活跃用户数可以上下波动。
3. 数据接入量可以缓慢增长。
4. 告警数量可以上下变化。
5. 业务趋势折线图每次刷新时追加或更新最新时间点。
6. 分类占比数据可以轻微变化，但总量保持合理。
7. 区域排行数据可以轻微波动。
8. 资源使用率在合理范围内波动，例如 40% 到 90%。
9. 实时告警列表可以随机新增、更新状态或调整排序。
10. 生成的数据要看起来真实，不要完全随机到不合理。

注意：

1. 不要为了动态效果引入大型依赖。
2. 动态 Mock 逻辑要封装，不能散落在页面组件里。
3. 数据波动要平滑，不能每次刷新跳动过大。
4. 类型必须符合 src/types/dashboard.ts。

四、API 轮询要求

在 api 模式下，请保留或完善 apiProvider。

要求：

1. 使用 axios 请求真实接口。
2. 默认接口可以是 GET /dashboard。
3. 请求地址通过 VITE_API_BASE_URL 配置。
4. API 返回结构必须与 DashboardData 类型一致。
5. 请求失败时使用 logger 记录错误。
6. 请求失败时页面不能崩溃。
7. 可以保留上一次成功数据，并显示错误状态或提示。

五、自动刷新要求

请在 store 或 composable 中实现自动刷新逻辑，不要把定时器直接散落在页面里。

建议实现：

1. refreshInterval，默认 3000ms 或 5000ms。
2. startAutoRefresh()
3. stopAutoRefresh()
4. refreshDashboard()
5. lastUpdated
6. refreshing
7. refreshError

要求：

1. 页面进入时自动加载数据。
2. 页面进入后自动定时刷新。
3. 页面卸载时清理定时器，避免内存泄漏。
4. 刷新过程中不要造成页面闪烁。
5. 首次加载可以显示 loading。
6. 后续刷新只更新数据，不要整屏 loading。
7. 如果已有 Pinia store，请优先在 store 中管理这些状态。

六、页面展示要求

请在页面上展示动态数据状态。

建议增加：

1. 最后更新时间
2. 数据刷新状态，例如“实时刷新中”
3. 当前数据模式，例如 Mock Mode 或 API Mode
4. 可选的暂停/继续刷新按钮

展示位置建议：

1. 顶部状态栏
2. 页面右上角信息模块
3. 或标题栏附近

要求：

1. 不要破坏当前科技驾驶舱视觉风格。
2. 不要让状态信息占用太多空间。
3. 文案要简洁。
4. 小屏幕下不能重叠。

七、图表更新体验要求

数据刷新时，请保证：

1. ECharts 能平滑更新。
2. 折线图变化明显。
3. 饼图、柱状图不会剧烈闪烁。
4. 指标卡数字变化自然。
5. 告警列表变化可见但不要过于频繁。
6. 资源使用率变化有实时感。

如有必要，可以优化 BaseChart 的 setOption 行为，但不要破坏已有图表。

八、日志系统要求

请使用已有 logger。

要求：

1. 数据首次加载成功时记录 info。
2. 自动刷新开始或停止可记录 debug。
3. 数据加载失败时记录 error。
4. API 请求失败时记录 error。
5. 不要在生产环境输出过多 debug。

九、测试要求

请补充或更新测试。

至少完成：

1. 为 Mock 动态数据生成函数写单元测试。
2. 测试生成的数据结构符合预期。
3. 测试资源使用率在合理范围内。
4. 测试趋势数据长度稳定或符合设计。
5. 保持现有 e2e 测试通过。

十、工程规范要求

请继续遵守现有模块化结构：

src/
├─ app/
├─ components/
├─ layouts/
├─ views/
├─ charts/
├─ services/
├─ mock/
├─ stores/
├─ types/
├─ utils/
├─ hooks/
├─ config/
├─ styles/
└─ tests/

要求：

1. 不要把动态数据逻辑写在 App.vue。
2. 不要把定时器直接写进多个组件里。
3. 不要让图表组件负责生成数据。
4. 不要破坏 Mock/API 切换架构。
5. 不要删除已有 README、LICENSE、测试配置和工程配置。
6. 不要提交 node_modules、dist、.env、日志文件等不应该提交的内容。

十一、README 更新要求

请更新 README.md，补充：

1. 动态数据能力说明
2. Mock 模式说明
3. API 模式说明
4. 自动刷新说明
5. 环境变量说明
6. 如何暂停/继续刷新，如果实现了该功能

十二、验收要求

完成后请执行：

1. npm run type-check
2. npm run lint
3. npm run test:unit
4. npm run build
5. 如项目已有 Playwright 配置，请执行 npm run test:e2e

如果检查失败，请自行修复，直到通过。

十三、启动和浏览器查看要求

检查通过后，请启动本地开发服务器：

npm run dev

然后自动打开浏览器访问项目首页。

默认访问地址通常是：

http://127.0.0.1:5173

如果 5173 端口被占用，请使用 Vite 输出的实际端口，并告诉我最终访问地址。

浏览器中最终应该能看到：

1. 标题“数境中枢”
2. 英文名“DataSphereCenter”
3. 科技驾驶舱风格界面
4. 指标数据会自动变化
5. 图表数据会自动更新
6. 资源使用率会动态波动
7. 告警列表具有实时变化感
8. 页面显示最后更新时间或刷新状态

十四、最终回复要求

完成后请告诉我：

1. 本次新增了哪些动态数据能力。
2. 修改了哪些核心文件。
3. Mock 模式如何工作。
4. API 模式如何切换。
5. 本地访问地址。
6. 执行并通过了哪些检查。
7. 是否存在非阻塞提示。
8. 后续还能继续优化哪些方向。
```

## 简短版提示词

```text
你是资深数据大屏前端架构师和 Vue 工程化专家。请在当前 DataSphereCenter / 数境中枢 项目基础上，实现“Mock + API 双模式动态数据”能力。

要求保留现有 services -> dataProvider -> mockProvider/apiProvider 架构。默认 VITE_DATA_SOURCE=mock 时，前端每隔 3 秒自动生成平滑变化的 Mock 数据，包括指标卡、趋势折线图、分类占比、区域排行、资源使用率和实时告警。切换 VITE_DATA_SOURCE=api 时，通过 axios 定时轮询 GET /dashboard，页面组件不需要修改。

请在 Pinia store 或 composable 中统一管理自动刷新逻辑，包括 startAutoRefresh、stopAutoRefresh、refreshDashboard、lastUpdated、refreshing、refreshError，并在页面顶部展示数据模式、刷新状态和最后更新时间。页面卸载时必须清理定时器，避免内存泄漏。

请补充 Mock 动态数据生成函数和单元测试，更新 README。完成后执行 type-check、lint、test:unit、build，有 e2e 就执行 test:e2e。最后启动 npm run dev，并自动打开浏览器让我看到数据会自动变化的大屏效果。
```
