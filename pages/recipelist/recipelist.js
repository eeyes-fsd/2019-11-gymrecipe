// pages/recipelist/recipelist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //test
    testx:100,
    showStyle: [],//显示动画
    windowWidth:[],//屏幕数据
    windowHeight:[],
    trans:[],//px和rpx的换算
    showanimation:false,//是否显示动画

    //fooddetail
    currenttab: 1,//早餐午餐晚餐切换

    //recipelist
    fooddetail:false,//是否显示图片详情
    methodid:1,//配餐
    showwindow:false,
    perchased:1,
    recipelist: [{ id: 1, imagesrc: "/images/retwo.png" }, { id: 2, imagesrc:"/images/retwo.png"}]//食谱列表
  },


  //fooddetail
  //早餐午餐晚餐切换
  navbar: function (e) {
    var that = this
    that.setData({
      currenttab: e.currentTarget.dataset.id
    })
  },

  //recepelist
  getposition:function(e){
    var that = this
    that.setData({
      testx:(e.detail.scrollLeft)*that.data.trans
    })
  },
  closewindow:function(){//关闭购买浮窗
    var that= this
    that.setData({
      showwindow:false
    })
  },
  methodbar:function(e){//餐品选择
    var that = this
    that.setData({
      methodid:e.currentTarget.dataset.id
    })
  },
  showwindow:function(){//显示半浮窗
    var that = this
    that.setData({
      showwindow:true
    })
  },
  nav:function(e){//切换已购买和全部
    var that = this
    that.setData({
      perchased:e.currentTarget.dataset.id
    })
  },
  fooddetail:function(e){//跳转食品详情
    var that = this
    that.setData({
      showanimation:true,
      testx: that.data.testx - (parseInt(e.currentTarget.dataset.id) - 1) * 556
    })
    that.setData({
      showStyle: '-webkit-animation: show 0.5s linear;animation:show 0.5s linear'
    })
    setTimeout(function () { that.setData({ showStyle:'' }) }, 600)
    setTimeout(function () { that.setData({ showanimation: false,fooddetail: true }) }, 500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    try{
      var toViewid = "r" +wx.getStorageSync("recipeid")//食谱id锚点
      that.setData({
        toView: toViewid
      })
    }catch{}
    try{
      var perchased = wx.getStorageSync("perchased")
      that.setData({perchased:perchased})
    }catch{}
    wx.getSystemInfo({
      success: function (res) {
        let windowHeight = (res.windowHeight * (750 / res.windowWidth));
        let windowWidth = (res.windowWidth * (750 / res.windowWidth))
        that.setData({
          windowHeight:windowHeight,
          windowWidth:windowWidth,
          trans:750/res.windowWidth
        })
      }
    })
    
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