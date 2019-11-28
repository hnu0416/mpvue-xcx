<template>
  <div>
    <lnk-tabs :tabs="tabs" v-model="active" />
    <div class="module-item has-tab" v-show="active==='0'">
      <div class="item-title">基本信息</div>
      <div class="item-body">
        <lnk-field v-model="opportunityItem.accountName" label="姓名" required/>
        <lnk-lov-field v-model="opportunityItem.gender" label="性别" lovType="GENDER"/>
        <lnk-date-field v-model="opportunityItem.birthday" label="生日" dateType="date" />
        <lnk-lov-field v-model="opportunityItem.sources" label="来源渠道" lovType="SOURCE_FROM"/>
        <lnk-field label="地址" :value="fullAddress"
                   readonly hasLink @click="updateOrInsertMainAddress"/>
        <lnk-field v-model="opportunityItem.housingEstate" label="小区" readonly/>
        <lnk-lov-field v-model="opportunityItem.houseType" label="户型" readonly lovType="HOUSE_TYPE"/>
      </div>
      <div class="item-title">联系方式</div>
      <div class="item-body">
        <lnk-field v-model="opportunityItem.mobilePhone1" label="手机" type="number"/>
        <lnk-field v-model="opportunityItem.mobilePhone2" label="备用手机号" type="number"/>
        <lnk-field v-model="opportunityItem.qqNum" label="QQ" type="number"/>
        <lnk-field v-model="opportunityItem.weichatNum" label="微信号" />
      </div>
      <lnk-tabbar>
        <lnk-tabbar-item @handle="saveOpportunity" name="保存商机" icon="icon-iconset0237"/>
      </lnk-tabbar>
    </div>
    <div class="has-tab" v-show="active==='1'">
      <div class="address-list">
        <!--<lnk-content-empty v-if="opportunityItem.addrList.length === 0"></lnk-content-empty>-->
        <div class="address-item" v-for="item in opportunityItem.addrList" :key="item.id">
          <div class="info-row">
            <div class="left-col-7">
              <span>{{ item.consignee }}</span>
              <span style="margin-left: 5px">{{ item.mobilePhone }}</span>
            </div>
            <div class="right-col-3">
              <lnk-tag plain type="primary" :text="item.addrType|lovTransform('ADDR_TYPE')" />
            </div>
          </div>
          <div class="info-row">
            <label class="iconfont icon-lbs" style="font-size: 18px;"></label>
            <span>{{ item.province }}{{ item.city }}{{ item.district }}{{ item.addr }}{{ item.housingEstate }}</span>
          </div>
          <div class="action-row">
            <div class="left-col-3" @click="setMainAddress( item )">
              <label class="iconfont icon-fangxingxuanzhong icon" v-if="item.id === defaultAddressId"></label>
              <label class="iconfont icon-fangxingweixuanzhong icon" v-if="item.id !== defaultAddressId"></label>
              <label class="label">默认地址</label>
            </div>
            <div class="right-col-7">
              <div class="button" @click="editAddress( item )">
                <label class="iconfont icon-bianji1" style="font-size: 18px;color: #26a2ff;"></label>
                <label class="label">编辑</label>
              </div>
              <div class="button" @click="deleteAddress( item )">
                <label class="iconfont icon-shanchu1" style="font-size: 18px;color: red;"></label>
                <label class="label">删除</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <lnk-tabbar>
        <lnk-tabbar-item @handle="addAddress" name="添加地址" icon="icon-xinjian"/>
        <lnk-tabbar-item @handle="saveOpportunity" name="保存商机" icon="icon-iconset0237"/>
      </lnk-tabbar>
    </div>
    <div class="module-item has-tab" v-show="active==='2'">
      <div class="item-title">需求信息</div>
      <div class="item-body">
        <lnk-lov-field v-model="opportunityItem.buyReason" label="购买原因" lovType="BUY_REASON"/>
        <lnk-lov-field v-model="opportunityItem.fitUpProgress" label="装修进度" lovType="FITUP_PROGRESS"/>
        <lnk-lov-field v-model="opportunityItem.stylePreference" label="家装风格" lovType="STYLE_PREFERENCE"/>
        <lnk-date-field v-model="opportunityItem.requestDate" label="需求日期" dateType="date"/>
        <lnk-lov-field v-model="opportunityItem.colorPreference" label="颜色偏好" lovType="COLOR_PREFERENCE"/>
        <lnk-field v-model="opportunityItem.budget" label="预计金额" type="digit"/>
        <lnk-field v-model="opportunityItem.otherRemark" label="其他需求备注"/>
      </div>
      <div class="item-title">产品信息</div>
      <div class="item-body">
        <lnk-cell @click="handleProd">
          <template slot="left">
            <label>意向产品</label>
            <lnk-tag type="danger" text="促销" />
          </template>
        </lnk-cell>
        <div v-for="prod in opportunityItem.intendProdList" :key="prod.prodId"
             v-if="prod.deleteFlag!=='Y'">
          <lnk-card
            :title="prod.prodName"
            :desc="prod.prodModeName"
            :price="prod.price"
            :thumb="prod.prodImgUrl"
            :tag="prod.tagName">
          </lnk-card>
        </div>
      </div>
      <lnk-tabbar>
        <lnk-tabbar-item @handle="saveOpportunity" name="保存商机" icon="icon-iconset0237"/>
      </lnk-tabbar>
    </div>
  </div>
