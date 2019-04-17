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
      <img src="~/assets/images/piechart.png">
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    components: {

    },
    data: function () {
      return {
        navbarActive: false,
        navs: ['faq'],
        collapsing: false
      };
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~assets/vars";
  .detail{
    display:flex;
    padding-left: 85px;
    justify-content: space-between;
    .title{
      color:#171C34;
      font-size: 20px;
    }
    .content{
      display:flex;
      color:$text-color;
      font-size: 14px;
      line-height: 34px;
    }
  }
</style>