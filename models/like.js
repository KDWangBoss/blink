import {HTTP} from '../utils/http-p.js'

class LikeModel extends HTTP{
  //点赞和取消点赞
  like(behavior ,artID, category){
    let url = behavior === 'like' ? '/like' : '/like/cancel'
    return this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }

  //得到点赞状态
  getClassicLikeStatus(artID,category){
    return this.request({
      url: `/classic/${category}/${artID}/favor`
    })
  }
}

export {LikeModel}