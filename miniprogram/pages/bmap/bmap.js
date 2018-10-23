const QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js')
let qqmapsdk;
Page({
  data: {
    sugData: [],
    markers:[{
      id:0,
      iconPath:'../../images/yellowduck.png'
    }],
    keyword:'',
    ad_info:{},
    showSugInfo:false,
    latitude:0,
    longitude:0
  },
  onReady:function(){
    var that = this;
    wx.getLocation({
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        qqmapsdk.reverseGeocoder({
          location:{
            latitude:res.latitude,
            longitude:res.longitude
          },
          success:(res)=>{
            that.setData({
              ad_info:res.result.ad_info
            })
          }
        })
      },
    })
  },
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key:'734BZ-JOCR4-5MFUW-XNCUT-EUMBF-FKBGM'
    })
    var that = this;
    this.mapCtx = wx.createMapContext('myMap')
    this.mapCtx.moveToLocation()
  },
  bindkeyinput:function(e){
    var that = this;
    qqmapsdk.getSuggestion({
      keyword:e.detail.value,
      region:this.data.ad_info.city,
      region_fix:0,
      fail:(err)=>{
        console.log(err)
      },
      success:(data)=>{
        that.setData({
          sugData:data.data,
          showSugInfo:true
        })
      }
    })
  },
  comfirmInput:function(item){
    let data = item.target.dataset,sugData = data.sug;
    this.setData({
      keyword:sugData.title,
      showSugInfo:false
    })
    this.search(sugData.address)
    //todo有些关键词需要直接给出距离

  },
  search:function(adr){
    var that = this;
    qqmapsdk.geocoder({
      address:adr,
      success:(res)=>{
        let result = res.result;
        that.setData({
          'markers':[{
            id:1,
            latitude: result.location.lat,
            longitude: result.location.lng
          }],
          longitude: result.location.lng,
          latitude:result.location.lat
        })
      },
      fail:(err)=>{
        console.log(err)
      }
    })
  }
})