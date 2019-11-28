const Fly = require("flyio/dist/npm/wx");
import env from '../env/env'
import store from '../vuex/store.js'
import util from '../common/util'
const http = new Fly
/**
 * http拦截器：
 * 1、为发出的请求进行遮罩处理以及拼接TOKEN
 * 2、对返回的报文进行STATUS的判断
 * @author siye
 * */
//请求拦截器
http.interceptors.request.use(function (config) {
  config.timeout = '30000';
  config.baseURL = env.baseUrl;
  config.headers["X-Tag"] = "flyio";
  // 设置token参数
  let login = wx.getStorageSync('login');
  if(login !== '') {
    config.headers = Object.assign({}, config.headers, {token: JSON.parse(login).token});
  } else {
    config.headers = Object.assign({}, config.headers, {token: ''});
  }
  // 在发送请求之前做些什么
  if(config.method === 'GET') {
    let _copy_config_body = config.body;
    config.body = Object.assign({}, config.body, {noToast: false});
    config.body = Object.assign({}, config.body, _copy_config_body);
    if(!config.body.noToast) {
      wx.showLoading({
        title: '加载中',
      })
    }
  } else {
    if(store.state.common.hasToast) {
      wx.showLoading({
        title: '加载中',
      })
    }
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  util.toast('网络错误,请稍后再试！');
  wx.hideLoading();
  return Promise.reject(error);
});

//响应拦截器，响应拦截器会在then/catch处理之前执行
http.interceptors.response.use(function (response) {
  wx.hideLoading();
  // 对响应数据做点什么
  if(response.status === 220) {
    // Token失效
    wx.removeStorage({
      key: 'token'
    });
    util.toast('Token已失效！');
    return Promise.reject("会话已过期，请退出重新进入！");
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  wx.hideLoading();
  if(error.response) {
    if(error.response.status === 401) {
      // 如果返回401 即没有权限，跳到登录页重新登录
      wx.removeStorage({
        key: 'token'
      });
      util.toast('请重新登录！');
    }
  }
  return Promise.reject(error);
});

export default http
