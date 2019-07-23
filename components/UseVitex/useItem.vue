<template>
  <div class="use-item">
    <img :src="iconMap[itemKey]">
    <div class="use-item-title">
      <div>{{$t(`useX.${itemKey}`)}}</div>
    </div>
    <div
        class="use-item-child"
    >
      <div>{{$t(`useX.${itemKey+'Sub'}`)}}</div>
    </div>
    <!--<a-->
        <!--:href="urlMap[itemKey]"-->
        <!--class="text-btn"-->
        <!--target="_blank"-->
    <!--&gt;-->
      <!--{{$t(`useX.${itemKey+'Btn'}`)}}-->
    <!--</a>-->
  </div>
</template>

<script type="text/babel">
  import create from '~/assets/images/use1.svg';
  import charge from '~/assets/images/use2.svg';
  import order from '~/assets/images/use3.svg';
  import config from '~/config.js';

  export default {
    mounted(){
      // console.log(config.urlMap);
    },
    data() {
      return {
        iconMap: { create, charge, order },
        urlMap: config.urls.use
      };
    },
    props: {
      itemKey: { type: String, default: '' }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~assets/vars";

  .use-item{
    width: 276px;
    text-align: center;
    @include touch{
      width: auto;
    }
    .use-item-title{
      font-size: 18px;
      font-family:$font-family-title;
      line-height:25px;
      color: #2c2e30;
      align-items: center;
    }
    .use-item-child{
      padding: 12px 0;
      text-align: center;
      color:#111111;
      font-size: 14px;
      line-height: 28px;
      align-items: center;
    }
  }
</style>