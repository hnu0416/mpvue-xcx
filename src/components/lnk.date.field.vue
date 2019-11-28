<!--
  自定义的日期时间field组件
  @author siye
  实例：
    Date: <lnk-date-field v-model="opportunityItem.birthday" label="生日" dateType="date" />
  备注：
    所有 field 加上 required 属性会有必输小红心提示
 -->
<template>
  <div>
    <div><span class="require-icon" v-if="required">*</span></div>
    <div class="lnk-field">
      <picker :mode="dateType" :value="value" :start="minDate" end="" @change="bindDateChange"
              :disabled="readonly">
        <div class="lnk-row">
            <div class="lnk-col-label">{{ label }}</div>
            <div class="lnk-col-content">
              <input class="input"
                     :placeholder="placeholder"
                     disabled
                     v-bind="$attrs"
                     :value="value"
                     />
            </div>
            <label class="iconfont icon-more" v-if="!readonly"></label>
        </div>
      </picker>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'date-field',
    data () {
      return {
        showDateFlag: false,
        minDate: '',
        currentDate: new Date (),
        placeholder: ''
      }
    },
    props: {
      dateType: {
        type: String,
        default: "date"
      },       // 日期类型
      value: String,          // 值列表传递的值
      label: String,          // LABEL元素
      required: Boolean,      // 必输标识
      readonly: Boolean       // 只读标识
    },
    created () {
      if(!this.readonly) {
        this.placeholder = '请选择' + this.label;
      }
      let temp = new Date();
      temp.setFullYear(1949, 10, 1);
      this.minDate = temp;
    },
    methods: {
      bindDateChange: function(e) {
        this.$emit('input', e.mp.detail.value)
      }
      /*showDate: function () {
        if(!this.readonly) {
          this.showDateFlag = true;
        }
      },
      onCancelDate: function () {
        this.showDateFlag = false;
      },
      onConfirmDate: function () {
        this.showDateFlag = false;
        if(this.dateType === 'date') {
          this.$emit("input", this.$util.getNowDateByParam(this.currentDate));
        } else if(this.dateType === 'datetime') {
          this.$emit("input", this.$util.getNowDateLongByParam(this.currentDate));
        }
      }*/
    }
  }
</script>

<style lang="scss" scoped>

</style>
