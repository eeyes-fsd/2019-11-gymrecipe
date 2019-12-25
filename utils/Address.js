import {
  requestPromise
} from './requests.js'
import {
  getToken
} from './Authorizations.js'

// 地址
// 获取地址
const getAddress = async() => {
  let token = await getToken()
  let response = await requestPromise("GET", "/addresses", "", token)
  return response
}
// 增加地址
const plusAddress = async(data) => {
  let token = await getToken()
  let response = await requestPromise("POST", "/addresses", data, token)
  return response
}
// 修改地址
const modifyAddress = async(data) => {
  let token = await getToken()
  let response = await requestPromise("PUT", "/addresses", data, token)
  return response
}
// 删除地址
const delAddress = async(id) => {
  let token = await getToken()
  let response = await requestPromise("DELETE", `/addresses/${id}`, '', token)
  return response
}
// 地址详情
const detailAddress = async(id) => {
  let token = await getToken()
  let response = await requestPromise("GET", `/addresses/${id}`, '', token)
  return response
}

module.exports = {
  getAddress,
  modifyAddress,
  plusAddress,
  delAddress,
  detailAddress,
}