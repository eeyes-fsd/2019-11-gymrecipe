// 地址
const host = 'https://gym.eeyes.xyz/api'

// 封装requests
const requestPromise = (method, url, data, token) => {
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
          'Authorization': `Bearer ${token}`
        },
        success: res => resolve(res),
        fail: (res) => {
          wx.showToast({
            title: '网络错误',
            icon: fail,
            duration: 2000
          })
          reject(res)
        }
      })
    })
  }
}
export {
  requestPromise
}