# settings 配置项

### 折线

| 配置项 | 简介 | 类型 | 备注 |
| --- | --- | --- | --- |
| dimension | 维度 | array | 默认columns第一项为维度 |
| metrics | 指标 | array | 默认columns第二项起为指标 |
| yAxisName | 左右轴标题 | array | - |
| axisSite | 指标所在的轴 | object | 默认不在right轴的指标都在left轴 axisSite: { right: ['占比'] } 即将占比的数据置于右轴上。|
| stack | 堆叠选项 | object | - |
| area | 设置为面积图 | boolean | 默认为false |
| scale | 是否是脱离 0 值比例 | array | 默认为[false, false]，表示左右<br>两个轴都不会脱离0值比例。<br>设置成 true 后坐标刻度不会<br>强制包含零刻度<br> |
| min | 左右轴最小值 | array | - |
| max | 左右轴最大值 | array | - |

> 备注1. axisSite 可以设置 left 和 right，例如示例所示 `axisSite: { right: ['占比'] }` 即将占比的数据置于右轴上。

> 备注2. stack 用于将两数据堆叠起来，例如实例中所示`stack: { '销售额': ['成本', '利润'] }` 即将'成本', '利润'相应的数据堆叠在一起。

> 备注3. min和max的值可以直接设置为数字，例如：`[100, 300]`；也可以设置为`['dataMin', 'dataMin']`, `['dataMax', 'dataMax']`，此时表示使用该坐标轴上的最小值或最大值为最小或最大刻度。

### 柱状
| 配置项 | 简介 | 类型 | 备注 |
| --- | --- | --- | --- |
| dimension | 维度 | array | 默认columns第一项为维度 |
| metrics | 指标 | array | 默认columns第二项起为指标 |
| yAxisName | 左右坐标轴标题 | array | - |
| axisSite | 指标所在的轴 | object | 默认不在right轴的指标都在left轴 |
| stack | 堆叠选项 | object | - |
| dataOrder | 设置数据排序方式 | boolean, object | 默认为false |
| scale | 是否是脱离 0 值比例 | array | 默认为[false, false]，表示左右<br>两个轴都不会脱离0值比例。<br>设置成 true 后坐标刻度不会<br>强制包含零刻度<br> |
| min | 左右坐标轴最小值 | array | - |
| max | 左右坐标轴最大值 | array | - |
| showLine | 展示为折线图的指标 | array | - |
| opacity | 透明度 | number | - |

| label | 设置图形上的文本标签 | object | 内容参考[文档](http://echarts.baidu.com/option.html#series-bar.label) |
| itemStyle | 图形样式 | object | 内容参考[文档](http://echarts.baidu.com/option.html#series-bar.itemStyle) |


> 备注1. axisSite 可以设置 left 和 right，例如示例所示 `axisSite: { right: ['占比'] }` 即将占比的数据置于右轴上。

> 备注2. stack 用于将两数据堆叠起来，例如实例中所示`stack: { '销售额': ['销售额-1季度', '销售额-2季度'] }` 即将'销售额-1季度', '销售额-2季度'相应的数据堆叠在一起。

> 备注3. dataOrder 用于设置数据的排序方式，用于更加清晰的展示数据的升降。例如： `{ label: '余额', order: 'asc }` 表示数据按照余额指标升序展示，降序为`desc`。

> 备注4. min和max的值可以直接设置为数字，例如：`[100, 300]`；也可以设置为`['dataMin', 'dataMin']`, `['dataMax', 'dataMax']`，此时表示使用该坐标轴上的最小值或最大值为最小或最大刻度。

> 备注5. 有时我们需要将折线图与柱状图展示在同一个图上，利用showLine属性可以设置需要展示为折线图的指标，其他的指标则使用柱状图展示。

> 备注6. 为了优化连续的数值型横轴显示多指标的时候样式，在此情况下默认设置opacity为0.5。
