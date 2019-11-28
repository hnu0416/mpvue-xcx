<!--
  @name cell单元格
  @author siye
  @desc
   <lnk-cell @click="handleProd()">
      <template slot="left">
        <label>意向产品</label>
        <lnk-tag plain type="danger" text="促销" />
      </template>
    </lnk-cell>
 -->
<template>
  <div class="lnk-cell" @click="$emit('click')">
    <div class="lnk-content-row">
      <div class="left-col">
        <slot name="left"/>
      </div>
      <div class="right-col">
        <slot name="right"/>
      </div>
    </div>
    <div class="lnk-right-icon" v-if="hasLink">
      <label class="iconfont icon-more"></label>
    </div>
  </div>
</template>

<script>
  export default {
    name: "lnkCell",
    props: {
      hasLink: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .lnk-cell {
    padding-left: 10px;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #f3f3f3;
    .lnk-content-row {
      width: 90%;
      float: left;
      .left-col {
        width: 70%;
        float: left;
        font-size: 14px;
      }
      .right-col {
        width: 30%;
        float: right;
      }
    }
    .lnk-right-icon {
      width: 10%;
      float: left;
      right: 5px;
    }
  }
</style>
