<!--
  路由匹配404
  @author siye
 -->
<template>
  <div class="not-found">
    <img class="error" src="../assets/img/error.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'notFound'
  }
</script>

<style lang="scss" scoped>
  .not-found {
    text-align: center;
    .error{
      width: 200px;
      height: 200px;
      margin: 120px auto 10px auto;
      background-size: 100%;
      background-position: -10px center;
    }
  }
</style>
