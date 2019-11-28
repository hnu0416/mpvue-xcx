<!--
  自定义的地址field组件
  @author siye
  实例：
    Address: <lnk-address-field :province="account.item.province"
                   :city="account.item.city"
                   :district="account.item.district"
                   label="地址" readonly @change="changeAddress"/>
  备注：
    1、针对地址类型，需要在父组件上定义changeAddress方法，当选择地址时，会向此方法输送一个省市县的数组，同时使用组件时，也需要传入省市县三个value
    2、所有 field 加上 required 属性会有必输小红心提示
 -->
<template>
  <div>
    <div><span class="require-icon" v-if="required">*</span></div>
    <div class="lnk-field">
      <picker mode="region" @change="bindRegionChange" :disabled="readonly">
        <div class="lnk-row">
          <div class="lnk-col-label">{{ label }}</div>
          <div class="lnk-col-content">
            <span style="color: rgb(130,130,130);">{{ placeholder }}</span>
            {{ province }}{{ city }}{{ district }}
          </div>
          <label class="iconfont icon-more" v-if="!readonly"></label>
        </div>
      </picker>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'address-field',
    props: {
      province: String,       // 地址传递的省份
      city: String,           // 地址传递的城市
      district: String,       // 地址传递的区县
      label: String,          // LABEL元素
      required: Boolean,      // 必输标识
      readonly: Boolean       // 只读标识
    },
    watch: {
      province: function () {
        if(!this.readonly) {
          if (!this.$util.isEmpty(this.province)
            || this.$util.isEmpty(this.city)
            || this.$util.isEmpty(this.district)) {
            this.placeholder = '';
          } else {
            if (!this.readonly) {
              this.placeholder = '请选择' + this.label;
            }
          }
        }
      }
    },
    created () {
      if(!this.readonly) {
        if(this.$util.isEmpty(this.province)
          && this.$util.isEmpty(this.city)
          && this.$util.isEmpty(this.district)) {
          this.placeholder =  '请选择' + this.label;
        }
      }
    },
    methods: {
      bindRegionChange: function ( e ) {
        this.$emit("change", e.mp.detail.value);
      }
    },
    data () {
      return {
        placeholder: ''
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
