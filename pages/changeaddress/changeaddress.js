// pages/changeaddress/changeaddress.js
import api from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    tele: '',
    address: '',
    detailaddress: '',
    array: ['先生', '女士'],
    gender: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    console.log(options.id)
    let response = await api.detailAddress(options.id)
    console.log(response)
    this.setData({
      user: response.data.data.name,
      gender: (response.data.data.gender === "先生") ? 0 : 1,
      tele: response.data.data.phone,
      detailaddress: response.data.data.details
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
  onUnload: function() {},

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