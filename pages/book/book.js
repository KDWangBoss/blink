// pages/book/book.js
import {BookModel} from '../../models/book.js'
import {random} from '../../utils/common.js'

const bookModel = new BookModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bookList = bookModel.getHotList();
    //获取书本详情信息 
    bookList.then((res) => {
      this.setData({
        books: res
      })
    });
  },
  onSearching(e){
    this.setData({
      searching: true
    })
  },
  onCancel(){
    this.setData({
      searching: false
    })
  },
  

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
    this.setData({
      more: random(16)
    })
  },
})