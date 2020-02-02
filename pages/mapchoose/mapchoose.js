// pages/mapchoose/mapchoose.js
var amapFile = require('../../utils/amap-wx.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationname: [],//搜索地址的名字
    isShow: false,
    tips: {},//存储搜索结果的数组
    longitude: '',//经度
    latitude: '',//纬度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var myAmapFun = new amapFile.AMapWX({ key: '6a9b630c17f079e26856d5e56b9837cf' });
    //获取当前地址信息
    myAmapFun.getRegeo({
      success: function (res) {
        //成功回调
        console.log(res)
        that.setData({
          tips: res[0].regeocodeData.pois
        })
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
  },
  //点击输入按钮
  bindInput: function (e) {
    var _this = this;
    var keywords = e.detail.value;
    var myAmap = new amapFile.AMapWX({ key: '6a9b630c17f079e26856d5e56b9837cf' });
    myAmap.getInputtips({
      keywords: keywords,
      location: '',
      success: function (res) {
        if (res && res.tips) {
          _this.setData({
            isShow: true,
            tips: res.tips
          });
        }
      }
    })
  },
  //点击搜索按钮
  bindSearch: function (e) {
    console.log(e)
    var keywords = e.currentTarget.dataset.keywords;
    var location = e.currentTarget.dataset.location.split(',');
    this.setData({
      isShow: false,
      longitude: location[0],
      latitude: location[1],
      locationname: keywords,
      address:e.currentTarget.dataset.address
    })
    console.log(this.data.longitude,this.data.latitude,this.data.locationname,this.data.address)
    let mapaddress = { 
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      locationname: this.data.locationname,
      address: this.data.address,
    }
    wx.setStorageSync("mapaddress",mapaddress)
    wx.navigateBack({
    })
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