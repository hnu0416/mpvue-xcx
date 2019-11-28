<!--
  lnk tabbar 标签栏
  @author siye
  @desc 具体内容查看lnk.tabbar.item
-->
<template>
  <div class="lnk-tabbar-div">
    <slot />
  </div>
</template>

<script>
  export default {
    name: "lnkTabbar",
    data () {
      return {
        items: []
      }
    }
  }
</script>

<style lang="scss">
  .lnk-tabbar-div {
    width: 100%;
    position: fixed;
    bottom: 0;
    left:0;
    height: 44px;
    text-align: center;
    z-index:200;
    background-color: white;
    border-top: 1px solid #fafafa;
  }
</style>
