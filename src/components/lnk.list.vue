<!--
  @name lnk列表
  @author siye
  @desc：
    1、封装列表，支持更多箭头、空查询提示，同时返回item对象，提供插槽允许自定义主要内容部分
    2、针对主要内容的插槽，提供行css、左col、右col等，支持扩展
  @param pageInfo: 查询结果对象
  @param emptyFlag: 空数据标识
-->
<template>
  <div class="lnk-list-page">
    <lnk-content-empty v-if="emptyFlag"></lnk-content-empty>
    <slot name="list">
      List Content
    </slot>
    <!-- slot回传数据暂不支持，所以如下的设计方式暂且搁置 -->
    <!--<div class="lnk-list" v-for="item in pageInfo.list" :key="item.id" @click="handleItem( item )">
      <div class="list-left-col">
        <slot name="content" :item="item">
          Item Content
        </slot>
      </div>
      <div class="list-right-col">
        <label class="iconfont icon-more"></label>
      </div>
    </div>-->
    <div class="no-more" v-if="pageInfo.finished&&!emptyFlag">
      没有更多内容了...
    </div>
  </div>
</template>

<script>
  import LnkContentEmpty from '@/components/lnk.content.empty'
  export default {
    name: "lnkList",
    props: {
      pageInfo: Object,      // pageInfo
      onLoad: {},
      emptyFlag: {
        type: Boolean,
        default: false
      }
    },
    components: {
      LnkContentEmpty
    },
    methods: {
      handleItem: function ( item ) {
        this.$emit('handleItem', item);
      }
    }
  }
</script>

<style>

</style>
