// components/tag/index.js
Component({
  externalClasses: ['tag-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    text:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e){
      const value = this.data.text;
      //console.log('value',value);
      //产生一个事件，book-detail来接收
      this.triggerEvent('tapping',{
        text: this.properties.text
      },{});
    }
  }
})
