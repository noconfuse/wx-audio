const app =  getApp()
// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.recordmanger = wx.getRecorderManager();
    this.audioContext = wx.createInnerAudioContext();
    this.recordmanger.onFrameRecorded((res)=>{
      let {frameBuffer} = res;
      let view = new Int32Array(frameBuffer),len = view.length;
      let perWidth = 300*2.5/len
    })
    this.recordmanger.onStop((res)=>{
      let tempFilePath = res.tempFilePath,slashIndex = tempFilePath.lastIndexOf('/'),dotIndex = tempFilePath.lastIndexOf('.')
      wx.uploadFile({
        url: 'http://192.168.3.116:3001/uploadVoice',
        filePath: tempFilePath,
        name: 'voice',
        success:(res)=>{
          let data = JSON.parse(res.data);
          let msgArr = this.data.msg
          if(data.code===0){
            msgArr.push(data.result)
            this.setData({
              msg: msgArr
            })
            console.log(this.data.msg)
          }else{
            wx.showToast({
              title: data.msg,
              icon: 'none'
            })
          }
        },
        fail:(err)=>{
          console.log(err)
        }
      })
      this.audioContext.src = tempFilePath
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.context = wx.createCanvasContext('waveForm');
    this.context.clearRect(0,0,300,225);


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
      sampleRate: 16000,
      format:'mp3',
      frameSize:50,
      numberOfChannels:1//百度语音只支持单声到
    })
    this.setData({
      isRecording:true
    })
  },
  stopRecord(){
    this.recordmanger.stop()
  },
  playvoice(){
    this.audioContext.play()
  },
  uploadtestaudio(){
    wx.downloadFile({
      url: 'https://review.4006688991.com/pixi/asset/sound/373f90fe634deace86a5729971bc62a6.mp3',
      success:(res)=>{
        wx.cloud.uploadFile({
          cloudPath:'temp/77cba90eaf67439d17263d4843f9be42.mp3',
          filePath:res.tempFilePath,
          success:(res)=>{
            console.log(res)
          },
          fail:(err)=>{
            console.log(err)
          }
        })
      }
    })
  }
})