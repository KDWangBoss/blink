// components/epsoide/index.js.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer: function(newVal, oldVal, changePath){
         console.log('n,o,c', newVal, oldVal, changePath);
        let val = newVal<10?'0'+newVal:newVal;
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    year: Number,
    month: String,
    _index: String
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  attached: function(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let months = this.data.months;

    this.setData({
      year: year,
      month: months[month]
    })
  
  }

})
