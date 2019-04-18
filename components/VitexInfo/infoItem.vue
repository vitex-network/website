<template>
  <div class="info-item">
    <div class="info-item-title">
      <img :src="iconMap[itemKey]">
    </div>
    <div
        class="info-item-child"
    >
      <div>{{$t(`vitexInfo.${itemKey}`)}}</div>
    </div>
  </div>
</template>

<script type="text/babel">
  import dex from '~/assets/images/f1.svg';
  import performance from '~/assets/images/f2.svg';
  import mine from '~/assets/images/f3.svg';
  import open from '~/assets/images/f4.svg';


  export default {
    data() {
      return {
        iconMap: { dex, performance, mine, open }
      };
    },
    props: {
      itemKey: { type: String, default: '' }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~assets/vars";

  .info-item{
    display:flex;
    flex-direction: column;
    max-width: 196px;
    .info-item-title{
      padding-bottom: 26px;
      text-align: center;
      img{
        text-align: center;
      }
    }
    .info-item-child{
      text-align: center;
      display:flex;
      color:#111111;
      font-size: 14px;
      font-weight:400;
      line-height: 20px;
    }
  }
</style>