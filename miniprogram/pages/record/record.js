const app =  getApp()
// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.recordmanger = wx.getRecorderManager();
    this.audioContext = wx.createInnerAudioContext();
    this.recordmanger.onFrameRecorded((frameBuffer,isLastFrame)=>{
      console.log(frameBuffer)
    })
    this.recordmanger.onStop((res)=>{
      let tempFilePath = res.tempFilePath,slashIndex = tempFilePath.lastIndexOf('/'),dotIndex = tempFilePath.lastIndexOf('.')
      let cloudPath = 'temp' + tempFilePath.match(/(\/[^/|.]+?)\./)[1] + '.mp3'
      wx.cloud.uploadFile({
        cloudPath: cloudPath,
        filePath:res.tempFilePath,
        success:(res)=>{
          wx.cloud.callFunction({
            name: "uploadfile",
            data: {
              fileId:res.fileID
            }
          }).then(result=>{
            console.log(result)
          })
        },
        fail:(err=>{
          console.log(err)
        })
      })
      this.audioContext.src = tempFilePath
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

  },
  startRecord(e){
    this.recordmanger.start({
      duration: 60000,
      format: 'mp3',
      sampleRate: 16000
    })
  },
  stopRecord(){
    this.recordmanger.stop()
  },
  playvoice(){
    this.audioContext.play()
  }
})