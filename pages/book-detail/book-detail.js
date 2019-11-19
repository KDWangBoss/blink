// pages/book-detail/book-detail.js
import { BookModel} from '../../models/book.js'
import { LikeModel } from '../../models/like.js'

const bookModel = new BookModel();
const likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //显示加载
    wx.showLoading();
    const bid = options.bid;
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    const likeStatus = bookModel.getLikeStatus(bid);
    
    Promise.all([detail, comments, likeStatus]).then((res)=>{
     
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      });
      //加载结束
      wx.hideLoading();
    });
  },
  
  onLike(e){
    let behavior = e.detail.behavior;
    likeModel.like(behavior, this.data.book.id, 400);
  },

  onFakePost(e){
    this.setData({
      posting: true
    })
  },

  onCancel(e){
    this.setData({
      posting: false
    })
  },

  onPost(e){
    //组件发送过来的文本
    const comment = e.detail.text || e.detail.value;
    //输入框发送过来的文本
    console.log('e',e);
    if(comment.length>12){
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return ;
    }

     //提示添加成功
     wx.showToast({
        title: '+ 1',
        icon: 'none'
     })

     this.data.comments.unshift({
        content: comment,
        nums: 1
     })

     this.setData({
        comments: this.data.comments,
        posting: false
     })
   //  bookModel.postComment(this.data.book.id,comment).then((res)=>{
   //    console.log(res);
   //     //提示添加成功
   //     wx.showToast({
   //        title: '+ 1',
   //        icon: 'none'
   //     })

   //     this.data.comments.unshift({
   //        content: comment,
   //        nums: 1
   //     })

   //     this.setData({
   //        comments: this.data.comments,
   //        posting: false
   //     })
   //  });
  }
})