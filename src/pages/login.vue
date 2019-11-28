<template>
  <div class="login-page">
    <view class="section">
      <input type="text" placeholder="用户名" class="input"/>
    </view>
    <view class="section">
      <input password type="text" placeholder="密码" class="input"/>
    </view>
    <button class="login-button" type="primary" @click="login">登录</button>
  </div>
</template>

<script>
  export default {
    name: "login",
    methods: {
      login () {
        wx.redirectTo({
          url: '/pages/login/main'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-page {
    height: 400px;
    margin-top: 200px;
    width: 80%;
    margin-left: 10%;
    .login-button {
      background-color: #26a2ff;
    }
    .input {
      background-color: #f3f3f3;
      margin-bottom: 10px;
      height: 28px;
      border-radius: 5px;
      padding: 8px;
    }
  }
</style>
