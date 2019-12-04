// pages/market/market.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showshopwindow:false,//是否显示购物窗口
    messagenum:'2',//小红点上显示的信息数量
    currenttab:0,//秤食堂or秤商店
    //商品
    goods: [{ id: '1', imagesrc: 'rgb(241, 216, 243)', name: '奥尔良鸡胸肉套餐', price: '17-30', status: '食材-成餐', starnum: '133' }, { id: '1', imagesrc: 'rgb(221, 215, 255)', name: '奥尔良鸡胸肉套餐,买成餐送食谱优惠', price: '14-24', status: '食材-成餐', starnum: '133' }, { id: '1', imagesrc: 'rgb(228, 254, 255)', name: '奥尔良鸡胸肉套餐', price: '17-30', status: '食材-成餐', starnum: '133' }, { id: '1', imagesrc: 'rgb(245, 235, 207)', name: '奥尔良鸡胸肉套餐', price: '17-30', status: '食材-成餐', starnum: '133' }, { id: '1', imagesrc: 'rgb(245, 207, 220)', name: '奥尔良鸡胸肉套餐', price: '17-30', status: '食材-成餐', starnum: '133' }]
  },
  showshopwindow:function(e){//点击显示购物窗口
    var that =this
    that.setData({
      showshopwindow:true
    })
  },
  hideshopwindow:function(e){
    var that = this
    that.setData({
      showshopwindow:false
    })
  },
  nav:function(e){
    var that = this
    that.setData({
      currenttab:e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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