// pages/fillindata/fillindata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender:["男","女"],
    exe: ["每周运动<2次", "每周运动<3次", "每周运动<4次", "每周运动<5次", "每周运动>5次"],
    purpose:["降低体重","破世界记录"],
    height:[100,230],
    weight:10,
  },
  gymnearby:function(){
    var that = this
    wx.navigateTo({
      url: '../gymnearby/gymnearby',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(that.data.height)
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