// pages/changeaddress/changeaddress.js
import api from '../../utils/Address.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressid: [], //地址id
    user: '',
    tele: '',//电话
    latitude:[],//经度
    longitude:[],//纬度
    region: [],//地址名字
    detailaddress: '',//地址详细信息
    array: ['先生', '女士'],//称呼
    gender: 0//性别
  },
  //跳转地址选择页面
  mapchoose:function(){
    wx.navigateTo({
      url: '../mapchoose/mapchoose',
    })
  },
  //性别PICKER
  bindPickerChange:function(e){
    var that = this
    that.setData({
      gender:parseInt(e.detail.value)
    })
  },
  // 地址picker
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  formsubmit: async function(e) {
    var that = this
    if (!e.detail.value.user || !e.detail.value.tele || !e.detail.value.detailaddress) {
      wx.showToast({
        title: '请完善信息',
        icon: "none",
        duration: 2000
      })
      return
    }
    if (!(/^1[3456789]\d{9}$/.test(e.detail.value.tele))) {
      wx.showToast({
        title: '手机号码有误，请重填',
        icon: "none",
        duration: 2000
      })
      return;
    }
    let data = {
      "name": e.detail.value.user,
      "phone": e.detail.value.tele,
      "gender": (this.data.gender === 0) ? 'm' : 'f',
      "street": this.data.region,
      "latitude": that.data.latitude,//经度
      "longitude": that.data.longitude,//纬度
      "details": e.detail.value.detailaddress
    }
    console.log(data)
    await api.modifyAddress(this.data.addressid, data)
    wx.showToast({
      title: '修改地址成功',
      duration: 2000
    })
    wx.navigateBack({})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    console.log(options.id)
    let response = await api.detailAddress(options.id)
    console.log(response)
    var res = response.data.data
    this.setData({
      addressid: options.id,
      user: res.name,
      gender: (res.gender === "先生") ? 0 : 1,
      tele: res.phone,
      region: res.street, //收货地址
      latitude: res.latitude,//经度
      longitude: res.longitude,//纬度
      detailaddress: res.details, //门牌号
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
    var that = this
    //判断是否选择过了地址
    if (!wx.getStorageSync("mapaddress")) {
    } else {
      var addressdata = wx.getStorageSync("mapaddress")
      console.log(addressdata)
      that.setData({
        region: addressdata.locationname,
        latitude: addressdata.latitude,
        longitude: addressdata.longitude,
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
  onUnload: function() {},

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