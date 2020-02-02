// pages/market/market.js
var Diets = require('../../utils/Diets.js');
// const computedBehavior = require('miniprogram-computed')

Page({
  // behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    showshopwindow: false, //是否显示购物窗口
    currenttab: 0, //秤食堂or秤商店
    //商品列表，食材成餐，食谱数量均默认为1，方便点击直接添加
    showgoods: [], //用于展示的列表
    goods: [], //用于数据处理的列表
    searchgoods: [], //搜索过的结果
    //一下三个变量需要在onshow里更新
    shopcar: [], //购物车
    productnum: "0", //小红点上显示的信息数量
    totalprice: 0, //总价格
  },
  bindinput: function(e) {
    let input = e.detail.value
    let re = new RegExp(input,'i')
    this.setData({
      searchgoods: this.data.showgoods.filter((item) => {
        return re.test(item.name)
      })
    })
  },
  addrecipe: function(e) { //添加食谱进购物车（这里是在页面商品列表上的点击而非购物车上的点击）
    var that = this
    var id = parseInt(e.currentTarget.dataset.id)
    //判断购物车列表里面是否已经有了该食谱，如果已经有了，则只增加数量（食谱不加）
    var flag = 0;
    for (var q in that.data.shopcar) {
      if (id == that.data.shopcar[q].id) {
        // 修改对应的数量
        let takeout = `shopcar[${q}].takeout.amount`
        let material = `shopcar[${q}].material.amount`
        that.setData({
          [takeout]: that.data.shopcar[q].takeout.amount + 1,
          [material]: that.data.shopcar[q].material.amount + 1
        })
        that.setData({
          totalprice: that.data.totalprice + that.data.shopcar[q].takeout.price + that.data.shopcar[q].material.price
        })
        that.setData({
          productnum: (parseInt(that.data.productnum) + 2).toString()
        })
        flag = 1
        break;
      }
    }
    //如果购物车中未有该食谱，根据点击的id来查找食谱列表里的食谱，并将食谱加入购物车
    if (!flag) {
      for (var p in that.data.goods) {
        if (id == that.data.goods[p].id) {
          that.data.shopcar.push(that.data.goods[p])
          that.setData({
            totalprice: that.data.totalprice + that.data.goods[p].takeout.price + that.data.goods[p].material.price
          })
          that.setData({
            productnum: (parseInt(that.data.productnum) + 3).toString()
          })
          break;
        }
      }
    }
    //将改变结果存于缓存
    wx.setStorageSync("shopcar", that.data.shopcar)
    that.setData({
      shopcar: wx.getStorageSync("shopcar")
    })
    wx.setStorageSync("totalprice", that.data.totalprice)
    wx.setStorageSync("productnum", that.data.productnum)
  },
  fooddetail: function() { //跳转到食品详情
    var that = this
    wx.navigateTo({
      url: '../fooddetail/fooddetail',
    })
  },
  confirmorder: function() { //跳转到确认订单页面
    var that = this
    that.setData({
      showshopwindow: false
    })
    wx.showTabBar({})
    wx.navigateTo({
      url: '../confirmorder/confirmorder',
    })
  },
  showshopwindow: function(e) { //点击显示购物窗口
    var that = this
    if (that.data.shopcar == "") {} else {
      that.setData({
        showshopwindow: true
      })
      wx.hideTabBar({})
    }
  },
  hideshopwindow: function(e) { //隐藏购物窗口
    var that = this
    that.setData({
      showshopwindow: false
    })
    wx.showTabBar({})
  },
  nav: function(e) { //秤食堂与秤商店的切换
    var that = this
    that.setData({
      currenttab: e.currentTarget.dataset.id
    })
  },
  increase: function(e) {
    var that = this
    let id = e.currentTarget.dataset.id // 获取数据的索引
    let item = e.currentTarget.dataset.item
    let num = e.currentTarget.dataset.increase
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
            productnum: (parseInt(that.data.productnum) - 1).toString()
          })
        }
        break;
      }
    }
    //如果整个购物车为空则收起栏目
    if (that.data.shopcar == "") {
      that.setData({
        showshopwindow: false
      })
      wx.showTabBar({})
    }
    //修改完存缓存
    wx.setStorageSync("shopcar", that.data.shopcar)
    that.setData({
      shopcar:that.data.shopcar
    })
    wx.setStorageSync("totalprice", that.data.totalprice)
    wx.setStorageSync("productnum", that.data.productnum)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    var that = this
    //获取食谱列表
    let showgoods = await Diets.getDiets();
    console.log(showgoods)
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
    console.log(that.data.goods)
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