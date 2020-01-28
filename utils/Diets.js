import {
  requestPromise
} from './requests.js'
import {
  getToken
} from './Authorizations.js'

// 请求此接口获取配餐列表
const getDiets = async() => {
  let token = await getToken()
  let response = await requestPromise('POST', '/diets', '', token)
  return response
}

// 请求此接口获取配餐详情，提供Token以获取身体数据具体计算费用。
const getDietDetail = async(id) => {
  let token = await getToken()
  let response = await requestPromise('POST', `/diets${id}`, '', token)
  return response
}

module.exports = {
  getDiets,
  getDietDetail
}