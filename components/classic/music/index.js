import { classicBeh } from '../classic-beh.js'
//获得背景音乐统一管理器
const mMgr = wx.getBackgroundAudioManager();

Component({
  /**
   * 继承behavior
   */
  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
   src: String,
   title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },
  attached: function(){
    this._recoverStatus();
    this._monitorSwitch();
  },
  detached: function(e){
    //mMgr.stop();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(event){
      //播放音乐
      if(!this.data.playing){
        //图片切换
        this.setData({
          playing: true
        })
        //播放音乐
        console.log('src=', this.properties.src);
        mMgr.title = this.properties.title;
        mMgr.src = this.properties.src;
        
      }else {
        this.setData({
          playing: false
        })
        mMgr.pause();
      }
    },
    //恢复状态
    _recoverStatus: function () {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return;
      }
      if (mMgr.src === this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    //让后台播放器与界面图标同步
    _monitorSwitch: function(){
      mMgr.onPlay(()=>{
        this._recoverStatus();
      })
      mMgr.onPause(() => {
        this._recoverStatus();
      })
      mMgr.onStop(() => {
        this._recoverStatus();
      })
      mMgr.onEnded(() => {
        this._recoverStatus();
      })
    }
  },
})
