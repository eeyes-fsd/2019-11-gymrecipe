import {
  requestPromise
} from './requests.js'
import {
  getToken
} from './Authorizations.js'

//获取用户数据
const getUser = async() => {
  let token = await getToken()
  let response = await requestPromise("GET", "/user", "", token)
  return response
}

//删除用户
const delUser = async() => {
  let token = await getToken()
  let response = await requestPromise("DELETE", "/user", "", token)
  return response
}

//更新用户数据
const upDateUser = async(phone, captcha) => {
  let data = {
    "phone": phone,
    "captcha": captcha
  }
  let token = await getToken()
  let response = await requestPromise("DELETE", "/user", data, token)
  return response
}

export {
  getUser,
  delUser,
  upDateUser
}
module.exports = {
  getUser,
  delUser,
  upDateUser
}