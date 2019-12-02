// pages/fillindata/fillindata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false,//之前是否填入过数据
    info:{gender:"男",birthdate:"1900/10/10",height:"230",weight:"30",exe:"几乎不运动",purpose:"减肥"},
    gender:["男","女"],
    exe: ["经常运动", "偶尔运动", "几乎不运动"],
    purpose:["减肥","增肌","减脂"],
    weight:10,
    fgender:false,
    fbirthdate:false,
    fheight:false,
    fweight:false,
    fexe:false,
    fpurpose:false,
    dgender:[],
    dbirthdate:[],
    dheight:[],
    dweight:[],
    dexe:[],
    dpurpose:[],
  },
  bindPickerChange:function(e){
    var that = this
    switch (parseInt(e.currentTarget.dataset.hi)){
      case 1:{
        that.setData({fgender:true,dgender:that.data.gender[parseInt(e.detail.value)]})
        break;
      }
      case 2:{
        that.setData({ fbirthdate: true, dbirthdate: e.detail.value})
        break;
      }
      case 3:{
        that.setData({ fheight: true, dheight: that.data.height[parseInt(e.detail.value)]})
        break; 
      }
      case 4: {
        that.setData({ fweight: true, dweight: that.data.weight[parseInt(e.detail.value)] })
        break;
      }
      case 5:{
        that.setData({ fexe: true, dexe: that.data.exe[parseInt(e.detail.value)]})
        break;
      }
      case 6:{
        that.setData({ fpurpose: true, dpurpose: that.data.purpose[parseInt(e.detail.value)]})
        break;
      }
    }
    console.log()
  },
  formsubmit: async function (e) {
    var that = this
    if (that.data.flag == false && (e.detail.value.gender == 'index' || e.detail.value.birthdate == 'index' || e.detail.value.height == 'index' || e.detail.value.weight == 'index' || e.detail.value.exe == 'index' || e.detail.value.purpose == 'index')){
      wx.showToast({
        title: '存在未填项',
        image: '../images/falling.png',
        duration: 2000
      })
    }else{
      let data = {
        "gender": that.data.gender[parseInt(e.detail.value.gender)],
        "birthdate": e.detail.value.gender,
        "height": that.data.height[parseInt(e.detail.value.height)],
        "weight": that.data.weight[parseInt(e.detail.value.weight)],
        "exe": that.data.exe[parseInt(e.detail.value.exe)],
        "purpose": that.data.purpose[parseInt(e.detail.value.purpose)],
      }
      console.log(data)
    }
    //await api.plusAddress(data)
  },
  gymnearby:function(){
    var that = this
    wx.navigateTo({
      url: '../gymnearby/gymnearby',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //that.data.height.push(2)
    var height = new Array()
    for(var i=100;i<231;i++){
      height.push(i)
    }
    that.setData({
      height:height
    })
    var weight = new Array()
    for(var i=300;i<2001;i++){
      weight.push(i/10)
    }
    that.setData({
      weight:weight
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