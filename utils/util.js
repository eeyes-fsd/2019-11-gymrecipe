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
//获取能量摄入
const currentIntake = async() => {
  let token = await getToken()
  let response = await requestPromise("GET", `/health/intake`, '', token)
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

//other
//支付
//idList 需要是列表
const pay = async(idList) => {
  let token = await getToken()
  let response = await requestPromise("POST", `/orders`, idList, token)
  wx.requestPayment({
    timeStamp: response.data.timeStamp,
    nonceStr: response.data.timeStamp,
    package: response.data.package,
    signType: response.data.signType,
    paySign: response.data.paySign,
    success: () => {
      wx.showToast({
        title: '支付成功',
        duration: 2000
      })
    }
  })
  return response
}
//获取订单列表
const orders = async() => {
  let token = await getToken()
  let response = await requestPromise("GET", `/orders`, '', token)
  return response
}
//获取订单详情
const orderDetail = async(id) => {
  let token = await getToken()
  let response = await requestPromise("GET", `/orders/${id}`, '', token)
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
  login,
  getToken,
  //User
  getUser,
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
  currentIntake,
  // recipes
  todayRecipes,
  allRecipes,
  boughtRecipes,
  recipesDetails,
  newRecipes,
  //pay
  pay,
  orders,
  orderDetail,
  exercisesList,
  purposesList
}