<template>
  <div class="me-page">
    <div v-if="getUser.nickName||nickName !=''">
      <div class="me-userInfo" v-if="!getUser.nickName">
        <img class="user-img" :src="avatarUrl">
        <span class="user-name">{{nickName}}</span>
      </div>
      <div class="me-userInfo" v-else>
        <img class="user-img" :src="getUser.avatarUrl">
        <span class="user-name">{{getUser.nickName}}</span>
      </div>
    </div>
    <div>
      <button type="warn" @click="login">退出登录</button>
    </div>
    <div style="margin-top: 20px;">
      <button type="warn" open-type="getPhoneNumber" bindgetphonenumber="dealPhoneNumber">获取电话号码</button>
    </div>
    <div style="margin-top: 20px;">
      <navigator target="miniProgram" app-id="wxeb490c6f9b154ef9" :extra-data="card_data">会员卡开卡</navigator>
     <!-- <button type="warn" @click="getCard">领取会员卡</button>-->
    </div>
    <div style="margin-top: 20px;">
      <button type="warn" @click="showCard">我的会员卡</button>
    </div>
    <div style="margin-top: 20px;">
      <button type="warn" open-type="contact">客服</button>
    </div>
    <div style="margin-top: 20px;" v-if="!getUser.nickName&&nickName ==''">
      <button type="warn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">用户授权</button>
    </div>
    <div style="margin-top: 20px;">
      <button type="warn" @click="map">导航</button>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { mapGetters } from 'vuex';

  export default {
    name: "center",
    data() {
      return {
        nickName: "",
        avatarUrl: "",
        card_data: {
          encrypt_card_id: "qNbTxD2uRfdkyDk/6UdD+F1jEvAjtQ/g+xB5y59GJMZ0Gm4FGH+YM0cSUxOgYtXl",
          outer_str: "link_xcx",
          biz: "MzIyMTY1ODQ3OA=="
        }
      }
    },
    methods: {
      dealPhoneNumber: function(e) {
        console.log(e.detail.errMsg);
        console.log(e.detail.iv);
        console.log(e.detail.encryptedData);
      },
      map: function () {
        wx.navigateTo({
          url: '/pages/other/map'
        })
      },
      getCard: function() {
        wx.navigateToMiniProgram({
          appId: "wxeb490c6f9b154ef9", // 固定为此appid，不可改动
          // 包括encrypt_card_id outer_str biz三个字段，须从step3中获得的链接中获取参数
          extraData: {
            encrypt_card_id: "qNbTxD2uRfdkyDk/6UdD+F1jEvAjtQ/g+xB5y59GJMZ0Gm4FGH+YM0cSUxOgYtXl",
            outer_str: "link_xcx",
            biz: "MzIyMTY1ODQ3OA=="
          },
          success: function( data ) {
            this.$util.toast("开卡成功：" + data);
          },
          fail: function( data ) {
            this.$util.toast("开卡失败：" + data);
          },
          complete: function() {
            this.$util.toast("complete.");
          }
        });
      },
      showCard: function () {
        wx.openCard({
          cardList: [
            {
              cardId: 'pbpsGwEGBHBwvMS7prgbeJ1fLHm8',
              code: '042166386671'
            }
          ],
          success: function(res) {
            this.$util.toast("openCard.");
          }
        })
      },
      ...mapMutations(['setUser']),
      bindGetUserInfo(e) {
        // console.log(e.mp.detail.rawData)
        if (e.mp.detail.rawData){
          //用户按了允许授权按钮
          console.log('用户按了允许授权按钮');
          let that = this;
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              console.log(res.userInfo);
              that.nickName = res.userInfo.nickName;
              that.avatarUrl = res.userInfo.avatarUrl;
              that.setUser({
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl
              });
            }
          });
        } else {
          //用户按了拒绝按钮
          console.log('用户按了拒绝按钮');
        }
      }
    },
    computed: {
      ...mapGetters([
        'getUser'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .me-page {
    height: 400px;
    margin-top: 20px;
    width: 80%;
    margin-left: 10%;
  }

  .me-userInfo {
    margin-bottom: 5px;
    text-align: center;
    .user-img {
      width: 50px;
      height: 50px;
      vertical-align: middle;
      border-radius: 40px;
    }
    .user-name {
      margin-left: 20px;
      vertical-align: middle;
    }
  }
</style>
