<template>
  <div class="detail columns">
    <div class="question column is-6">
      <div class="title">{{$t('vitexInfo.what')}}</div>
      <div class="content">{{$t('vitexInfo.whatContent')}}</div>
      <div class="title">{{$t('vitexInfo.how')}}</div>
      <div class="content">{{$t('vitexInfo.howContent')}}</div>
      <a
          href="http://vite.net/"
          class="text-btn"
          target="_blank"
      >
        {{$t('home.starttoUse')}}
      </a>
    </div>
    <div class="piechart column is-6">
      <img :src="piechart">
    </div>
  </div>
</template>

<script type="text/babel">
  import pieEn from '~/assets/images/piecharten.png';
  import pieZh from '~/assets/images/piechart.png';

  export default {
    computed: {
      piechart: function () {
        return this.$i18n.locale === 'zh'? pieZh : pieEn;
      }
    },
    data() {
      return {

      };
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~assets/vars";
  .detail{
    display:flex;
    justify-content: space-between;
    padding-top: 88px;
    .title{
      margin-bottom: 20px;
      color:#171C34;
      font-size: 20px;
    }
    .content{
      display:flex;
      max-width: 450px;
      margin-bottom: 20px;
      color:$text-color;
      font-size: 14px;
      line-height: 20px;
    }
    .piechart{
      padding-top: 30px;
    }
  }
</style>