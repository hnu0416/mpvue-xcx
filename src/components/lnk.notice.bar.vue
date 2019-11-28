<!--
  @author siye
  实例
    <lnk-notice-bar :text="noticeHello" />
-->
<template>
  <div>
    <div class="notice-bar"
         :style="{'color': color, 'background': background}">
      {{ text }}
    </div>
  </div>
</template>

<script>
  export default {
    name: "notice.bar",
    props: {
      text: String,
      color: {
        type: String,
        default: '#f60'
      },
      background: {
        type: String,
        default: '#fff7cc'
      },
      scrollable: {
        type: Boolean,
        default: true
      },
      speed: {
        type: Number,
        default: 50
      }
    },
    computed: {
      barStyle () {
        return {
          'color': this.color,
          'background': this.background
        };
      },
    }
  }
</script>

<style lang="scss" scoped>
  .notice-bar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 9px 15px;
    font-size: 12px;
    line-height: 1.5;
    position: relative;
  }
</style>
