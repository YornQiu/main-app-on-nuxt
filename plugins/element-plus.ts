/*
 * @Author: Yorn Qiu
 * @Date: 2024-09-29 15:30:12
 * @LastEditors: Yorn Qiu
 * @LastEditTime: 2024-09-29 17:19:30
 * @FilePath: /flatbed/plugins/element-plus.ts
 * @Description:
 */

import ElementPlus from 'element-plus'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus)
})
