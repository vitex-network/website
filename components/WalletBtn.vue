<template>
  <div class="btn">
    <div
        class="wallet-btn"
        @click="openWallet"
    >{{$t('nav.login')}}</div>
  </div>
</template>

<script type="text/babel">
import { urls } from '~/config';

export default {
  components: {

  },
  computed:{
    url(){
      return {

      };
    }
  },
  data(){
    return{
      aboutArr: ['api','website']
    };
  },
  methods:{
    openWallet(){
      window.open(urls.wallet[this.$i18n.locale]);
    }
  }

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~assets/vars";
.btn{
  text-align: center;
  .wallet-btn {
    display: inline-block;
    width: 104px;
    height: 42px;
    line-height: 18px;
    border-radius:5px;
    border:1px solid rgba(201,205,213,1);
    color: $common-text-color;
    background-color: transparent;
    font-size: 14px;
    cursor: pointer;
    @include touch {
      width: 100px;
      font-size: 12px;
    }
  }
}
</style>


