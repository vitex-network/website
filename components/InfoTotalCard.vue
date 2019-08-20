<template>
    <div class="info-total-wrapper">
      <div class="column item" v-for="(item, index) in list" :key="index">
        <div>{{ item.title }}</div>
        <div class="value">{{ item.value }} VX</div>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      list: [{
        title: '今日可挖量',
        value: 474647.20
      }, {
        title: '累计挖矿总量',
        value: 9654647.56
      }]
    };
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/vars.scss";
.info-total-wrapper {
  margin-top: 50px;
  background: url("~assets/images/index/bg.png") no-repeat center;
  background-color: white;
  height:80px;
  border-radius:2px;
  display: flex;
  display: -webkit-flex;
  @include mobile {
    flex-direction: column;
    height: auto;
    border-radius:none;
    background: none;
  }
  .column:last-child {
    border-right:none;
  }
}
.column {
  border-right: 1px solid #E7EAEE;
  padding: 20px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  font-family: $font-family-light;
  font-size:14px;
  color:rgba(23,28,52,1);
  line-height:40px;
  @include mobile {
    border:1px solid rgba(0,60,255,0.02);
    border-radius:2px;
    background: url("~assets/images/index/bg.png") no-repeat center;
    // background: url("~assets/images/index/mobile_bg.png") no-repeat center;
    background-color: white;
    margin-bottom: 10px;
  }
  .value {
    font-family: $font-family-title;
    color:rgba(23,28,52,1);
    font-size:28px;
  }
}
</style>