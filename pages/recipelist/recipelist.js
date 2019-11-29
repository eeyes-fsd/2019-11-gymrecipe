// pages/recipelist/recipelist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showwindow:false,
    perchased:1,
    recipelist:[{id:1,imagesrc:"/images/reone.png"},{id:2,imagesrc:"/images/retwo.png"}]//食谱列表
  },
  closewindow:function(){
    var that= this
    that.setData({
      showwindow:false
    })
  },
  showwindow:function(){
    var that = this
    that.setData({
      showwindow:true
    })
  },
  nav:function(e){
    var that = this
    that.setData({
      perchased:e.currentTarget.dataset.id
    })
  },
  fooddetail:function(){
    var that = this
    wx.navigateTo({
      url: '../fooddetail/fooddetail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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