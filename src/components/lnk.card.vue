<!--
  @name card卡片
  @author siye
  @desc
         <lnk-card
            :title="prod.prodName"
            :desc="prod.prodModeName"
            :price="prod.price"
            :thumb="prod.prodImgUrl"
            :tag="prod.tagName">
          </lnk-card>
 -->
<template>
  <div class="lnk-card">
    <div class="thumb">
      <img :src="thumb" alt=""/>
    </div>
    <div class="content">
      <div class="row">
        <div class="title">{{title}}</div>
        <div class="price">¥{{price}}</div>
      </div>
      <div class="row">
        <div class="desc">{{desc}}</div>
      </div>
    </div>
    <div class="row">
      <lnk-tag plain type="danger" :text="tag" />
    </div>
  </div>
</template>

<script>
  import LnkTag from '@/components/lnk.tag'
  export default {
    name: "lnkCard",
    components: {
      LnkTag
    },
    props: {
      thumb: String,
      title: String,
      price: String,
      desc: String,
      tag: String
    }
  }
</script>

<style lang="scss" scoped>
  .lnk-card {
    margin-top: 10px;
    color: #333;
    height: 100px;
    font-size: 14px;
    background: #fafafa;
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 5px 15px 5px 115px;
    .thumb {
      top: 5px;
      left: 5px;
      width: 90px;
      height: 90px;
      position: absolute;
      img {
        border: none;
        max-width: 100%;
        max-height: 100%
      }
    }
    .content {
      width: 100%;
      .row {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        .title {
          max-height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          line-height: 20px;
          word-break: break-all;
          -webkit-box-orient: vertical;
        }
        .price {
          color: red;
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          min-width: 80px;
          line-height: 20px;
          text-align: right;
        }
        .desc {
          color: #666;
          font-size: 12px;
          max-height: 20px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
