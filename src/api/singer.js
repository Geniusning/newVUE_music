/*
 * @Author: Nicky-Liu 
 * @Date: 2018-03-20 10:46:42 
 * @Last Modified by: Nicky-Liu
 * @Last Modified time: 2018-03-20 11:11:34
 */
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config.js'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    loginUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    format: 'jsonp'
    // g_tk: 1664029744
  })

  return jsonp(url, data, options)
}