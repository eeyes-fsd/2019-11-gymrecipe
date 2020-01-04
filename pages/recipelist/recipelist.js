// pages/recipelist/recipelist.js
import api from "../../utils/Recipe.js"
import payment from "../../utils/Order.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    payid:[],//所购食品id
    //test
    detailcurrentdata: [], //用于切换早午晚餐详情的
    currentimage: [],
    currentdata: [], //当前显示的食谱详情
    testx: 100,
    showStyle: [], //显示动画
    windowWidth: [], //屏幕数据
    windowHeight: [],
    trans: [], //px和rpx的换算
    showanimation: false, //是否显示动画

    //fooddetail
    currenttab: "breakfast", //早餐午餐晚餐切换

    //recipelist
    boolmyrecipelist:false,//判断我的购买是否为空
    fooddetail: false, //是否显示图片详情
    methodid: 1, //配餐定制方式
    showwindow: false, //是否显示配置订餐窗口
    perchased: 1,
    //全部套餐
    recipelist: [],
    //已购套餐
    myrecipelist: [],
  },

  //早餐午餐晚餐切换
  navbar: function(e) {
    var that = this
    switch (e.currentTarget.dataset.id) {
      case 'breakfast':
        that.setData({
          detailcurrentdata: that.data.currentdata.breakfast
        })
        break;
      case 'lunch':
        that.setData({
          detailcurrentdata: that.data.currentdata.lunch
        })
        break;
      case 'dinner':
        that.setData({
          detailcurrentdata: that.data.currentdata.dinner
        })
        break;
    }
    that.setData({
      currenttab: e.currentTarget.dataset.id,
    })
  },

  //recepelist
  getposition: function(e) { //获取当前sroll滚动位置
    var that = this
    that.setData({
      testx: (e.detail.scrollLeft) * that.data.trans
    })
  },
  methodbar: function(e) { //餐品选择
    var that = this
    console.log(e)
    that.setData({
      methodid: e.currentTarget.dataset.id
    })
  },
  //显示半浮窗
  showwindow: function(e) {
    var that = this
    that.setData({
      showwindow: true,
      payid:e.currentTarget.dataset.id
    })
  },
  //切换已购买和全部
  nav: function(e) {
    var that = this
    that.setData({
      perchased: e.currentTarget.dataset.id
    })
  },
  //跳转食品详情
  fooddetail: async function(e) {
    var that = this
    let recipedetail = await api.recipesDetails(parseInt(e.currentTarget.dataset.id))
    console.log(recipedetail)
    that.setData({
      showanimation: true,
      testx: that.data.testx - (parseInt(e.currentTarget.dataset.id) - 1) * 556,
      currentdata: recipedetail.data.data,
      currentimage: that.data.recipelist[parseInt(e.currentTarget.dataset.id) - 1].cover,
      detailcurrentdata: recipedetail.data.data.breakfast
    })
    that.setData({
      showStyle: '-webkit-animation: show 0.5s linear;animation:show 0.5s linear'
    })
    setTimeout(function() {
      that.setData({
        showStyle: ''
      })
    }, 1000)
    setTimeout(function() {
      that.setData({
        fooddetail: true
      })
    }, 100)
    setTimeout(function() {
      that.setData({
        showanimation: false,
      })
    }, 490)
  },
  scrolling: async function(e) {
    // let that = this
    // let r;
    // console.log(e.detail.scrollLeft)
    // let a = ~~(e.detail.scrollLeft / 278)
    // // 检测当前视窗下的view-scroll是否完全加载数据
    // for (let i = ((a - 1) < 0 ? 0 : (a - 1)); i < a + 2; i++) {
    //   if (that.recipelist[i].breakfast === undefined) {
    //     r = await api.recipesDetails(i)
    //     that.setData({
    //       'recipelist[i]': r.data.data
    //     })
    //   }
    // }
  },
  myscrolling: async function(e) {
    let that = this
    let r;
    console.log(e.detail.scrollLeft)
    let a = ~~(e.detail.scrollLeft / 278)
    // 检测当前视窗下的view-scroll是否完全加载数据
    for (let i = ((a - 1) < 0 ? 0 : (a - 1)); i < a + 2; i++) {
      if (that.myrecipelist[i].breakfast === undefined) {
        r = await api.recipesDetails(i)
        that.setData({
          'myrecipelist[i]': r.data.data
        })
      }
    }
  },
  //支付
  pay: async function() {
    var that = this
    that.setData({
      showwindow: false
    })
    await payment.pay(that.data.payid)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    var that = this
    let response = await api.allRecipes()
    console.log(response)
    that.setData({
      recipelist: response.data.data
    })
    let response2 = await api.boughtRecipes()
    if(response2.status==200){
      that.setData({
        myrecipelist: response2.data.data,
        boolmyrecipelist:true
      })
    }else{
      that.setData({
        boolmyrecipelist:false
      })
    }
    try {
      var toViewid = "r" + wx.getStorageSync("recipeid") //食谱id锚点
      that.setData({
        toView: toViewid
      })
    } catch {}
    try {
      var perchased = wx.getStorageSync("perchased")
      that.setData({
        perchased: perchased
      })
    } catch {}
    wx.getSystemInfo({
      success: function(res) {
        let windowHeight = (res.windowHeight * (750 / res.windowWidth));
        let windowWidth = (res.windowWidth * (750 / res.windowWidth))
        that.setData({
          windowHeight: windowHeight,
          windowWidth: windowWidth,
          trans: 750 / res.windowWidth
        })
      }
    })

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