//index.js
//获取应用实例
import api from "../../utils/util.js"
const app = getApp()
Page({
  data: {
    getinfo:false,//是否测量过身体数据
    setfood:false,//是否定制过套餐
    todaylist:[{id:1,imagesrc:"/images/dailytwo.png",content:"早餐-牛油果奶昔"},{id:2,imagesrc:"/images/dailythree.png",content:"午餐-牛油果意面"},{id:3,imagesrc:"/images/dailyone.png",content:"晚餐-牛油果沙拉"}],//今日食谱
    updatetime:'11/8',
    foodlist: [{id:1,imagesrc:"/images/meat1.png"}, {id:2,imagesrc:"/images/meat.png"}],//首页推荐套餐图
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
  recipelist: function() {
    var that = this
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