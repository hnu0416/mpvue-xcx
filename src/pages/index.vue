<template>
  <div>
    <!-- swipe -->
    <div class="swipe">
      <swiper :indicator-dots="indicatorDots" :circular="circular"
              :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor"
              :autoplay="autoPlay" :interval="interval" :duration="duration">
        <div v-for="(item, index) in imgUrls" :key="index">
          <swiper-item >
            <image :src="item" class="slide-image" width="355" height="150" />
          </swiper-item>
        </div>
      </swiper>
    </div>
    <!-- Notice -->
    <lnk-notice-bar :text="noticeHello" ></lnk-notice-bar>

    <!--<view>
      <video id="myVideo" style="width: 100%;"
             src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      ></video>
    </view>-->

    <!-- menu -->
    <div class="module-item">
      <div class="item-title">我的应用</div>
    </div>
    <div class="more-content">
      <div @click="goAccount()">
        <i class="iconfont icon-kehu"></i>
        <span>客户</span>
      </div>
      <div @click="goOpportunity()">
        <i class="iconfont icon-wodeshangjizhuanhuan"></i>
        <span>商机</span>
      </div>
      <div @click="empty()">
        <i class="iconfont icon-daiban"></i>
        <span>待办事项</span>
      </div>
      <div @click="empty()">
        <i class="iconfont icon-Community"></i>
        <span>社区</span>
      </div>
    </div>
  </div>
</template>

<script>
  import LnkNoticeBar from '@/components/lnk.notice.bar'
  export default {
    name: 'home',
    components: {
      LnkNoticeBar
    },
    data () {
      return {
        userInfo: {},
        noticeHello: '欢迎您，现在是' + this.$util.getNowDateLong(),
        noticeColor: 'white',
        noticeBackGround: 'red',
        imgUrls: [
          'https://linkcrm.cn/share/cxc_img/y-banner01.jpg',
          'https://linkcrm.cn/share/cxc_img/y-banner02.jpg'
        ],
        indicatorDots: true,
        autoPlay: true,
        circular: true,
        indicatorActiveColor: '#26a2ff',
        indicatorColor: 'white',
        interval: 5000,
        duration: 1000
      }
    },
    methods: {
      goAccount: function () {
        wx.navigateTo({
          url: '/pages/account/account.list'
        })
      },
      goOpportunity: function () {
        wx.navigateTo({
          url: '/pages/opportunity/opportunity.list'
        })
      },
      empty: function () {
        this.$util.toast('敬请期待！');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .swipe {
    height: 0;
    overflow: hidden;
    width: 100%;
    padding-bottom: 41%;
    text-align: center;
    .slide-image {
      width: 100%;
      height: 100%;
    }
  }

  .more-content{
    display: flex;
    display: -webkit-flex;
    font-size: 14px;
  }

  .more-content:first-child{
    background-image: -webkit-linear-gradient(top, #ddd 0%, #ddd 50%, transparent 50%);
    background-image: linear-gradient(180deg, #ddd 0%, #ddd 50%, transparent 50%);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: bottom;
  }

  .more-content >div{
    background-image: -webkit-linear-gradient(left, #ddd, #ddd 50%, transparent 50%);
    background-image: linear-gradient(90deg, #ddd 0%, #ddd 50%, transparent 50%);
    background-size: 1px 100%;
    background-repeat: no-repeat;
    text-align: center;
    height: 100px;
    flex: 1;
    -webkit-flex: 1;
    span{
      display: block;
      color: #444;
    }
    .iconfont{
      font-size: 22px;
      display: inline-block;
      margin-top: 20px;
      width: 40px;
      height: 40px;
      font-weight: bolder;
      text-align: center;
      margin-bottom: 5px;
      line-height: 40px;
      border-radius: 5px;
      color: #fff;
    }
    .icon-kehu{
      text-shadow: 1px 1px 2px #0a69a5;
      background: #20A6FC;
      background: -moz-linear-gradient(top, #bfdfff, #64b0fc);
      background: -webkit-gradient(linear, 0 0, 0 bottom, from(#bfdfff), to(#64b0fc));
      background: -o-linear-gradient(top, #bfdfff, #64b0fc);
    }
    .icon-wodeshangjizhuanhuan{
      text-shadow: 1px 1px 2px #d28f1c;
      background: #fcac22;
      background: -moz-linear-gradient(top, #fed58e, #fcac22);
      background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fed58e), to(#fcac22));
      background: -o-linear-gradient(top, #fed58e,#fcac22);
    }
    .icon-Community{
      font-size: 20px;
      text-shadow: 1px 1px 2px #a9c126;
      background: #cee64e;
      background: -moz-linear-gradient(top, #dff085, #c6e717);
      background: -webkit-gradient(linear, 0 0, 0 bottom, from(#dff085), to( #c6e717));
      background: -o-linear-gradient(top, #dff085, #c6e717);
    }
    .icon-daiban{
      font-size: 20px;
      text-shadow: 1px 1px 2px #1f95bc;
      background: #72dcff;
      background: -moz-linear-gradient(top, #a2e5fb, #3bcefe);
      background: -webkit-gradient(linear, 0 0, 0 bottom, from(#a2e5fb), to(#3bcefe));
      background: -o-linear-gradient(top, #a2e5fb, #3bcefe);
    }
  }
</style>
