<template>
<div>
  <common-title></common-title>
  <div class="is-flex pledge-wrapper">
    <div class="left">
      <div>当前累计抵押金额</div>
      <div>12345 VITE</div>
      <div>= 12 BTC</div>
    </div>
    <div class="right">
      <div class="img-wrapper is-flex">
        <img src="~/assets/images/index/vite.svg"/>
        <img src="~/assets/images/index/vite.svg"/>
        <img src="~/assets/images/index/vite.svg"/>
        <img src="~/assets/images/index/vite.svg"/>
      </div>
      <div>预计抵押1000VITE可获得 12345 VX</div>
    </div>
  </div>
</div>
</template>
<script>
import commonTitle from './commonTitle';
export default {
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
}
</style>


