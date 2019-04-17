<template>
  <div class="use">
    <h1>
      {{$t("useX.title")}}
    </h1>
    <div class="use-group">
      <item
          :itemKey="'create'"
      ></item>
      <img :src="arrow">
      <item
          :itemKey="'charge'"
      ></item>
      <img :src="arrow">
      <item
          :itemKey="'order'"
      ></item>
    </div>
  </div>
</template>

<script type="text/babel">
  import item from './useItem';
  import arrow from '~/assets/images/arrow-right.svg';

  export default {
    components: {
      item
    },
    data() {
      return {
        arrow,
      };
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~assets/vars";
  .use{
    text-align: center;
    height:500px;
    justify-content: space-between;
    background:rgba(246,248,249,1);
    h1 {
      display: block;
      font-size: 32px;
    }
    .use-group{
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
