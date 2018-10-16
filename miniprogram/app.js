//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env:'test-e824a6'
      })
    }
    this.globalData = {
      audioBasePath:"cloud://test-e824a6.7465-test-e824a6/"
    }
  }
})
