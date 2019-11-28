<!--
  lnk tabbar item 标签栏item
  @author siye
  @desc 结合lnkTabbar使用
      handle为点击需要执行的方法
      name为显示名称
      icon为显示图标
  实例：
      <lnk-tabbar>
        <lnk-tabbar-item @handle="saveAccount" name="保存客户" icon="icon-iconset0237"/>
      </lnk-tabbar>
-->
<template>
  <div class="lnk-tabbar-item" @click="handle" :style="{width: buttonWidth+'%'}">
    <div style="height: 26px;line-height: 26px">
      <label class="iconfont label" :class="icon"></label>
    </div>
    <div class="name">{{ name }}</div>
  </div>
</template>

<script>
  export default {
    name: "lnkTabbarItem",
    props: {
      name: String,
      icon: {
        type: String,
        default: "icon-iconset0237"
      }
    },
    computed: {
      buttonWidth: function () {
        return 100/this.$parent.items.length;
      }
    },
    beforeCreate() {
      this.$parent.items.push('item');
    },
    methods: {
      handle: function () {
        this.$emit('handle', this.filters)
      }
    }
  }
</script>

<style lang="scss">
  .lnk-tabbar-item {
    float: left;
    height: 44px;
    line-height: 44px;
    border: 0;
    border-radius: 0;
    color: #26a2ff;
    .label {
      font-weight: bolder;
      color: #26a2ff;
      font-size: 20px;
    }
    .name {
      height: 18px;
      line-height: 18px;
      font-size: 10px;
    }
  }
</style>
