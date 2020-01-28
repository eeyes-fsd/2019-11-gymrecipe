// pages/recipelist/recipelist.js
import api from "../../utils/Recipe.js"
import payment from "../../utils/Order.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    payid:[],//所购食品id
    //test
    detailcurrentdata: [], //用于切换早午晚餐详情的
    currentimage: [],
    currentdata: [], //当前显示的食谱详情
    testx: 100,
    showStyle: [], //显示动画
    windowWidth: [], //屏幕数据
    windowHeight: [],
    trans: [], //px和rpx的换算
    showanimation: false, //是否显示动画

    //fooddetail
    currenttab: "breakfast", //早餐午餐晚餐切换

    //recipelist
    onedayprice:0,//一日配餐价格
    threedayprice:0,//三日配餐价格
    allprice:0,//食谱总价
    boolmyrecipelist:false,//判断我的购买是否为空
    fooddetail: false, //是否显示图片详情
    methodid: 2, //配餐定制方式
    showwindow: false, //是否显示配置订餐窗口
    perchased: 1,
    //全部套餐
    recipelist: [],
    //已购套餐
    myrecipelist: [],
    copyrecipelist:[],//recipelist的拷贝，用于显示购买浮窗中两个额外配餐
    choosing:false,//判断是否选择了该套餐
    choosingrecipe:[],//被选中的食谱
  },

  //早餐午餐晚餐切换
  navbar: function(e) {
    var that = this
    switch (e.currentTarget.dataset.id) {
      case 'breakfast':
        that.setData({
          detailcurrentdata: that.data.currentdata.breakfast
        })
        break;
      case 'lunch':
        that.setData({
          detailcurrentdata: that.data.currentdata.lunch
        })
        break;
      case 'dinner':
        that.setData({
          detailcurrentdata: that.data.currentdata.dinner
        })
        break;
    }
    that.setData({
      currenttab: e.currentTarget.dataset.id,
    })
  },

  //recepelist
  //获取当前sroll滚动位置
  getposition: function(e) { 
    var that = this
    that.setData({
      testx: (e.detail.scrollLeft) * that.data.trans
    })
  },
  //餐品选择
  methodbar: function(e) { 
    var that = this
    console.log(e)
    that.setData({
      methodid: e.currentTarget.dataset.id
    })
  },
  //显示半浮窗
  showwindow: function(e) {
    var that = this
    that.setData({
      showwindow: true,
      payid:e.currentTarget.dataset.id
    })

    //深拷贝recipelist,三日套餐选择的食谱列表，去掉了当前食谱以及已购食谱
    var copy = JSON.parse(JSON.stringify(that.data.recipelist))
    //将当前食谱从列表中删去
    for(var p in copy){
      if (parseInt(e.currentTarget.dataset.id)===copy[p].id){
        //设置一日配餐的价格
        that.setData({
          choosingrecipe:copy[p],
          onedayprice:copy[p].price,
          threedayprice: copy[p].price
        })
        copy.splice(p,1);
        break;
      }
    }
    //将已购食谱从列表中删去
    for(var p in that.data.myrecipelist){
      for(var q in copy){
        if(that.data.myrecipelist[p].id===copy[q].id){
          copy[q].splice(q,1);
          break;
        }
      }
    }
    //为每一个数组成员添加新的键值对判断是否选中了该食谱
    for(var i=0;i<copy.length;i++){
      copy[i].choosing = false
    }
    that.setData({
      copyrecipelist:copy
    })
  },
  //三日配餐的选择
  buychoosing:function(e){
    var that = this
    var id = parseInt(e.currentTarget.dataset.id)
    for(var p in that.data.copyrecipelist){
      if(id===that.data.copyrecipelist[p].id){
        if (that.data.copyrecipelist[p].choosing)
        { 
          that.data.copyrecipelist[p].choosing = false;
          //修改价格
          that.setData({
            threedayprice:that.data.threedayprice-that.data.copyrecipelist[p].price
          })
        }
        else{ 
          that.data.copyrecipelist[p].choosing = true;
          //修改价格
          that.setData({
            threedayprice: that.data.threedayprice + that.data.copyrecipelist[p].price
          })
        }
        break;
      }
    }
    //自己赋值给自己以刷新页面显示
    that.setData({
      copyrecipelist:that.data.copyrecipelist
    })
    //
  },
  //切换已购买和全部
  nav: function(e) {
    var that = this
    that.setData({
      perchased: e.currentTarget.dataset.id
    })
  },
  //跳转食品详情
  fooddetail: async function(e) {
    var that = this
    let recipedetail = await api.recipesDetails(parseInt(e.currentTarget.dataset.id))
    console.log(recipedetail)
    that.setData({
      showanimation: true,
      testx: that.data.testx - (parseInt(e.currentTarget.dataset.id) - 1) * 556,
      currentdata: recipedetail.data.data,
      currentimage: that.data.recipelist[parseInt(e.currentTarget.dataset.id) - 1].cover,
      detailcurrentdata: recipedetail.data.data.breakfast
    })
    that.setData({
      showStyle: '-webkit-animation: show 0.5s linear;animation:show 0.5s linear'
    })
    setTimeout(function() {
      that.setData({
        showStyle: ''
      })
    }, 1000)
    setTimeout(function() {
      that.setData({
        fooddetail: true
      })
    }, 100)
    setTimeout(function() {
      that.setData({
        showanimation: false,
      })
    }, 490)
  },
  scrolling: async function(e) {
    // let that = this
    // let r;
    // console.log(e.detail.scrollLeft)
    // let a = ~~(e.detail.scrollLeft / 278)
    // // 检测当前视窗下的view-scroll是否完全加载数据
    // for (let i = ((a - 1) < 0 ? 0 : (a - 1)); i < a + 2; i++) {
    //   if (that.recipelist[i].breakfast === undefined) {
    //     r = await api.recipesDetails(i)
    //     that.setData({
    //       'recipelist[i]': r.data.data
    //     })
    //   }
    // }
  },
  myscrolling: async function(e) {
    let that = this
    let r;
    console.log(e.detail.scrollLeft)
    let a = ~~(e.detail.scrollLeft / 278)
    // 检测当前视窗下的view-scroll是否完全加载数据
    for (let i = ((a - 1) < 0 ? 0 : (a - 1)); i < a + 2; i++) {
      if (that.myrecipelist[i].breakfast === undefined) {
        r = await api.recipesDetails(i)
        that.setData({
          'myrecipelist[i]': r.data.data
        })
      }
    }
  },
  //支付
  pay: async function() {
    var that = this
    that.setData({
      showwindow: false
    })
    var idarray = new Array()
    if (parseInt(that.data.methodid) === 1) idarray.push(that.data.payid)
    if (parseInt(that.data.methodid)===2){
      idarray.push(that.data.payid)
      for(var p in that.data.copyrecipelist){
        if(that.data.copyrecipelist[p].choosing){
          idarray.push(that.data.copyrecipelist[p].id)
        }
      }
    }
    if (parseInt(that.data.methodid)===3) {idarray = 0;}
    var empty = new Array() 
    let orderlist = {"recipes":idarray,"diets":empty,"ingredients":empty,"address_id":0};
    await payment.pay(orderlist)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    var that = this
    let response = await api.allRecipes()
    that.setData({
      recipelist: response.data.data
    })
    let response2 = await api.boughtRecipes()
    if(response2.status===200){
      that.setData({
        myrecipelist: response2.data.data,
        boolmyrecipelist:true
      })
    }else{
      that.setData({
        boolmyrecipelist:false
      })
    }
    try {
      var toViewid = "r" + wx.getStorageSync("recipeid") //食谱id锚点
      that.setData({
        toView: toViewid
      })
    } catch {}
    try {
      var perchased = wx.getStorageSync("perchased")
      that.setData({
        perchased: perchased
      })
    } catch {}
    wx.getSystemInfo({
      success: function(res) {
        let windowHeight = (res.windowHeight * (750 / res.windowWidth));
        let windowWidth = (res.windowWidth * (750 / res.windowWidth))
        that.setData({
          windowHeight: windowHeight,
          windowWidth: windowWidth,
          trans: 750 / res.windowWidth
        })
      }
    })
    //计算出总的价格
    var allprice=0
    for(var i=0;i<that.data.recipelist.length;i++){
      allprice = allprice + that.data.recipelist[i].price
    }
    that.setData({
      allprice:allprice
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

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