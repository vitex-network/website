<template>
<div>
  <div class="pledge-wrapper">
    <div class="is-flex pledge-content">
      <div class="left">
        <div class="pledge-title">{{ $t('indexPage.mine.pledge.current') }}</div>
        <div class="pledge-amount"> {{ pledgeAmount.vite }} VITE</div>
        <div class="pledge-amount-btc">≈ {{ pledgeAmount.btc }} BTC</div>
      </div>
      <div class="right">
        <div class="img-wrapper is-flex">
          <img src="~/assets/images/index/vite.svg"/>
        </div>
        <div class="desc is-hidden-mobile">{{ $t('indexPage.mine.pledge.desc') }}</div>
      </div>
    </div>
    <div class="desc-mobile is-hidden-desktop">{{ $t('indexPage.mine.pledge.desc') }}</div>
  </div>
  
</div>
</template>
<script>
import commonTitle from './commonTitle';
export default {
  props: ['pledgeAmount'],
  components: {
    commonTitle
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/vars.scss";
.pledge-wrapper {
  padding: 20px 30px;
  background:rgba(255,255,255,1);
  box-shadow:0px 2px 9px 0px rgba(0,0,0,0.07);
  border-radius:5px;
  border:1px solid rgba(231,234,238,1);
  @include mobile {
    padding: 20px;
  }
  .pledge-content {
    justify-content: space-between;
  }
  .img-wrapper {
    justify-content: flex-end;
    img {
      margin-left: 10px;
    }
  }
  .pledge-title {
    font-size:14px;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(84,86,90,1);
    line-height:18px;
    margin-bottom: 16px; 
  }
  .pledge-amount {
    font-size:20px;
    font-family:PingFangSC;
    font-weight:600;
    color:rgba(23,28,52,1);
    line-height:24px;
    margin-bottom: 4px;
  }
  .pledge-amount-btc {
    font-size:12px;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(84,86,90,1);
    line-height:16px;
  }
  .desc {
    margin-top: 27px;
    font-size:14px;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(23,28,52,1);
    line-height:16px;
  }
  .desc-mobile {
    font-size:14px;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(84,86,90,1);
    line-height:16px;
    margin-top: 12px;
  }
}
</style>


