// pages/plusaddress/plusaddress.js
import api from '../../utils/Address.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['先生', '女士'],
    index: 0,
    region: []
  },
  // 称呼选择
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 收货地址
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  formsubmit: async function(e) {
    // 请求预检验
    console.log(e.detail.value.user)
    console.log(e.detail.value.tele)
    console.log(this.data.region)
    console.log(e.detail.value.detailaddress)
    if (!e.detail.value.user || !e.detail.value.tele || !this.data.region || !e.detail.value.detailaddress) {
      wx.showToast({
        title: '请完善信息',
        icon: "none",
        duration: 2000
      })
      return
    }
    if (!(/^1[3456789]\d{9}$/.test(e.detail.value.tele))) {
      wx.showToast({
        title: '手机号码有误，请重填',
        icon: "none",
        duration: 2000
      })
      return;
    }
    let data = {
      "name": e.detail.value.user,
      "phone": e.detail.value.tele,
      "gender": (this.data.index === 0) ? 'm' : 'f',
      "street": this.data.region.join('-'),
      "details": e.detail.value.detailaddress
    }
    await api.plusAddress(data)
    wx.showToast({
      title: '添加地址成功',
      duration: 2000
    })
    console.log("添加地址成功")
    wx.navigateBack({})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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