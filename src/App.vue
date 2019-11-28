<script>
  import { mapMutations } from 'vuex'
  /*const QQMapWX = require('./libs/qqmap-wx-jssdk.min.js');
  // 实例化API核心类
  const demo = new QQMapWX({
    key: 'HFBBZ-SDMC2-4OWU3-CP66D-ADNM6-YOF5E' // 必填
  });*/
  export default {
    mounted () {
      let self = this;
      //登录时获取token
      wx.login({
        success: function (res){
          if(res.code){
            console.log(res.code);
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        }
      });
      /*// 调用接口
      demo.getCityList({
        success: function(res) {
          console.log("success");
          console.log(res.result);
        },
        fail: function(res) {
          console.log("fail");
          console.log(res);
        },
        complete: function(res) {
          console.log("complete");
          console.log(res);
        }
      });*/
    },
    methods: {
      ...mapMutations(['setUser', 'loadLov', 'downloadMoreId']),
    }
  }
</script>

<style>
  @import "./assets/css/style.css";
  @import "../static/iconfont/iconfont.css";
</style>
