// components/search/index.js
import {KeywordModel} from '../../models/keyword.js'
import {BookModel} from '../../models/book.js'
import { paginationBev} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({
  /**
   * 调用行为
   */
  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    text: String,
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords:[],
    searching: false,
    q:null,
    loading: false,
    loadingCenter: false
  },
  /**
   * 小程序初始化的时候默认调用的方法
   */
  attached(){    
    this.setData({
      historyWords: keywordModel.getHistory()
    });
    keywordModel.getHot().then(res=>{
      this.setData({
        hotWords: res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore(){
    
      if(!this.data.q) {
        return;        
      }
      //上锁防止重复加载
      if(this.data.loading){
        return ;
      }
      const length = this.data.dataArray.length;
      
      if(this.hasMore()){
        this.setData({
          loading: true
        })
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          console.log('this',this)
          this.setMoreData(res.books);
          this.setData({
            loading: false
          })
        }).catch(err=>{
          this.setData({
            loading: false
          })
        })
      }
      
    },
    onCancel(e){
      this.initialize();
      this.triggerEvent('cancel',{},{})
    },
    onDelete(e){
      this.initialize();
      this.setData({
        historyWords: keywordModel.getHistory(),
        q: null,
        searching: false
      })
    },
    onConfirm(e){
      this.setData({
        searching: true,
        loadingCenter: true
      });
      const word = e.detail.value || e.detail.text;
      this.setData({
        q: word
      })
      if (!word) {
        return ;
      }
      bookModel.search(0, word).then(res=>{
        this.setData({
          loadingCenter: false
        })
        this.setMoreData(res.books);
        this.setTotal(res.total);
        keywordModel.addToHistory(word);
      });
    },
   
  }
})
