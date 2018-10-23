const bmap = require('../../lib/bmap-wx.min.js')
Page({
  data: {
    sugData: [],
    initLatitude:0,
    initLongitude:0,
    markers:{
      id:0,
      latitude: 23.099994,
      longitude: 113.324520,
      iconPath:'../../images/yellpwduck.png'
    }
  },
  onLoad: function (options) {
    // wx.request({
    //   url:'http://192.168.1.3:3001/map/transit',
    //   method:'post',
    //   data:{

    //   },
    //   success:(result)=>{
    //     console.log(result)
    //   }
    // })
    var that = this;
    wx.getLocation({
      type:'gcj02',
      success: function(res) {
        console.log(res)
        that.setData({
          initLatitude:res.latitude,
          initLongitude:res.longitude,
          markers:{
            longitude:res.longitude,
            latitude:res.latitude
          }
        })
      },
    })
  },
  bindkeyinput:function(e){
    var that = this;
    const Bmap = new bmap.BMapWX({
      ak: '4pEG4k5R5aK5qatCrowMHsAShbK3hbeC'
    })
    Bmap.suggestion({
      query:e.detail.value,
      region:'上海',
      city_limit:true,
      fail:(err)=>{
        console.log(err)
      },success:(data)=>{
        console.log(data,that)
        that.setData({
          sugData:data.result
        })
      }
    })
  }
})