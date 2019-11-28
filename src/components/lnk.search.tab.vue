<!--
  列表头上的搜索框
  @author siye
  参考：
    1、data中定义search: { text: '' }参数
    2、定义searchByParameter: function () { }  查询方法
    3、使用 <lnk-search-tab @handle="searchByParameter" :search="search" placeholder="客户名称"></lnk-search-tab>
-->
<template>
  <div class="search-page">
    <label class="iconfont icon-search"></label>
    <div class="input-page">
      <div class="input-content">
        <input class="input"
               :placeholder="placeholder"
               v-model="search.text"/>
        <div class="icon-clear" @click="clearText">
          <label class="iconfont icon-chahao" v-if="clear"></label>
        </div>
      </div>
    </div>
    <div class="button-content">
      <button class="button" @click="searchByParameter">查询</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "searchTab",
    props: {
      placeholder: String,
      search: Object
    },
    computed: {
      clear: function () {
        return !this.$util.isEmpty(this.search.text);
      }
    },
    methods: {
      // 查询方法
      searchByParameter: function () {
        this.$emit("handle");
      },
      // 清空输入框
      clearText: function () {
        this.search.text = '';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-page {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 6px 6px 6px 15px;
    position: relative;
    height: 50px;
    background-color: #f3f3f3;
    .icon-search {
      top: 50%;
      left: 25px;
      z-index: 1;
      color: #999;
      position: absolute;
      font-size: 24px;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      font-weight: normal;
    }
    .input-page {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      border-radius: 4px;
      padding: 3px 10px 3px 35px;
      width: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      line-height: 34px;
      height: 34px;
      position: relative;
      background-color: #fff;
      color: #333;
      font-size: 14px;
      overflow: hidden;
      .input-content {
        position: relative;
        background-color: white;
        border: 0;
        display: block;
        width: 100%;
        resize: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height: 28px;
        line-height: 28px;
        .input {
          border: 0;
          display: block;
          width: 100%;
          resize: none;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          padding-right: 20px;
          height: 28px;
          line-height: 28px;
        }
        .icon-clear {
          position: absolute;
          right: 0;
          top: 50%;
          padding: 10px 0 10px 10px;
          -webkit-transform: translate3d(0,-50%,0);
          transform: translate3d(0,-50%,0);
          .icon-chahao {
            color: #bbb;
            position: relative;
            display: block;
            font: normal normal normal 14px/1 vant-icon;
            font-size: inherit;
            text-rendering: auto;
          }
        }
      }
    }
    .button-content {
      line-height: 34px;
      height: 34px;
      font-size: 14px;
      letter-spacing: 1px;
      .button {
        height: 34px;
        line-height: 34px;
        margin-left: 5px;
        background-color: #26a2ff;
        border: none;
        padding: 0 15px;
        font-size: 14px;
        color: #fff;
        position: relative;
        display: inline-block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
        -webkit-appearance: none;
      }
    }
  }
</style>
