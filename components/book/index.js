// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function(e){
      const id = this.properties.book.id;
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${id}`,
      })
    }
  }
})
