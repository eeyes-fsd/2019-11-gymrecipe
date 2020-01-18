// pages/confirmorder/confirmorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist:[],//订单列表
    recipeprice:0,//食谱价格
    transexpense:5,//配送费
    totalprice:0,//总计
  },
  chooseaddress:function(){
    wx.navigateTo({
      url: '../chooseaddress/chooseaddress',
    })
  },
  submit:function(){//提交订单
    var that = this
    //将缓存数据全部清空
    wx.showToast({
      title: "提交订单成功",
    })
    wx.navigateBack({
    })
    wx.setStorageSync("shopcar",[])
    wx.setStorageSync("productnum","0")
    wx.setStorageSync("totalprice",0)
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
    var that = this
    //将shopcar缓存中的数据处理后给商品信息赋值
    if(wx.getStorageSync("shopcar")){
      var shopcar = wx.getStorageSync("shopcar")
      that.setData({
        orderlist:shopcar
      })
      var sum = 0
      for(let i=0;i<shopcar.length;i++){
        sum = sum + shopcar[i].recipes.price
      }
      that.setData({
        recipeprice:sum
      })
      //总价为原价再加上运费
      that.setData({
        totalprice:wx.getStorageSync("totalprice")+that.data.transexpense
      })
    }
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