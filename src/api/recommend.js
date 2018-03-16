/*
 * @Author: Nicky-Liu 
 * @Date: 2018-03-15 17:39:23 
 * @Last Modified by: Nicky-Liu
 * @Last Modified time: 2018-03-16 09:39:23
 */

import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config.js'

// 获取推荐页面
export function getRecommond() {
  const url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
  const data = Object.assign({}, commonParams, {
    platform: "h5",
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}