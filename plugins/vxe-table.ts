/*
 * @Author: Yorn Qiu
 * @Date: 2024-09-29 15:29:03
 * @LastEditors: Yorn Qiu
 * @LastEditTime: 2024-09-29 15:47:44
 * @FilePath: /flatbed/plugins/vxe-table.ts
 * @Description: vue ues vxe-table
 */

import VxeTable from 'vxe-table'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VxeTable)
})
