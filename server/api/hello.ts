/*
 * @Author: Yorn Qiu
 * @Date: 2024-09-29 11:46:52
 * @LastEditors: Yorn Qiu
 * @LastEditTime: 2024-09-29 11:46:53
 * @FilePath: /flatbed/server/api/hello.ts
 * @Description:
 */

export default defineEventHandler((event) => {
  return {
    hello: 'world',
  }
})
