<!--
 列表上的tab中，左边的排序部分，默认宽度占tab的20/24，余下的4用于筛选界面组件
 @author siye
 参考：
  1、配置可排序参数 sortList: [ { name: '创建时间', key: 'created' }, { name: '需求日期', key: 'requestDate' } ]
  2、定义handle方法 searchBySort: function ( currentSort ) { } 参数为当前排序的字段和排序类型
  3、使用：
    <div style="height: 40px;">
      <lnk-sort-tabs :sortList="sortList" @handle="searchBySort" span="82"></lnk-sort-tabs>
    </div>
 -->
<template>
  <div>
    <div class="sort-col" :style="{width: colSpan + '%'}" v-for="(item, index) in sortList" :key="index">
      <div @click="handle( item.key )">
        <span class="sort-col-span">{{ item.name }}</span>
        <label class="iconfont icon-paixujiantoushang sort-col-i-top"
           :class="{'check-iconfont': currentSort.sortType === item.key && currentSort.sortDirection === 'asc'}"></label>
        <label class="iconfont icon-paixujiantouxia sort-col-i-bottom"
           :class="{'check-iconfont': currentSort.sortType === item.key &&currentSort.sortDirection === 'desc'}"></label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "listTabs",
    props: {
      sortList: {
        type: Array,
        default: []
      },                        // 可供排序的参数列表
      span: {                   // 宽度
        type: String,
        default: '82'
      }
    },
    mounted () {
      this.colSpan = this.span/this.sortList.length;
    },
    data () {
      return {
        colSpan: '',
        currentSort: {    // 当前排序内容
          sortType: '',
          sortDirection: ''
        }
      }
    },
    methods: {
      handle: function ( type ) {
        this.currentSort.sortType = type;
        if (this.$util.isEmpty(this.currentSort.sortDirection)) {
          this.currentSort.sortDirection = 'asc';
        } else {
          if(this.currentSort.sortDirection === 'asc') {
            this.currentSort.sortDirection = 'desc';
          } else {
            this.currentSort.sortDirection = 'asc';
          }
        }
        this.$emit("handle", this.currentSort);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sort-col {
    border-right: 2px solid #fafafa;
    position: relative;
    height: 40px;
    line-height: 40px;
    float: left;
    background-color: white;
    text-align: center;
    .sort-col-span {
      margin-right: 5px;
      font-size: 14px;
    }
    .sort-col-i-top {
      top: 2px;
      position: absolute;
    }
    .sort-col-i-bottom {
      top: 3px;
      position: absolute;
    }
  }
</style>
