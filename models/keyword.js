import {HTTP} from '../utils/http-p.js'

class KeywordModel extends HTTP{
  key = 'q';
  maxLength = 10;

  //从缓存中获取已查询记录
  getHistory(){
    const words = wx.getStorageSync(this.key);
    if(!words){
      return [];
    }
    return words;
  }
  //获取最热门记录
  getHot(){
    return this.request({
      url: '/book/hot_keyword'
    })
  }
  //将搜索过的数据添加到缓存中
  addToHistory(keyword){
    let words = this.getHistory();
    const has = words.includes(keyword);
    if(!has){
      //如果超过了10位,删除数组第一位
      const length = words.length;
      if (length >= this.maxLength){
        words.pop();
      }
      words.unshift(keyword);
    }
    wx.setStorageSync(this.key, words);
  }
}

export {KeywordModel}