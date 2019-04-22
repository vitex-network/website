<template>
  <div class="vitex-info container">
    <div class="is-size-1-desktop is-size-2-touch slogan-wrapper">
      <h1>
        {{$t('vitexInfo.title')}}
      </h1>
      <p>{{$t('vitexInfo.desc')}}</p>
      <a
          :href="urls.more[$i18n.locale]"
          class="text-btn"
          target="_blank"
      >
        {{$t('vitexInfo.more')}}
      </a>
    </div>
    <info></info>
    <piechart></piechart>
  </div>
</template>

<script>
  import info from './info';
  import piechart from './piechart';
  import { urls } from '~/config.js';

  export default {
    components: {
      info,
      piechart
    },
    data(){
      return{
        urls
      };
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "assets/vars.scss";

  .vitex-info{
    margin-top: 90px;
    .slogan-wrapper {
      text-align: center;
      h1 {
        font-size: 32px;
      }
      p {
        margin-top: 30px;
        font-size: 14px;
        color: $common-text-color;
        line-height: 24px;
        font-family: $font-family-light;
        @include touch {
          font-size: 1rem;
        }
      }
      a{
        display: block;
        padding-top: 8px;
      }
    }
  }
</style>