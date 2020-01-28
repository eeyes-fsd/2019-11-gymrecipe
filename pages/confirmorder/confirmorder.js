// pages/confirmorder/confirmorder.js
import api from '../../utils/Address.js'
import payment from "../../utils/Order.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist: [], //订单列表
    recipeprice: 0, //食谱价格
    transexpense: 5, //配送费
    totalprice: 0, //总计
    address: 0, //地址
  },
  chooseaddress: function() {
    wx.navigateTo({
      url: '../chooseaddress/chooseaddress',
    })
  },
  submit: async function() { //提交订单
    var that = this
    //将缓存数据全部清空
    wx.showToast({
      title: "提交订单成功",
    })
    //返回上一页面
    wx.navigateBack({})
    //生成formdata
    let copy = wx.getStorageSync("shopcar")
    var recipes = new Array();
    var diets = new Array();
    var ingredients = new Array();
    for(var p in copy){
      recipes.push(copy[p].id)
      var tempdiets = {"id":copy[p].id,"diets":copy[p].takeout.amount}
      diets.push(tempdiets)
      var tempingredients = {"id":copy[p].id,"ingredients":copy[p].material.amount}
      ingredients.push(tempingredients)
    }
    var orderlist = {"recipes":recipes,"diets":diets,"ingredients":ingredients,"addressid":that.data.address.id};
    //清空缓存数据
    await payment.pay(orderlist)
    wx.setStorageSync("shopcar", [])
    wx.setStorageSync("productnum", "0")
    wx.setStorageSync("totalprice", 0)
  },
  plusaddress: function() {
    var that = this
    wx.navigateTo({
      url: '../plusaddress/plusaddress',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function() {
    var that = this
    //将shopcar缓存中的数据处理后给商品信息赋值
    if (wx.getStorageSync("shopcar")) {
      var shopcar = wx.getStorageSync("shopcar")
      that.setData({
        orderlist: shopcar
      })
      var sum = 0
      for (let i = 0; i < shopcar.length; i++) {
        sum = sum + shopcar[i].recipes.price
      }
      that.setData({
        recipeprice: sum
      })
      //总价为原价再加上运费
      that.setData({
        totalprice: wx.getStorageSync("totalprice") + that.data.transexpense
      })
    }
    // 加载地址信息
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    console.log(currPage.__data__.id); //此处既是上一页面传递过来的值
    if (currPage.__data__.id === undefined) {
      // 第一次进入确认订单
      let temp = await api.getAddress()
      that.setData({
        address: (temp.data.data[0] === undefined) ? 0 : temp.data.data[0]
      })
    } else {
      let temp = await api.detailAddress(currPage.__data__.id)
      console.log(temp)
      that.setData({
        address: temp.data.data
      })
    }

    console.log(that.data.address)
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