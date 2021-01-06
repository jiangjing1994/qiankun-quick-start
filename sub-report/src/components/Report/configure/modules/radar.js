import { getFormated ,itemPoint} from '@/utils/utils'
import {isArray} from "utils-lite";

function getRadarLegend (rows, dimension, legendName) {
  let legendData = rows.map(row => row[dimension])

  return {
    data: legendData,
    formatter (name) {
      return legendName[name] != null ? legendName[name] : name
    }
  }
}

function getRadarVisualMap () {
  return   {
    top: 'middle',
    right: 10,
    color: ['red', 'yellow'],
    calculable: true
  }
}

function getRadarTooltip (dataType, radar, digit) {
  const typeTemp = []
  const nameTemp = []
  radar.indicator.map((item, index) => {
    typeTemp[index] = dataType[item.name]
    nameTemp[index] = item.name
  })
  return {
    formatter (item) {
      const tpl = []
      tpl.push(itemPoint(item.color))
      tpl.push(`${item.name}<br />`)
      item.data.value.forEach((val, index) => {
        tpl.push(`${nameTemp[index]}: `)
        tpl.push(`${getFormated(val, typeTemp[index], digit)}<br />`)
      })
      return tpl.join('')
    }
  }
}

function getRadarSetting (rows, metrics, labelMap) {


  const settingBase = {
    indicator: [],
    shape: 'circle',
    splitNumber: 5,
    splitArea: {
      show: false
    },

  }
  let indicatorTemp = {}
  rows.forEach(items => {
    metrics.forEach(item => {
      const key = labelMap[item] != null
          ? labelMap[item]
          : item
      if (!indicatorTemp[key]) {
        indicatorTemp[key] = [items[item]]
      } else {
        indicatorTemp[key].push(items[item])
      }
    })
  })
  settingBase.indicator = Object.keys(indicatorTemp).map(key => {
    return {
      name: key,
      max: Math.max.apply(null, indicatorTemp[key])
    }
  })


  return settingBase
}

function getRadarSeries (args) {
  const {
    rows,
    dimension,
    metrics,
    radar,
    label,
    itemStyle,
    lineStyle,
    labelMap,
    areaStyle
  } = args
  let radarIndexObj = {}
  radar.indicator.forEach((item, index) => {
    const name = item.name
    radarIndexObj[name] = index
  })

  const seriesData = rows.map(row => {
    const serieData = {
      value: [],
      chart_data: {},
      name: row[dimension]
    }
    Object.keys(row).forEach(key => {
      if (~metrics.indexOf(key)) {
        let k = labelMap[key] != null
            ? radarIndexObj[labelMap[key]]
            : radarIndexObj[key]
        serieData.value[k] = row[key]
        serieData.chart_data = row
      }
    })
    return serieData
  })
  const result = {
    name: dimension,
    type: 'radar',
    symbol: 'none',
    data: seriesData,

  }
  if (label) result.label = label
  if (itemStyle) result.itemStyle = itemStyle
  if (lineStyle) result.lineStyle = lineStyle
  if (areaStyle) result.areaStyle = areaStyle
  return [result]
}

export const radar = (columns, rows, settings, extra) => {


  rows = isArray(rows) ? rows : []
  columns = isArray(columns) ? columns : []

  const {
    dataType = {},
    legendName = {},
    labelMap = {},
    dimension = [columns[0]],
    digit = 2,
    label,
    itemStyle={
      color: '#F9713C'
    },
    lineStyle={
      normal: {
        width: 1,
        opacity: 0.5
      }
    },
    areaStyle={
      opacity: 0.2
    }
  } = settings
  const { tooltipVisible, legendVisible,visualMapVisible } = extra
  let metrics = columns.slice()
  if (settings.metrics) {
    metrics = settings.metrics
  } else {
    metrics.splice(columns.indexOf(dimension), 1)
  }
  const legend = legendVisible && getRadarLegend(rows, dimension, legendName)
  const visualMap = visualMapVisible && getRadarVisualMap()
  const radar = getRadarSetting(rows, metrics, labelMap)


  const tooltip = tooltipVisible && getRadarTooltip(dataType, radar, digit)


  const series = getRadarSeries({
    rows,
    dimension,
    metrics,
    radar,
    label,
    itemStyle,
    lineStyle,
    labelMap,
    areaStyle
  })
  const options = { legend, tooltip, radar, series ,visualMap}
  return options
}
