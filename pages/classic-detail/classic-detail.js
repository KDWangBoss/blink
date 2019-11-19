import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const {cid, type} = options;
    classicModel.getById(cid,type).then(res=>{
       this._getLikeStatus(res.id, res.type);
       this.setData({
          classic: res
       })
    });  
  },
  onLike: function (event) {
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id,
      this.data.classic.type)
  },

  _getLikeStatus: function (artID, category) {
    likeModel.getClassicLikeStatus(artID, category).then(res=>{
         this.setData({
            likeCount: res.fav_nums,
            likeStatus: res.like_status
         })
      })
  },
})