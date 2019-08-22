<template>
  <div class="detail">
    <div class="piechart is-flex">
      <img :src="piechart[page][$i18n.locale]" width="50%" height="50%">
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
  import dividend_en from '~/assets/images/index/dividend_en.jpg';
  import dividend_zh from '~/assets/images/index/dividend_zh.jpg';
  import mine_en from '~/assets/images/index/mine_en.jpg';
  import mine_zh from '~/assets/images/index/mine_zh.jpg';

  export default {
    props: {
      page: {
        type: String,
        default: ''
      }
    },
    computed: {
      piechart() {
        return {
          'dividend': {
            en: dividend_en,
            zh: dividend_zh,
          },
          'mine': {
            en: mine_en,
            zh: mine_zh,
          },
          urls: config.urls
        };
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