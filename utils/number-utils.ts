/*
 * @Author: Yorn Qiu
 * @Date: 2020-12-03 16:44:42
 * @LastEditors: Yorn Qiu
 * @LastEditTime: 2024-09-30 17:15:13
 * @FilePath: /flatbed/utils/number-utils.ts
 * @Description: number format utils
 */

interface FormatOption {
  type?: 'amount' | 'percent' | 'bytes'
  deg?: number
  comma?: boolean
  autoUnit?: boolean
  unit?: keyof typeof formatUnit
}

const formatUnit = {
  万: 10 ** 4,
  亿: 10 ** 8,
  万亿: 10 ** 12,
  KB: 2 ** 10,
  MB: 2 ** 20,
  GB: 2 ** 30,
  TB: 2 ** 40,
  PB: 2 ** 50,
}

const numberUtils = {
  // 数值格式化的单位映射
  formatUnit,

  /**
   * 将科学计数法形式转化为一般形式的数字字符串，以防格式化错误
   * @param {number|string} value 数值
   * @return {string}
   */
  unScientificNotation(value: number | string): string {
    const numStr = `${value}`
    const [base, exponent] = numStr.split('e')
    const exp = Number(exponent)
    if (exp > 0)
      return base.replace('.', '') + '0'.repeat(exp - (base.split('.')[1]?.length || 0))
    else if (exp < 0)
      return '0.' + '0'.repeat(Math.abs(exp) - 1) + base.replace('.', '')
    else
      return numStr
  },

  /**
   * @description: 保留小数位，使用toFixed方法固定小数位数
   * @param {number} value 数值
   * @param {number} deg 小数位数，小于0时保持原有的小数位数
   * @return {string}
   */
  toFixed(value: number, deg: number): string {
    let numStr = `${value}`
    if (numStr.includes('e')) numStr = this.unScientificNotation(numStr)
    if (deg < 0) return numStr

    const match = numStr.match(/\.(\d+)/)
    if (match && match[1].length < deg) return numStr + '0'.repeat(deg - match[1].length)
    return value.toFixed(deg)
  },

  /**
   * @description 增加千位分隔符
   * @param {number|string} value 数值
   * @return {string}
   */
  addComma(value: number | string): string {
    let numStr = `${value}`
    if (numStr.includes('e')) numStr = this.unScientificNotation(numStr)

    const matched = numStr.match(/^([-+])?([0-9]+)(\.[0-9]+)?$/)
    if (matched) {
      const [, sign = '', integer, decimal = ''] = matched
      const commaedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

      return sign + commaedInteger + decimal
    }

    return numStr
  },
  /**
   * @description 数值格式化
   * @param {number} value 数值
   * @param {object} option 格式化参数集合，默认增加千位分隔符，保留2位小数
   * @param {string} option.type 格式化类型： amount 金额, percent 百分比, bytes 字节，默认amount
   * @param {number} option.deg 小数保留位数，默认2位
   * @param {boolean} option.comma 是否增加千位分隔符，默认true
   * @param {boolean} option.autoUnit 是否自动进行数值单位换算，需要指定type，默认false
   * @param {string} option.unit 指定换算单位，支持：万、亿、万亿、KB、MB、GB、TB、PB
   * @return {string}
   */
  format(value: number | string | null | undefined, option?: FormatOption): string {
    if (value === undefined || value === null) return ''

    value = Number(value)

    if (Number.isNaN(value) || value === Infinity || value === -Infinity) return '-'

    const { type = 'amount', deg = 2, comma = true, autoUnit = false } = option || {}
    let unit = option?.unit

    if (type === 'percent') return `${this.toFixed(value * 100, deg)}%`

    if (unit) {
      if (formatUnit[unit]) value /= formatUnit[unit]
      else throw new Error(`不支持的单位类型：${unit}`)
    }
    else if (autoUnit) {
      const units = type === 'bytes' ? ['KB', 'MB', 'GB', 'TB', 'PB'] : ['万', '亿', '万亿']
      const base = type === 'bytes' ? 1024 : 10000
      let unitIndex = -1

      while (value >= base && unitIndex < units.length - 1) {
        value /= base
        unitIndex += 1
      }
      unit = units[unitIndex] as keyof typeof formatUnit
    }

    // 固定小数位数
    let formatedValue = this.toFixed(value, deg)
    // 千位分隔符
    if (comma) formatedValue = this.addComma(formatedValue)
    // 加上单位
    if (unit) formatedValue += unit

    return formatedValue
  },

  /**
   * @description: 金额类格式化，增加千位分隔符并保留两位小数
   * @param {number} value 数值
   * @param {boolean|FormatOption} option 是否为百分数，或者格式化参数
   * @return {string} 格式化后的数值为String
   */
  financeFormat(value: number | string | null | undefined, option?: boolean | FormatOption): string {
    if (typeof option === 'boolean')
      return this.format(value, { type: 'percent' })
    return this.format(value, { type: 'amount', ...option })
  },
}

export default Object.freeze(numberUtils)
