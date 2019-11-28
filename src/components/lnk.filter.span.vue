<!--
  将需要进行filter转换的内容放至于此
  实例
    <lnk-filter-span :text="item.created|formatPointDate"></lnk-filter-span>
 -->
<template>
  <div>
    <span>{{text}}</span>
  </div>
</template>

<script>
  export default {
    name: "lnk.filter.span",
    props: {
      text: String
    }
  }
</script>

<style scoped>

</style>
