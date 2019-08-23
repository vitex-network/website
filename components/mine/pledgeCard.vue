<template>
<div>
  <div class="is-flex pledge-wrapper">
    <div class="left">
      <div class="pledge-title">当前累计抵押金额</div>
      <div class="pledge-amount"> {{ pledgeAmount.vite }} VITE</div>
      <div class="pledge-amount-btc">≈ {{ pledgeAmount.btc }} BTC</div>
    </div>
    <div class="right">
      <div class="img-wrapper is-flex">
        <img src="~/assets/images/index/vite.svg"/>
        <img src="~/assets/images/index/btc.svg"/>
        <img src="~/assets/images/index/eth.svg"/>
        <img src="~/assets/images/index/usd.svg"/>
      </div>
      <div class="desc">预计抵押1000 VITE可获得 12345 VX</div>
    </div>
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
.pledge-wrapper {
  justify-content: space-between;
  padding: 20px 30px;
  background:rgba(255,255,255,1);
  box-shadow:0px 2px 9px 0px rgba(0,0,0,0.07);
  border-radius:5px;
  border:1px solid rgba(231,234,238,1);
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
}
</style>


