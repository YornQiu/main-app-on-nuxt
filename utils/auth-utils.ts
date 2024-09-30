/*
 * @Author: Yorn Qiu
 * @Date: 2021-09-08 16:51:30
 * @LastEditors: Yorn Qiu
 * @LastEditTime: 2024-09-30 17:14:20
 * @FilePath: /flatbed/utils/auth-utils.ts
 * @Description: authorization utils
 */

const authUtils = {
  toLogin(login = '/login') {
    window.location.pathname = login
  },
  toIndex(index = '/') {
    window.location.pathname = index
  },
  getAccessToken() {
    return localStorage.getItem('access_token')
  },
}

export default Object.freeze(authUtils)
