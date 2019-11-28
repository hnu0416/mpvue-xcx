<!--
  界面没有数据时显示
  @author siye
  1、import ContentEmpty from '@/components/content.empty'
  2、components: {
      ContentEmpty
     }
  3、<lnk-content-empty v-if="emptyFlag"></lnk-content-empty>
 -->
<template>
  <div class="is-empty">
    <img class="error" src="../assets/img/is_empty.png" alt="">
  </div>
</template>
<script>
  export default {
    name: 'empty'
  }
</script>
<style lang="scss" scoped>
  .is-empty {
    text-align:center;
    .error{
      width: 240px;
      height: 240px;
      margin: 20px auto 10px auto;
      background-size: 100%;
    }
  }
</style>
