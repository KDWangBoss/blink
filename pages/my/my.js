// pages/my/my.js
import {BookModel} from '../../models/book.js'
import { ClassicModel} from '../../models/classic.js'

const bookModel = new BookModel();
const classicModel = new ClassicModel();

Page({

  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount();
  },
  onShow: function () {
    this.getMyBookCount();
    this.getMyFavor();
  },
  userAuthorized(){
    console.log('userAuthorized');
    wx.getSetting({
      success: data=>{
        if (data.authSetting["scope.userInfo"]){
          wx.getUserInfo({
            success: data=>{
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }else {

        }
      }
    })
  },
  onGetUserInfo(e){
    const userInfo = e.detail.userInfo;
    if (userInfo){
      this.setData({
        authorized: true,
        userInfo: userInfo
      })
    }
    
  },
  onJumpToAbout(e){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onStudy(e){
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },
  getMyBookCount(e){
    bookModel.getMyBookCount().then(res=>{
      this.setData({
        bookCount: res.count
      })
    })
  },
  getMyFavor(){
    classicModel.getMyFavor().then((res)=>{
       this.setData({
          classics: res
       })
    });
  },
  onJumpToDetail(e){
    const cid = e.detail.cid;
    const type = e.detail.type;
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`,
    })
  }
})