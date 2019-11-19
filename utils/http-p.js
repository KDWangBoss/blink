import { config } from '../config.js'

const tips = {
  1: '抱歉出现错误了',
  1005: 'appKey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在'
}

class HTTP {
  //封装request成promise对象
  request({url, data = {}, method = 'GET'}){
    return new Promise((resolve,reject)=>{
      this._request(url,resolve,reject,data,method);
    });
  }

  _request(url, resolve, reject, data={}, method='GET') {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        "content": "application/json",
        "appKey": config.appKey
      },
      success: (res) => {
        let code = res.statusCode;
        if (code.toString().startsWith('2')) {
          resolve(res.data);
        } else {
          reject();
          this._show_error(res.data.error_code);
        }
      },
      fail: (err) => {
        reject();
        this._show_error(1);
      }
    })
  }
  _show_error(error_code) {
    if(!error_code){
      error_code = 1;
    }
    let tip = tips[error_code];
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 1500
    })
  }
}

export { HTTP }