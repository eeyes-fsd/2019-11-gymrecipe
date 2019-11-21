//index.js
//获取应用实例
const app = getApp()
import api from "../../utils/util.js"
Page({
  data: {
    getinfo: false, //是否测量过身体数据
    setfood: false, //是否定制过套餐
    todaylist: [1, 2, 3], //今日食谱
    updatetime: '11/8',
    foodlist: [1, 2, 3, 4, 5], //首页推荐套餐图
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