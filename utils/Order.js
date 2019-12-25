import {
  requestPromise
} from './requests.js'
import {
  getToken
} from './Authorizations.js'

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

export default {
  pay,
  orders,
  orderDetail,
}