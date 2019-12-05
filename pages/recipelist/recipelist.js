// pages/recipelist/recipelist.js
import api from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //test
    testx: 100,
    showStyle: [], //显示动画
    windowWidth: [], //屏幕数据
    windowHeight: [],
    trans: [], //px和rpx的换算
    showanimation: false, //是否显示动画

    //fooddetail
    currenttab: "breakfast", //早餐午餐晚餐切换

    //recipelist
    fooddetail: false, //是否显示图片详情
    methodid: 1, //配餐
    showwindow: false,
    perchased: 1,
    //全部套餐
    recipelist: [{
        "id": 1,
        "name": "奥尔良鸡胸肉套餐",
        "cover": "http://gym.eeyes.xyz/storage/public/cover_123.png",
        "description": null
      },
      {
        "id": 2,
        "name": "奥尔良鸡肉套餐",
        "cover": "http://gym.eeyes.xyz/storage/public/cover_123.png",
        "description": null,
        "breakfast": {
          "ingredients": [{
              "name": "牛肉",
              "amount": 200
            },
            {
              "name": "鸡肉",
              "amount": 300
            },
            {
              "name": "西兰花",
              "amount": 500
            }
          ],
          "nutrient": {
            "fat": 20,
            "protein": 30,
            "carbohydrate": 10
          },
          "step": "<html></html>"
        },
        "lunch": {
          "ingredients": [{
              "name": "牛肉",
              "amount": 200
            },
            {
              "name": "鸡肉",
              "amount": 300
            },
            {
              "name": "西兰花",
              "amount": 500
            }
          ],
          "nutrient": {
            "fat": 20,
            "protein": 30,
            "carbohydrate": 10
          },
          "step": "<html></html>"
        },
        "dinner": {
          "ingredients": [{
              "name": "牛肉",
              "amount": 200
            },
            {
              "name": "鸡肉",
              "amount": 300
            },
            {
              "name": "西兰花",
              "amount": 500
            }
          ],
          "nutrient": {
            "fat": 20,
            "protein": 30,
            "carbohydrate": 10
          },
          "step": "<html></html>"
        }
      },
      {
        "id": 3,
        "name": "鸡肉套餐",
        "cover": "http://gym.eeyes.xyz/storage/public/cover_123.png",
        "description": null
      },
    ],
    //已购套餐
    myrecipelist: [{
        "id": 1,
        "name": "奥尔良鸡胸肉套餐",
        "cover": "http://gym.eeyes.xyz/storage/public/cover_123.png",
        "description": null
      },
      {
        "id": 3,
        "name": "鸡肉套餐",
        "cover": "http://gym.eeyes.xyz/storage/public/cover_123.png",
        "description": null
      },
    ],
  },

  //早餐午餐晚餐切换
  navbar: function(e) {
    var that = this
    that.setData({
      currenttab: e.currentTarget.dataset.id
    })
  },

  //recepelist
  getposition: function(e) {
    var that = this
    that.setData({
      testx: (e.detail.scrollLeft) * that.data.trans
    })
  },
  closewindow: function() { //关闭购买浮窗
    var that = this
    that.setData({
      showwindow: false
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
  showwindow: function() {
    var that = this
    that.setData({
      showwindow: true
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
  fooddetail: function(e) {
    console.log(e.detail.deltaX)
    var that = this
    that.setData({
      showanimation: true,
      testx: that.data.testx - (parseInt(e.currentTarget.dataset.id) - 1) * 556
    })
    that.setData({
      showStyle: '-webkit-animation: show 0.5s linear;animation:show 0.5s linear'
    })
    setTimeout(function() {
      that.setData({
        showStyle: ''
      })
    }, 600)
    setTimeout(function() {
      that.setData({
        showanimation: false,
        fooddetail: true
      })
    }, 500)
  },
  scrolling: async function(e) {
    let that = this
    let r;
    console.log(e.detail.scrollLeft)
    let a = ~~(e.detail.scrollLeft / 278)
    // 检测当前视窗下的view-scroll是否完全加载数据
    for (let i = ((a - 1) < 0 ? 0 : (a - 1)); i < a + 2; i++) {
      if (that.recipelist[i].breakfast === undefined) {
        r = await api.recipesDetails(i)
        that.setData({
          'recipelist[i]': r.data.data
        })
      }
    }
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    var that = this
    let response = await api.allRecipes()
    this.data.fooddetail = response.data.data || []
    response = await api.boughtRecipes()
    this.data.myrecipelist = response.data.data || []
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