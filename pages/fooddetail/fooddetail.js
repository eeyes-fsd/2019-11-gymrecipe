// pages/fooddetail/fooddetail.js
import api from '../../utils/Health.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isfillindata:false,//是否测量过营养素
    isbuyrecipe:false,//是否购买过改食谱
    //成餐外卖图片
    mealphoto:[1,2],
    currenttab:1,
  },
  fillindata:function(e){
    var that = this
    wx.navigateTo({
      url: '../fillindata/fillindata',
    })
  },
  navbar:function(e){
    var that = this
    that.setData({
      currenttab:e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var that = this
    var info = await api.getHealth()
    if(info.statusCode==200){
      that.setData({
        isfillindata:true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})