<template>
  <div class="module-item">
    <div class="item-title">地址信息</div>
    <div class="item-body">
      <lnk-lov-field v-model="addressItem.addrType" label="地址类型" required lovType="ADDR_TYPE"/>
      <lnk-field v-model="addressItem.consignee" label="收货人" required />
      <lnk-field v-model="addressItem.mobilePhone" label="联系方式" required type="tel"/>
      <lnk-address-field :province="addressItem.province"
                         :city="addressItem.city"
                         :district="addressItem.district"
                         label="地区" @change="changeAddress" required/>
      <lnk-field v-model="addressItem.addr" label="详细地址" required />
      <lnk-field v-model="addressItem.housingEstate" label="小区" required />
      <lnk-lov-field v-model="addressItem.houseType" label="户型" lovType="HOUSE_TYPE"/>
    </div>
    <lnk-tabbar>
      <lnk-tabbar-item @handle="saveAddress" name="保存地址" icon="icon-iconset0237"/>
    </lnk-tabbar>
  </div>
</template>

<script>
  import LnkField from '@/components/lnk.field'
  import LnkLovField from '@/components/lnk.lov.field'
  import LnkAddressField from '@/components/lnk.address.field'
  import LnkTabbar from '@/components/lnk.tabbar'
  import LnkTabbarItem from '@/components/lnk.tabbar.item'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: "editAddress",
    computed: {
      ...mapGetters(['getAddressItem', 'getAccountItem'])
    },
    components: {
      LnkField,
      LnkLovField,
      LnkAddressField,
      LnkTabbar,
      LnkTabbarItem
    },
    mounted () {
      this.addressItem = this.getAddressItem();
    },
    data () {
      return {
        addressItem: {}
      }
    },
    methods: {
      ...mapMutations(['setAccountItem']),
      // 地址改变时，回写省市县
      changeAddress: function ( value ) {
        this.addressItem.province = value[0];
        this.addressItem.city = value[1];
        this.addressItem.district = value[2];
      },
      // 保存or新建地址
      saveAddress: function () {
        if(this.$util.isEmpty(this.addressItem.addrType) || this.$util.isEmpty(this.addressItem.consignee)
          || this.$util.isEmpty(this.addressItem.mobilePhone) || this.$util.isEmpty(this.addressItem.addr)
          || this.$util.isEmpty(this.addressItem.housingEstate) || (this.$util.isEmpty(this.addressItem.province)
            && this.$util.isEmpty(this.addressItem.city) && this.$util.isEmpty(this.addressItem.district))) {
          this.$util.toast('请补充必填信息.');
          return;
        }
        let url = '';
        if(this.addressItem.dataOperationType === 'new') {
          url = '/mobile/QidianAccntAddr/insert';
        } else {
          url = '/mobile/QidianAccntAddr/update';
        }
        this.$http.post(url,
          this.addressItem
        ).then((res) => {
          if(res.data.success) {
            // 回写信息
            let accountItem = this.getAccountItem();
            accountItem.mainAddrId = this.addressItem.id;
            accountItem.province = this.addressItem.province;
            accountItem.city = this.addressItem.city;
            accountItem.district = this.addressItem.district;
            accountItem.address = this.addressItem.addr;
            accountItem.housingEstate = this.addressItem.housingEstate;
            accountItem.houseType = this.addressItem.houseType;
            this.setAccountItem(accountItem);
            this.$util.toast("保存成功！", "success");
            wx.navigateBack();
          } else {
            this.$util.toast("保存失败：" + res.data.message);
          }
        }).catch((error) => {
          this.$util.toast("请求失败：" + error);
        })
      }
    }
  }
</script>

<style scoped>

</style>
