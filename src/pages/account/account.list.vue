<template>
  <div>
    <lnk-search-tab @handle="searchByParameter" :search="search" placeholder="客户名称"></lnk-search-tab>
    <div style="height: 40px;">
      <lnk-sort-tabs :sortList="sortList" @handle="searchBySort" span="82"></lnk-sort-tabs>
      <lnk-filter-tab :filters="filters" @handle="searchByFilter" span="16" isMultiple></lnk-filter-tab>
    </div>
    <lnk-list :pageInfo="pageInfo" :emptyFlag="emptyFlag">
      <template slot="list">
        <div class="lnk-list" v-for="item in pageInfo.list" :key="item.id" @click="accountItem( item )">
          <div class="list-left-col">
            <div class="lnk-row">
              <div class="row-left-col-7">
                {{ item.accountName }}
                <lnk-tag plain type="primary" :text="item.gender|lovTransform('GENDER')" />
                <lnk-tag plain type="danger" :text="item.sources|lovTransform('SOURCE_FROM')" />
              </div>
              <div class="row-right-col-3">
                <lnk-filter-span :text="item.created|formatPointDate"></lnk-filter-span>
              </div>
            </div>
            <div class="lnk-row">
              <label class="iconfont icon-lbs" style="font-size: 18px;"></label>
              <label>{{ item.city }}{{ item.district }}{{ item.address }}</label>
            </div>
          </div>
          <div class="list-right-col">
            <label class="iconfont icon-more"></label>
          </div>
        </div>
      </template>
    </lnk-list>
  </div>
</template>

<script>
  import LnkSearchTab from '@/components/lnk.search.tab'
  import LnkSortTabs from '@/components/lnk.sort.tabs'
  import LnkFilterTab from '@/components/lnk.filter.tab'
  import LnkList from '@/components/lnk.list'
  import LnkTag from '@/components/lnk.tag'
  import LnkFilterSpan from '@/components/lnk.filter.span'
  import { mapMutations } from 'vuex'
  export default {
    name: 'accountList',
    mounted () {
      this.initPageInfo();
      this.onLoad();
    },
    onReachBottom: function () {
      // 划到底部加载更多数据
      this.onLoad();
    },
    components: {
      LnkSearchTab,
      LnkSortTabs,
      LnkFilterTab,
      LnkList,
      LnkTag,
      LnkFilterSpan
    },
    data () {
      return {
        title: '客户列表',
        emptyFlag: false,    // 列表是否为空
        search: {
          text: ''           // 模糊查询参数
        },
        filters: [           // 筛选面板上可供筛选值
          {
            name: '客户性别',
            select: [],
            type: 'GENDER',
            lov: []
          }, {
            name: '客户类型',
            type: 'ACCOUNT_TYPE',
            select: [],
            lov: []
          }
        ],
        sortList: [                                        // 可供排序的内容
          {
            name: '创建时间',
            key: 'created'
          },{
            name: '客户类型',
            key: 'accountType'
          }
        ],
        pageInfo: {}
      }
    },
    methods: {
      ...mapMutations(['setAccountItem']),
      // 初始化pageInfo
      initPageInfo: function () {
        this.pageInfo = {
          url: '/mobile/QidianAccount/queryByExamplePage',
          params: {},
          list: [],
          loading: false,
          finished: false,
          firstLoad: true
        }
      },
      // 初始化客户列表
      onLoad () {
        if(this.pageInfo.firstLoad) {
          this.pageInfo = this.$page.queryPageInfo(this.pageInfo, this.successFun);
          this.pageInfo.firstLoad = false;
        } else {
          this.pageInfo = this.$page.queryNextPageInfo(this.pageInfo, this.successFun);
        }
      },
      // 对返回的列表进行数据操作
      successFun: function ( pageInfo ) {
        if (pageInfo.list.length === 0) {
          this.emptyFlag = true;
        } else {
          this.emptyFlag = false;
        }
        this.$forceUpdate();
      },
      // 模糊查询
      searchByParameter: function () {
        this.initPageInfo();
        this.pageInfo.params = Object.assign( {}, this.pageInfo.params, { searchText: this.search.text });
        this.onLoad();
      },
      // 排序查询
      searchBySort: function ( currentSort ) {
        this.initPageInfo();
        this.pageInfo.params = Object.assign( {}, this.pageInfo.params, currentSort);
        this.pageInfo.params = Object.assign( {}, this.pageInfo.params, { searchText: this.search.text });
        this.onLoad();
      },
      // 筛选页面完成 - 查询数据
      searchByFilter: function ( filters ) {
        this.filters = filters;
        this.initPageInfo();
        this.pageInfo.params = Object.assign( {}, this.pageInfo.params, {
          filterType: 'accountFilter',
          formatRequestFlag: false,
          genders: this.filters[0].select.toString(),
          accntTypes: this.filters[1].select.toString(),
          contactWays: '',       // 补全参数
          guides:''              // 补全参数
        });
        this.onLoad();
      },
      // 客户明细
      accountItem: function ( item ) {
        this.setAccountItem( item );
        wx.navigateTo({
          url: '/pages/account/account.item'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
