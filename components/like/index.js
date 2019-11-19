Component({
  properties: {
    like: {
      type: Boolean
    },
    count: {
      type: Number
    },
    readOnly: Boolean
  },
  
  data: {
    yesSrc: 'image/like.png',
    noSrc: 'image/like@dis.png',
  },
  methods: {
    onLike: function(e){
      //自定义事件
      if(this.properties.readOnly){
        return ;
      }
      let like = this.properties.like;
      let count = this.properties.count;
      count = like ? count-1 : count+1
      this.setData({
        like: !like,
        count: count
      })
      //激活
      let behavior = this.properties.like ? 'like' : 'cancel'
      this.triggerEvent('like',{behavior:behavior},{});
    }
  }
})
