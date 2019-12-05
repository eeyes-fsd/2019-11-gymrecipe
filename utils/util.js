// 地址
const host = 'http://gym.eeyes.xyz/api'

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
const login = async(codes, iv, encrypted_data) => {
  let data = {
    "code": codes, //code
    "iv": iv, //加密初始向量
    "encrypted_data": encrypted_data //加密数据
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
  let token = await getToken()
  let response = await requestPromise("DELETE", "/user", data, token)
  return response
}

// 地址
// 获取地址
const getAddress = async() => {
  let token = await getToken()
  let response = await requestPromise("GET", "/address", "", token)
  return response
}
// 增加地址
const plusAddress = async(data) => {
  let token = await getToken()
  let response = await requestPromise("POST", "/address", data, token)
  return response
}
// 修改地址
const modifyAddress = async(data) => {
  let token = await getToken()
  let response = await requestPromise("PUT", "/address", data, token)
  return response
}
// 删除地址
const delAddress = async(id) => {
  let token = await getToken()
  let response = await requestPromise("DELETE", `/address/${id}`, '', token)
  return response
}
// 地址详情
const detailAddress = async(id) => {
  let token = await getToken()
  let response = await requestPromise("GET", `/address/${id}`, '', token)
  return response
}

// 获取手机验证码
const verifyPhone = async(number) => {
  let token = await getToken()
  let data = {
    "phone": number
  }
  let response = await requestPromise("GET", `/phone_verify`, data, token)
  return response
}

//用户个人数据
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
  let token = getToken()
  let response = await requestPromise("GET", `/recipes/${id}/details`, data, token)
  return response
}
//获取已购套餐
const boughtRecipes = async(id) => {
  let token = getToken()
  let response = await requestPromise("GET", `/recipes/bought`, data, token)
  return response
}
//获取全部套餐
const allRecipes = async() => {
  let response = await requestPromise("GET", `/recipes`, '', '')
  return response
}
//获取今日推荐
const todayRecipes = async(id) => {
  let token = getToken()
  let response = await requestPromise("GET", `/recipes/today`, "", token)
  return response
}
module.exports = {
  login,
  getToken,
  //address
  getAddress,
  plusAddress,
  delAddress,
  detailAddress,
  //phone
  verifyPhone,
  // health
  getHealth,
  sendHealth,
  changeHealth,
  // recipes
  todayRecipes,
  allRecipes,
  boughtRecipes,
  recipesDetails,
  newRecipes
}