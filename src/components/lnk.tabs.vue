<!--
  @name 标签页
  @author siye
  @desc
     <lnk-tabs :tabs="tabs" v-model="active" />
 -->
<template>
  <div>
    <scroll-view scroll-x="true" class="lnk-tabs">
      <div class="lnk-tabs-item" :class="{'active': tab.id === value}" :style="{width: width + '%'}"
           v-for="(tab, index) in tabs" :key="index" @click="changeActive( tab.id )">
        <label class="iconfont" :class="tab.icon"></label>
        <label class="label-name">{{ tab.title }}</label>
      </div>
    </scroll-view>
  </div>
</template>

<script>
  export default {
    name: "lnkTabs",
    props: {
      tabs: {
        type: Array,
        default: []
      },
      value: {
        type: String,
        default: '0'
      }
    },
    computed: {
      width: function () {
        if(this.tabs.length <= 4) {
          return 100/this.tabs.length;
        } else {
          return "25"
        }
      }
    },
    methods: {
      changeActive: function ( active ) {
        this.value = active;
        this.$emit('input', this.value);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .lnk-tabs {
    white-space: nowrap;
    display: flex;
    height: 46px;
    border-bottom: 1px solid #fafafa;
    background-color: #fff;
    .active {
      color: #26a2ff;
      border-bottom: 2px solid #26a2ff;
    }
    .lnk-tabs-item {
      height: 44px;
      line-height: 44px;
      display: inline-block;
      text-align: center;
      .label-name {
        font-size: 14px;
        margin-left: 5px;
      }
    }
  }
</style>
