<template>
  <div>
    <card-info :name="name"></card-info>
    <common-title :title="`交易对`"></common-title>
    <market></market>
  </div>
</template>
<script>
import cardInfo from './cardInfo';
import commonTitle from './commonTitle';
import market from '../market/market';

export default {
  components: {
    cardInfo,
    commonTitle,
    market
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  height: 152px;
  width: 100%;
  border:1px solid rgba(0,60,255,0.02);
  background: url("~assets/images/bg/operator.png");
  justify-content: space-between;
  padding: 30px;
  .pic {
    width:70px;
    height:70px;
    background:rgba(255,255,255,1);
    border-radius:5px;
    border:1px solid rgba(231,234,238,1);
    margin-right: 20px;
  }
  .info {
    .name {
      font-size:20px;
      font-family:PingFangSC;
      font-weight:600;
      color:rgba(17,17,17,1);
      line-height:24px;
      margin-bottom: 20px;
    }
    img {
      margin-right: 6px;
    }
  }
  
}
</style>


