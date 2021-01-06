import { getFormated } from '../../../../utils/utils'
import { isObject } from 'utils-lite'
import echarts  from 'echarts'
function getTooltip (args) {
  const { tooltipFormatter, dataType, digit } = args
  return {
    formatter (options) {
      const {
        seriesName,
        data: {
          value,
          name
        }
      } = options
      if (tooltipFormatter) {
        return tooltipFormatter.apply(null, arguments)
      }
      const tpl = []
      tpl.push(`${seriesName}: `)
      tpl.push(`${getFormated(value, dataType[seriesName], digit)} ${name}`)
      return tpl.join('')
    }
  }
}

function getSeries (args) {
  const {
    rows,
    dimension,
    metrics,
    digit,
    dataType,
    labelMap,
    seriesMap,
    dataName,
    unit,
    pos,
    radius,
    range,
    range_max,
    range_min,
    highlight,
  } = args



  const row = rows[0]
  const metric = metrics[0]
  const name = labelMap[metric]
  const value = row[metric]

  /*
    const series = rows.map(row => {
      const label = row[dimension]
      const seriesItem = seriesMap[label]
      const result = {
        type: 'gauge',
        name: labelMap[label] != null ? labelMap[label] : label,
        data: [
          {
            name: dataName[label] || '',
            value: row[metrics]
          }
        ],
        detail: {
          formatter (v) {
            return getFormated(v, dataType[label], digit)
          }
        },
        axisLabel: {
          formatter (v) {
            return getFormated(v, dataType[label], digit)
          }
        }
      }

      if (seriesItem) {
        Object.keys(seriesItem).forEach(key => {
          if (isObject(result[key])) {
            Object.assign(result[key], seriesItem[key])
          } else {
            result[key] = seriesItem[key]
          }
        })
      }

      return result
    })
  */
  let item = {  name,  value, unit, pos, range:[range_min,range_max], radius}
  let colorSet = {
    color: '#468EFD'
  };

  let series2 = [
    // 外围刻度
    {
      type: 'gauge',
      center: item.pos,
      radius: item.radius[1],
      splitNumber: item.splitNum || 10,
      min: item.range[0],
      max: item.range[1],
      startAngle: 225,
      endAngle: -45,
      axisLine: {
        show: true,
        lineStyle: {
          width: 2,
          shadowBlur: 0,
          color: [
            [1, highlight]
          ]
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: highlight,
          width: 1
        },
        length: -5,
        splitNumber: 10
      },
      splitLine: {
        show: true,
        length: -14,
        lineStyle: {
          color: highlight,
        }
      },
      axisLabel: {
        distance: -20,
        textStyle: {
          color: highlight,
          fontSize: '14',
          fontWeight: 'bold'
        }
      },
      pointer: {
        show: 0
      },
      detail: {
        show: 0
      }
    },
    // 内侧指针、数值显示
    {
      name: item.name,
      type: 'gauge',
      center: item.pos,
      radius: item.radius[0],  // 1行3个
      startAngle: 225,
      endAngle: -45,
      min: item.range[0],
      max: item.range[1],
      axisLine: {
        show: true,
        lineStyle: {
          width: 16,
          color: [
            [1, 'rgba(255,255,255,.1)']
          ]
        }
      },
      axisTick: {
        show: 0,
      },
      splitLine: {
        show: 0,
      },
      axisLabel: {
        show: 0
      },
      pointer: {
        show: true,
        length: '105%'
      },
      detail: {
        show: true,
        offsetCenter: [0, '100%'],
        textStyle: {
          fontSize: 20,
          color:highlight
        },
        formatter: [
          '{value} ' + (item.unit || ''),
          '{name|' + item.name + '}'
        ].join('\n'),
        rich: {
          name: {
            fontSize: 14,
            lineHeight: 30,
            color: highlight
          }
        }
      },
      itemStyle: {
        normal: {
          color: highlight,
        }
      },
      data: [{
        value: item.value
      }]
    }
  ]



  return series2
}

export const gauge = (columns, rows, settings, extra) => {
  const {
    dimension = columns[0],
    metrics = columns[1],
    digit = 2,
    dataType = {},
    labelMap = {},
    seriesMap = {},
    dataName = {},
    unit = '',
    pos =  ['50%', '50%'],
    radius = ['50.33%','53.33%'],
    range = [0,100],
    range_max = 100,
    range_min = 0,
    highlight = '#dff9f9'
  } = settings

  const { tooltipFormatter, tooltipVisible } = extra

  const tooltip = tooltipVisible && getTooltip({
    tooltipFormatter,
    dataType
  })

  const series = getSeries({
    rows,
    dimension,
    metrics,
    digit,
    dataType,
    labelMap,
    seriesMap,
    dataName,
    unit,
    pos,
    radius,
    range,
    range_max,
    range_min,
    highlight,
  })



  return {series,tooltip}
}

