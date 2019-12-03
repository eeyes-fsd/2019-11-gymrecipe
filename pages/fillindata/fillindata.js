// pages/fillindata/fillindata.js
import api from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit: false, //用户是否编辑过页面而且没有提交，用于存储页面显示
    toView: [], //锚点跳转
    windowHeight: [],
    windowWidth: [],
    flag: false, //之前是否填入过数据
    // cacheinfo:[],//存储用户离开页面未提交时已选择的数据
    info: {
      gender: "男",
      birthdate: "1900/10/10",
      height: "230",
      weight: "30",
      exe: "几乎不运动",
      purpose: "减肥"
    },
    gender: ["男", "女"],
    exe: ["经常运动", "偶尔运动", "几乎不运动"],
    purpose: ["减肥", "增肌", "减脂"],
    weight: [],
    height: [],
    //是否选择了数据
    fgender: false,
    fbirthdate: false,
    fheight: false,
    fweight: false,
    fexe: false,
    fpurpose: false,
    //已选择的数据，用于picker显示
    dgender: [],
    dbirthdate: [],
    dheight: [],
    dweight: [],
    dexe: [],
    dpurpose: [],
  },
  gymnearby: function() {
    var that = this
    wx.navigateTo({
      url: '../gymnearvy/gymnearby',
    })
  },
  bindPickerChange: function(e) {
    var that = this
    that.setData({ //编辑了数据
      edit: true
    })
    switch (parseInt(e.currentTarget.dataset.hi)) {
      case 1:
        {
          that.setData({
            fgender: true,
            dgender: that.data.gender[parseInt(e.detail.value)]
          })
          break;
        }
      case 2:
        {
          that.setData({
            fbirthdate: true,
            dbirthdate: e.detail.value
          })
          break;
        }
      case 3:
        {
          that.setData({
            fheight: true,
            dheight: that.data.height[parseInt(e.detail.value)]
          })
          break;
        }
      case 4:
        {
          that.setData({
            fweight: true,
            dweight: that.data.weight[parseInt(e.detail.value)]
          })
          break;
        }
      case 5:
        {
          that.setData({
            fexe: true,
            dexe: that.data.exe[parseInt(e.detail.value)]
          })
          break;
        }
      case 6:
        {
          that.setData({
            fpurpose: true,
            dpurpose: that.data.purpose[parseInt(e.detail.value)]
          })
          break;
        }
    }
  },
  formsubmit: async function(e) {
    var that = this
    if (that.data.flag == false && !(that.data.fgender && that.data.fbirthdate && that.data.fheight && that.data.fweight && that.data.fexe && that.data.purpose)) {
      if (!that.data.fgender) {
        that.setData({
          toView: 'i1'
        })
      } else {
        if (!that.data.fbirthdate) {
          that.setData({
            toView: 'i2'
          })
        } else {
          if (!that.data.fheight) {
            that.setData({
              toView: 'i3'
            })
          } else {
            if (!that.data.fweight) {
              that.setData({
                toView: 'i4'
              })
            } else {
              if (!that.data.fexe) {
                that.setData({
                  toView: 'i5'
                })
              } else {
                that.setData({
                  toView: 'i6'
                })
              }
            }
          }
        }
      }
      wx.showToast({
        title: '存在未填项',
        image: '../images/falling.png',
        duration: 2000
      })
    } else {
      let data = {
        "gender": that.data.gender[parseInt(e.detail.value.gender)],
        "birthdate": e.detail.value.gender,
        "height": that.data.height[parseInt(e.detail.value.height)],
        "weight": that.data.weight[parseInt(e.detail.value.weight)],
        "exe": that.data.exe[parseInt(e.detail.value.exe)],
        "purpose": that.data.purpose[parseInt(e.detail.value.purpose)],
      }
    }
    await api.sendHealth(data)
    that.setData({ //恢复表单未编辑状态
      edit: false
    })
    let cacheinfo = {
      "edit": false
    }
    wx.setStorageSync('cacheinfo', cacheinfo)
  },
  gymnearby: function() {
    var that = this
    wx.navigateTo({
      url: '../gymnearby/gymnearby',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    var that = this
    //that.data.height.push(2)
    var height = new Array()
    for (var i = 100; i < 231; i++) {
      height.push(i)
    }
    that.setData({
      height: height
    })
    // 生成数组
    var weight = new Array()
    for (var i = 300; i < 2001; i++) {
      weight.push(i / 10)
    }
    that.setData({
      weight: weight
    })
    try {
      var cacheinfo = wx.getStorageSync('cacheinfo')
      if (cacheinfo.edit) {
        if (cacheinfo.gender != 'null') {
          that.setData({
            fgender: true,
            dgender: cacheinfo.gender
          })
        }
        if (cacheinfo.birthdate != 'null') {
          that.setData({
            fbirthdate: true,
            dbirthdate: cacheinfo.birthdate
          })
        }
        if (cacheinfo.height != 'null') {
          that.setData({
            fheight: true,
            dheight: cacheinfo.height
          })
        }
        if (cacheinfo.weight != 'null') {
          that.setData({
            fweight: true,
            dweight: cacheinfo.weight
          })
        }
        if (cacheinfo.exe != 'null') {
          that.setData({
            fexe: true,
            dexe: cacheinfo.exe
          })
        }
        if (cacheinfo.purpose != 'null') {
          that.setData({
            fpurpose: true,
            dpurpose: cacheinfo.purpose
          })
        }
      }
    } catch {}

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
      },
    })

    var info = await api.getHealth()
  },
  //页面卸载时
  onUnload: function() {
    var that = this
    if (that.data.edit) {
      let data = {
        "edit": true,
        "gender": that.data.fgender == true ? that.data.dgender : 'null',
        "birthdate": that.data.fbirthdate == true ? that.data.dbirthdate : 'null',
        "height": that.data.fheight == true ? that.data.dheight : 'null',
        "weight": that.data.fweight == true ? that.data.dweight : 'null',
        "exe": that.data.fexe == true ? that.data.dexe : 'null',
        "purpose": that.data.fpurpose == true ? that.data.dpurpose : 'null',
      }
      wx.setStorageSync('cacheinfo', data)
    }
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