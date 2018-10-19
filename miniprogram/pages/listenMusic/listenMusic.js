// pages/listenMusic/listenMusic.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList:[],
    imageUrl:''    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'getMusicList',
      data:{}
    }).then(res=>{
      this.setData({
        musicList:res.result.data
      })
    }).catch(err=>{
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent('#modal')
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
  
  playAudio(e){
    let audioname = e.currentTarget.dataset.audioname;
    let audioContext = wx.createInnerAudioContext();
    audioContext.src = app.globalData.audioBasePath+ "钱半仙 - 梁祝（钢琴版）.mp3";
    audioContext.play()
  },
  createList(){
    this.dialog.showModal();
  },
  cancel(){
    this.dialog.hideModal();
  },
  createSongList(e){
    let title = e.detail.value.listTitle,description = e.detail.value.listDescription;
    let isPrivate = e.detail.value.isPrivite;
    console.log(this.data.imageUrl)
    wx.cloud.callFunction({
      name:"createMusicList",
      data:{
        description:e.detail.value.description,
        isPrivate:e.detail.value.isPrivate,
        coverImage:this.data.imageUrl
      }
    }).then(res=>{
      console.log(res)

    })
  },
  chooseCoverImage(){
    wx.chooseImage({
      sizeType:['compressed'],
      success:(res)=>{
        this.setData({
          imageUrl:res.tempFilePaths[0]
        })
      }
    })
  }
})