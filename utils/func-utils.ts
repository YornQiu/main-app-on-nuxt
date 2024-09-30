/*
 * @Author: Yorn Qiu
 * @Date: 2023-06-13 08:52:34
 * @LastEditors: Yorn Qiu
 * @LastEditTime: 2024-09-30 17:14:05
 * @FilePath: /flatbed/utils/func-utils.ts
 * @Description: functional utils
 */

/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function compose(...fns: Function[]) {
  return fns.reduce(
    (p, c) =>
      (...args: any[]) =>
        p(c(...args)),
  )
}

export function composePromise(...fns: Function[]) {
  return fns.reduce(
    (f, g) =>
      async (...args: any[]) =>
        f(await g(...args)),
  )
}

export function pipe(...fns: Function[]) {
  return fns.reduce(
    (f, g) =>
      (...args: any[]) =>
        g(f(...args)),
  )
}

export function pipePromise(...fns: Function[]) {
  return fns.reduce(
    (f, g) =>
      async (...args: any[]) =>
        g(await f(...args)),
  )
}

export function curry(fn: Function) {
  return function curried(...args: any[]) {
    if (args.length >= fn.length) {
      return fn(...args)
    }
    return function (...args2: any[]) {
      return curried(...args.concat(args2))
    }
  }
}
