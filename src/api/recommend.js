/*
 * @Author: Nicky-Liu 
 * @Date: 2018-03-15 17:39:23 
 * @Last Modified by: Nicky Liu
 * @Last Modified time: 2018-03-18 16:53:27
 */

import jsonp from 'common/js/jsonp'
import axios from "axios"
import {
  commonParams,
  options
} from './config.js'

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

//推荐列表
export function getDistList() {
  const url = '/api/getDiscList';
    const data = Object.assign({}, commonParams, {
      platform: "yqq",
      hostUin: 0,
      sin:0,
      ein:29,
      needNewCode: 0,
      categoryId:10000000,
      rnd:Math.random(),
      format:'json'
    })

    return axios.get(url,{
      params:data
    }).then(res=>{
      return Promise.resolve(res.data)
    })
}
