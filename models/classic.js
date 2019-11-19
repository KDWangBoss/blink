import {HTTP} from '../utils/http-p.js'

class ClassicModel extends HTTP{
  //获得最新的数据
  getLatest(){
    return this.request({
      url: '/classic/latest'
    }).then((res)=>{
       this._setLatestIndex(res.index);
       let key = this._getKey(res.index);
       wx.setStorageSync(key, res);
       return Promise.resolve(res);
    })
  }
  //获得上一期数据
  getClassic(index,previousOrNext,cb){
    //从缓存中读取数据或者将将数据写入到缓存中
    let key = previousOrNext === 'previous' ? this._getKey(index-1) : this._getKey(index+1);
    let classic = wx.getStorageSync(key);
    if (!classic){
      return this.request({
        url: `/classic/${index}/${previousOrNext}`
      }).then(res=>{
         wx.setStorageSync(this._getKey(res.index), res);
         return Promise.resolve(res);
      })
    }else {
       return Promise.resolve(classic);
    }
    
  }
  //是否是第一个
  isFirst(index){
    return index === 1 ? true:false;
  }
  //是否是最后一个
  isLatest(index){
    let latestIndex = this._getLatesIndex();
    return index === latestIndex ? true:false;
  }
  //设置最新一期的标识到缓存
  _setLatestIndex(index){
    wx.setStorageSync('latest', index);
  }
  //读取缓存中的标识
  _getLatesIndex(){
    let index = wx.getStorageSync('latest');
    return index;
  }
  
  _getKey(index){
    let key = 'classic-' + index;
    return key;
  }

  getMyFavor() {
     return this.request({
        url: '/classic/favor'
     });
  }

  getById(cid, type) {
    return this.request({
       url: `/classic/${type}/${cid}`
    })
  }
}

export {ClassicModel}