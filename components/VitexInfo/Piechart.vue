<template>
  <div class="detail">
    <div class="piechart is-flex">
      <img :src="piechart[$i18n.locale]" width="50%" height="50%">
    </div>
    <div class="question">
      <div class="answer" v-for="(item, index) in $t('vitexInfo.questions')" :key="index">
        <div class="title is-flex"><span class="dot"></span>{{`${item.question}`}}</div>
        <div class="content">
          <p v-for="(ansItem, index) in item.answer" :key="index">{{ ansItem }}</p>
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
  </div>
</template>

<script type="text/babel">
  import config from '~/config';
  import en from '~/assets/images/piecharten.jpg';
  import zh from '~/assets/images/piechart@2x.png';

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
    @include touch{
      display: block;
      margin: 0 20px;
    }
    .title{
      margin-bottom: 20px;
      color:#171C34;
      font-size: 20px;
      align-items: center;
      .dot {
        display: inline-block;
        width:6px;
        height:6px;
        background:rgba(47,91,234,1);
        border-radius:6px;
        margin-right: 7px;
        vertical-align: top;
      }
    }
    .content{
      margin-bottom: 20px;
      color:$text-color;
      font-size: 14px;
      line-height: 20px;
    }
    .piechart{
      justify-content: center;

    }
  }
</style>