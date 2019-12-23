// pages/fillindata/fillindata.js
import api from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fatrate:[],
    customlist: ["三餐", "三+一餐", "三+二餐","三+三餐"],
    crazy:false,//是否经常运动
    crazypurpose:["减脂","增肌","增强体质"],
    lowpurpose:["减重","增重","保持体重"],
    low24:false,//BMI是否低于24
    BMI: [], //体脂率
    Base: [], //基础代谢
    edit: false, //用户是否编辑过页面而且没有提交，用于存储页面显示
    toView: [], //锚点跳转
    windowHeight: [],
    windowWidth: [],
    flag: false, //之前是否提交过数据
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
    exe: [],
    purpose: ["减重","急速减重", "增重", "保持体重"],
    weight: [],
    height: [],
    //是否选择了数据
    fgender: false,
    fbirthdate: false,
    fheight: false,
    fweight: false,
    fexe: false,
    fpurpose: false,
    fcustom:false,
    ffatrate:false,
    //已选择的数据，用于picker显示
    dgender: [],
    dbirthdate: [],
    dheight: [],
    dweight: [],
    dexe: [],
    dpurpose: [],
    dcustom:[],
    dfatrate:[],
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
    console.log("asdsa")
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
                crazy:false,
                fpurpose:false
              })
              that.AlertShow(message)
              break;
            case 1:
            case 2:
              that.setData({
                crazy:true,
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
          if(that.data.crazy){
            that.setData({
              fpurpose: true,
              dpurpose: that.data.crazypurpose[parseInt(e.detail.value)]
            })
          }else{
            if(that.data.low24){
              that.setData({
                fpurpose: true,
                dpurpose: that.data.lowpurpose[parseInt(e.detail.value)]
              })
            }else{
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
        case 8:{
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
    if (that.data.fweight && that.data.fheight) {
      that.setData({
        BMI: (dweight / dheight / dheight * 10000).toFixed(2),
      })
      if(that.data.BMI<24){
        that.setData({
          low24:true
        })
      }else{
        that.setData({
          low24: false
        })
      }
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
      //判断问题
      if (parseInt(e.detail.value.exe) == 0 && (parseInt(e.detail.value.purpose)) == 1) { //低非运动人群不可快速降脂
        var message = "低非运动人群不可快速降脂"
        that.AlertShow(message)
      }else{
        if (parseInt(e.detail.value.fatrate) < 0 || parseInt(e.detail.value.fatrate) >100){
          var message = "体脂率填写不合法"
          that.AlertShow(message)
        }else{
          let data = {
            "gender": (parseInt(e.detail.value.gender) === 0) ? 'm' : 'f',
            "birthday": e.detail.value.date,
            "height": that.data.height[parseInt(e.detail.value.height)],
            "weight": that.data.weight[parseInt(e.detail.value.weight)],
            "exercise": parseInt(e.detail.value.exe) + 1,
            "purpose": parseInt(e.detail.value.purpose) + 1,
          }
          console.log(data)
          //表单提交后返回的新摄入数据，存入缓存
          let currentIntake = await api.sendHealth(data)
          wx.setStorageSync('currentIntake', currentIntake)
          that.setData({ //恢复表单未编辑状态
            edit: false
          })
          let cacheinfo = {
            "edit": false
          }
        }
      }
      
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
    for(var j=0;j<100;j++){
      fatrate.push(j)
    }
    that.setData({
      fatrate:fatrate
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
    try {
      var cacheinfo = wx.getStorageSync('cacheinfo')
      //若之前存在修改的数据未提交
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
    console.log(info)
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