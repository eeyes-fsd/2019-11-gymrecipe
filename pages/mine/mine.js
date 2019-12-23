// pages/mine/mine.js
import api from '../../utils/util.js'
Page({
  data: {
    showContact: false,
    isShow: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: [],
    phone: "",
    code: ""
  },
  onTab: function() {
    this.setData({
      showContact: true
    })
  },
  getPhoneNumber: async function (e) {
    let response = await api.login(this.data.code, e.detail.iv, e.detail.encryptedData)
    console.log("成功获取手机号")
    this.setData({
      // 测试
      phone: " response.data.phone"
    })
    // 测试
    wx.setStorage({
      key: 'access_token',
      data: response.data.access_token
    })
    wx.setStorage({
      key: 'expires_in',
      data: response.data.expires_in
    })
  },
  //关闭联系我们窗口
  closecontact:function(){
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
  touchMove: function() {},
  maskTouchMove: function() {},
  showmyaddress: function() {
    wx.navigateTo({
      url: '../myaddress/myaddress',
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
        success: (res) => {
          that.setData({
            code: res.code
          })
        }
      })
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
              console.log(res.userInfo)
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  that.setData({
                    code: res.code
                  })
                  console.log("用户的code:" + res.code);
                }
              });
            }
          });
        } else {
          // 用户没有授权
          that.setData({
            isShow: true
          });
        }
      }
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