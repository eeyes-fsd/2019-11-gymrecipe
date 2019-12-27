import {
  requestPromise
} from './requests.js'
import {
  getToken
} from './Authorizations.js'

// 上传个人健康数据
const sendHealth = async(data) => {
  let token = await getToken()
  let response = await requestPromise("POST", `/health`, data, token)
  return response
}
// 获取个人健康数据
const getHealth = async() => {
  let token = await getToken()
  let response = await requestPromise("GET", `/health`, '', token)
  return response
}
// 修改个人健康数据
const changeHealth = async(data) => {
  let token = await getToken()
  let response = await requestPromise("PUT", `/health`, data, token)
  return response
}
//获取能量摄入
const currentIntake = async() => {
  let token = await getToken()
  let response = await requestPromise("GET", `/health/intake`, '', token)
  return response
}

const exercisesList = async() => {
  let response = await requestPromise("GET", `/exercises`)
  return response
}

const purposesList = async() => {
  let response = await requestPromise("GET", `/purposes`)
  return response
}
module.exports = {
  getHealth,
  sendHealth,
  changeHealth,
  currentIntake,
  exercisesList,
  purposesList
}