// pages/fooddetail/fooddetail.js
import api from '../../utils/Health.js'
import Diets from '../../utils/Diets.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fooddetail:{
      id:'2',
      name:'奥尔良鸡胸肉套餐',
      type:'秤食成餐外卖/新鲜食材速递',
      takeout:{
        imageurl:'',
        foodtime:'早餐、午餐、晚餐',
        mainmaterial:'冻鸡胸肉、西兰花、牛油果',
        price:30
      },
      material:{
        price:14
      },
      describe:''
    },
    goods: [],//商品列表
    showshopwindow:false,//是否显示浮窗
    isfillindata:false,//是否测量过营养素
    isbuyrecipe:false,//是否购买过改食谱
    //成餐外卖图片
    mealphoto:[1,2],
    currenttab:1,
    shopcar:[],//购物车
    productnum:"0",//商品数量
    totalprice:0,//订单总价
  },
  increase: function (e) {
    var that = this
    let id = e.currentTarget.dataset.id // 获取数据的索引
    let item = e.currentTarget.dataset.item
    let num = e.currentTarget.dataset.increase
    var flag = 0 
    //如果购物车中已有该商品
    for (var p in that.data.shopcar) {
      if (id == that.data.shopcar[p].id) {
        //修改对应的数量
        let temp = `shopcar[${p}].${item}.amount`
        let price
        if (item == "takeout") price = that.data.shopcar[p].takeout.price
        else price = that.data.shopcar[p].material.price
        that.setData({
          [temp]: that.data.shopcar[p][item].amount + parseInt(num),
          totalprice: that.data.totalprice + parseInt(num) * price,
          productnum: (parseInt(that.data.productnum) + parseInt(num)).toString()
        })
        //判断修改项的成餐和食材是否都为零，若都为零则剔除这一项 
        if (!that.data.shopcar[p].material.amount && !that.data.shopcar[p].takeout.amount) {
          that.data.shopcar.splice(p, 1)
          that.setData({
            productnum:(parseInt(that.data.productnum)-1).toString()
          })
        }
        flag =1
        break;
      }
    }
    //如果购物车中没有该商品
    if(!flag){
      for (var p in that.data.goods) {
        if (id == that.data.goods[p].id) {
          that.data.shopcar.push(that.data.goods[p])
          that.setData({
            totalprice: that.data.totalprice + that.data.goods[p].takeout.price + that.data.goods[p].material.price
          })
          that.setData({
            productnum: (parseInt(that.data.productnum) + 2).toString()
          })
          //如果添加的是takeout,将另一项设为零
          if(item=='takeout'){
            for(var q in that.data.shopcar){
              if(that.data.shopcar[q].id==id){
                let temp = `shopcar[${q}].material.amount`
                that.setData({
                  [temp]:0
                })
              }
            }
          }else{
            for (var q in that.data.shopcar) {
              if (that.data.shopcar[q].id == id) {
                let temp = `shopcar[${q}].takeout.amount`
                that.setData({
                  [temp]: 0
                })
              }
            }
          }
          break;
        }
      }
    }
    //如果整个购物车为空则收起栏目
    if (that.data.shopcar == "") {
      that.setData({
        showshopwindow: false
      })
    }
    //修改完存缓存
    wx.setStorageSync("shopcar", that.data.shopcar)
    that.setData({
      shopcar:wx.getStorageSync("shopcar")
    })
    wx.setStorageSync("totalprice", that.data.totalprice)
    wx.setStorageSync("productnum", that.data.productnum)
  },
  fillindata:function(e){//跳转到填写表单的页面
    var that = this
    wx.navigateTo({
      url: '../fillindata/fillindata',
    })
  },
  navbar:function(e){//导航栏
    var that = this
    that.setData({
      currenttab:e.currentTarget.dataset.id
    })
  },
  showshopwindow:function(){//显示悬浮窗
    var that = this
    that.setData({
      showshopwindow:true
    })
  },
  hideshopwindow:function(){//隐藏悬浮窗
    var that = this
    that.setData({
      showshopwindow:false
    })
  },
  confirmorder:function(){
    var that = this
    wx.navigateTo({
      url: '../confirmorder/confirmorder',
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
    //获取食谱列表
    let showgoods = await Diets.getDiets();
    if (showgoods.data) {
      var showgood = showgoods.data.data
      that.setData({
        showgoods: showgood,
        searchgoods: showgood
      })
      //将后端获得的数据转化为可处理的数据
      var goods = new Array()
      for (var i = 0; i < showgood.length; i++) {
        var gooditem = {
          id: showgood[i].id,
          imagesrc: showgood[i].cover,
          name: showgood[i].name,
          takeout: {
            'amount': 1,
            'price': showgood[i].low_price
          },
          material: {
            'amount': 1,
            'price': showgood[i].up_price
          },
          recipes: {
            'amount': 1,
            'price': showgood[i].up_price
          }
        }
        goods.push(gooditem)
      }
      that.setData({
        goods: goods
      })
    }
    //获取当前食谱数据
    var id = wx.getStorageSync("currentrecipeid")
    console.log(id)
    let resrecipe = await Diets.getDietDetail(parseInt(id));
    console.log("sji",resrecipe)
    that.setData({
      fooddetail:resrecipe.data.data
    })
    console.log(that.data.fooddetail)
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
    //获取shopcar的缓存以更新数据
    if (wx.getStorageSync("shopcar")) {
      that.setData({
        shopcar: wx.getStorageSync("shopcar")
      })
    }
    //获取productnum缓存
    if (wx.getStorageSync("productnum")) {
      that.setData({
        productnum: wx.getStorageSync("productnum")
      })
    } else {
      wx.setStorageSync("productnum", "0")
      that.setData({
        productnum: "0"
      })
    }
    //获取总价格缓存
    if (wx.getStorageSync("totalprice")) {
      that.setData({
        totalprice: wx.getStorageSync("totalprice")
      })
    } else {
      wx.setStorageSync("totalprice", 0)
      that.setData({
        totalprice: 0
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