//index.js
//获取应用实例
// import api from "../../utils/util.js"
import api from "../../utils/Recipe.js"
// import health from "../../utils/Health.js"
var health = require('../../utils/Health.js');

const app = getApp()
Page({
  data: {
    currentIntake: [],
    toView: [], //用于锚点跳转
    getinfo: false, //是否测量过身体数据
    setfood: false, //是否定制过套餐
    todaylist: [], //今日食谱
    updatetime: '11/8',
    foodlist: [], //首页推荐套餐图
    newrecom: '奥尔良鸡胸肉套餐',
    windowWitdh: [],
    windowHeight: []
  },
  //事件处理函数
  fillindata: function() { //跳转到填写个人身体信息页面
    var that = this
    wx.navigateTo({
      url: '../fillindata/fillindata',
    })
  },
  recipelist: function(e) { //跳转到食谱页面
    var that = this
    wx.setStorageSync("perchased", e.currentTarget.dataset.perchased) //是否跳转已购买
    wx.setStorageSync("recipeid", e.currentTarget.dataset.id) //将点击的食品id存缓存
    wx.navigateTo({
      url: '../recipelist/recipelist',
    })
  },
  onLoad: async function() {
    console.log(health)
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
      },
    })
    // 测试
    // 新品推荐需要修改
    let newRecipe = await api.newRecipes()
    this.setData({
      foodlist: newRecipe.data.data,
    })
    let response = await api.todayRecipes()
    if (response.data.data == "") {
      that.setData({
        setfood: false,
        todaylist: ""
      })
    } else {
      that.setData({
        setfood: true,
        todaylist: response.data.data
      })
    }
    //let r = await api.recipesDetails(response.data.data[0].id)
    let Response = await health.currentIntake()
    let currentIntake = Response.data
    if (currentIntake == "") {
      that.setData({
        currentIntake: "",
        getinfo: false
      })
    } else {
      let radioarray = currentIntake.ratio.split(":")
      let radiosum = radioarray[0] + radioarray[1] + radioarray[2]
      let Intakedata = {
        'date': currentIntake.updated_at,
        'carbohydrate': (currentIntake.energy * radioarray[0] / radiosum).toFixed(2),
        'protein': (currentIntake.energy * radioarray[1] / radiosum).toFixed(2),
        'fat': (currentIntake.energy * radioarray[2] / radiosum).toFixed(2)
      }
      that.setData({
        currentIntake: Intakedata,
        getinfo: true
      })
    }
  },
  
  onShow: async function() {
    let that = this
    let Response = await health.currentIntake()
    let currentIntake = Response.data
    if (currentIntake == "") {
      that.setData({
        currentIntake: "",
        getinfo: false
      })
    } else {
      let radioarray = currentIntake.ratio.split(":")
      let radiosum = radioarray[0] + radioarray[1] + radioarray[2]
      let Intakedata = {
        'date': currentIntake.updated_at,
        'carbohydrate': (currentIntake.energy * radioarray[0] / radiosum).toFixed(2),
        'protein': (currentIntake.energy * radioarray[1] / radiosum).toFixed(2),
        'fat': (currentIntake.energy * radioarray[2] / radiosum).toFixed(2)
      }
      that.setData({
        currentIntake: Intakedata,
        getinfo: true
      })
    }
  }
})