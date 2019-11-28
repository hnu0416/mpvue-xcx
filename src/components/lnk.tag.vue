<!--
  标记
  @author siye
  text 内容
  type	类型，可选值为primary success danger，默认为primary 灰色
  plain	是否为空心样式	默认为	false
  实例：
    <lnk-tag plain type="primary" :text="item.gender" />
-->
<template>
  <span class="tag" :class="className">
    {{ text }}
  </span>
</template>

<script>
  export default {
    name: 'lnkTag',
    computed: {
      className: function () {
        if(this.plain) {
          if(this.type === 'danger') {
            return 'type-danger-plain';
          } else if(this.type === 'success') {
            return 'type-success-plain';
          } else if(this.type === 'primary') {
            return 'type-primary-plain';
          }
        } else {
          if(this.type === 'danger') {
            return 'type-danger';
          } else if(this.type === 'success') {
            return 'type-success';
          } else if(this.type === 'primary') {
            return 'type-primary';
          }
        }
        return 'type-primary'
      }
    },
    props: {
      type: {                // lnkTag支持额外的三种类型 primary, danger, warn
        type: String,
        default: 'danger'
      },
      plain: {               // tag是否镂空，默认为false
        type: Boolean,
        default: false
      },
      text: String          // 显示值
    }
  }
</script>
<style lang="scss" scoped>
  .type-danger {
    color: #fff;
    background: #f44;
    border: 0;
  }
  .type-success {
    color: #fff;
    background: #06bf04;
    border: 0;
  }
  .type-primary {
    color: #fff;
    background: #38f;
    border: 0;
  }
  .type-danger-plain {
    color: #f44;
    background: #fff;
    border: 1px solid #f44;
  }
  .type-success-plain {
    color: #06bf04;
    background: #fff;
    border: 1px solid #06bf04;
  }
  .type-primary-plain {
    color: #38f;
    background: #fff;
    border: 1px solid #38f;
  }
  .tag {
    display: inline-block;
    padding: 2px 5px;
    line-height: normal;
    border-radius: 3px;
    font-size: 10px;
    margin-left: 2px;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      -webkit-transform: scale(.5);
      transform: scale(.5);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      pointer-events: none;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
  }
</style>
