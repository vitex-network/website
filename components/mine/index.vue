<template>
  <div class="datas">
    <div class="title">VX当日挖矿概况</div>
    <info-total-card></info-total-card>
    <info-card></info-card>
    <pledge-card></pledge-card>
    <info-card :is-simple="true"></info-card>
    <div class="title">VX当日分红概况</div>
    <info-total-card></info-total-card>
    <info-card :is-simple="true"></info-card>
  </div>
</template>
<script>
import InfoCard from './InfoCard';
import InfoTotalCard from './InfoTotalCard';
import pledgeCard from './pledgeCard';

export default {
  components: {
    InfoCard,
    InfoTotalCard,
    pledgeCard
  },
  data() {
    return {};
  }
  
};
</script>
<style lang="scss" scoped>
@import "~assets/vars.scss";
.datas {
  @include mobile {
    padding: 0 20px;
  }
  
}
  .title {
    text-align: center;
    margin-top: 60px;
    font-size:32px;
    font-family:PingFangSC;
    font-weight:600;
    color:rgba(23,28,52,1);
    line-height:45px;
  }
</style>



