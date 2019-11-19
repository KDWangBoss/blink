import {ClassicModel} from '../../models/classic.js';
import {LikeModel } from '../../models/like.js';

let classicModel = new ClassicModel();
let likeModel = new LikeModel();

Page({
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },
  /**
   * 监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest().then(res=>{
       console.log('---s',res);
       this.setData({
          classic: res,
          likeCount: res.fav_nums,
          likeStatus: res.like_status
       })
    });  
  },
  onLike: function(e){
    let behavior = e.detail.behavior;
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type);
  },
  onNext: function(){
    this._updateClassic('next');
  },
  onPrevious: function(){
    this._updateClassic('previous');
  },
  //私有方法改变电影数据
  _updateClassic: function(previousOrNext){
    let index = this.data.classic.index;
    classicModel.getClassic(index, previousOrNext).then(res=>{
       this._getLikeStatus(res.id, res.type);
       this.setData({
          classic: res,
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index)
       })
    })
  },
  //私有方法获取点赞状态
  _getLikeStatus: function(artID, category){
    likeModel.getClassicLikeStatus(artID, category).then(res=>{
       this.setData({
          likeCount: res.fav_nums,
          likeStatus: res.like_status
       });
    });
  }
})
