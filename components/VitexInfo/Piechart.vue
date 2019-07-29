<template>
  <div class="detail columns is-desktop">
    <div class="question column is-6-desktop">
      <div class="answer" v-for="(item, index) in $t('vitexInfo.questions')">
        <div class="title">{{`${index + 1}. ${item.question}`}}</div>
        <div class="content">
          <p v-for="(ansItem, index) in item.answer">{{ ansItem }}</p>
        </div>
      </div>
      <a
          :href="piechart.urls.vitex[$i18n.locale]"
          class="text-btn"
          target="_blank"
      >
        {{$t('home.starttoUse')}}
      </a>
    </div>
    <div class="piechart column is-6-desktop">
      <img :src="piechart[$i18n.locale]">
    </div>
  </div>
</template>

<script type="text/babel">
  import config from '~/config';
  import en from '~/assets/images/piecharten.jpg';
  import zh from '~/assets/images/piechart.jpg';

  export default {
    computed: {

    },
    data() {
      return {
        piechart:{
          en,
          zh,
          urls: config.urls
        },
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
    @include touch{
      display: block;
      margin: 0 20px;
    }
    .title{
      margin-bottom: 20px;
      color:#171C34;
      font-size: 20px;
    }
    .content{
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