</template>

<script>
  import LnkTabbar from '@/components/lnk.tabbar'
  import LnkTabbarItem from '@/components/lnk.tabbar.item'
  import LnkTabs from '@/components/lnk.tabs'
  import LnkContentEmpty from '@/components/lnk.content.empty'
  import LnkLovField from '@/components/lnk.lov.field'
  import LnkAddressField from '@/components/lnk.address.field'
  import LnkDateField from '@/components/lnk.date.field'
  import LnkField from '@/components/lnk.field'
  import LnkTag from '@/components/lnk.tag'
  import LnkCell from '@/components/lnk.cell'
  import LnkCard from '@/components/lnk.card'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'opportunityItem',
    computed: {
      ...mapGetters(['getOpportunityItem', 'getActiveTab', 'getId']),
      fullAddress: function () {
        return this.opportunityItem.district + this.opportunityItem.address;
      }
    },
    components: {
      LnkTabbar,
      LnkTabbarItem,
      LnkTabs,
      LnkContentEmpty,
      LnkLovField,
      LnkAddressField,
      LnkDateField,
      LnkField,
      LnkTag,
      LnkCell,
      LnkCard
    },
    mounted () {
      this.opportunityItem = this.getOpportunityItem();
      this.active = this.getActiveTab();
      this.getAddressList();
    },
    data () {
      return {
        opportunityItem: {},
        defaultAddressId: '',  // 默认地址Id
        tabs: [
          {
            id: '0',
            title: '基本信息',
            icon: 'icon-jibenxinxi-xiugai'
          }, {
            id: '1',
            title: '地址',
            icon: 'icon-lbs'
          }, {
            id: '2',
            title: '需求信息',
            icon: 'icon-xuqiu-hui'
          }
        ],
        active: '0'
      }
    },
    watch: {
      // 监控选中的tab页，确保返回商机明细界面时，定格在之前的界面
      active: function (newValue, oldValue) {
        this.setActiveTab( newValue );
      }
    },
    methods: {
      ...mapMutations(['setAddressItem', 'setActiveTab']),
      // 保存商机
      saveOpportunity: function () {
        if(this.$util.isEmpty(this.opportunityItem.accountName)) {
          this.$util.toast("客户姓名不能为空！");
          return;
        }
        let url = '';
        if(this.opportunityItem.dataOperationType === 'new') {
          url = 'mobile/QidianOpty/upsert';
        } else {
          url = 'mobile/QidianOpty/update';
        }
        this.$http.post(url,
          this.opportunityItem
        ).then((res) => {
          if(res.data.success) {
            this.$util.toast("保存成功！", "success");
            wx.navigateBack();
          } else {
            this.$util.toast("保存失败：" + res.data.message);
          }
        }).catch((error) => {
          this.$util.toast("请求失败：" + error);
        });
      },
      // 管理意向产品
      handleProd: function () {
        wx.navigateTo({
          url: '/pages/opportunity/intention.product.list'
        });
      },
      // 查询商机客户下的地址
      getAddressList: function () {
        // 新建模式且客户信息为空时，改为从数据仓库查询地址
        if(this.opportunityItem.dataOperationType === 'new') {
          // 寻找默认地址，显示默认radio
          for(let i=0;i<this.opportunityItem.addrList.length;i++) {
            if(this.opportunityItem.addrList[i].isDefault === 'Y') {
              this.defaultAddressId = this.opportunityItem.addrList[i].id;
              break;
            }
          }
        } else {
          // 非新建模式下，直接基于客户Id从服务器拉取地址列表
          this.$http.get('/mobile/QidianAccntAddr/queryAll', {
            acctId: this.opportunityItem.accountId
          }).then((res) => {
            if(res.data.success) {
              this.opportunityItem.addrList = res.data.result;
              // 寻找默认地址，显示默认radio
              for(let i=0;i<this.opportunityItem.addrList.length;i++) {
                if(this.opportunityItem.addrList[i].isDefault === 'Y') {
                  this.defaultAddressId = this.opportunityItem.addrList[i].id;
                  break;
                }
              }
            } else {
              this.$util.toast("查询地址失败：" + res.data.message);
            }
          }).catch((error) => {
            this.$util.toast("请求失败：" + error);
          })
        }
      },
      // 添加地址
      addAddress: function () {
        this.setAddressItem( this.initAddressItem() );   // 设置初始化的地址数据至数据仓库
        wx.navigateTo({
          url: '/pages/opportunity/opportunity.address'
        });
      },
      // 编辑地址信息
      editAddress: function ( item ) {
        this.setAddressItem( item );                    // 设置待编辑的地址数据至数据仓库
        wx.navigateTo({
          url: '/pages/opportunity/opportunity.address'
        });
      },
      // 设置主要地址
      setMainAddress: function ( item ) {
        // 已经是主要地址，直接退出
        if(item.isDefault !== 'Y') {
          if (this.opportunityItem.dataOperationType !== 'new') {
            // 非新建模式下，设置默认地址需要请求服务器进行处理
            this.$http.post('/mobile/QidianAccntAddr/setMainAddr',
              item
            ).then((res) => {
              if (res.data.success) {
                // 处理完毕之后，前端控制数据展示
                this.setMainAddressCallBack(item);
              } else {
                this.$util.toast("默认地址设置失败: " + res.data.message);
              }
            }).catch((error) => {
              this.$util.toast("请求失败：" + error);
            });
          } else {
            // 新建模式下，直接处理前端数据
            this.setMainAddressCallBack(item);
          }
        }
      },
      // 设置默认地址之后的数据控制操作，
      setMainAddressCallBack: function ( item ) {
        // 选出新的默认地址用于列表展示
        this.defaultAddressId = item.id;
        for (let i = 0; i < this.opportunityItem.addrList.length; i++) {
          let obj = this.opportunityItem.addrList[i];
          if (obj.id !== item.id) {
            obj.isDefault = 'N';
          } else {
            obj.isDefault = 'Y';
          }
        }
        // 将新的默认的地址，回写到基本信息
        this.opportunityItem.mainAddrId = item.id;
        this.opportunityItem.district = item.district;
        this.opportunityItem.address = item.addr;
        this.opportunityItem.housingEstate = item.housingEstate;
        this.opportunityItem.houseType = item.houseType;
      },
      // 基本信息tab下点击修改地址
      updateOrInsertMainAddress: function () {
        let addressItem = {};
        if(this.$util.isEmpty(this.opportunityItem.mainAddrId) || this.opportunityItem.mainAddrId === 'no Match Id') {
          // 主要地址不存在
          if(this.opportunityItem.addrList.length > 0) {
            // 但客户下有地址时，取一条地址作为主要地址进行编辑
            this.opportunityItem.mainAddrId = this.opportunityItem.addrList[0].id;
            addressItem = this.opportunityItem.addrList[0];
            addressItem.setmainFlag = 'Y'
          } else {
            // 客户下不存在其他地址，则初始化地址对象用于编辑
            addressItem = this.initAddressItem();
          }
          // 将新地址对象的id回写到基本信息主要地址
          this.opportunityItem.mainAddrId = addressItem.id;
        } else {
          // 基本信息主要地址存在，则进行匹配
          for(let i=0;i<this.opportunityItem.addrList.length;i++) {
            let temp = this.opportunityItem.addrList[i];
            if(temp.id === this.opportunityItem.mainAddrId) {
              addressItem = temp;
            }
          }
        }
        // 将当前地址信息写入数据仓库
        this.setAddressItem( addressItem );
        wx.navigateTo({
          url: '/pages/opportunity.address/main?from=basicInfo'
        });
      },
      // 删除地址
      deleteAddress: function ( item ) {
        if (item.isDefault === 'Y') {
          this.$util.toast('默认地址不允许删除!');
        } else {
          wx.showModal({
            title: '警告',
            content: '您是否确认删除该地址？',
            success: function(res) {
              if (res.confirm) {
                if(this.opportunityItem.dataOperationType !== 'new') {
                  // 非新建模式下，删除需要请求服务器
                  this.$http.get('/mobile/QidianAccntAddr/deleteById', {
                    cache: false,
                    params: {
                      id: item.id
                    }
                  }).then((res) => {
                    if (res.data.success) {
                      this.$util.toast("已删除！");
                      // 前端直接删除地址列表中对应的数据
                      this.opportunityItem.addrList = this.$util.spliceOne(this.opportunityItem.addrList, item.id);
                    } else {
                      this.$util.toast("删除地址失败：" + res.data.message);
                    }
                  }).catch((error) => {
                    this.$util.toast("请求失败：" + error);
                  })
                } else {
                  // 新建模式下，删除前端对象的地址数据，同时更新地址数据到数据仓库
                  this.opportunityItem.addrList = this.$util.spliceOne(this.opportunityItem.addrList, item.id);
                  this.setOpportunityItem({item: this.opportunityItem, reset: false});   // 回写数据参数
                }
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          });
        }
      },
      // 初始化地址对象
      initAddressItem: function () {
        return {
          id: this.getId(),
          acctId: this.opportunityItem.accountId,
          dataOperationType: 'new',
          isEffective: 'Y',
          addrType: 'RECEIVE_ADDR', // 地址类型
          consignee: this.opportunityItem.accountName, // 收货人
          mobilePhone: '',          // 联系方式
          province: '',             // 省
          city: '',                 // 市
          district: '',             // 县
          addr: '',                 // 详细地址
          housingEstate: '',        // 小区
          houseType: ''             // 户型
        };
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
