<template>
  <div class="container">
    <div class="is-size-1-desktop is-size-2-touch slogan-wrapper">
      <h1>
        {{$t('vitexInfo.title')}}
      </h1>
      <p>{{$t('vitexInfo.desc')}}</p>
      <a
          href="http://vite.net/"
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

  export default {
    components: {
      info,
      piechart
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "assets/vars.scss";

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
  }
</style>