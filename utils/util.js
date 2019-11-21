// 地址
const host = 'https://app0.eeyes.xyz/api'

// 封装requests
const requestPromise = (method, url, data = "", token = "") => {
  if (token === "") {
    return new Promise((resolve, reject) => {
      wx.request({
        method: method,
        url: `${host}${url}`,
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: res => resolve(res),
        fail: (res) => reject(res)
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      wx.request({
        method: method,
        url: `${host}${url}`,
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        },
        success: res => resolve(res),
        fail: (res) => reject(res)
      })
    })
  }
}

// 登录
const login = async(codes, phone) => {
  let data = {
    "code": codes, //code
    "phone": phone //手机号码
  }
  let response = await requestPromise("POST", "/authorizations/weapp", data)
  return response;
}

// 刷新token
const refreshToken = async() => {
  let token = wx.getStorageSync("access_token")
  let response = await requestPromise("PUT", "/authorizations/current")
  wx.setStorageSync("access_token", response.data.access_token)
  wx.setStorageSync("expires_in", response.data.expires_in)
  return response.data.access_token
}

//获取token
const getToken = async() => {
  let response = wx.getStorageSync("access_token")
  if (response) {
    response = await refreshToken()
  }
  return response
}

//获取用户数据
const getUser = async() => {
  let token = getToken()
  let response = await requestPromise("GET", "/user", "", token)
  return response
}

//删除用户
const delUser = async() => {
  let token = getToken()
  let response = await requestPromise("DELETE", "/user", "", token)
  return response
}

//更新用户数据
const upDateUser = async(phone, captcha) => {
  let data = {
    "phone": phone,
    "captcha": captcha
  }
  let token = getToken()
  let response = await requestPromise("DELETE", "/user", data, token)
  return response
}

module.exports = {
  requestPromise,
  login,
  getToken
}