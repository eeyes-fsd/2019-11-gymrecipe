// pages/confirmorder/confirmorder.js
import api from '../../utils/Address.js'
import payment from "../../utils/Order.js"
import Diets from '../../utils/Diets.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isnow:true,//是否现在立即送货
    gettime:[],//收货时间
    timepicker:[],//时间选择的picker数组
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
    //订单时间2020-01-29T20:01:15
    var myDate = new Date();
    var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var month =parseInt(myDate.getMonth())+1;       //获取当前月份(0-11,0代表1月)
    if(month<10) month = "0"+month
    var date = myDate.getDate();        //获取当前日(1-31)
    if(date<10) date = "0"+date
    var gettime = year+"-"+month+"-"+date+"T"+that.data.gettime+":00"
    console.log(gettime)
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
  //时间picker响应函数
  pickerchange:function(e){
    var that = this 
    that.setData({
      gettime:that.data.timepicker[parseInt(e.detail.value)],
      isnow:false
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
      //运费计算
      var  weight = 0
      for(var p in shopcar){
        var amount = shopcar[p].material.amount+shopcar[p].takeout.amount 
        let r = await Diets.getDietDetail(parseInt(shopcar[p].id));
        var w = r.data.data.weight
        weight = weight + parseInt(w)*amount
      }
      //总价为原价再加上运费
      var transexpense
      if(weight<6000){
        transexpense = 0
      }else if(weight<10000){
        transexpense = 6
      }else{
        transexpense = 10
      }
      that.setData({
        transexpense:transexpense,
        totalprice: wx.getStorageSync("totalprice") + transexpense
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
    //获取当前时间，并生成时间列表
    var myDate = new Date()
    var mytime = myDate.toLocaleTimeString('chinese',{ hour12: false });
    var timearray = mytime.split(":")
    //设定初始的时间
    that.setData({
      gettime: timearray[0] + ":" + timearray[1]
    })
    for(let i=0;i<3;i++){
      timearray[i] = parseInt(timearray[i]) 
    }
    var beginminute = timearray[1]-timearray[1]%20;
    var beginhour = timearray[0]
    var timepicker = new Array()
    for(let i=0;i<72;i++){
      beginminute = beginminute+20
      if (beginminute>60){
        beginminute = beginminute%60;
        beginhour = beginhour+1
      }
      if(beginhour>24) break;
      var hour
      if(beginhour<10) hour = "0"+beginhour
      else hour = beginhour
      var timeitem = hour+":"+beginminute 
      timepicker.push(timeitem)
    }
    that.setData({
      timepicker:timepicker
    })
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