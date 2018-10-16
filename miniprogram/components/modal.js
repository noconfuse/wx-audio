// components/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:"string",
      value: "创建歌单"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowModal:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancel(){
      this.emit
    },
    showModal() {
      this.setData({
        isShowModal: true
      })
    },
    hideModal(){
      this.setData({
        isShowModal:false
      })
    }, stopProgration(){
      return
    }
  }
})
