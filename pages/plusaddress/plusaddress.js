// pages/plusaddress/plusaddress.js
import api from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['先生', '女士'],
    index: 0
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  formsubmit: async function(e) {
    if (!e.detail.value.user || !e.detail.value.tele || !e.detail.value.address || !e.detail.value.detailaddress) {
      wx.showToast({
        title: '请完善信息',
        icon: none,
        duration: 2000
      })
      return
    }
    if (!(/^1[3456789]\d{9}$/.test(e.detail.value.tele))) {
      wx.showToast({
        title: '手机号码有误，请重填',
        icon: none,
        duration: 2000
      })
      return;
    }
    console.log(e)
    let data = {
      "name": e.detail.value.user,
      "phone": e.detail.value.tele,
      "gender": (this.index === 0) ? 'm' : 'f',
      "details": `${e.detail.value.address}${e.detail.value.detailaddress}`
    }
    await api.plusAddress(data)
    wx.showToast({
      title: '添加地址成功',
      duration: 2000
    })
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