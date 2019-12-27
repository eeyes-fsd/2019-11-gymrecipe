// pages/fillindata/fillindata.js
import api from '../../utils/Health.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fatrate: [],
    customlist: ["三餐", "三+一餐", "三+二餐", "三+三餐"],
    crazy: false, //是否经常运动
    crazypurpose: ["减脂", "增肌", "增强体质"],
    lowpurpose: ["减重", "增重", "保持体重"],
    low24: false, //BMI是否低于24
    BMI: [], //体脂率
    Base: [], //基础代谢
    edit: false, //用户是否编辑过页面而且没有提交，用于存储页面显示
    toView: [], //锚点跳转
    windowHeight: [],
    windowWidth: [],
    flag: false, //之前是否提交过数据
    // cacheinfo:[],//存储用户离开页面未提交时已选择的数据
    info: [],
    gender: ["男", "女"],
    exe: [],
    purpose: ["减重", "急速减重", "增重", "保持体重"],
    weight: [],
    height: [],
    //是否选择了数据
    fgender: false,
    fbirthdate: false,
    fheight: false,
    fweight: false,
    fexe: false,
    fpurpose: false,
    fcustom: false,
    ffatrate: false,
    //已选择的数据，用于picker显示
    dgender: [],
    dbirthdate: [],
    dheight: [],
    dweight: [],
    dexe: [],
    dpurpose: [],
    dcustom: [],
    dfatrate: [],
    alertShow: false,
    alertContent: "123"
  },
  //关闭窗口
  close: function() {
    this.setData({
      alertShow: false
    })
  },
  // 显示窗口
  AlertShow: function(content) {
    this.setData({
      alertShow: true,
      alertContent: content
    })
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
          switch (parseInt(e.detail.value)) {
            case 0:
              var message = "非运动人群"
              that.setData({
                crazy: false,
                fpurpose: false
              })
              that.AlertShow(message)
              break;
            case 1:
            case 2:
              that.setData({
                crazy: true,
                fpurpose: false
              })
              var message = "建议填写体脂率"
              that.AlertShow(message)
              break;
          }
          break;
        }
      case 6:
        {
          if (that.data.crazy) {
            that.setData({
              fpurpose: true,
              dpurpose: that.data.crazypurpose[parseInt(e.detail.value)]
            })
          } else {
            if (that.data.low24) {
              that.setData({
                fpurpose: true,
                dpurpose: that.data.lowpurpose[parseInt(e.detail.value)]
              })
            } else {
              that.setData({
                fpurpose: true,
                dpurpose: that.data.purpose[parseInt(e.detail.value)]
              })
            }
          }
          break;
        }
      case 7:
        {
          that.setData({
            fcustom: true,
            dcustom: that.data.customlist[parseInt(e.detail.value)]
          })
          break;
        }
      case 8:
        {
          that.setData({
            ffatrate: true,
            dfatrate: parseInt(e.detail.value)
          })
          break;
        }
    }
    var dweight = that.data.dweight
    var dheight = that.data.dheight
    //返回年龄
    var dgender = that.data.dgender
    //只有在填写了身高体重时才能改变BMI的值
    switch (parseInt(e.currentTarget.dataset.hi)){
      case 3:
      case 4:
        if (that.data.fweight && that.data.fheight) {
          that.setData({
            BMI: (dweight / dheight / dheight * 10000).toFixed(2),
          })
          if (that.data.BMI < 24) {
            that.setData({
              low24: true,
              fpurpose: false
            })
          } else {
            that.setData({
              low24: false
            })
          }
        }
      break;
    }
    
    if (that.data.fweight && that.data.fheight && that.data.fbirthdate && that.data.fgender) {
      var dbirthdate = new Date().getFullYear() - that.data.dbirthdate.split('-')[0] + ((that.data.dbirthdate.split('-')[1] < new Date().getMonth()) ? 0 : -1)
      that.setData({
        Base: (13.88 * dweight + 4.16 * dheight - 3.43 * dbirthdate - (dgender === "男" ? 0 : 112.4) + 54.34).toFixed(2)
      })
    }
  },
  formsubmit: async function(e) {
    var that = this
    if (that.data.flag == false && !(that.data.fgender && that.data.fbirthdate && that.data.fheight && that.data.fweight && that.data.fexe && that.data.fpurpose)) { //之前没提交过数据，而且第一次提交表单没填写完整
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
      if (!that.data.flag) { //之前未提交过
        var gender;
        var exe;
        var purpose;
        for (var p in that.data.gender) {
          if (that.data.dgender == that.data.gender[p]) gender = that.data.gender[p]
        }
        for (var p in that.data.exe) {
          if (that.data.dexe == that.data.exe[p]) exe = parseInt(p)
        }
        if (that.data.crazy) { //是运动狂
          for (var p in that.data.crazypurpose) {
            if (that.data.dpurpose == that.data.crazypurpose[p]) purpose = parseInt(p)+4
          }
        } else {
          if (that.data.low24) { //BMI低于24
            for (var p in that.data.crazypurpose) {
              if (that.data.dpurpose == that.data.lowpurpose[p]) purpose = parseInt(p)
            }
            if(purpose>0) purpose = purpose+1
          } else { //正常情况
            for (var p in that.data.purpose) {
              if (that.data.dpurpose == that.data.purpose[p]) purpose = parseInt(p)
            }
          }
        }
        let data = {
          "gender": (gender === "男" ? "m" : "f"),
          "birthday": that.data.dbirthdate,
          "height": that.data.dheight,
          "weight": that.data.dweight,
          "exercise": parseInt(exe) + 1,
          "purpose": parseInt(purpose) + 1,
        }
        console.log(data)
        wx.showToast({
          title: '提交成功',
        })
        //表单提交后返回的新摄入数据，存入缓存
        let currentIntake = await api.sendHealth(data)
        wx.setStorageSync('currentIntake', currentIntake)
        that.setData({ //恢复表单未编辑状态
          edit: false
        })
        let cacheinfo = {
          "edit": false
        }
        wx.setStorageSync("cacheinfo", cacheinfo)
      } else { //之前已提交过
        var gender;
        var exe;
        var purpose;
        for (var p in that.data.gender) {
          if (that.data.dgender == that.data.gender[p]) gender = that.data.gender[p]
        }
        for (var p in that.data.exe) {
          if (that.data.dexe == that.data.exe[p]) exe = parseInt(p)
        }
        if (that.data.crazy) { //是运动狂
          for (var p in that.data.crazypurpose) {
            if (that.data.dpurpose == that.data.crazypurpose[p]) purpose = parseInt(p)+4
          }
        } else {
          if (that.data.low24) { //BMI低于24
            for (var p in that.data.crazypurpose) {
              if (that.data.dpurpose == that.data.lowpurpose[p]) purpose = parseInt(p)
            }
            if(purpose>0) purpose=purpose+1
          } else { //正常情况
            for (var p in that.data.purpose) {
              if (that.data.dpurpose == that.data.purpose[p]) purpose = parseInt(p)
            }
          }
        }

        let data = {
          "gender": (gender === "男" ? "m" : "f"),
          "birthday": that.data.dbirthdate,
          "height": that.data.dheight,
          "weight": that.data.dweight,
          "exercise": parseInt(exe) + 1,
          "purpose": parseInt(purpose) + 1,
        }
        console.log(data)
        //表单提交后返回的新摄入数据，存入缓存
        let currentIntake = await api.changeHealth(data)
        wx.setStorageSync('currentIntake', currentIntake)
        that.setData({ //恢复表单未编辑状态
          edit: false
        })
        wx.showToast({
          title: '提交成功',
        })
        let cacheinfo = {
          "edit": false
        }
        wx.setStorageSync("cacheinfo", cacheinfo)
      }
      wx.navigateBack({})
    }
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
    let exelist = await api.exercisesList()
    let purposelist = await api.purposesList()
    that.setData({
      exe: exelist.data.map((item) => item.content),
      //purpose: purposelist.data.map((item) => item.content)
    })
    //that.data.height.push(2)
    var height = new Array()
    var fatrate = new Array()
    for (var j = 0; j < 1000; j++) {
      fatrate.push(j/10)
    }
    that.setData({
      fatrate: fatrate
    })
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

    //是否给表单设置初值
    var cacheinfo = wx.getStorageSync('cacheinfo')
    console.log("cacheinfo", cacheinfo)
    //若之前存在修改的数据未提交
    if (cacheinfo.edit) {
      console.log("cacheinfo", cacheinfo.edit)
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
    } else { //否则再判断该用户之前是否提交过数据
      var info = await api.getHealth()
      console.log("info", info)
      if (info.statusCode == 200) {
        var info = info.data.data
        that.setData({
          info: info
        })
        //将info的值分别赋给各个模块，并将是否有值设为true
        that.setData({
          flag: true,
          fgender: true,
          fbirthdate: true,
          fheight: true,
          fweight: true,
          fexe: true,
          fpurpose: true,
          dgender: info.gender,
          dbirthdate: info.birthday,
          dheight: info.height,
          dweight: info.weight,
          dexe: info.exercise,
          dpurpose: info.purpose
        })
        if (info.fat_rate != null) { //体脂率,因为可填可不填，单独拉出来判断
          that.setData({
            ffatrate: true,
            dfatrate: info.fat_rate
          })
        }
        if (info.work_time != "-") { //作息时间
          that.setData({
            fcustom: true,
            dcustom: info.work_time
          })
        }
        for(var p in that.data.exe){
          console.log(that.data.exe[p])
          if(that.data.exe[p]==info.exercise){
            if(p>0){
              that.setData({
                crazy:true
              })
            }
            break;
          }
        }
        var a= info.height
        var b= info.weight
        var BMI = (b /a/ a * 10000).toFixed(2)
        var dbirthdate = new Date().getFullYear() - info.birthday.split('-')[0] + ((info.birthday.split('-')[1] < new Date().getMonth()) ? 0 : -1)
        that.setData({
          BMI:BMI,
          Base: (13.88 * b + 4.16 * a - 3.43 * dbirthdate - (info.gender === "男" ? 0 : 112.4) + 54.34).toFixed(2)
        })
        if(BMI<24){
          that.setData({
            low24:true
          })
        }
        console.log(info)
      }
    }
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
      },
    })
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