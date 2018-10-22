const bmap = require('../../lib/bmap-wx.min.js')
Page({
  data: {
    sugData: []
  },
  onLoad: function (options) {
    console.log(bmap)

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