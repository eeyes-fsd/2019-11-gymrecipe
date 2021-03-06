// pages/mine/mine.js
import {
  login
} from '../../utils/Authorizations.js'
import {
  getUser
} from '../../utils/User.js'

Page({
  data: {
    showContact: false,
    isShow: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: [],
    phone: "",
  },
  //跳转到我的食谱页面
  recipelist:function(){
    wx.setStorageSync("perchased", 1) //是否跳转已购买
    wx.navigateTo({
      url: '../recipelist/recipelist',
    })
  },
  //跳转到二维码分享页面
  share:function(){
    wx.navigateTo({
      url: '../share/share',
    })
  },
  //跳转到订单页面
  order:function(){
    var that = this
    wx.navigateTo({
      url: '../order/order',
    })
  },
  onTab: function() {
    this.setData({
      showContact: true
    })
  },
  getPhoneNumber: async function(e) {
    let that = this
    let code = wx.getStorageSync("code")
    wx.setStorageSync("iv", e.detail.iv)
    wx.setStorageSync("encryptedData", e.detail.encryptedData)
    await login(code, e.detail.iv, e.detail.encryptedData)
    console.log("成功获取手机号")
    let userInfo = await getUser()
    that.setData({
      phone: userInfo.data.data.phone || '',
    })
    wx.setStorageSync("share_id", userInfo.data.data.share_id)

  },
  //关闭联系我们窗口
  closecontact: function() {
    this.setData({
      showContact: false,
    })
  },
  // 拒绝权限
  close: function() {
    wx.showToast({
      title: '您拒绝了授权！',
      icon: 'none',
      duration: 2000
    })
  },
  // 获取个人数据
  async getUserInfo(e) {
    var that = this
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo);
      this.setData({
        isShow: false,
        userInfo: e.detail.userInfo
      })
      wx.login({
        success: async(res) => {
          console.log("用户的code:" + res.code);
          wx.setStorageSync("code", res.code)
        },
        fail: (err) => {
          console.log(err)
          wx.showToast({
            title: '登录失败',
            icon: "none",
            duration: 2000
          })
        }
      })
      console.log("获取用户个人信息")
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              that.setData({
                userInfo: res.userInfo
              })
              console.log("获取用户个人信息",res.userInfo)
            }
          });
          wx.login({
            success: async(res) => {
              console.log("用户的code:" + res.code);
              wx.setStorageSync("code", res.code)
            },
            fail: (err) => {
              console.log(err)
              wx.showToast({
                title: '登录失败',
                icon: "none",
                duration: 2000
              })
            }
          })
        } else {
          // 用户没有授权
          that.setData({
            isShow: true
          });
        }
      }
    })
  },
  touchMove: function() {},
  maskTouchMove: function() {},
  showmyaddress: function() {
    wx.navigateTo({
      url: '../myaddress/myaddress',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})