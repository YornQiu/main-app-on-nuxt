/*
 * @Author: Yorn Qiu
 * @Date: 2024-09-29 11:35:01
 * @LastEditors: Yorn Qiu
 * @LastEditTime: 2024-09-29 14:22:59
 * @FilePath: /flatbed/server/routes/apps/[...].ts
 * @Description: router handler for '/apps/**'
 */

import HttpProxy from 'http-proxy'

const apps = [
  {
    name: 'centrade',
    entry: 'http://localhost:8061',
  },
  {
    name: 'operation',
    entry: 'http://localhost:8062',
  },
]

const proxy = HttpProxy.createProxyServer({ ws: true, changeOrigin: true })

export default defineEventHandler((event) => {
  const req = event.node.req
  const res = event.node.res

  const app = apps.find(app => req.url?.startsWith(`/apps/${app.name}`))

  if (app) {
    return new Promise((resolve, reject) => {
      proxy.web(req, res, { target: app.entry }, (err) => {
        if (err) reject(err)
        else resolve(null)
      })
    })
  }
  else {
    setResponseStatus(event, 404)
    return 'Not Found'
  }
})
