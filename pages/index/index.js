//index.js
//获取应用实例
import api from "../../utils/util.js"
const app = getApp()
Page({
  data: {
    toView:[],//用于锚点跳转
    getinfo:false,//是否测量过身体数据
    setfood:false,//是否定制过套餐
    todaylist:[{id:1,imagesrc:"red",content:"早餐-牛油果奶昔"},{id:2,imagesrc:"yellow",content:"午餐-牛油果意面"},{id:3,imagesrc:"green",content:"晚餐-牛油果沙拉"}],//今日食谱
    updatetime:'11/8',
    foodlist: [{id:1,imagesrc:"red"}, {id:2,imagesrc:"yellow"}],//首页推荐套餐图
    newrecom:'奥尔良鸡胸肉套餐',
    windowWitdh:[],
    windowHeight:[]
  },
  //事件处理函数
  fillindata: function() { //跳转到填写个人身体信息页面
    var that = this
    wx.navigateTo({
      url: '../fillindata/fillindata',
    })
  },
  recipelist: function(e) {//跳转到食谱页面
    var that = this
    wx.setStorageSync("perchased", e.currentTarget.dataset.perchased)//是否跳转已购买
    wx.setStorageSync("recipeid", e.currentTarget.dataset.id)//将点击的食品id存缓存
    wx.navigateTo({
      url: '../recipelist/recipelist',
    })
  },
  onLoad: function() {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
      },
    })
  },
})