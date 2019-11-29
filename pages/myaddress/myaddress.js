// pages/myaddress/myaddress.js
import api from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresslist: [],
  },
  plusaddress: function() {
    var that = this
    wx.navigateTo({
      url: '../plusaddress/plusaddress',
    })
  },
  changeaddress: function() {
    console.log('hahah')
    var that = this
    wx.navigateTo({
      url: '../changeaddress/changeaddress',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let that = this
    let lists = await api.getAddress()
    if (lists.data) {
      that.setData({
        addresslist: lists.data
      })
    }
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