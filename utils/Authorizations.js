import {
  requestPromise
} from './requests.js'

// 登录
const login = async(codes, iv, encrypted_data) => {
  let data = {
    "code": codes, //code
    "iv": iv, //加密初始向量
    "encrypted_data": encrypted_data //加密数据
  }
  let res = await requestPromise("POST", "/authorizations/weapp", data, "")
  console.log("login储存token和expires_in")
  wx.setStorageSync("access_token", res.data.access_token)
  wx.setStorageSync("expires_in", res.data.expires_in * 1000 + new Date().getTime())
  return res;
}

// 刷新token
const refreshToken = async() => {
  console.log("refreshToken")
  let access_token;
  let token = wx.getStorageSync("access_token")
  console.log(token)
  // 尝试更换token
  await requestPromise("PUT", "/authorizations/current", '', token).then((res) => {
    wx.setStorageSync("access_token", res.data.access_token)
    wx.setStorageSync("expires_in", new Date().getTime() + res.data.expires_in * 1000)
    access_token = res.data.access_token
  }).catch((err) => {
    console.log(err)
    access_token = false
  })
  return access_token
}

//获取token
const getToken = async() => {
  console.log("getToken")
  let access_token = wx.getStorageSync("access_token")
  let expires_in = wx.getStorageSync("expires_in")
  if (new Date().getTime() > expires_in) {
    access_token = await refreshToken()
    console.log("reset token")
    if (access_token === false) {
      wx.login({
        success: async(res) => {
          wx.setStorageSync("code", res.code)
          let iv = wx.getStorageSync("iv")
          let encryptedData = wx.getStorageSync("encryptedData")
          let response = await login(res.code, iv, encryptedData)
          wx.setStorageSync("access_token", res.data.access_token)
          wx.setStorageSync("expires_in", new Date().getTime() + res.data.expires_in * 1000)
          access_token = response.data.access_token
        }
      })
    }
  }
  return access_token
}
export {
  getToken,
  login
}