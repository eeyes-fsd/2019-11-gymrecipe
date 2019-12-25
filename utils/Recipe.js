import {
  requestPromise
} from './requests.js'
import {
  getToken
} from './Authorizations.js'

//获取上新推荐
const newRecipes = async(count, page) => {
  let data = {
    "count": count || 20,
    "page": page || 1
  }
  let response = await requestPromise("GET", '/recipes/new', data, '')
  return response
}
//获取套餐详情
const recipesDetails = async(id) => {
  let token = await getToken()
  let response = await requestPromise("GET", `/recipes/${id}/details`, token)
  return response
}
//获取已购套餐
const boughtRecipes = async() => {
  let token = await getToken()
  let response = await requestPromise("GET", `/recipes/bought`, '', token)
  return response
}
//获取全部套餐
const allRecipes = async() => {
  let response = await requestPromise("GET", `/recipes`, '', '')
  return response
}
//获取今日推荐
const todayRecipes = async(id) => {
  let token = await getToken()
  let response = await requestPromise("GET", `/recipes/today`, "", token)
  return response
}

module.exports = {
  todayRecipes,
  allRecipes,
  boughtRecipes,
  recipesDetails,
  newRecipes,
}